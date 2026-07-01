# Panduan Deployment CCTV Permit System

## 🌐 Deployment Lokal

### Opsi 1: Buka Langsung
1. Temukan file `index.html`
2. Double-click untuk membuka di browser default
3. Aplikasi siap digunakan

### Opsi 2: Gunakan Server Lokal (Python)
Jika Python sudah terinstall:

```bash
# Python 3.x
python -m http.server 8000

# atau Python 2.x
python -m SimpleHTTPServer 8000
```

Buka browser: `http://localhost:8000`

### Opsi 3: Gunakan Live Server (VS Code)
1. Install extension "Live Server" di VS Code
2. Klik kanan pada file `index.html`
3. Pilih "Open with Live Server"
4. Server otomatis membuka di browser

### Opsi 4: Gunakan Node.js http-server
```bash
# Install global
npm install -g http-server

# Jalankan
http-server .

# Buka browser: http://localhost:8080
```

## ☁️ Deployment Cloud

### Google Sites (Gratis, Mudah)
1. Buka [Google Sites](https://sites.google.com)
2. Buat site baru
3. Tambahkan halaman dengan embedding HTML
4. Copy-paste code dari `index.html` ke dalam "HTML" widget
5. Publish

**Kelebihan:** Gratis, mudah diakses  
**Kekurangan:** Terbatas untuk embedding kompleks

### GitHub Pages (Gratis)
1. Buat repository baru: `cctv-permit-system`
2. Upload semua file ke repository
3. Buka Settings → Pages
4. Pilih branch `main` dan folder `/root`
5. Save dan tunggu build selesai
6. Akses di: `https://username.github.io/cctv-permit-system`

```bash
# Setup dari terminal
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/cctv-permit-system.git
git push -u origin main
```

### Netlify (Gratis)
1. Buka [Netlify.com](https://netlify.com)
2. Drag & drop folder `cctv-permit-system` atau connect GitHub
3. Deploy otomatis
4. Dapatkan URL gratis: `https://xxxxx.netlify.app`

### Vercel (Gratis)
1. Buka [Vercel.com](https://vercel.com)
2. Buat akun dan login
3. Import project dari GitHub atau upload folder
4. Deploy otomatis
5. Dapatkan URL: `https://xxxxx.vercel.app`

### Shared Hosting (Berbayar)
Jika punya shared hosting (cPanel):
1. Connect via FTP
2. Upload semua file ke folder public_html
3. Akses via domain Anda

## 🔧 Customization Sebelum Deployment

### 1. Ubah Judul & Header
Edit di `index.html` baris 7-14:
```html
<title>Sistem Pengajuan Izin CCTV</title>
```

### 2. Ubah Logo/Brand
Ubah text di header atau tambahkan logo:
```html
<div class="bg-blue-600 p-3 rounded-lg">
    <img src="logo.png" alt="Logo" class="w-8 h-8">
</div>
```

### 3. Sesuaikan Dropdown Tujuan
Edit di `index.html` untuk menambah/hapus opsi:
```html
<select class="...">
    <option value="">Pilih tujuan pemasangan</option>
    <option value="keamanan">Keamanan Gedung</option>
    <!-- Tambah opsi lain di sini -->
</select>
```

### 4. Ubah Warna Tema
Tailwind Colors:
- Blue (default) → Ubah `from-blue-600` ke `from-green-600`, dll
- Atur konsisten di semua file

### 5. Tambahkan Custom CSS
Tambahkan di `<style>` section untuk styling custom

## 📧 Integrasi Email (Backend Required)

Untuk mengirim email otomatis saat pengajuan:

### Opsi A: Menggunakan Formspree.io (Gratis)
1. Ubah form submit handler di `index.html`
2. Ganti localStorage dengan Formspree endpoint

### Opsi B: Menggunakan Backend Service
Buat simple API dengan:
- Node.js + Express
- Python + Flask
- PHP
- Google Cloud Functions

Contoh minimal Node.js:
```javascript
app.post('/api/submit', (req, res) => {
  const data = req.body;
  // Kirim email atau simpan ke database
  sendEmail(data.email, data);
  res.json({ success: true, refNumber: data.refNumber });
});
```

## 🔒 Security Checklist

- [ ] Hapus localStorage dalam production (ganti dengan backend)
- [ ] Tambahkan HTTPS (SSL Certificate)
- [ ] Implementasi CORS jika punya backend terpisah
- [ ] Validasi input di backend
- [ ] Sanitize user input
- [ ] Rate limiting pada API
- [ ] Backup data berkala
- [ ] Monitor dan logging

## 📊 Analytics & Monitoring

### Google Analytics
1. Buat akun Google Analytics
2. Tambahkan tracking code sebelum `</head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Sentry Error Tracking
Tambahkan error monitoring untuk track bugs production.

## 🚀 Performance Tips

1. **Compress Images** - Jika ada gambar, gunakan TinyPNG
2. **Cache Busting** - Add version ke CSS/JS imports
3. **CDN** - Gunakan CDN untuk Tailwind & Font Awesome
4. **Minify** - Minify CSS/JS untuk production

## 📱 Mobile App

Konversi ke mobile app menggunakan:
- **React Native** - Cross-platform
- **Flutter** - Google's framework
- **Capacitor** - Wrapper untuk web app jadi native app

## 🔄 Continuous Deployment

Dengan GitHub Pages atau Netlify:
```bash
git push → otomatis deploy ke production
```

Sangat useful untuk updates otomatis!

## 📞 Troubleshooting Deployment

**Halaman blank setelah deploy?**
- Check console (F12 → Console tab)
- Pastikan semua resource load dengan benar
- Verify URL path dan routing

**CORS Error?**
- Ini terjadi saat backend di domain berbeda
- Configure CORS headers di backend

**Data tidak tersimpan?**
- Pada Netlify/Vercel (serverless), localStorage masih bekerja
- Jika production, integrasikan dengan database

**Slow Performance?**
- Optimize asset size
- Gunakan browser cache
- Consider CDN

## 📈 Scaling untuk Production

Untuk ribuan users:

1. **Database** - PostgreSQL, MongoDB, atau Cloud Firestore
2. **Backend** - Node.js, Python, atau serverless (Firebase)
3. **Frontend** - Deploy ke CDN (CloudFlare, AWS CloudFront)
4. **Authentication** - Firebase Auth, Auth0, atau custom
5. **File Storage** - S3 untuk upload dokumen
6. **Email Service** - SendGrid, Mailgun
7. **Monitoring** - Sentry, DataDog, New Relic

Rekomendasikan architecture:
```
[Users Browser]
         ↓
    [CDN/Cache]
         ↓
   [Web Server]
         ↓
  [Backend API] → [Database] → [Cache]
         ↓
   [File Storage]
```

## 📝 Deployment Checklist

- [ ] Test semua fitur di browser berbeda
- [ ] Test responsiveness di mobile
- [ ] Backup data sebelum deploy
- [ ] Update version number
- [ ] Review code dan security
- [ ] Setup monitoring & logging
- [ ] Create maintenance page
- [ ] Document deployment process
- [ ] Train users tentang sistem
- [ ] Setup support contact

---

**Happy Deploying! 🚀**
