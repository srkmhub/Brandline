# Brandline — AI Brand Governance & Pre-Publish Content Review
**Hackathon Round 1 | Problem Statement by Inkloom AI | Team Nalanda**
- **Saanvi Singhal** — AI Agents & Architecture
- **Divija Goyal** — Research & Validation Lead
- **Aarav Gupta** — Team Lead, Frontend & UX
- **Alapathi Sai Rama Krishna Mani** — Backend, Data & Security

---

## 1. Run Locally on Your Laptop (Zero Mistakes, Zero External Install Required)

### Option A: Using Node.js (Full-Stack Server + API)
```bash
cd brandline-fullstack
node server.js
```
Then open **http://localhost:3000** in your browser.

### Option B: Using Python 3
```bash
cd brandline-fullstack
python3 start_local.py
```
Then open **http://localhost:3000** in your browser.

### Option C: Double-Click Launcher
- **Windows:** Double-click `start_windows.bat`
- **Mac / Linux:** Run `./start_mac_linux.sh`

---

## 2. Publish Live to the Cloud (Free HTTPS URL in 30 Seconds)

### Method 1: Netlify Drop (Fastest — 10 Seconds, No CLI Needed)
1. Go to **https://app.netlify.com/drop**
2. Drag and drop the `public` folder from this project directly into the browser window.
3. Netlify immediately gives you a shareable live HTTPS link (e.g., `https://brandline-nalanda.netlify.app`).

### Method 2: Vercel CLI
```bash
cd brandline-fullstack
npx vercel --prod
```

### Method 3: Render / Railway (Full-Stack Node.js + PostgreSQL/pgvector)
1. Push this `brandline-fullstack` folder to a GitHub repository.
2. Connect the repository on **https://render.com** as a Web Service (`Build Command`: leave blank or `npm install`, `Start Command`: `node server.js`).
3. Run `schema.sql` in your PostgreSQL database to initialize the `pgvector` tables (`brand_guidelines`, `approved_facts`, `submissions`, `audit_logs`).
