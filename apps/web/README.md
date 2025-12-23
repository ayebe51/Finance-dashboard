# Dashboard Keuangan - FinanceHub

Aplikasi dashboard keuangan modern yang dibangun dengan React, Vite, dan Tailwind CSS.

## Prasyarat Sistem

Sebelum memulai, pastikan PC Anda telah terinstal:

- **Node.js**: Versi 18 atau lebih baru. (Download di [nodejs.org](https://nodejs.org/))
- **npm**: Biasanya sudah terinstal otomatis bersama Node.js.

## Panduan Instalasi (Langkah demi Langkah)

Ikuti langkah-langkah berikut untuk menginstal dan menjalankan aplikasi ini di PC Anda.

### 1. Ekstrak atau Clone Kode Program

Jika Anda memiliki file dalam format ZIP, ekstrak ke folder pilihan Anda (misalnya `C:\Project\finance-dashboard`).

### 2. Buka Terminal

Buka terminal (Command Prompt, PowerShell, atau Terminal di VS Code) dan arahkan ke folder proyek.

```bash
cd path/ke/folder/finance-dashboard/apps/web
```

_Catatan: Pastikan Anda berada di direktori `apps/web` di mana file `package.json` berada._

### 3. Instal Dependensi

Jalankan perintah berikut untuk mengunduh semua pustaka yang dibutuhkan:

```bash
npm install
```

Tunggu hingga proses instalasi selesai.

### 4. Jalankan Aplikasi

Untuk memulai aplikasi dalam mode pengembangan, ketik perintah:

```bash
npm run dev
```

### 5. Buka di Browser

Setelah server berjalan, terminal akan menampilkan alamat lokal, biasanya:
`http://localhost:5173/`

Buka browser (Chrome, Edge, Firefox) dan kunjungi alamat tersebut.

## Fitur Utama

- **Dasbor**: Ringkasan metrik keuangan.
- **Transaksi**: Daftar lengkap riwayat transaksi.
- **Manajemen Kategori**: Tambah dan atur kategori pemasukan/pengeluaran (Sudah diterjemahkan).
- **Panel Notifikasi**: Pemberitahuan terkini tentang tagihan dan laporan.
- **Mode Gelap/Terang**: Tampilan yang responsif dan elegan.

## Penyelesaian Masalah (Troubleshooting)

- **Error "npm not found"**: Pastikan Node.js sudah terinstal dengan benar.
- **Port 5173 sudah digunakan**: Vite akan otomatis beralih ke port lain (misal 5174), perhatikan output di terminal.

Selamat menggunakan FinanceHub!
