/* ===== IjaraGo — PocketBase bilan aloqa qiluvchi qatlam =====
   Bitta domenda ishlaydi (/api/...), CORS sozlash shart emas.

   Ikki xil sessiya:
   - Foydalanuvchi (uy egasi/rielter) — localStorage, brauzer yopilsa ham qoladi.
   - Admin (superuser) — sessionStorage, brauzer yopilganda o'chadi.

   DIQQAT — telefon raqamiga asoslangan "parol": email/parol so'ralmaydi,
   telefon raqamidan avtomatik hosil qilinadi. Bu "ism-telefon bilan kirish"
   demo xatti-harakatini saqlaydi — haqiqiy maxfiy parol emas. Shu raqamni
   bilgan kishi o'sha akkauntga kira oladi. Haqiqiy parolli kirish —
   keyingi versiya uchun. */

const Api = (() => {
  const USER_KEY = 'ijarago_user_auth';
  const ADMIN_KEY = 'ijarago_admin_auth';
  const ADMIN_EMAIL = 'aslbekno07@gmail.com';

  /* ---------- past darajadagi so'rov ---------- */
  async function request(path, { method = 'GET', body, token, isForm = false } = {}) {
    const headers = {};
    if (token) headers['Authorization'] = token;
    if (body !== undefined && !isForm) headers['Content-Type'] = 'application/json';

    let res;
    try {
      res = await fetch(path, {
        method,
        headers,
        body: body === undefined ? undefined : (isForm ? body : JSON.stringify(body)),
      });
    } catch (e) {
      throw new Error('Internetga ulanishda xatolik. Qayta urinib ko‘ring.');
    }

    let data = null;
    try { data = await res.json(); } catch (e) { /* bo'sh javob (masalan DELETE) */ }

    if (!res.ok) throw new Error(extractErrorMessage(data, res.status));
    return data;
  }

  function extractErrorMessage(data, status) {
    if (data && data.data && Object.keys(data.data).length) {
      const firstField = Object.keys(data.data)[0];
      const fieldErr = data.data[firstField];
      if (fieldErr && fieldErr.message) return `${firstField}: ${fieldErr.message}`;
    }
    if (data && data.message) return data.message;
    return `Xatolik yuz berdi (${status})`;
  }

  function digitsOnly(phone) { return String(phone || '').replace(/\D/g, ''); }

  function deriveCredentials(phone) {
    const digits = digitsOnly(phone);
    return { email: `u${digits}@ijarago.local`, password: `Ijr@${digits}Go!` };
  }

  /* ---------- foydalanuvchi sessiyasi ---------- */
  function getUserSession() {
    try { return JSON.parse(localStorage.getItem(USER_KEY)); } catch (e) { return null; }
  }
  function setUserSession(session) {
    try {
      if (session) localStorage.setItem(USER_KEY, JSON.stringify(session));
      else localStorage.removeItem(USER_KEY);
    } catch (e) { /* xotira ishlamasa ham ilova davom etadi */ }
  }
  function currentUser() {
    const s = getUserSession();
    return s ? s.record : null;
  }

  async function loginUser(email, password) {
    const data = await request('/api/collections/users/auth-with-password', {
      method: 'POST', body: { identity: email, password },
    });
    const session = { token: data.token, record: data.record };
    setUserSession(session);
    return session;
  }

  async function registerUser(fields) {
    const { email, password } = deriveCredentials(fields.phone);
    await request('/api/collections/users/records', {
      method: 'POST',
      body: {
        email, password, passwordConfirm: password,
        name: fields.name, phone: fields.phone,
        telegram: fields.telegram || '', role: fields.role,
      },
    });
    return loginUser(email, password);
  }

  /* Ism/telefon bilan "kirish" — bo'lsa kiradi, bo'lmasa yaratadi */
  async function authenticateAccount(fields) {
    const { email, password } = deriveCredentials(fields.phone);
    try {
      const session = await loginUser(email, password);
      const updated = await request(`/api/collections/users/records/${session.record.id}`, {
        method: 'PATCH',
        body: { name: fields.name, telegram: fields.telegram || '', role: fields.role },
        token: session.token,
      });
      session.record = updated;
      setUserSession(session);
      return session;
    } catch (e) {
      return registerUser(fields);
    }
  }

  function logoutUser() { setUserSession(null); }

  /* ---------- admin (superuser) ---------- */
  function getAdminSession() {
    try { return JSON.parse(sessionStorage.getItem(ADMIN_KEY)); } catch (e) { return null; }
  }
  function setAdminSession(session) {
    try {
      if (session) sessionStorage.setItem(ADMIN_KEY, JSON.stringify(session));
      else sessionStorage.removeItem(ADMIN_KEY);
    } catch (e) { /* xotira ishlamasa ham ilova davom etadi */ }
  }
  function isAdminUnlocked() { return !!getAdminSession(); }

  async function adminLogin(password) {
    const data = await request('/api/collections/_superusers/auth-with-password', {
      method: 'POST', body: { identity: ADMIN_EMAIL, password },
    });
    setAdminSession({ token: data.token });
    return true;
  }
  function adminLogout() { setAdminSession(null); }

  /* ---------- e'lonlar ---------- */
  async function listApproved() {
    const data = await request('/api/collections/listings/records?perPage=200&sort=-created&filter=' + encodeURIComponent('status="approved"'));
    return data.items;
  }

  async function listMine() {
    const session = getUserSession();
    if (!session) return [];
    const data = await request(
      `/api/collections/listings/records?perPage=200&sort=-created&filter=${encodeURIComponent(`owner="${session.record.id}"`)}`,
      { token: session.token },
    );
    return data.items;
  }

  async function listAllForAdmin() {
    const admin = getAdminSession();
    if (!admin) return [];
    const data = await request('/api/collections/listings/records?perPage=200&sort=-created', { token: admin.token });
    return data.items;
  }

  async function getListing(id) {
    return request(`/api/collections/listings/records/${id}`);
  }

  /* fields: {title, description, region, district, type, rooms, area, floor,
     price, phone, telegram, lat, lng}, photoFiles: File[] (ixtiyoriy, 0-6 ta) */
  async function createListing(fields, photoFiles) {
    const session = getUserSession();
    if (!session) throw new Error('Avval akkauntga kiring');

    const form = new FormData();
    Object.entries(fields).forEach(([key, val]) => {
      if (val !== undefined && val !== null) form.append(key, val);
    });
    (photoFiles || []).forEach((file) => form.append('photos', file));

    return request('/api/collections/listings/records', {
      method: 'POST', body: form, isForm: true, token: session.token,
    });
  }

  async function updateListingStatus(id, status, note) {
    const admin = getAdminSession();
    const body = { status };
    if (note !== undefined) body.note = note;
    return request(`/api/collections/listings/records/${id}`, {
      method: 'PATCH', body, token: admin ? admin.token : undefined,
    });
  }

  async function deleteListing(id) {
    const session = getUserSession();
    const admin = getAdminSession();
    const token = admin ? admin.token : (session ? session.token : undefined);
    return request(`/api/collections/listings/records/${id}`, { method: 'DELETE', token });
  }

  function photoUrl(record, filename, thumb) {
    if (!record || !filename) return '';
    const q = thumb ? `?thumb=${thumb}` : '';
    return `/api/files/${record.collectionId}/${record.id}/${filename}${q}`;
  }

  return {
    currentUser, getUserSession, authenticateAccount, logoutUser,
    isAdminUnlocked, adminLogin, adminLogout,
    listApproved, listMine, listAllForAdmin, getListing,
    createListing, updateListingStatus, deleteListing, photoUrl,
  };
})();
