/**
 * Brandline — AI Brand Governance & Content Review Engine
 * Team Nalanda (Saanvi Singhal, Divija Goyal, Aarav Gupta, Alapathi Sai Rama Krishna Mani)
 *
 * Zero-dependency Node.js HTTP + REST API Server.
 * Runs immediately with `node server.js` on any laptop without waiting for npm install!
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const DB_FILE = path.join(__dirname, 'data', 'db.json');

// Initialize persistent local JSON store if not present
if (!fs.existsSync(path.dirname(DB_FILE))) {
  fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
}
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({
    service: "Brandline Governance API v1.0",
    team: ["Saanvi Singhal", "Divija Goyal", "Aarav Gupta", "Alapathi Sai Rama Krishna Mani"],
    createdAt: new Date().toISOString(),
    auditLogs: []
  }, null, 2));
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // REST API Endpoints
  if (req.url === '/api/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      status: 'ok',
      engine: 'Brandline Mastra 5-Agent Hybrid Pipeline',
      database: 'Local JSON + PostgreSQL/pgvector Ready',
      timestamp: new Date().toISOString()
    }));
  }

  if (req.url === '/api/audit-log' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const entry = JSON.parse(body || '{}');
        const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
        db.auditLogs.unshift({ ...entry, serverTimestamp: new Date().toISOString() });
        fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ saved: true, totalRecords: db.auditLogs.length }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Serve Static Frontend
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(PUBLIC_DIR, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // SPA Fallback
    const indexFallback = path.join(PUBLIC_DIR, 'index.html');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(indexFallback).pipe(res);
  }
});

server.listen(PORT, () => {
  console.log('====================================================================');
  console.log('  BRANDLINE — AI Brand Governance Engine (Team Nalanda)');
  console.log('  Localhost URL: http://localhost:' + PORT);
  console.log('  Health Check:  http://localhost:' + PORT + '/api/health');
  console.log('====================================================================');
});
