# 🔍 Sistem Verifikasi TR - CCTV Permit System

Dokumentasi lengkap tentang bagaimana sistem verifikasi TR (Technical Requirements) bekerja.

## 📊 Overview Sistem Verifikasi

Sistem verifikasi TR adalah proses di mana Receptionist/SPV TR melakukan review terhadap pengajuan yang masuk. Setiap pengajuan bisa berubah statusnya melalui beberapa tahap.

## 🔄 Alur Verifikasi

```
PENGAJUAN MASUK (Pending)
    ↓
TR MELAKUKAN VERIFIKASI
    ├─ ✅ TERIMA → Diverifikasi ✓
    ├─ ❌ TOLAK → Ditolak ✗
    └─ ⬆️ ESKALASI → Ke OM (Operational Manager)
```

## 📋 Status Pengajuan

Setiap pengajuan memiliki status yang bisa berubah sesuai dengan proses verifikasi:

| Status | Icon | Warna | Arti |
|--------|------|-------|------|
| **Pending** | ⏳ | Kuning | Menunggu verifikasi dari TR |
| **Verified** | ✅ | Biru | Sudah diverifikasi oleh TR, akan lanjut ke disposisi |
| **Rejected** | ❌ | Merah | Pengajuan ditolak oleh TR |
| **Escalated** | ⬆️ | Orange | Perlu eskalasi ke Operational Manager |
| **Approved** | 👍 | Hijau | Pengajuan disetujui final |

## 🎯 Proses Verifikasi Detail

### 1. PENGAJUAN MASUK (Status: Pending)
```
Tenant mengisi form → Nomor referensi auto-generate → Status = Pending
Waktu: 5-15 menit
```

**Apa yang Receptionist lihat:**
- Pengajuan baru masuk dengan status "Menunggu Verifikasi"
- Di submissions.html, ada tombol edit (icon pensil)
- Klik tombol edit untuk buka modal verifikasi

### 2. RECEPTIONIST/SPV TR MEMBUKA MODAL VERIFIKASI

Di halaman `submissions.html`:
```
1. Lihat tabel pengajuan
2. Cari pengajuan yang ingin diverifikasi
3. Klik icon EDIT (pensil) di kolom Aksi
4. Modal verifikasi terbuka
```

### 3. MEMILIH TINDAKAN VERIFIKASI

Modal menampilkan 3 pilihan tindakan:

#### ✅ TERIMA & VERIFIKASI
```
Kapan dipilih:
• Pengajuan sudah benar dan lengkap
• Lokasi CCTV sesuai prosedur
• Semua data valid
• Tidak ada masalah

Hasil:
• Status berubah menjadi "Terverifikasi TR"
• Lanjut ke proses Disposisi IT
• Pemohon bisa lihat status update
```

#### ❌ TOLAK PENGAJUAN
```
Kapan dipilih:
• Data tidak lengkap atau tidak sesuai
• Lokasi CCTV tidak diijinkan
• Ada ketidaksesuaian prosedur
• Alasan teknis lainnya

Hasil:
• Status berubah menjadi "Ditolak"
• Pengajuan berhenti di sini
• Pemohon perlu buat pengajuan baru (jika ingin)
• Bisa hubungi TR untuk klarifikasi
```

#### ⬆️ ESKALASI KE OM
```
Kapan dipilih:
• Pengajuan penting atau urgent
• Memerlukan keputusan manajemen
• Situasi spesial atau exception
• Butuh approval lebih tinggi

Hasil:
• Status berubah menjadi "Eskalasi ke OM"
• OM akan review dan memutuskan
• Bisa di-approve atau di-tolak oleh OM
• Masih bisa di-verify tanpa eskalasi
```

## 💾 Data Verifikasi yang Tersimpan

Setiap kali status diubah, sistem otomatis menyimpan:

```json
{
  "refNumber": "CCTV-2026-03521",
  "nama": "Budi Santoso",
  "status": "verified",
  "verifiedAt": "7/1/2026, 2:30:45 PM",
  "verifiedBy": "SPV TR",
  "timestamp": "7/1/2026, 12:30:45"
}
```

## 📊 Dashboard Updates Otomatis

Setelah verifikasi, dashboard statistik otomatis update:

```
Sebelum:
• Total: 1
• Menunggu: 1
• Terverifikasi: 0
• Disetujui: 0

Sesudah (jika di-terima):
• Total: 1
• Menunggu: 0
• Terverifikasi: 1
• Disetujui: 0
```

## 🔧 Cara Menggunakan Sistem Verifikasi

### Step-by-Step untuk TR/Receptionist:

**Step 1: Buka Dashboard**
```
1. Buka submissions.html
2. Lihat tabel "Daftar Pengajuan"
3. Lihat status di kolom "Status"
```

**Step 2: Temukan Pengajuan untuk Diverifikasi**
```
1. Cari pengajuan dengan status "Menunggu Verifikasi"
2. Baca data di kolom: Ref, Nama, Departemen, Lokasi
3. Klik icon mata untuk lihat detail lengkap (opsional)
```

**Step 3: Buka Modal Verifikasi**
```
1. Klik icon EDIT (pensil) di kolom Aksi
2. Modal verifikasi terbuka
3. Lihat detail pengajuan
```

**Step 4: Review Pengajuan**
```
Periksa:
• ✓ Nama pemohon valid
• ✓ Departemen sesuai organisasi
• ✓ Lokasi spesifik dan jelas
• ✓ Tujuan sesuai kebijakan
• ✓ Telepon & email valid
• ✓ Tidak ada duplikasi
```

**Step 5: Ambil Keputusan**
```
Pilih salah satu:
A) Klik "Terima & Verifikasi" → Status = Verified
B) Klik "Tolak Pengajuan" → Status = Rejected
C) Klik "Eskalasi ke OM" → Status = Escalated
```

**Step 6: Lihat Perubahan Status**
```
1. Modal tertutup
2. Tabel otomatis update
3. Status di kolom berubah
4. Statistik card update otomatis
```

## 📱 Tampilan di Interface

### Dashboard Submissions (Status Columns):

```
┌─────────────────────────────────────────────────────────────────────┐
│ No. Ref | Nama | Dept | Lokasi | STATUS | Tanggal | Aksi           │
├─────────────────────────────────────────────────────────────────────┤
│ CCTV... │ Budi │ Sec  │ Bld A  │ ⏳ Menunggu │ 7/1/26 │ 👁️ Edit      │
│ CCTV... │ Andi │ Fin  │ Bld B  │ ✅ Terverifikasi │ 7/1/26 │ 👁️ Edit      │
│ CCTV... │ Rini │ HR   │ Bld C  │ ❌ Ditolak │ 7/1/26 │ 👁️ Edit      │
└─────────────────────────────────────────────────────────────────────┘
```

### Modal Verifikasi:

```
┌─────────────────────────────────────────────────────┐
│ ✓ Verifikasi Pengajuan - TR                    [X]  │
├─────────────────────────────────────────────────────┤
│ No. Referensi: CCTV-2026-03521                      │
│ Nama Pemohon: Budi Santoso                          │
│ Status Saat Ini: Menunggu Verifikasi                │
│                                                     │
│ [✅ Terima & Verifikasi]                            │
│ [❌ Tolak Pengajuan]                                │
│ [⬆️ Eskalasi ke Operational Manager]               │
│                                                     │
│ [Batal]                                             │
└─────────────────────────────────────────────────────┘
```

## 🔐 Keamanan & Validasi

**Verifikasi saat ini:**
- ✅ Status berubah otomatis
- ✅ Data tersimpan di localStorage
- ✅ Timestamp otomatis
- ✅ Siapa yang verifikasi tercatat

**Untuk Production, tambahkan:**
- [ ] User authentication (siapa yang verify)
- [ ] Permission checking (hanya TR yang bisa verify)
- [ ] Audit log (tracking semua perubahan)
- [ ] Verification reason/notes
- [ ] Email notification ke pemohon

## 📈 Statistik & Reporting

Dashboard otomatis menghitung:

```
Total Pengajuan = Pending + Verified + Rejected + Escalated + Approved

Metrik yang ditampilkan:
• Total Pengajuan: Semua status
• Menunggu Verifikasi: Status = Pending
• Terverifikasi: Status = Verified
• Disetujui: Status = Approved
```

## ⚡ Tips Penggunaan

### Untuk TR/Receptionist:
1. **Verifikasi rutin** - Check pending status setiap hari
2. **Update cepat** - Jangan biarkan pending terlalu lama
3. **Catatan detail** - Lihat detail sebelum verifikasi
4. **Konsisten** - Gunakan kriteria yang sama untuk semua

### Untuk Admin:
1. **Monitor progress** - Lihat statistik setiap hari
2. **Target achievement** - Coba clear pending < 24 jam
3. **Feedback** - Beri tahu TR jika ada pola penolakan
4. **Improve process** - Analisa untuk optimasi

## 🔗 Integrasi dengan Proses Lain

Setelah verifikasi TR:

```
Verified → Ke Disposisi IT
           → Tim IT mulai processing
           → Ekstraksi & serah video

Rejected → Stop di sini
         → Informasikan ke pemohon
         → Tidak ada proses lebih lanjut

Escalated → Ke OM (Operational Manager)
          → OM review & putuskan
          → Bisa approve atau reject
          → Lanjut ke disposisi jika approve
```

## 🎓 Skenario Penggunaan

### Skenario 1: Verifikasi Normal
```
1. Pengajuan CCTV-2026-03521 masuk dari Budi (Security)
2. TR buka modal verifikasi
3. Review: Lokasi jelas, data lengkap, tidak ada masalah
4. Klik "Terima & Verifikasi"
5. Status berubah ke "Terverifikasi TR"
6. Lanjut ke proses Disposisi IT
```

### Skenario 2: Pengajuan Ditolak
```
1. Pengajuan CCTV-2026-03522 masuk dari Andi (Finance)
2. TR buka modal verifikasi
3. Review: Lokasi tidak spesifik, kurang detail
4. Klik "Tolak Pengajuan"
5. Status berubah ke "Ditolak"
6. Andi bisa buat pengajuan baru dengan data lebih baik
```

### Skenario 3: Eskalasi ke OM
```
1. Pengajuan CCTV-2026-03523 masuk dari Rini (HR)
2. TR buka modal verifikasi
3. Review: Data OK, tapi lokasi spesial/sensitive
4. Klik "Eskalasi ke OM"
5. Status berubah ke "Eskalasi ke OM"
6. OM akan review & memutuskan approve/reject
```

## 🚀 Future Improvements

Fitur yang bisa ditambahkan:

- [ ] Add verification notes/comments
- [ ] Send email notification to applicant
- [ ] Assign to specific TR staff
- [ ] Set reminder for pending > 24 hours
- [ ] Create verification report/dashboard
- [ ] Track verification time metrics
- [ ] Bulk verification actions
- [ ] Approval workflow dengan multiple levels
- [ ] Integration dengan approval system

## 📞 Troubleshooting

**Problem: Status tidak berubah**
- Clear browser cache
- Refresh page
- Check browser console (F12)

**Problem: Modal tidak muncul**
- Pastikan sudah klik icon edit (bukan mata)
- Refresh page
- Try browser lain

**Problem: Data tidak tersimpan**
- Check localStorage aktif
- Tidak dalam private/incognito mode
- Sudah click button action

---

## 📖 Hubungan dengan File Lain

- **index.html** - Form input pengajuan awal
- **submissions.html** - Dashboard verifikasi (file ini)
- **process-flow.html** - Visualisasi alur keseluruhan

---

**Version:** 1.0.0  
**Last Updated:** July 2026  
**Status:** Active Documentation
