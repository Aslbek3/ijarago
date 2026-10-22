#!/usr/bin/env bash
# IjaraGo — PocketBase o'rnatish (Ubuntu 22.04, amd64)
# Ishlatish:  sudo bash server/setup.sh
#
# Xavfsiz: boshqa loyihalarga tegmaydi. Faqat o'z papkasi, o'z porti (8091)
# va o'z systemd xizmatini (ijarago-pb) yaratadi. Port band bo'lsa to'xtaydi.
set -euo pipefail

APP_DIR="${APP_DIR:-/root/projects/ijarago}"
PB_DIR="$APP_DIR/pb"
PORT=8091
SERVICE=ijarago-pb
PB_VERSION=0.40.5            # QOTIRILGAN versiya — PocketBase hali 0.x, avtomatik yangilamang

echo "==> 1/6  Port ${PORT} bo'shligini tekshirish"
if [ -n "$(ss -ltnH "sport = :${PORT}" 2>/dev/null)" ]; then
  echo "XATO: ${PORT}-port band. Boshqa loyiha ishlatayotgan bo'lishi mumkin — hech narsa o'zgartirilmadi." >&2
  exit 1
fi

echo "==> 2/6  Kerakli paketlar"
apt-get update -qq
apt-get install -y -qq curl unzip >/dev/null

echo "==> 3/6  PocketBase ${PB_VERSION} ni yuklab olish va tekshirish"
mkdir -p "$PB_DIR"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
BASE="https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}"
ZIP="pocketbase_${PB_VERSION}_linux_amd64.zip"
curl -fsSL -o "$TMP/$ZIP" "$BASE/$ZIP"
curl -fsSL -o "$TMP/checksums.txt" "$BASE/checksums.txt"
( cd "$TMP" && grep " ${ZIP}\$" checksums.txt | sha256sum -c - )   # nazorat yig'indisi mos kelmasa to'xtaydi
unzip -oq "$TMP/$ZIP" pocketbase -d "$PB_DIR"
chmod +x "$PB_DIR/pocketbase"
echo "$PB_VERSION" > "$PB_DIR/VERSION"

echo "==> 4/6  Migratsiya va hooklarni nusxalash"
mkdir -p "$PB_DIR/pb_migrations" "$PB_DIR/pb_hooks"
cp -r "$APP_DIR/server/pb/pb_migrations/." "$PB_DIR/pb_migrations/"
cp -r "$APP_DIR/server/pb/pb_hooks/."      "$PB_DIR/pb_hooks/"

echo "==> 5/6  systemd xizmati (${SERVICE})"
cp "$APP_DIR/server/pocketbase.service" "/etc/systemd/system/${SERVICE}.service"
systemctl daemon-reload
systemctl enable --now "$SERVICE"

echo "==> 6/6  Tekshiruv"
for i in 1 2 3 4 5 6 7 8 9 10; do
  if curl -fsS "http://127.0.0.1:${PORT}/api/health" >/dev/null 2>&1; then
    echo "    API tirik:"; curl -fsS "http://127.0.0.1:${PORT}/api/health"; echo
    OK=1; break
  fi
  sleep 1
done
if [ "${OK:-0}" != "1" ]; then
  echo "XATO: API javob bermadi. Sababi (migratsiya xatosi bo'lishi mumkin):" >&2
  journalctl -u "$SERVICE" --no-pager -n 30 >&2
  exit 1
fi

cat <<EOF

================================================================
IjaraGo PocketBase ishga tushdi — 127.0.0.1:${PORT}
Ma'lumotlar: ${PB_DIR}/pb_data   (zaxira nusxa shu papkadan olinadi)

KEYINGI QADAMLAR:

1) Admin akkaunt (parolni o'zingiz tanlang, bu skriptga yozilmaydi):
     cd ${PB_DIR} && ./pocketbase superuser upsert EMAIL PAROL

2) Nginx:
     cp ${APP_DIR}/server/nginx-ijarago.conf /etc/nginx/sites-available/ijarago
     ln -sf /etc/nginx/sites-available/ijarago /etc/nginx/sites-enabled/ijarago
     nginx -t && systemctl reload nginx

3) DuckDNS'da ijarago.duckdns.org ni shu server IP'siga yo'naltiring, so'ng:
     certbot --nginx -d ijarago.duckdns.org
================================================================
EOF
