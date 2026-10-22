/// <reference path="../pb_data/types.d.ts" />

// IjaraGo — e'lonlar uchun server qoidalari.
//
// DIQQAT: PocketBase v0.40.5 uchun yozilgan, lekin ISHGA TUSHIRIB SINALMAGAN.
//
// Nima uchun hook: brauzerga ishonib bo'lmaydi. Foydalanuvchi so'rovga
// `status: "approved"` yoki boshqa odamning `owner` id sini qo'shib yuborishi mumkin.
// Shuning uchun ikkalasi ham shu yerda, serverda majburan qo'yiladi.

// Yangi e'lon: egasi = kirgan foydalanuvchi, holati = tasdiqlanishi kutilmoqda.
onRecordCreateRequest((e) => {
  if (!e.hasSuperuserAuth()) {
    e.record.set("owner", e.auth.id);
    e.record.set("status", "pending");
  }
  e.next();
}, "listings");

// Egasi e'lonni tahrirlasa, qayta tasdiqlanishi kerak
// (aks holda tasdiqlangandan keyin matnni spamga almashtirib qo'yish mumkin).
onRecordUpdateRequest((e) => {
  if (!e.hasSuperuserAuth()) {
    e.record.set("status", "pending");
  }
  e.next();
}, "listings");
