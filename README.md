# IjaraGo

O'zbekiston bo'ylab kvartira ijarasi — demo versiya.

**Jonli sayt:** https://aslbek3.github.io/ijarago/

## Nima qiladi

Kunlik va uzoq muddatli ijara e'lonlari. Hudud, xona soni va narx
bo'yicha qidirish, xaritada ko'rish, uy egasi bilan telefon yoki
Telegram orqali bog'lanish.

## Imkoniyatlar

- **Ikki til** — o'zbekcha va ruscha, bitta tugma bilan almashadi
- **Filtrlar** — ijara turi, hudud (8 ta), xona soni, narx oralig'i
- **Interaktiv xarita** — Leaflet + OpenStreetMap, belgi bosilsa e'lon ochiladi
- **Saqlangan e'lonlar** — ♡ tugmasi, brauzer xotirasida
- **E'lon berish** — forma to'ldirib, o'z e'loningizni qo'shish
- **Aloqa** — telefon qo'ng'irog'i va Telegram havolasi

## Tarkibi

| Fayl | Tavsif |
|---|---|
| `public/index.html` | Barcha ekranlar |
| `public/css/style.css` | Dizayn tizimi (`:root` tokenlari) |
| `public/js/main.js` | i18n, filtrlar, xarita, e'lonlar |

Backend yo'q — sof statik sayt. E'lonlar va saqlanganlar
`localStorage`da, faqat shu brauzerda.

Dizayn UstaTop bilan bir xil tizimda, faqat brend rangi yashil
(`#17634f`) — batafsil: `ustatop/DESIGN.md`.

## Mahalliy ishga tushirish

```bash
cd public
python -m http.server 8000
```

## Deploy

```bash
git subtree push --prefix public origin gh-pages
```

## Backend (server/)

PocketBase v0.40.5 uchun fayllar tayyor: jadvallar (migratsiya), server qoidalari (hook),
o'rnatish skripti, nginx va systemd sozlamalari. Port **8091**, boshqa loyihalarga tegmaydi.

> **Holati:** yozilgan, lekin serverda ishga tushirib **sinalmagan**; frontend hali API'ga ulanmagan
> (hozircha `localStorage`). O'rnatish va muammolar: [`server/README.md`](server/README.md).

## Holati

Demo. Keyingi bosqich — haqiqiy baza (e'lonlar hamma foydalanuvchiga
ko'rinishi), akkauntlar va e'lonlarni tekshirish.
