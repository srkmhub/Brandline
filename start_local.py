#!/usr/bin/env python3
import http.server
import os
import socketserver
import webbrowser

PORT = 3000
PUBLIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public")
os.chdir(PUBLIC_DIR)

Handler = http.server.SimpleHTTPRequestHandler
print("=" * 68)
print(f"  Brandline (Team Nalanda) running at: http://localhost:{PORT}")
print("=" * 68)
try:
    webbrowser.open(f"http://localhost:{PORT}")
except Exception:
    pass

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    httpd.serve_forever()
