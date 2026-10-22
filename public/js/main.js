/* ===== IjaraGo — demo MVP (frontend-only, localStorage) =====
   Backend yo'q: e'lonlar va saqlanganlar faqat shu brauzerda turadi. */

/* ---------- i18n ---------- */
const I18N = {
  uz: {
    tagline: 'Uy topish oson',
    heroTitle: 'Ijaraga uy qidiryapsizmi?',
    heroSub: "O'zbekiston bo'ylab e'lonlar — bir joyda.",
    searchPh: 'Hudud yoki tuman...',
    search: 'Qidirish',
    listings: "E'lonlar",
    mapTitle: 'Xaritada',
    mapNote: "Xarita internet talab qiladi. Belgini bosing — e'lon ochiladi.",
    savedTitle: 'Saqlangan',
    addTitle: "E'lon berish",
    addNote: "Demo rejim: e'lon faqat shu brauzerda saqlanadi.",
    fTitle: 'Sarlavha', fTitlePh: '2 xonali kvartira, markazda',
    fRegion: 'Hudud', fType: 'Ijara turi', fRooms: 'Xonalar soni',
    fPrice: "Narxi (so'm)", fPhone: 'Telefon', fTg: 'Telegram (ixtiyoriy)',
    fDesc: 'Tavsif', fDescPh: 'Uy haqida qisqacha...',
    publish: "E'lonni joylash",
    navHome: 'Bosh sahifa', navMap: 'Xarita', navSaved: 'Saqlangan', navAdd: "E'lon",
    all: 'Barchasi', daily: 'Kunlik', long: 'Uzoq muddatli',
    allRegions: 'Barcha hududlar', anyRooms: 'Xona soni', anyPrice: 'Narx',
    rooms: 'xona', perDay: "so'm/kun", perMonth: "so'm/oy",
    call: "Qo'ng'iroq", telegram: 'Telegram',
    saved: 'Saqlandi', unsaved: "Saqlanganlardan o'chirildi",
    published: "E'lon joylandi",
    noResults: "Hech narsa topilmadi. Filtrlarni o'zgartiring.",
    noSaved: "Saqlangan e'lon yo'q. Kartadagi ♡ ni bosing.",
    descTitle: 'Tavsif', contactTitle: "Bog'lanish",
    ownerTitle: "E'lon beruvchi", onMap: 'Xaritada ko‘rish',
    errTitle: 'Sarlavhani kiriting', errRegion: 'Hududni tanlang',
    errPrice: "Narxni kiriting", errPhone: 'Telefon raqamni kiriting',
    countSuffix: 'ta', floor: 'qavat', chooseRegion: 'Hududni tanlang',
    mapOffline: "Xarita yuklanmadi. Internet aloqasini tekshiring.",
  },
  ru: {
    tagline: 'Найти жильё просто',
    heroTitle: 'Ищете квартиру в аренду?',
    heroSub: 'Объявления по всему Узбекистану — в одном месте.',
    searchPh: 'Регион или район...',
    search: 'Поиск',
    listings: 'Объявления',
    mapTitle: 'На карте',
    mapNote: 'Карта требует интернет. Нажмите на метку — откроется объявление.',
    savedTitle: 'Избранное',
    addTitle: 'Разместить объявление',
    addNote: 'Демо-режим: объявление сохраняется только в этом браузере.',
    fTitle: 'Заголовок', fTitlePh: '2-комнатная квартира, в центре',
    fRegion: 'Регион', fType: 'Тип аренды', fRooms: 'Количество комнат',
    fPrice: 'Цена (сум)', fPhone: 'Телефон', fTg: 'Telegram (необязательно)',
    fDesc: 'Описание', fDescPh: 'Кратко о жилье...',
    publish: 'Разместить',
    navHome: 'Главная', navMap: 'Карта', navSaved: 'Избранное', navAdd: 'Подать',
    all: 'Все', daily: 'Посуточно', long: 'Долгосрочно',
    allRegions: 'Все регионы', anyRooms: 'Комнат', anyPrice: 'Цена',
    rooms: 'комн.', perDay: 'сум/сутки', perMonth: 'сум/мес',
    call: 'Позвонить', telegram: 'Telegram',
    saved: 'Сохранено', unsaved: 'Удалено из избранного',
    published: 'Объявление размещено',
    noResults: 'Ничего не найдено. Измените фильтры.',
    noSaved: 'Нет сохранённых. Нажмите ♡ на карточке.',
    descTitle: 'Описание', contactTitle: 'Связаться',
    ownerTitle: 'Автор объявления', onMap: 'Показать на карте',
    errTitle: 'Введите заголовок', errRegion: 'Выберите регион',
    errPrice: 'Введите цену', errPhone: 'Введите номер телефона',
    countSuffix: 'шт.', floor: 'этаж', chooseRegion: 'Выберите регион',
    mapOffline: 'Карта не загрузилась. Проверьте подключение к интернету.',
  },
};

const REGIONS = [
  { key: 'toshkent-sh', uz: 'Toshkent shahri', ru: 'город Ташкент', lat: 41.311, lng: 69.280 },
  { key: 'toshkent-v',  uz: 'Toshkent viloyati', ru: 'Ташкентская обл.', lat: 41.000, lng: 69.600 },
  { key: 'samarqand',   uz: 'Samarqand', ru: 'Самарканд', lat: 39.654, lng: 66.959 },
  { key: 'buxoro',      uz: 'Buxoro', ru: 'Бухара', lat: 39.767, lng: 64.423 },
  { key: 'andijon',     uz: 'Andijon', ru: 'Андижан', lat: 40.783, lng: 72.350 },
  { key: 'fargona',     uz: "Farg'ona", ru: 'Фергана', lat: 40.389, lng: 71.783 },
  { key: 'namangan',    uz: 'Namangan', ru: 'Наманган', lat: 40.998, lng: 71.672 },
  { key: 'xorazm',      uz: 'Xorazm', ru: 'Хорезм', lat: 41.550, lng: 60.631 },
];

const PHOTO_STYLES = [
  'linear-gradient(135deg,#1f8064,#17634f)',
  'linear-gradient(135deg,#2b7a9b,#1d5a74)',
  'linear-gradient(135deg,#8a6d3b,#6b5129)',
  'linear-gradient(135deg,#5e60ce,#4245a8)',
  'linear-gradient(135deg,#c2560a,#9a4208)',
  'linear-gradient(135deg,#157f4a,#0f5e36)',
];
const PHOTO_ICONS = ['🏢', '🏠', '🏡', '🌇', '🪟', '🛋️'];

/* ---------- Demo e'lonlar ---------- */
const DEMO = [
  { id: 'd1', title: { uz: '2 xonali kvartira, Chilonzor', ru: '2-комн. квартира, Чиланзар' }, region: 'toshkent-sh', type: 'long', rooms: 2, price: 4500000, floor: '5/9', area: 54, phone: '+998901234567', tg: 'ijarago_demo', lat: 41.275, lng: 69.204, desc: { uz: "Metro yaqinida, ta'mirlangan, mebel va texnika bilan.", ru: 'Рядом метро, с ремонтом, мебель и техника.' } },
  { id: 'd2', title: { uz: 'Lyuks studiya, Yunusobod', ru: 'Люкс-студия, Юнусабад' }, region: 'toshkent-sh', type: 'daily', rooms: 1, price: 350000, floor: '7/12', area: 38, phone: '+998902345678', tg: 'ijarago_demo', lat: 41.367, lng: 69.289, desc: { uz: 'Kunlik ijara, yangi bino, konditsioner va Wi-Fi.', ru: 'Посуточно, новый дом, кондиционер и Wi-Fi.' } },
  { id: 'd3', title: { uz: '3 xonali uy, Registon yaqinida', ru: '3-комн. дом, рядом с Регистаном' }, region: 'samarqand', type: 'daily', rooms: 3, price: 600000, floor: '1/1', area: 90, phone: '+998903456789', tg: '', lat: 39.655, lng: 66.975, desc: { uz: 'Sayyohlar uchun qulay, hovli bor, markazga piyoda.', ru: 'Удобно туристам, есть двор, до центра пешком.' } },
  { id: 'd4', title: { uz: '1 xonali kvartira, Buxoro markazi', ru: '1-комн. квартира, центр Бухары' }, region: 'buxoro', type: 'long', rooms: 1, price: 2200000, floor: '3/5', area: 40, phone: '+998904567890', tg: 'ijarago_demo', lat: 39.774, lng: 64.428, desc: { uz: 'Markazda, do‘kon va bozor yaqin, uzoq muddatga.', ru: 'В центре, рядом магазины и базар, на длительный срок.' } },
  { id: 'd5', title: { uz: '4 xonali kottej, Toshkent viloyati', ru: '4-комн. коттедж, Ташкентская обл.' }, region: 'toshkent-v', type: 'daily', rooms: 4, price: 1200000, floor: '2/2', area: 160, phone: '+998905678901', tg: 'ijarago_demo', lat: 41.100, lng: 69.700, desc: { uz: 'Dam olish uchun, basseyn va katta hovli.', ru: 'Для отдыха, бассейн и большой двор.' } },
  { id: 'd6', title: { uz: '2 xonali kvartira, Andijon', ru: '2-комн. квартира, Андижан' }, region: 'andijon', type: 'long', rooms: 2, price: 1800000, floor: '4/5', area: 48, phone: '+998906789012', tg: '', lat: 40.785, lng: 72.345, desc: { uz: 'Oilaviy uchun qulay, maktab va bog‘cha yaqin.', ru: 'Удобно для семьи, рядом школа и садик.' } },
  { id: 'd7', title: { uz: 'Studiya, Farg‘ona markazi', ru: 'Студия, центр Ферганы' }, region: 'fargona', type: 'daily', rooms: 1, price: 250000, floor: '2/4', area: 32, phone: '+998907890123', tg: 'ijarago_demo', lat: 40.390, lng: 71.790, desc: { uz: 'Arzon kunlik ijara, tozalik va Wi-Fi bor.', ru: 'Недорого посуточно, чисто, есть Wi-Fi.' } },
  { id: 'd8', title: { uz: '3 xonali kvartira, Namangan', ru: '3-комн. квартира, Наманган' }, region: 'namangan', type: 'long', rooms: 3, price: 2600000, floor: '6/9', area: 72, phone: '+998908901234', tg: '', lat: 41.000, lng: 71.668, desc: { uz: 'Keng xonalar, yangi ta‘mir, avtoturargoh bor.', ru: 'Просторные комнаты, свежий ремонт, парковка.' } },
];

/* ---------- Holat va saqlash ---------- */
const LANG_KEY = 'ijarago_lang';
const SAVED_KEY = 'ijarago_saved';
const MINE_KEY = 'ijarago_mine';

const state = {
  lang: 'uz',
  type: 'all',
  region: '',
  rooms: '',
  price: '',
  query: '',
  view: 'home',
};

let map = null;
let markerLayer = null;
let toastTimer = null;

function qs(id) { return document.getElementById(id); }

/* HTML'ga qo'yiladigan har qanday ma'lumot shu yerdan o'tadi (XSS himoyasi) */
function esc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function t(key) { return (I18N[state.lang] && I18N[state.lang][key]) || key; }

function readJson(key, fallback) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
  catch (e) { return fallback; }
}
function writeJson(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
}

function getSaved() { return readJson(SAVED_KEY, []); }
function getMine() { return readJson(MINE_KEY, []); }

/* Demo e'lonlar + foydalanuvchi qo'shganlari */
function allListings() { return DEMO.concat(getMine()); }

function regionById(key) { return REGIONS.find((r) => r.key === key); }
function regionName(key) {
  const r = regionById(key);
  return r ? r[state.lang] : key;
}
function titleOf(item) {
  return typeof item.title === 'string' ? item.title : (item.title[state.lang] || item.title.uz);
}
function descOf(item) {
  if (!item.desc) return '';
  return typeof item.desc === 'string' ? item.desc : (item.desc[state.lang] || item.desc.uz);
}
function priceText(item) {
  const n = Number(item.price).toLocaleString('ru-RU');
  return n + ' ' + (item.type === 'daily' ? t('perDay') : t('perMonth'));
}
function photoStyle(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return { bg: PHOTO_STYLES[h % PHOTO_STYLES.length], icon: PHOTO_ICONS[h % PHOTO_ICONS.length] };
}

function showToast(message) {
  const el = qs('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ---------- Til ---------- */
function applyLang() {
  document.documentElement.lang = state.lang;
  qs('lang-label').textContent = state.lang.toUpperCase();
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
  buildTabs();
  buildFilters();
  buildAddSelects();
  renderAll();
}

function toggleLang() {
  state.lang = state.lang === 'uz' ? 'ru' : 'uz';
  writeJson(LANG_KEY, state.lang);
  applyLang();
}

/* ---------- Boshqaruv elementlari ---------- */
function buildTabs() {
  const types = [['all', t('all')], ['daily', t('daily')], ['long', t('long')]];
  qs('type-tabs').innerHTML = types.map(([key, label]) =>
    `<button type="button" data-type="${esc(key)}" class="${state.type === key ? 'active' : ''}">${esc(label)}</button>`
  ).join('');
}

function buildFilters() {
  qs('f-region').innerHTML = `<option value="">${esc(t('allRegions'))}</option>` +
    REGIONS.map((r) => `<option value="${esc(r.key)}"${state.region === r.key ? ' selected' : ''}>${esc(r[state.lang])}</option>`).join('');

  qs('f-rooms').innerHTML = `<option value="">${esc(t('anyRooms'))}</option>` +
    [1, 2, 3, 4].map((n) => `<option value="${n}"${String(state.rooms) === String(n) ? ' selected' : ''}>${n}+ ${esc(t('rooms'))}</option>`).join('');

  const bands = [['', t('anyPrice')], ['lo', '< 500 000'], ['mid', '500 000 – 3 000 000'], ['hi', '> 3 000 000']];
  qs('f-price').innerHTML = bands.map(([key, label]) =>
    `<option value="${esc(key)}"${state.price === key ? ' selected' : ''}>${esc(label)}</option>`).join('');
}

function buildAddSelects() {
  qs('a-region').innerHTML = `<option value="">${esc(t('chooseRegion'))}</option>` +
    REGIONS.map((r) => `<option value="${esc(r.key)}">${esc(r[state.lang])}</option>`).join('');
  qs('a-type').innerHTML =
    `<option value="long">${esc(t('long'))}</option><option value="daily">${esc(t('daily'))}</option>`;
  qs('a-rooms').innerHTML = [1, 2, 3, 4, 5].map((n) => `<option value="${n}">${n} ${esc(t('rooms'))}</option>`).join('');
}

/* ---------- Filtrlash ---------- */
function filtered() {
  const q = state.query.trim().toLowerCase();
  return allListings().filter((item) => {
    if (state.type !== 'all' && item.type !== state.type) return false;
    if (state.region && item.region !== state.region) return false;
    if (state.rooms && Number(item.rooms) < Number(state.rooms)) return false;
    if (state.price === 'lo' && item.price >= 500000) return false;
    if (state.price === 'mid' && (item.price < 500000 || item.price > 3000000)) return false;
    if (state.price === 'hi' && item.price <= 3000000) return false;
    if (q) {
      const hay = (titleOf(item) + ' ' + regionName(item.region)).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

/* ---------- Chizish ---------- */
function cardHtml(item) {
  const p = photoStyle(item.id);
  const fav = getSaved().includes(item.id);
  return `
    <article class="listing" data-action="open" data-id="${esc(item.id)}">
      <div class="listing-photo" style="background:${p.bg}">
        <span>${p.icon}</span>
        <span class="listing-badge">${esc(item.type === 'daily' ? t('daily') : t('long'))}</span>
        <button type="button" class="listing-fav" data-action="fav" data-id="${esc(item.id)}">${fav ? '♥' : '♡'}</button>
      </div>
      <div class="listing-body">
        <div class="listing-price">${esc(priceText(item))}</div>
        <div class="listing-title">${esc(titleOf(item))}</div>
        <div class="listing-meta">${esc(regionName(item.region))} · ${esc(item.rooms)} ${esc(t('rooms'))} · ${esc(item.area)} m²</div>
      </div>
    </article>
  `;
}

function renderHome() {
  const list = filtered();
  qs('listing-list').innerHTML = list.length
    ? list.map(cardHtml).join('')
    : `<div class="empty-state">${esc(t('noResults'))}</div>`;
  qs('home-count').textContent = list.length + ' ' + t('countSuffix');
}

function renderSaved() {
  const ids = getSaved();
  const list = allListings().filter((item) => ids.includes(item.id));
  qs('saved-list').innerHTML = list.length
    ? list.map(cardHtml).join('')
    : `<div class="empty-state">${esc(t('noSaved'))}</div>`;
  qs('saved-count').textContent = list.length + ' ' + t('countSuffix');
}

function renderAll() {
  renderHome();
  renderSaved();
  if (state.view === 'map') renderMap();
}

/* ---------- Xarita ---------- */
function renderMap() {
  if (typeof L === 'undefined') {                   /* Leaflet yuklanmagan (internet yo'q) */
    qs('map').innerHTML = `<div class="empty-state">${esc(t('mapOffline'))}</div>`;
    return;
  }
  if (!map) {
    map = L.map('map').setView([41.3, 69.25], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap',
    }).addTo(map);
    markerLayer = L.layerGroup().addTo(map);
  }
  markerLayer.clearLayers();

  const list = filtered();
  list.forEach((item) => {
    const r = regionById(item.region);
    const lat = item.lat || (r && r.lat) || 41.3;
    const lng = item.lng || (r && r.lng) || 69.25;
    L.marker([lat, lng]).addTo(markerLayer)
      .bindPopup(`<b>${esc(titleOf(item))}</b><br>${esc(priceText(item))}`)
      .on('click', () => openDetail(item.id));
  });

  qs('map-count').textContent = list.length + ' ' + t('countSuffix');
  setTimeout(() => map.invalidateSize(), 50);
}

/* ---------- Tafsilot ---------- */
function openDetail(id) {
  const item = allListings().find((x) => x.id === id);
  if (!item) return;
  const p = photoStyle(item.id);
  const r = regionById(item.region);
  const lat = item.lat || (r && r.lat) || 41.3;
  const lng = item.lng || (r && r.lng) || 69.25;
  const fav = getSaved().includes(item.id);

  qs('detail-content').innerHTML = `
    <div class="detail-photo" style="background:${p.bg}">${p.icon}</div>
    <div class="detail-price">${esc(priceText(item))}</div>
    <div class="detail-title">${esc(titleOf(item))}</div>
    <div class="detail-meta">${esc(regionName(item.region))} · ${esc(item.type === 'daily' ? t('daily') : t('long'))}</div>

    <div class="detail-grid">
      <div class="detail-cell"><b>${esc(item.rooms)}</b><span>${esc(t('rooms'))}</span></div>
      <div class="detail-cell"><b>${esc(item.area)}</b><span>m²</span></div>
      <div class="detail-cell"><b>${esc(item.floor || '—')}</b><span>${esc(t('floor'))}</span></div>
    </div>

    ${descOf(item) ? `<div class="detail-section"><h4>${esc(t('descTitle'))}</h4><p>${esc(descOf(item))}</p></div>` : ''}

    <div class="detail-section">
      <h4>${esc(t('contactTitle'))}</h4>
      <div class="btn-row">
        <a class="btn btn-primary" href="tel:${esc(String(item.phone).replace(/\s/g, ''))}">${esc(t('call'))}</a>
        ${item.tg ? `<a class="btn btn-tg" href="https://t.me/${esc(encodeURIComponent(String(item.tg).replace(/^@/, '').replace(/[^A-Za-z0-9_]/g, '')))}" target="_blank" rel="noopener">${esc(t('telegram'))}</a>` : ''}
      </div>
      <div class="btn-row">
        <button type="button" class="btn btn-secondary" data-action="fav" data-id="${esc(item.id)}">${fav ? '♥' : '♡'}</button>
        <a class="btn btn-secondary" href="https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}" target="_blank" rel="noopener">${esc(t('onMap'))}</a>
      </div>
    </div>
  `;
  qs('modal-detail').classList.add('open');
}

/* ---------- Saqlash ---------- */
function toggleFav(id) {
  const saved = getSaved();
  const i = saved.indexOf(id);
  if (i >= 0) { saved.splice(i, 1); showToast(t('unsaved')); }
  else { saved.push(id); showToast(t('saved')); }
  writeJson(SAVED_KEY, saved);
  renderAll();
  if (qs('modal-detail').classList.contains('open')) openDetail(id);
}

/* ---------- Navigatsiya ---------- */
function showView(name) {
  document.querySelectorAll('.view').forEach((v) => v.classList.remove('active'));
  qs('view-' + name).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach((b) => b.classList.toggle('active', b.dataset.view === name));
  qs('appbar').classList.toggle('compact', name !== 'home');
  state.view = name;
  window.scrollTo(0, 0);
  if (name === 'map') renderMap();
  if (name === 'saved') renderSaved();
}

/* ---------- E'lon qo'shish ---------- */
function setErr(id, msg) {
  const input = qs(id);
  const err = qs('err-' + id);
  if (input) input.classList.toggle('invalid', Boolean(msg));
  if (err) err.textContent = msg || '';
}

function handleAdd(e) {
  e.preventDefault();
  let ok = true;
  ['a-title', 'a-region', 'a-price', 'a-phone'].forEach((id) => setErr(id, ''));

  if (!qs('a-title').value.trim()) { setErr('a-title', t('errTitle')); ok = false; }
  if (!qs('a-region').value) { setErr('a-region', t('errRegion')); ok = false; }
  if (!qs('a-price').value || Number(qs('a-price').value) <= 0) { setErr('a-price', t('errPrice')); ok = false; }
  const phone = qs('a-phone').value.trim();
  if (phone.replace(/\D/g, '').length < 9) { setErr('a-phone', t('errPhone')); ok = false; }
  if (!ok) return;

  const r = regionById(qs('a-region').value);
  const mine = getMine();
  mine.unshift({
    id: 'm' + Date.now(),
    title: qs('a-title').value.trim(),
    region: qs('a-region').value,
    type: qs('a-type').value,
    rooms: Number(qs('a-rooms').value),
    price: Number(qs('a-price').value),
    area: 50,
    floor: '—',
    phone: phone,
    tg: qs('a-tg').value.trim().replace('@', ''),
    desc: qs('a-desc').value.trim(),
    lat: r ? r.lat + (Math.random() - 0.5) * 0.04 : 41.3,
    lng: r ? r.lng + (Math.random() - 0.5) * 0.04 : 69.25,
  });
  writeJson(MINE_KEY, mine);
  qs('add-form').reset();
  showToast(t('published'));
  state.type = 'all'; state.region = ''; state.rooms = ''; state.price = ''; state.query = '';
  buildTabs(); buildFilters();
  renderAll();
  showView('home');
}

/* ---------- Ishga tushirish ---------- */
function init() {
  state.lang = readJson(LANG_KEY, 'uz') === 'ru' ? 'ru' : 'uz';
  applyLang();

  qs('lang-btn').addEventListener('click', toggleLang);

  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });

  qs('type-tabs').addEventListener('click', (e) => {
    const b = e.target.closest('[data-type]');
    if (!b) return;
    state.type = b.dataset.type;
    buildTabs();
    renderAll();
  });

  qs('f-region').addEventListener('change', (e) => { state.region = e.target.value; renderAll(); });
  qs('f-rooms').addEventListener('change', (e) => { state.rooms = e.target.value; renderAll(); });
  qs('f-price').addEventListener('change', (e) => { state.price = e.target.value; renderAll(); });

  qs('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    state.query = qs('search-input').value;
    renderHome();
    showView('home');
  });

  qs('add-form').addEventListener('submit', handleAdd);
  ['a-title', 'a-region', 'a-price', 'a-phone'].forEach((id) => {
    qs(id).addEventListener('input', () => setErr(id, ''));
    qs(id).addEventListener('change', () => setErr(id, ''));
  });

  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', () => btn.closest('.modal').classList.remove('open'));
  });
  document.querySelectorAll('.modal').forEach((m) => {
    m.addEventListener('click', (e) => { if (e.target === m) m.classList.remove('open'); });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.modal.open').forEach((m) => m.classList.remove('open'));
  });

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    if (el.dataset.action === 'fav') { e.stopPropagation(); toggleFav(el.dataset.id); return; }
    if (el.dataset.action === 'open') openDetail(el.dataset.id);
  });
}

document.addEventListener('DOMContentLoaded', init);
