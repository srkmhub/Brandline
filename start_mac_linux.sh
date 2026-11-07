#!/usr/bin/env bash
echo "Starting Brandline Localhost Server on http://localhost:3000 ..."
if command -v node >/dev/null 2>&1; then
  node server.js
else
  python3 start_local.py
fi
