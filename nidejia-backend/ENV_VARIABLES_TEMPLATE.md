# 🔧 Environment Variables Template untuk Railway

**Backend URL:** `https://nidejia-enhanced-production.up.railway.app`

## Environment Variables di Railway

Copy-paste variables berikut ke Railway Dashboard → Variables:

### 1. APP_KEY
**Key:** `APP_KEY`  
**Value:** (Generate dulu dengan command di bawah)

Generate APP_KEY di lokal:
```bash
cd nidejia-backend
php artisan key:generate --show
```
Copy output yang dimulai dengan `base64:` dan paste sebagai value.

---

### 2. APP_NAME
**Key:** `APP_NAME`  
**Value:** `Nidejia`

---

### 3. APP_ENV
**Key:** `APP_ENV`  
**Value:** `production`

---

### 4. APP_DEBUG
**Key:** `APP_DEBUG`  
**Value:** `false`

---

### 5. APP_URL
**Key:** `APP_URL`  
**Value:** `https://nidejia-enhanced-production.up.railway.app`

---

### 6. FRONTEND_URL
**Key:** `FRONTEND_URL`  
**Value:** `https://nidejia-enhanced.vercel.app`

---

### 7. DB_CONNECTION
**Key:** `DB_CONNECTION`  
**Value:** `sqlite`

---

### 8. DB_DATABASE
**Key:** `DB_DATABASE`  
**Value:** `/app/database/database.sqlite`

---

### 9. SANCTUM_STATEFUL_DOMAINS
**Key:** `SANCTUM_STATEFUL_DOMAINS`  
**Value:** `nidejia-enhanced.vercel.app`

---

### 10. SESSION_DOMAIN
**Key:** `SESSION_DOMAIN`  
**Value:** `.vercel.app`

---

### 11. (Optional) LOG_LEVEL
**Key:** `LOG_LEVEL`  
**Value:** `error`

---

## Environment Variables di Vercel (Frontend)

Copy-paste variables berikut ke Vercel Dashboard → Settings → Environment Variables:

### 1. NEXT_PUBLIC_API_BASE_URL
**Key:** `NEXT_PUBLIC_API_BASE_URL`  
**Value:** `https://nidejia-enhanced-production.up.railway.app/api`  
**⚠️ PENTING:** Harus ada `/api` di akhir!

**Environment:** Production, Preview, Development

---

### 2. NEXTAUTH_URL
**Key:** `NEXTAUTH_URL`  
**Value:** `https://nidejia-enhanced.vercel.app`

**Environment:** Production, Preview, Development

---

### 3. NEXTAUTH_SECRET
**Key:** `NEXTAUTH_SECRET`  
**Value:** (Generate dulu dengan command di bawah)

Generate NEXTAUTH_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
Atau:
```bash
openssl rand -base64 32
```
Copy output dan paste sebagai value.

**Environment:** Production, Preview, Development

---

### 4. (Optional) NEXT_PUBLIC_STORAGE_BASE_URL
**Key:** `NEXT_PUBLIC_STORAGE_BASE_URL`  
**Value:** `https://nidejia-enhanced-production.up.railway.app/storage`

**Environment:** Production, Preview, Development

---

## ✅ Checklist Setup

### Railway (Backend)
- [ ] Generate APP_KEY dan tambahkan ke Railway
- [ ] Tambahkan semua environment variables di atas
- [ ] Redeploy backend setelah set variables
- [ ] Test API: `https://nidejia-enhanced-production.up.railway.app/api/listing`

### Vercel (Frontend)
- [ ] Generate NEXTAUTH_SECRET dan tambahkan ke Vercel
- [ ] Tambahkan `NEXT_PUBLIC_API_BASE_URL` = `https://nidejia-enhanced-production.up.railway.app/api`
- [ ] Tambahkan `NEXTAUTH_URL` = `https://nidejia-enhanced.vercel.app`
- [ ] Redeploy frontend setelah set variables
- [ ] Test frontend: https://nidejia-enhanced.vercel.app

## 🧪 Test API Endpoint

Setelah setup selesai, test endpoint berikut:

### 1. List Listings
```
GET https://nidejia-enhanced-production.up.railway.app/api/listing
```

**Expected:** JSON response dengan data listings

### 2. Health Check
```
GET https://nidejia-enhanced-production.up.railway.app/api/listing
```

**Expected:** 200 OK dengan JSON response

### 3. Detail Listing (jika ada slug)
```
GET https://nidejia-enhanced-production.up.railway.app/api/listing/{slug}
```

**Expected:** JSON response dengan detail listing

