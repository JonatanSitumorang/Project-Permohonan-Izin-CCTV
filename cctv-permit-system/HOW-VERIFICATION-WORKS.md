# ✅ Cara Kerja Sistem Verifikasi TR

Penjelasan detail tentang bagaimana sistem verifikasi bekerja dalam CCTV Permit System.

## 🎯 Ringkas Cepat

**Verifikasi TR adalah proses dimana Receptionist/SPV TR meninjau pengajuan yang masuk dan membuat keputusan:**

```
Pengajuan Masuk → TR Review → Terima / Tolak / Eskalasi
```

## 📊 Alur Verifikasi Lengkap

```
┌──────────────────┐
│  Tenant Input    │
│  Form Pengajuan  │
└────────┬─────────┘
         │
         ▼
    ┌────────────┐
    │  Generate  │
    │ Ref Number │
    │ (Otomatis) │
    └────┬───────┘
         │
         ▼
  ┌─────────────────┐
  │  Status=Pending │◄──── MASUK KE QUEUE VERIFIKASI
  └────────┬────────┘
           │
           ▼
 ┌──────────────────────────┐
 │   TR Buka Submissions    │
 │   (submissions.html)     │
 └────────┬─────────────────┘
          │
          ▼
 ┌──────────────────────────┐
 │  TR Klik Icon EDIT       │
 │  (Buka Modal Verifikasi) │
 └────────┬─────────────────┘
          │
    ┌─────┴──────┬──────────┬──────────┐
    │            │          │          │
    ▼            ▼          ▼          ▼
  ✅Terima    ❌Tolak    ⬆️Eskalasi   Batal
    │            │          │          │
    │            │          │          │
    ▼            ▼          ▼          ▼
 Verified    Rejected   Escalated   Pending
    │            │          │          │
    ▼            ▼          ▼          ▼
 Simpan     Simpan      Simpan      Tidak
 Status     Status      Status      berubah
    │            │          │          │
    ▼            ▼          ▼          ▼
Update     Update      Update      Update
Table &    Table &     Table &     Table
Stats      Stats       Stats       Stats
```

## 📋 5 Status yang Tersedia

### 1️⃣ **PENDING** (Menunggu Verifikasi) ⏳
- **Warna**: Kuning
- **Icon**: ⏳ Hourglass
- **Arti**: Pengajuan baru masuk, menunggu TR review
- **Kapan terjadi**: Setelah form disubmit
- **Durasi**: Menunggu hingga TR action

### 2️⃣ **VERIFIED** (Terverifikasi TR) ✅
- **Warna**: Biru
- **Icon**: ✅ Check Circle
- **Arti**: Pengajuan sudah diverifikasi dan diterima oleh TR
- **Kapan terjadi**: Saat TR klik "Terima & Verifikasi"
- **Lanjutan**: Ke proses Disposisi IT

### 3️⃣ **REJECTED** (Ditolak) ❌
- **Warna**: Merah
- **Icon**: ❌ Times Circle
- **Arti**: Pengajuan ditolak oleh TR
- **Kapan terjadi**: Saat TR klik "Tolak Pengajuan"
- **Lanjutan**: Berhenti di sini (perlu buat pengajuan baru)

### 4️⃣ **ESCALATED** (Eskalasi ke OM) ⬆️
- **Warna**: Orange
- **Icon**: ⬆️ Arrow Up
- **Arti**: Pengajuan perlu eskalasi ke Operational Manager
- **Kapan terjadi**: Saat TR klik "Eskalasi ke OM"
- **Lanjutan**: Menunggu keputusan OM

### 5️⃣ **APPROVED** (Disetujui) 👍
- **Warna**: Hijau
- **Icon**: 👍 Thumbs Up
- **Arti**: Pengajuan final disetujui
- **Kapan terjadi**: Setelah semua proses selesai
- **Lanjutan**: Video siap diserah ke IT

## 🔧 Step-by-Step Verifikasi

### UNTUK RECEPTIONIST/SPV TR:

#### Step 1: Akses Dashboard Verifikasi
```
1. Buka file: submissions.html di browser
2. Lihat halaman "Riwayat Pengajuan"
3. Lihat statistik card (Total, Pending, Verified, Approved)
4. Lihat tabel daftar pengajuan
```

#### Step 2: Temukan Pengajuan yang Perlu Diverifikasi
```
Di tabel, cari kolom "Status" yang bernilai:
• "Menunggu Verifikasi" ⏳ = Belum di-action
• "Terverifikasi TR" ✅ = Sudah verified
• "Ditolak" ❌ = Sudah rejected
• "Eskalasi ke OM" ⬆️ = Sudah escalated

Prioritas: Perhatikan yang Pending terlebih dahulu
```

#### Step 3: Review Detail Pengajuan (Opsional)
```
Untuk melihat detail lengkap:
1. Klik icon MATA (👁️) di kolom Aksi
2. Modal detail terbuka
3. Baca semua informasi pemohon
4. Tutup modal (klik X atau area di luar)

Ini untuk riset sebelum decide
```

#### Step 4: Buka Modal Verifikasi
```
1. Klik icon EDIT (✏️) di kolom Aksi (sebelah ikon mata)
2. Modal "Verifikasi Pengajuan - TR" terbuka
3. Lihat nomor referensi & nama pemohon
4. Lihat status saat ini
```

#### Step 5: Review Kriteria
```
Sebelum putuskan, periksa:

✓ NAMA PEMOHON
  • Valid dan lengkap
  • Tidak ada karakter aneh

✓ DATA DEPARTEMEN
  • Sesuai struktur organisasi
  • Departemen yang valid

✓ LOKASI PEMASANGAN
  • Spesifik (bukan hanya "Building A")
  • Jelas area yang dimaksud
  • Sesuai kebijakan pemasangan

✓ TUJUAN PEMASANGAN
  • Sesuai kategori pilihan
  • Jelas dan masuk akal

✓ TELEPON & EMAIL
  • Format valid
  • Bisa dihubungi untuk follow-up

✓ TIDAK ADA DUPLIKASI
  • Cek di riwayat pengajuan
  • Jangan double-submit
```

#### Step 6: Ambil Keputusan
```
Pilih SATU dari 3 opsi:

A) KLIK "✅ Terima & Verifikasi"
   └─ Jika: Pengajuan valid dan lengkap
   └─ Hasil: Status = Terverifikasi TR
   └─ Next: Lanjut ke Disposisi IT

B) KLIK "❌ Tolak Pengajuan"
   └─ Jika: Ada data invalid atau tidak sesuai
   └─ Hasil: Status = Ditolak
   └─ Next: Berhenti di sini

C) KLIK "⬆️ Eskalasi ke Operational Manager"
   └─ Jika: Butuh approval dari level atas
   └─ Hasil: Status = Eskalasi ke OM
   └─ Next: Menunggu keputusan OM
```

#### Step 7: Verifikasi Selesai
```
Setelah klik button action:
1. Modal otomatis tertutup
2. Tabel di-refresh otomatis
3. Status kolom berubah
4. Statistik card update otomatis
5. Alert success muncul
```

## 💡 Contoh Skenario Nyata

### 📌 SKENARIO 1: Pengajuan Valid → Terima

```
SITUASI:
Pengajuan masuk dari Budi (Dept. Security)
Lokasi: Building A, Floor 3, Room 301 (Spesifik ✓)
Tujuan: Keamanan Gedung (Valid ✓)
Data lengkap ✓

KEPUTUSAN TR: Terima & Verifikasi
PROSES:
1. Klik icon EDIT
2. Modal terbuka
3. Review: Semua OK ✓
4. Klik "✅ Terima & Verifikasi"
5. Status berubah → "Terverifikasi TR"

HASIL:
✓ Pengajuan CCTV-2026-03521 accepted
✓ Lanjut ke Disposisi IT
✓ Budi bisa lihat status update
✓ Statistik: Pending -1, Verified +1
```

### 📌 SKENARIO 2: Data Kurang Jelas → Tolak

```
SITUASI:
Pengajuan masuk dari Andi (Dept. Finance)
Lokasi: "Building area" (Tidak spesifik ✗)
Tujuan: Monitoring (Kurang detail ✗)
Data kurang clear ✗

KEPUTUSAN TR: Tolak
PROSES:
1. Klik icon EDIT
2. Modal terbuka
3. Review: Lokasi tidak spesifik ✗
4. Klik "❌ Tolak Pengajuan"
5. Status berubah → "Ditolak"

HASIL:
✗ Pengajuan CCTV-2026-03522 rejected
✗ Proses berhenti
✓ Andi perlu buat pengajuan baru
✓ Statistik: Pending -1, tapi tidak tambah verified
```

### 📌 SKENARIO 3: Butuh Approval Atas → Eskalasi

```
SITUASI:
Pengajuan masuk dari Rini (Dept. HR)
Lokasi: Sensitive Area (Butuh approval atas ✓)
Data valid tapi lokasi spesial ✓
Perlu decision dari management ⬆️

KEPUTUSAN TR: Eskalasi
PROSES:
1. Klik icon EDIT
2. Modal terbuka
3. Review: Data OK tapi lokasi sensitive
4. Klik "⬆️ Eskalasi ke Operational Manager"
5. Status berubah → "Eskalasi ke OM"

HASIL:
↔️ Pengajuan CCTV-2026-03523 escalated
↔️ Menunggu keputusan OM
✓ OM akan review & putuskan
✓ Statistik: Pending -1, Escalated +1
```

## 🔄 Data yang Tersimpan

Setiap kali status diubah, sistem mencatat:

```json
{
  "refNumber": "CCTV-2026-03521",
  "nama": "Budi Santoso",
  "departemen": "Security",
  "lokasi": "Building A, Floor 3, Room 301",
  "tujuan": "keamanan",
  "telepon": "+62-812-3456-7890",
  "email": "budi@company.com",
  "catatan": "Urgent security matter",
  
  // Informasi verifikasi:
  "status": "verified",
  "verifiedAt": "7/1/2026, 2:30:45 PM",
  "verifiedBy": "SPV TR",
  "timestamp": "7/1/2026, 12:30:45 PM"
}
```

## 📊 Real-time Dashboard Updates

Setiap perubahan status, statistik otomatis update:

```
SEBELUM VERIFIKASI:
┌─────────────────────┐
│ Total: 3            │
│ Pending: 3 ⏳       │
│ Verified: 0 ✅      │
│ Approved: 0 👍      │
└─────────────────────┘

SETELAH 1 TERVERIFIKASI:
┌─────────────────────┐
│ Total: 3            │
│ Pending: 2 ⏳       │
│ Verified: 1 ✅      │ ← +1
│ Approved: 0 👍      │
└─────────────────────┘
```

## ⚡ Shortcut & Tips

**Verifikasi Cepat:**
- Lihat tabel saja untuk field utama
- Klik edit langsung untuk decide (skip detail modal)
- Batch verify jika pengajuan mirip

**Verifikasi Detail:**
- Klik detail modal dulu untuk riset
- Lalu klik edit untuk action
- Lebih teliti untuk pengajuan kompleks

**Best Practice:**
- Check pending setiap hari
- Set target clear pending < 24 jam
- Buat catatan untuk rejected (untuk improvement)
- Koordinasi dengan IT untuk verified cases

## 🚨 Error Handling

**Jika modal tidak muncul:**
- Pastikan sudah klik icon EDIT (bukan MATA)
- Refresh page dan try lagi
- Check browser console (F12)

**Jika status tidak berubah:**
- Pastikan sudah klik button action (bukan area lain)
- Refresh page
- Check localStorage aktif (tidak private mode)

**Jika statistik tidak update:**
- Refresh page (F5)
- Clear cache (Ctrl+Shift+Del)
- Try browser lain

## 🔗 Related Files

- `index.html` - Form input awal
- `submissions.html` - Dashboard verifikasi (MAIN FILE)
- `process-flow.html` - Alur proses keseluruhan
- `VERIFICATION-SYSTEM.md` - Dokumentasi detail

## 📞 Frequently Asked

**Q: Berapa lama biasanya verifikasi?**
A: Tergantung volume, tapi target 1x24 jam

**Q: Bisa undo verifikasi yang salah?**
A: Bisa, klik edit lagi dan ubah ke status yang benar

**Q: Apa bedanya Verified vs Approved?**
A: Verified = TR OK | Approved = Final OK setelah semua proses

**Q: Kalau eskalasi, siapa yang putuskan?**
A: Operational Manager (OM) akan review & putuskan

**Q: Bisa batch action?**
A: Saat ini per-item (bisa ditambah fitur batch di future)

---

**Status**: Active Documentation  
**Last Updated**: July 2026  
**Version**: 1.0.0
