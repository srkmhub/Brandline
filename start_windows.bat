@echo off
echo Starting Brandline Localhost Server on http://localhost:3000 ...
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  start http://localhost:3000
  node server.js
) else (
  start http://localhost:3000
  python start_local.py
)
pause
