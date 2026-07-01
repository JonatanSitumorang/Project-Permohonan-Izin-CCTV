# CCTV Permit System

Sistem pengajuan izin pembukaan CCTV yang modern dan sederhana tanpa login. Aplikasi web ini memudahkan tenant untuk mengajukan permohanan CCTV dengan antarmuka yang user-friendly.

## 📋 Fitur Utama

- ✅ **Formulir Pengajuan Interaktif** - Form yang mudah digunakan dengan validasi input
- 📊 **Dashboard Riwayat** - Pantau semua pengajuan yang telah dibuat
- 🔄 **Alur Proses Lengkap** - Visualisasi flowchart proses pengajuan dari awal hingga akhir
- 💾 **Penyimpanan Lokal** - Data disimpan di browser menggunakan localStorage
- 🎨 **Desain Modern** - UI yang indah dan responsif dengan Tailwind CSS
- 📱 **Mobile Friendly** - Bekerja sempurna di desktop, tablet, dan mobile
- 🖨️ **Cetak Dokumen** - Fitur cetak untuk referensi pengajuan

## 🚀 Cara Memulai

### Persyaratan
- Browser modern (Chrome, Firefox, Safari, Edge)
- Koneksi internet untuk memuat Tailwind CSS dan Font Awesome

### Instalasi
1. Clone atau download folder `cctv-permit-system`
2. Buka file `index.html` di browser
3. Mulai buat pengajuan!

Tidak perlu instalasi server atau dependensi tambahan. Semua berjalan di sisi client.

## 📁 Struktur File

```
cctv-permit-system/
├── index.html           # Halaman utama dengan formulir pengajuan
├── submissions.html     # Dashboard riwayat pengajuan
├── process-flow.html    # Visualisasi alur proses
└── README.md           # Dokumentasi
```

## 🖼️ Halaman-Halaman

### 1. **Formulir Pengajuan** (`index.html`)
- Formulir lengkap untuk pengajuan izin CCTV
- Fields:
  - Nama Pemohon
  - Departemen/Unit
  - Lokasi Pemasangan CCTV
  - Tujuan Pemasangan (dropdown)
  - Nomor Telepon
  - Email
  - Catatan Tambahan
- Tombol submit dan reset
- Modal konfirmasi sukses dengan nomor referensi

### 2. **Riwayat Pengajuan** (`submissions.html`)
- Dashboard yang menampilkan semua pengajuan
- Statistik pengajuan (Total, Menunggu, Terverifikasi, Disetujui)
- Tabel daftar pengajuan dengan sorting waktu
- Modal detail untuk melihat informasi lengkap
- Fitur cetak dokumen pengajuan

### 3. **Alur Proses** (`process-flow.html`)
- Visualisasi flowchart proses
- Penjelasan setiap tahapan:
  1. Isi Formulir - Tenant mengisi form
  2. Verifikasi TR - Review oleh Receptionist
  3. Keputusan Manajemen - Apakah perlu eskalasi?
  4. Disposisi IT - Tim IT menerima info
  5. Serah Video - Penyerahan video final
- Deskripsi peran setiap stakeholder
- Informasi penting tentang proses

## 💾 Penyimpanan Data

Data pengajuan disimpan dalam **localStorage** browser, artinya:
- ✅ Data persisten (tersimpan meskipun browser ditutup)
- ✅ Tidak memerlukan backend server
- ⚠️ Data hanya tersimpan di browser yang digunakan
- ⚠️ Akan hilang jika clear browser cache

Untuk aplikasi production, integrasikan dengan database backend.

## 🎨 Teknologi yang Digunakan

- **Tailwind CSS** - Framework CSS modern untuk styling
- **Font Awesome** - Icon library
- **Vanilla JavaScript** - Tanpa framework, murni JavaScript
- **LocalStorage API** - Untuk penyimpanan data lokal

## 📊 Nomor Referensi

Setiap pengajuan mendapat nomor referensi unik:
```
Format: CCTV-YYYY-##### 
Contoh: CCTV-2026-03521
```

Nomor ini digunakan untuk tracking dan referensi pengajuan.

## 🔐 Keamanan & Privasi

- Tidak ada login, semua pengajuan anonymous
- Data hanya disimpan di browser lokal (tidak dikirim ke server)
- Setiap browser memiliki data terpisah
- Untuk implementasi production, tambahkan:
  - Authentication layer
  - Database backend
  - Enkripsi data
  - HTTPS

## 🚀 Pengembangan Lebih Lanjut

### Fitur yang bisa ditambahkan:
1. **Backend Integration**
   - Buat API untuk menyimpan data ke database
   - Implementasi user authentication
   - Real-time status updates

2. **Email Notifications**
   - Kirim konfirmasi pengajuan via email
   - Notifikasi status perubahan
   - Reminder pengajuan pending

3. **Admin Panel**
   - Dashboard untuk admin melihat semua pengajuan
   - Fitur approve/reject
   - Analytics dan reporting

4. **Advanced Features**
   - Upload dokumen pendukung
   - Timeline tracking real-time
   - Integrasi dengan sistem kalender
   - Reminder via SMS/Email
   - Export data ke PDF/Excel

## 📱 Responsive Design

Aplikasi dirancang responsive untuk:
- 📱 Mobile (< 640px)
- 💻 Tablet (640px - 1024px)
- 🖥️ Desktop (> 1024px)

## 🛠️ Troubleshooting

**Data tidak tersimpan?**
- Pastikan browser memungkinkan localStorage
- Periksa apakah Private/Incognito mode diaktifkan
- Clear cache dan reload page

**Styling tidak tampil dengan benar?**
- Pastikan koneksi internet aktif (untuk Tailwind CDN)
- Try hard refresh (Ctrl+Shift+R atau Cmd+Shift+R)

**Modal tidak menutup?**
- Klik tombol X atau area di luar modal
- Refresh page jika masalah persist

## 📞 Support

Untuk pertanyaan atau bug reports, hubungi Tim IT atau Receptionist.

## 📝 License

Aplikasi ini dibuat untuk keperluan internal. Silakan customise sesuai kebutuhan.

---

**Version:** 1.0.0  
**Last Updated:** Juli 2026  
**Made with ❤️ for better CCTV request management**
