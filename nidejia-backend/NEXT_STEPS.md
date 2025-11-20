# 🎉 Deployment Berhasil! Langkah Selanjutnya

Deployment backend Laravel ke Railway sudah berhasil! Sekarang kita perlu setup environment variables dan integrasikan dengan frontend.

## 📋 Checklist Setup

### ✅ Selesai
- [x] Deploy backend ke Railway
- [x] Build berhasil

### 🔄 Yang Perlu Dilakukan

## Langkah 1: Generate Domain Public (Railway)

Agar frontend bisa akses backend, kita perlu generate domain public:

1. **Di Railway Dashboard**, klik service backend Anda
2. Klik tab **Settings** (di atas)
3. Scroll ke bagian **Networking** atau **Generate Domain**
4. Klik **"Generate Domain"** atau **"Generate Public URL"**
5. Copy domain yang diberikan (contoh: `nidejia-backend.up.railway.app`)
6. **Simpan URL ini!** Kita akan pakai untuk environment variables

**Contoh domain:** `https://nidejia-backend-production.up.railway.app`

## Langkah 2: Setup Environment Variables di Railway

1. **Di Railway Dashboard**, klik service backend
2. Klik tab **Variables** (di atas)
3. Klik **"New Variable"** atau **"Add Variable"**
4. Tambahkan variables berikut satu per satu:

### 2.1. Generate APP_KEY

Jalankan di lokal (command prompt/PowerShell):
```bash
cd nidejia-backend
php artisan key:generate --show
```

Copy output yang dimulai dengan `base64:` (contoh: `base64:abc123xyz...`)

Tambahkan di Railway:
- **Key**: `APP_KEY`
- **Value**: `base64:...` (paste hasil dari command di atas)

### 2.2. Tambahkan Environment Variables Lain

Tambahkan satu per satu:

**1. APP_NAME**
- **Key**: `APP_NAME`
- **Value**: `Nidejia`

**2. APP_ENV**
- **Key**: `APP_ENV`
- **Value**: `production`

**3. APP_DEBUG**
- **Key**: `APP_DEBUG`
- **Value**: `false`

**4. APP_URL**
- **Key**: `APP_URL`
- **Value**: `https://YOUR-BACKEND-URL.railway.app` (gunakan domain dari Langkah 1)

**5. FRONTEND_URL**
- **Key**: `FRONTEND_URL`
- **Value**: `https://nidejia-enhanced.vercel.app`

**6. DB_CONNECTION**
- **Key**: `DB_CONNECTION`
- **Value**: `sqlite`

**7. DB_DATABASE**
- **Key**: `DB_DATABASE`
- **Value**: `/app/database/database.sqlite`

**8. SANCTUM_STATEFUL_DOMAINS**
- **Key**: `SANCTUM_STATEFUL_DOMAINS`
- **Value**: `nidejia-enhanced.vercel.app`

**9. SESSION_DOMAIN**
- **Key**: `SESSION_DOMAIN`
- **Value**: `.vercel.app`

### 2.3. Redeploy Setelah Set Variables

Setelah semua variables di-set:
1. Klik tab **Deployments**
2. Klik **Redeploy** pada deployment terbaru
3. Tunggu deployment selesai

## Langkah 3: Test Backend API

Setelah redeploy selesai, test API endpoint:

1. **Buka browser** atau gunakan Postman/curl
2. Test endpoint: `https://YOUR-BACKEND-URL.railway.app/api/listing`
3. Harus return JSON data (jika ada data) atau empty array

**Contoh URL:**
```
https://nidejia-backend-production.up.railway.app/api/listing
```

**Expected Response:**
```json
{
  "success": true,
  "data": [...],
  "message": "..."
}
```

✅ **Jika berhasil**, lanjut ke Langkah 4

❌ **Jika error**, cek:
- Pastikan APP_KEY sudah di-set
- Pastikan domain benar
- Cek logs di Railway untuk error detail

## Langkah 4: Update Environment Variables di Vercel (Frontend)

Sekarang update frontend agar menggunakan backend URL:

1. **Buka Vercel Dashboard**: https://vercel.com/dashboard
2. Pilih project **`nidejia-enhanced`** (frontend)
3. Klik tab **Settings** → **Environment Variables**
4. Tambahkan/update variables berikut:

### 4.1. NEXT_PUBLIC_API_BASE_URL

- **Key**: `NEXT_PUBLIC_API_BASE_URL`
- **Value**: `https://YOUR-BACKEND-URL.railway.app/api`
  - **PENTING**: Harus ada `/api` di akhir!
  - Contoh: `https://nidejia-backend-production.up.railway.app/api`

**Environment**: Pilih **Production**, **Preview**, dan **Development**

### 4.2. NEXTAUTH_URL

- **Key**: `NEXTAUTH_URL`
- **Value**: `https://nidejia-enhanced.vercel.app`

**Environment**: Pilih **Production**, **Preview**, dan **Development**

### 4.3. NEXTAUTH_SECRET

Generate secret key:

**Di PowerShell/Command Prompt:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Atau di terminal lain:
```bash
openssl rand -base64 32
```

- **Key**: `NEXTAUTH_SECRET`
- **Value**: (paste hasil dari command di atas)

**Environment**: Pilih **Production**, **Preview**, dan **Development**

### 4.4. (Optional) NEXT_PUBLIC_STORAGE_BASE_URL

Jika backend serve static files:

- **Key**: `NEXT_PUBLIC_STORAGE_BASE_URL`
- **Value**: `https://YOUR-BACKEND-URL.railway.app/storage`

**Environment**: Pilih **Production**, **Preview**, dan **Development**

### 4.5. Save & Redeploy

1. Klik **Save** untuk setiap variable
2. Setelah semua di-set, Vercel akan auto-redeploy
3. Atau manual: **Deployments** → **Redeploy**

## Langkah 5: Test Integrasi Frontend & Backend

Setelah frontend di-redeploy:

1. **Buka frontend**: https://nidejia-enhanced.vercel.app
2. **Buka Browser Developer Tools** (F12)
3. **Tab Console**: Cek apakah ada error
4. **Tab Network**: Cek apakah API calls menggunakan URL yang benar

### Test Cases:

**Test 1: Fetch Listings**
- Buka halaman **Explore** atau homepage
- Cek Network tab, harus ada request ke: `https://YOUR-BACKEND-URL.railway.app/api/listing`
- Harus return 200 OK

**Test 2: Login/Register**
- Buka halaman **Sign In** atau **Sign Up**
- Coba login/register
- Cek apakah API calls menggunakan backend URL yang benar

**Test 3: Detail Listing**
- Buka detail listing
- Cek apakah data di-fetch dari backend

## Langkah 6: Troubleshooting

### Error: CORS
**Gejala**: Error di console browser: "CORS policy blocked"

**Solusi**:
1. Pastikan `FRONTEND_URL` di Railway = `https://nidejia-enhanced.vercel.app`
2. Pastikan `SANCTUM_STATEFUL_DOMAINS` = `nidejia-enhanced.vercel.app`
3. Redeploy backend setelah update variables

### Error: API 404
**Gejala**: API calls return 404 Not Found

**Solusi**:
1. Pastikan `NEXT_PUBLIC_API_BASE_URL` = `https://.../api` (ada `/api` di akhir)
2. Test backend URL langsung di browser: `https://YOUR-BACKEND-URL.railway.app/api/listing`
3. Pastikan backend sudah deployed dan running

### Error: 500 Internal Server Error
**Gejala**: API return 500 error

**Solusi**:
1. Cek logs di Railway dashboard
2. Pastikan `APP_KEY` sudah di-set
3. Pastikan `APP_DEBUG=false` di production
4. Pastikan database migration sudah jalan

### Error: Authentication Failed
**Gejala**: Login tidak berfungsi

**Solusi**:
1. Pastikan `NEXTAUTH_SECRET` sudah di-set di Vercel
2. Pastikan `NEXTAUTH_URL` = `https://nidejia-enhanced.vercel.app`
3. Pastikan `SANCTUM_STATEFUL_DOMAINS` di backend sudah benar

## ✅ Checklist Final

Sebelum consider selesai, pastikan:

**Backend (Railway):**
- [ ] Domain public sudah di-generate
- [ ] Environment variables sudah di-set (APP_KEY, APP_URL, FRONTEND_URL, dll)
- [ ] Backend sudah di-redeploy setelah set variables
- [ ] API endpoint bisa diakses: `https://.../api/listing`

**Frontend (Vercel):**
- [ ] `NEXT_PUBLIC_API_BASE_URL` sudah di-set
- [ ] `NEXTAUTH_URL` sudah di-set
- [ ] `NEXTAUTH_SECRET` sudah di-set
- [ ] Frontend sudah di-redeploy setelah set variables

**Testing:**
- [ ] Frontend bisa fetch listings dari backend
- [ ] Login/Register berfungsi
- [ ] Tidak ada CORS error
- [ ] Tidak ada error di console

## 🎉 Selesai!

Setelah semua checklist di atas ✅, aplikasi Anda sudah fully integrated dan siap digunakan!

---

**Need Help?**
- Railway logs: Dashboard → Deployments → View Logs
- Vercel logs: Dashboard → Deployments → View Function Logs
- Browser console: F12 → Console tab

