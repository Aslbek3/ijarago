# IjaraGo — server (VPS)

Ubuntu 22.04 · nginx + Certbot · PocketBase **v0.40.5** · port **8091**

```
Brauzer ──► nginx (443, SSL)
              ├─ /       ──► public/           statik fayllar
              ├─ /api/   ──► 127.0.0.1:8091    PocketBase API
              └─ /_/     ──► 127.0.0.1:8091    admin paneli
```

PocketBase faqat `127.0.0.1` da tinglaydi. Boshqa loyihalarga (UstaTop — 8090) tegmaydi:
alohida papka (`/root/projects/ijarago/pb`), alohida port, alohida systemd xizmati (`ijarago-pb`).

> ⚠️ **Holati: yozilgan, lekin ishga tushirib SINALMAGAN.**
> `pb_migrations/` va `pb_hooks/` PocketBase hujjatlari bo'yicha yozilgan, sinash uchun
> PocketBase serverda hali ishga tushirilmagan. Birinchi ishga tushishda xato chiqsa —
> pastdagi "Muammo bo'lsa" bo'limiga qarang.

---

## O'rnatish

```bash
cd /root/projects/ijarago
git pull

sudo bash server/setup.sh
```

Skript: port 8091 bo'shligini tekshiradi (band bo'lsa to'xtaydi), PocketBase'ni yuklab
nazorat yig'indisi bilan tekshiradi, migratsiya va hooklarni joylaydi, xizmatni yoqadi,
`/api/health` ni tekshiradi.

Keyin:

```bash
# 1) Admin akkaunt (parolni o'zingiz tanlang)
cd /root/projects/ijarago/pb && ./pocketbase superuser upsert EMAIL PAROL

# 2) Nginx
sudo cp /root/projects/ijarago/server/nginx-ijarago.conf /etc/nginx/sites-available/ijarago
sudo ln -sf /etc/nginx/sites-available/ijarago /etc/nginx/sites-enabled/ijarago
sudo nginx -t && sudo systemctl reload nginx

# 3) DuckDNS'da ijarago.duckdns.org ni server IP'siga yo'naltirib, so'ng SSL:
sudo certbot --nginx -d ijarago.duckdns.org
```

Admin panel: `https://ijarago.duckdns.org/_/`

---

## Jadvallar

### `users` (PocketBase'ning o'z jadvali + 3 maydon)

| Maydon | Turi |
|---|---|
| `phone` | text |
| `telegram` | text |
| `role` | select: `owner` · `realtor` |

Kirish: email + parol. Telefon hozircha oddiy maydon — SMS tasdiqlash qo'shilmagan.

### `listings` (e'lonlar)

| Maydon | Turi | Izoh |
|---|---|---|
| `owner` | relation → users | **serverda qo'yiladi** |
| `title` | text, majburiy | ≤120 belgi |
| `description` | editor | ≤5000 |
| `region` | select, majburiy | 14 ta kalit — `public/js/main.js` `REGIONS` bilan bir xil |
| `district` | text | tuman kaliti (`chilonzor` va h.k.) |
| `type` | select | `daily` · `long` |
| `rooms` | number, majburiy | 1–20, butun |
| `area` | number | m² |
| `floor` | text | `5/9` |
| `price` | number, majburiy | butun, so'm |
| `phone` | text, majburiy | |
| `telegram` | text | |
| `lat` / `lng` | number | O'zbekiston chegarasida |
| `photos` | file, ≤6 ta | JPEG/PNG/WebP, ≤5 MB, thumb 400x300 va 800x600 |
| `status` | select | `pending` · `approved` · `rejected` — **serverda qo'yiladi** |
| `note` | text | moderator izohi |

### API qoidalari

| Amal | Kim |
|---|---|
| Ro'yxat / ko'rish | hamma — faqat `approved`; egasi o'zinikini har doim ko'radi |
| Yaratish | kirgan foydalanuvchi |
| O'zgartirish | faqat egasi |
| O'chirish | faqat egasi |
| Tasdiqlash / rad etish | faqat admin (admin panelda `status` ni o'zgartiradi) |

**Hook** (`pb_hooks/listings.pb.js`): yaratishda `owner` va `status="pending"` serverda majburan
qo'yiladi, egasi tahrirlasa e'lon qayta `pending` bo'ladi. Shunda mijoz so'rovga o'zi `approved`
yoki boshqa odamning `owner` id sini qo'sha olmaydi.

---

## Moderatsiya

Yangi e'lon `pending` holatida tushadi va **hamma ko'rmaydi**. Admin panel → `listings` →
e'londa `status` ni `approved` ga o'zgartiradi.

---

## Muammo bo'lsa

**`setup.sh` oxirida "API javob bermadi":** skript o'zi oxirgi 30 qator logni chiqaradi. Migratsiya
xatosi bo'lsa fayl nomi ko'rinadi. To'liq log:

```bash
journalctl -u ijarago-pb -n 100 --no-pager
```

**Migratsiya ishlamasa:** `pb/pb_migrations/1792000000_ijarago_init.js` ni olib tashlang,
xizmatni qayta ishga tushiring (`systemctl restart ijarago-pb`) va yuqoridagi jadvallarni
admin panelda qo'lda yarating, qoidalarni jadvaldagidek kiriting. Hook alohida fayl —
u ishlayveradi.

**Port band:** skript hech narsa o'zgartirmasdan to'xtaydi. `ss -ltnp | grep 8091` bilan kim
band qilganini ko'ring.

---

## Muhim eslatmalar

**Versiya qotirilgan** (`PB_VERSION` — `setup.sh` ichida). PocketBase hali `0.x`; yangilashdan
oldin zaxira oling va o'zgarishlar ro'yxatini o'qing.

**Zaxira nusxa.** Hamma narsa `pb/pb_data/` ichida:

```bash
mkdir -p /root/backups
echo '0 3 * * * tar -czf /root/backups/ijarago-pb-$(date +\%F).tgz -C /root/projects/ijarago/pb pb_data' | crontab -
```

(Bu `crontab -` mavjud cron vazifalarini **almashtiradi** — boshqa loyihalarning vazifalari bo'lsa,
`crontab -e` bilan qatorni qo'lda qo'shing.)

**Admin panel ochiq.** `/_/` internetdan kirish mumkin. `nginx-ijarago.conf` ichida o'z IP'ingiz
bilan cheklash uchun `allow`/`deny` qatorlari tayyor turibdi.

**Spam.** Nginx API'ga 10 so'rov/soniya chegara qo'yadi, e'lonlar esa tasdiqlanmaguncha ko'rinmaydi.
Bitta foydalanuvchi nechta e'lon qo'sha olishini cheklash hozircha yo'q.

---

## Foydali buyruqlar

```bash
systemctl status ijarago-pb          # holati
systemctl restart ijarago-pb         # qayta ishga tushirish
journalctl -u ijarago-pb -f          # jonli loglar
curl localhost:8091/api/health       # API tirikmi
```
