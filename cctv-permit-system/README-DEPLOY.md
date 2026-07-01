# CCTV Permit System - Panduan Deploy

## Local Development

### Install & Run
```bash
npm install
cp .env.example .env
# Edit .env dengan MongoDB credentials
npm start
```

Akses: http://localhost:3000/landing.html

## Deploy ke Vercel

### Step 1: Siapkan Repository di GitHub

1. Buat akun GitHub (jika belum): https://github.com
2. Buat repository baru: `cctv-permit-system`
3. Copy HTTPS URL repo

### Step 2: Push ke GitHub

Di folder project, buka Command Prompt:

```bash
git init
git add .
git commit -m "Initial commit: CCTV Permit System with MongoDB"
git branch -M main
git remote add origin https://github.com/USERNAME/cctv-permit-system.git
git push -u origin main
```

### Step 3: Setup Vercel

1. Buka: https://vercel.com
2. Klik "Sign Up" (gunakan GitHub account)
3. Authorize Vercel untuk akses GitHub
4. Klik "Import Project"
5. Paste GitHub repo URL atau pilih dari list
6. Framework: **Node.js**
7. Root Directory: `.`

### Step 4: Environment Variables di Vercel

Di Vercel dashboard, buka project settings:

1. Tab **Environment Variables**
2. Tambah variable:
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://cctvadmin:12345@cluster0.ubpnwpf.mongodb.net/cctv_system?appName=Cluster0`
3. Klik "Save"

### Step 5: Deploy

1. Klik tombol **Deploy**
2. Tunggu proses build (5-10 menit)
3. Jika berhasil, akan dapat URL: `https://cctv-permit-system-xxx.vercel.app`

### Step 6: Test

Buka di browser:
```
https://cctv-permit-system-xxx.vercel.app/landing.html
```

---

## Troubleshooting

**Build failed?**
- Cek logs di Vercel dashboard
- Pastikan package.json dan server.js benar

**Database tidak connect?**
- Verifikasi MONGODB_URI di Environment Variables
- Pastikan IP Whitelist di MongoDB Atlas

**Data tidak tersimpan?**
- Cek MongoDB Atlas cluster status
- Verifikasi credentials benar

---

## Catatan Penting

- Jangan commit `.env` ke GitHub
- Selalu gunakan `.env.example` sebagai template
- MongoDB credentials dijaga di Vercel Environment Variables
- Data tersimpan di MongoDB Atlas (permanent)
