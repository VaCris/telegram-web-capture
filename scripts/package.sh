#!/usr/bin/env bash
# Package a clean release zip: runtime files only, no dev/docs/git weight.
set -euo pipefail

cd "$(dirname "$0")/.."

VERSION=$(python3 -c "import json; print(json.load(open('manifest.json'))['version'])")
OUT="dist/telegram-web-capture-${VERSION}.zip"

mkdir -p dist
rm -f "$OUT"

zip -qr "$OUT" \
  manifest.json \
  _locales \
  content \
  popup \
  icons \
  -x '*.DS_Store'

echo "Built $OUT ($(du -h "$OUT" | cut -f1))"
unzip -l "$OUT" | tail -1
