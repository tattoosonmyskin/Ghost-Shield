#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

chmod +x "$ROOT_DIR/install.sh"

python3 -m venv "$ROOT_DIR/.venv"
"$ROOT_DIR/.venv/bin/python" -m pip install --upgrade pip
"$ROOT_DIR/.venv/bin/python" -m pip install fastapi uvicorn

printf '%s\n' \
  "Manual MV3 extension load:" \
  "1. Open chrome://extensions/." \
  "2. Enable Developer mode." \
  "3. Select Load unpacked." \
  "4. Select $ROOT_DIR/extension."

exec "$ROOT_DIR/.venv/bin/python" -m uvicorn backend.server:app --host 127.0.0.1 --port 8000
