# 🎨 Customization Guide - CCTV Permit System

Panduan lengkap untuk customize aplikasi sesuai brand dan kebutuhan Anda.

## 🎯 Quick Customizations

### 1. Ubah Warna Tema (5 menit)

#### Opsi A: Ubah dari Blue ke Green
Cari & replace di semua file `.html`:

```
Old: bg-blue-600      → New: bg-green-600
Old: text-blue-600    → New: text-green-600
Old: from-blue-600    → New: from-green-600
Old: to-blue-700      → New: to-green-700
Old: ring-blue-500    → New: ring-green-500
Old: focus:ring-blue  → New: focus:ring-green
```

#### Opsi B: Pilihan Warna Alternatif

| Tema | Primary Color | Kode | File yang diubah |
|------|--------------|------|-----------------|
| Blue | #3B82F6 | `bg-blue-600` | All files |
| Green | #10B981 | `bg-green-600` | All files |
| Purple | #9333EA | `bg-purple-600` | All files |
| Red | #EF4444 | `bg-red-600` | All files |
| Indigo | #4F46E5 | `bg-indigo-600` | All files |

Contoh untuk Purple:
```html
<!-- Before (landing.html line 50) -->
<div class="hero-gradient"> <!-- gradient dari blue -->

<!-- After -->
<div class="bg-gradient-to-br from-purple-600 to-purple-800">
```

### 2. Ubah Logo & Judul (3 menit)

#### Di landing.html:
```html
<!-- Line ~30 -->
<div class="flex items-center gap-2">
    <div class="bg-blue-600 p-3 rounded-lg">
        <i class="fas fa-camera text-white text-2xl"></i>  <!-- Ubah icon -->
    </div>
    <span class="font-bold text-xl text-gray-900">CCTV Permit</span> <!-- Ubah text -->
</div>
```

Ubah ke:
```html
<div class="flex items-center gap-2">
    <img src="your-logo.png" alt="Logo" class="w-10 h-10"> <!-- Tambah logo -->
    <span class="font-bold text-xl text-gray-900">PT. XXX CCTV System</span> <!-- Ubah judul -->
</div>
```

### 3. Ubah Font Size dan Styling

#### Heading H1:
```html
<!-- From -->
<h1 class="text-5xl md:text-6xl font-bold">Izin CCTV Jadi Mudah</h1>

<!-- To (lebih kecil) -->
<h1 class="text-4xl md:text-5xl font-bold">Izin CCTV Jadi Mudah</h1>
```

Size reference:
- `text-xs` = 12px
- `text-sm` = 14px
- `text-base` = 16px
- `text-lg` = 18px
- `text-xl` = 20px
- `text-2xl` = 24px
- `text-3xl` = 30px
- `text-4xl` = 36px
- `text-5xl` = 48px
- `text-6xl` = 60px

## 📝 Form Customizations

### Tambah Field Baru

#### Di index.html, tambahkan di section form:
```html
<!-- Cari section form, contoh setelah Email field -->

<!-- Tambahkan field baru -->
<div>
    <label class="block text-sm font-semibold text-gray-700 mb-2">
        <i class="fas fa-phone text-blue-600 mr-2"></i>Nomor Identitas
    </label>
    <input type="text" placeholder="Masukkan nomor identitas"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        required>
</div>
```

### Ubah Dropdown Options

```html
<!-- Find select element untuk "Tujuan Pemasangan" -->
<select class="...">
    <option value="">Pilih tujuan pemasangan</option>
    <option value="keamanan">Keamanan Gedung</option>
    <option value="monitoring">Monitoring Area Kerja</option>
    <!-- Tambah opsi baru -->
    <option value="evidence">Dokumentasi Bukti</option>
    <option value="forensic">Forensik Investigasi</option>
</select>
```

### Hapus Field yang Tidak Diperlukan

```html
<!-- Cari field "Catatan Tambahan" -->
<!-- Hapus seluruh div ini jika tidak diperlukan -->
<div>
    <label class="block text-sm font-semibold text-gray-700 mb-2">
        <i class="fas fa-sticky-note text-blue-600 mr-2"></i>Catatan Tambahan (Opsional)
    </label>
    <textarea ... ></textarea>
</div>
<!-- Hapus sampai sini -->
```

## 🎨 Styling Customizations

### Ubah Button Style

```html
<!-- From -->
<button type="submit" class="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
    Kirim
</button>

<!-- To - Flat style -->
<button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white">
    Kirim
</button>

<!-- To - Outline style -->
<button type="submit" class="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
    Kirim
</button>
```

### Ubah Card Shadow

```html
<!-- From -->
<div class="bg-white rounded-xl shadow-lg p-8">

<!-- To - Lighter shadow -->
<div class="bg-white rounded-xl shadow p-8">

<!-- To - Heavier shadow -->
<div class="bg-white rounded-xl shadow-2xl p-8">
```

## 📱 Layout Customizations

### Ubah Sidebar Width (submissions.html)

```html
<!-- From - 3 kolom -->
<div class="grid md:grid-cols-3 gap-8">
    <div class="md:col-span-2"> <!-- Form area -->
    <div> <!-- Sidebar -->

<!-- To - Sidebar lebih besar -->
<div class="grid md:grid-cols-4 gap-8">
    <div class="md:col-span-3"> <!-- Form area -->
    <div> <!-- Sidebar lebih lebar -->
```

### Ubah Table Responsiveness

```html
<!-- From -->
<div class="overflow-x-auto">
    <table class="w-full">

<!-- Ubah untuk mobile yang lebih compact -->
<div class="overflow-x-auto text-sm">
    <table class="w-full text-xs">
```

## 🌐 Internationalization (i18n)

### Ubah Bahasa ke Inggris

Buat file baru `landing-en.html` dan ubah semua text:

```html
<!-- From (Indonesian) -->
<h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
    Izin CCTV Jadi Mudah
</h1>

<!-- To (English) -->
<h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
    CCTV Permits Made Easy
</h1>
```

Ubah seluruh content yang perlu:
- Judul
- Deskripsi
- Label form
- Button text
- Messages

## 🔔 Content Customizations

### Ubah Pesan Success

Di `index.html`, cari success modal:
```html
<!-- From -->
<p class="text-center text-gray-600 mb-6">
    Pengajuan Anda telah diterima dan sedang dalam tahap verifikasi. 
    Tim TR akan menghubungi Anda dalam waktu 1x24 jam.
</p>

<!-- To -->
<p class="text-center text-gray-600 mb-6">
    Your CCTV permit application has been successfully submitted.
    Our team will contact you within 24 business hours.
</p>
```

### Ubah Tips & Information

Di `index.html`, sidebar section:
```html
<ul class="space-y-2 text-sm text-gray-700">
    <li class="flex gap-2">
        <span class="text-blue-600 font-bold">•</span>
        <span>Isi semua data dengan jelas dan akurat</span> <!-- Ubah -->
    </li>
</ul>
```

## 🎭 Advanced Customizations

### Tambah Custom CSS

Tambahkan di section `<style>`:

```html
<style>
    /* Custom styles */
    .custom-card {
        @apply bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-600;
    }
    
    .custom-button {
        @apply bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition;
    }
    
    @media (max-width: 640px) {
        .hidden-mobile {
            display: none;
        }
    }
</style>
```

Gunakan di HTML:
```html
<div class="custom-card">
    <!-- Content -->
</div>

<button class="custom-button">Click Me</button>
```

### Ubah Font Family

Di `<head>` section, tambahkan Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">

<style>
    body {
        font-family: 'Poppins', sans-serif;
    }
</style>
```

## 📊 Dashboard Customizations

### Ubah Statistik Cards

Di `submissions.html`:

```html
<!-- Tambah metric baru atau ubah existing -->
<div class="bg-white rounded-lg shadow p-6 fade-in">
    <div class="flex items-center justify-between">
        <div>
            <p class="text-gray-600 text-sm">Metrik Baru</p>
            <p class="text-3xl font-bold text-purple-600" id="newMetric">0</p>
        </div>
        <div class="bg-purple-100 p-3 rounded-lg">
            <i class="fas fa-chart-pie text-purple-600 text-2xl"></i>
        </div>
    </div>
</div>
```

Update JavaScript untuk hitung metrik:
```javascript
// Di loadSubmissions() function
document.getElementById('newMetric').textContent = calculateNewMetric();
```

## 🔒 Production Customizations

### Tambah Logo di Semua Halaman

Buat component header yang reusable. Di setiap file, ubah header:

```html
<!-- Standardized header untuk semua halaman -->
<div class="bg-white shadow-sm py-4">
    <div class="container mx-auto px-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
            <img src="logo.png" alt="Logo" class="h-10">
            <h1 class="text-xl font-bold">Sistem Pengajuan CCTV</h1>
        </div>
        <nav class="flex gap-6">
            <a href="landing.html">Home</a>
            <a href="index.html">Pengajuan</a>
            <a href="submissions.html">Riwayat</a>
            <a href="process-flow.html">Proses</a>
        </nav>
    </div>
</div>
```

### Tambah Footer Standardized

Di setiap halaman HTML, tambahkan di akhir sebelum `</body>`:

```html
<footer class="bg-gray-900 text-gray-300 py-8">
    <div class="container mx-auto px-4">
        <div class="text-center">
            <p>&copy; 2026 PT. XXX - CCTV Permit System. All rights reserved.</p>
            <p class="text-sm mt-2">
                Contact: +62-XXX-XXXX | Email: support@company.com
            </p>
        </div>
    </div>
</footer>
```

## 🚀 Deployment Customizations

### URL Branding

Untuk GitHub Pages:
```
Before: https://username.github.io/cctv-permit-system
After:  https://your-company.com/cctv-permit
```

Update di navigation links:
```html
<!-- Update all internal links -->
<a href="/cctv-permit/index.html">Pengajuan</a>
```

### Favicon Custom

Di `<head>` semua file:
```html
<link rel="icon" type="image/x-icon" href="favicon.ico">
```

## ✅ Customization Checklist

- [ ] Ubah warna tema sesuai brand
- [ ] Tambah logo perusahaan
- [ ] Ubah judul dan deskripsi
- [ ] Sesuaikan form fields dengan kebutuhan
- [ ] Update dropdown options
- [ ] Ubah messages dan tips
- [ ] Add/remove halaman sesuai kebutuhan
- [ ] Update footer dan contact info
- [ ] Test di mobile dan desktop
- [ ] Review spelling dan grammar
- [ ] Setup favicon
- [ ] Siap untuk deployment

## 📚 Resource Links

- Tailwind CSS Colors: https://tailwindcss.com/docs/customizing-colors
- Font Awesome Icons: https://fontawesome.com/icons
- Google Fonts: https://fonts.google.com
- Color Picker: https://htmlcolorcodes.com

## 🆘 Tips Troubleshooting

**Styling tidak berubah setelah edit?**
- Hard refresh browser: Ctrl+Shift+R (Windows) atau Cmd+Shift+R (Mac)
- Clear browser cache
- Tutup dan buka ulang browser

**Form field baru tidak menyimpan data?**
- Update JavaScript localStorage handler
- Pastikan nama field sesuai dengan selector
- Check console (F12) untuk error

**Layout berantakan di mobile?**
- Check responsive breakpoints
- Gunakan DevTools (F12) untuk test
- Pastikan margin/padding konsisten

**Icon tidak tampil?**
- Pastikan Font Awesome CDN loaded
- Check internet connection
- Refresh page

---

**Masih ada pertanyaan? Check README.md atau QUICK-START.md!**
