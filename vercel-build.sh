#!/bin/bash
mkdir -p .vercel/output/static
mkdir -p .vercel/output/static/ai
cp index.html .vercel/output/static/
cp -r ai/*.html .vercel/output/static/ai/ 2>/dev/null || true
cp -r public/* .vercel/output/static/ 2>/dev/null || true
cat > .vercel/output/config.json <<'CONFIG'
{"version":3,"routes":[{"handle":"filesystem"},{"src":"/(.*)","dest":"/$1"}],"cleanUrls":true}
CONFIG
echo "Static build done"
