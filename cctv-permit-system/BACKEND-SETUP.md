# Backend Setup untuk CCTV Permit System

## Deskripsi
Sistem ini sekarang menggunakan **Node.js Express Backend** dengan **JSON File Database** untuk menyimpan data pengajuan secara terpusat.

## Keuntungan dengan Backend:
✅ Data tersimpan di server (bukan localStorage)
✅ Semua orang bisa lihat data yang sama
✅ Status verifikasi langsung update untuk semua user
✅ Siap untuk di-deploy ke hosting
✅ Mudah di-backup dan di-export

## Cara Setup

### 1. Install Node.js
Download dari: https://nodejs.org (gunakan LTS version)

### 2. Install Dependencies
Buka terminal/cmd di folder project dan jalankan:
```bash
npm install
```

### 3. Jalankan Server
```bash
npm start
```

Server akan berjalan di: `http://localhost:3000`

Output akan terlihat seperti:
```
Server running at http://localhost:3000
API Endpoints:
  GET  /api/submissions - Get all submissions
  POST /api/submissions - Create new submission
  PUT  /api/submissions/:id - Update submission
  DELETE /api/submissions/:id - Delete submission
  GET  /api/stats - Get statistics
```

### 4. Buka Website
Buka browser dan akses:
```
http://localhost:3000/landing.html
```

## API Endpoints

### Get All Submissions
```
GET /api/submissions
```
Response:
```json
[
  {
    "id": 1234567890,
    "refNumber": "CCTV-2026-00123",
    "nama": "Budi",
    "status": "pending",
    ...
  }
]
```

### Create New Submission
```
POST /api/submissions
Content-Type: application/json

{
  "refNumber": "CCTV-2026-00123",
  "nama": "Budi",
  "email": "budi@gmail.com",
  ...
}
```

### Update Submission Status
```
PUT /api/submissions/1234567890
Content-Type: application/json

{
  "status": "verified"
}
```

### Delete Submission
```
DELETE /api/submissions/1234567890
```

## Database Location
Data disimpan di file: `submissions.json` di folder project

## Deploy ke Hosting

### Opsi 1: Heroku (Gratis dengan batasan)
1. Buat akun di https://www.heroku.com
2. Install Heroku CLI
3. Run:
```bash
heroku login
heroku create nama-app-anda
git push heroku main
```

### Opsi 2: Render (Gratis)
1. Buat akun di https://render.com
2. Connect GitHub repository
3. Deploy dari dashboard

### Opsi 3: Hosting Server Lokal (Untuk kantor)
1. Sewa VPS atau server
2. Install Node.js di server
3. Upload files ke server
4. Run `npm start`

## Troubleshooting

**Error: "Cannot find module 'express'"**
→ Jalankan: `npm install`

**Error: "Port 3000 already in use"**
→ Ubah PORT di server.js atau tutup aplikasi lain yang pakai port 3000

**Data tidak tersimpan**
→ Pastikan folder project bisa di-write. Check permissions.

**"Cannot reach localhost:3000"**
→ Pastikan server sedang running (check console untuk pesan error)

## Notes
- Data disimpan di `submissions.json` (JSON format)
- Bisa di-backup dengan copy file ini
- Bisa di-export dengan buka file di text editor
