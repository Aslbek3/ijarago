/// <reference path="../pb_data/types.d.ts" />

// IjaraGo — dastlabki jadvallar. PocketBase ishga tushganda bir marta avtomatik bajariladi.
//
// DIQQAT: bu migratsiya PocketBase v0.40.5 uchun yozilgan, lekin ISHGA TUSHIRIB SINALMAGAN.
// Xato bo'lsa PocketBase ishga tushganda fayl nomini ko'rsatib to'xtaydi (journalctl -u ijarago-pb).
// Zaxira yo'l: server/README.md dagi jadvallarni admin panelda qo'lda yarating.

// Frontend (public/js/main.js) dagi REGIONS kalitlari bilan bir xil bo'lishi shart.
const REGIONS = [
  "toshkent-sh", "toshkent-v", "andijon", "buxoro", "fargona", "jizzax", "xorazm",
  "namangan", "navoiy", "qashqadaryo", "qoraqalpogiston", "samarqand", "sirdaryo", "surxondaryo",
];

migrate((app) => {
  // ---- users: IjaraGo uchun qo'shimcha maydonlar ----
  const users = app.findCollectionByNameOrId("users");
  users.fields.add(new TextField({ name: "phone", max: 20 }));
  users.fields.add(new TextField({ name: "telegram", max: 40 }));
  users.fields.add(new SelectField({ name: "role", values: ["owner", "realtor"], maxSelect: 1 }));
  app.save(users);

  // ---- listings: e'lonlar ----
  const listings = new Collection({
    type: "base",
    name: "listings",

    // Faqat tasdiqlangan e'lonlar hammaga ko'rinadi; egasi o'zinikini har doim ko'radi.
    // Admin (superuser) qoidalarni aylanib o'tadi.
    listRule: 'status = "approved" || owner = @request.auth.id',
    viewRule: 'status = "approved" || owner = @request.auth.id',

    // owner va status serverdagi hook (pb_hooks/listings.pb.js) tomonidan qo'yiladi.
    createRule: '@request.auth.id != ""',
    updateRule: 'owner = @request.auth.id && @request.body.owner:isset = false && @request.body.status:isset = false',
    deleteRule: 'owner = @request.auth.id',

    fields: [
      { type: "relation", name: "owner", required: true, collectionId: users.id, maxSelect: 1, cascadeDelete: true },
      { type: "text", name: "title", required: true, max: 120 },
      { type: "editor", name: "description", maxSize: 5000, convertURLs: false },
      { type: "select", name: "region", required: true, maxSelect: 1, values: REGIONS },
      { type: "text", name: "district", max: 40 },
      { type: "select", name: "type", required: true, maxSelect: 1, values: ["daily", "long"] },
      { type: "number", name: "rooms", required: true, min: 1, max: 20, onlyInt: true },
      { type: "number", name: "area", min: 1, max: 5000 },
      { type: "text", name: "floor", max: 10 },
      { type: "number", name: "price", required: true, min: 1, onlyInt: true },
      { type: "text", name: "phone", required: true, max: 20 },
      { type: "text", name: "telegram", max: 40 },
      { type: "number", name: "lat", min: 37, max: 46 },
      { type: "number", name: "lng", min: 55, max: 74 },
      {
        type: "file", name: "photos", maxSelect: 6, maxSize: 5242880,
        mimeTypes: ["image/jpeg", "image/png", "image/webp"],
        thumbs: ["400x300", "800x600"],
      },
      { type: "select", name: "status", required: true, maxSelect: 1, values: ["pending", "approved", "rejected"] },
      { type: "text", name: "note", max: 300 },
      { type: "autodate", name: "created", onCreate: true, onUpdate: false },
      { type: "autodate", name: "updated", onCreate: true, onUpdate: true },
    ],

    indexes: [
      "CREATE INDEX idx_listings_status_region ON listings (status, region)",
      "CREATE INDEX idx_listings_owner ON listings (owner)",
    ],
  });
  app.save(listings);
}, (app) => {
  // ---- orqaga qaytarish ----
  const listings = app.findCollectionByNameOrId("listings");
  app.delete(listings);

  const users = app.findCollectionByNameOrId("users");
  users.fields.removeByName("phone");
  users.fields.removeByName("telegram");
  users.fields.removeByName("role");
  app.save(users);
});
