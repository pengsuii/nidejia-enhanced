# Debug Backend Laravel - Error 500

## Masalah yang Terjadi
- API endpoint `/api/listing` mengembalikan error 500 (Internal Server Error)
- Frontend tidak bisa mengambil data listing

## Kemungkinan Penyebab di Backend Laravel

### 1. **APP_KEY Kosong**
```bash
# Di terminal backend
php artisan key:generate
```

### 2. **Database Belum Di-migrate**
```bash
# Di terminal backend
php artisan migrate
```

### 3. **Route API Tidak Ada**
Periksa file `routes/api.php`:
```php
Route::get('/listing', [ListingController::class, 'index']);
```

### 4. **Controller Tidak Ada atau Error**
Buat controller:
```bash
php artisan make:controller Api/ListingController
```

### 5. **Model Listing Tidak Ada**
Buat model:
```bash
php artisan make:model Listing -m
```

### 6. **CORS Issue**
Install dan konfigurasi CORS:
```bash
composer require fruitcake/laravel-cors
```

### 7. **Log Error Detail**
Cek file log:
```bash
tail -f storage/logs/laravel.log
```

## Solusi Sementara (Frontend)
Saya sudah menambahkan fallback mechanism yang akan menggunakan data JSON lokal ketika API error.

## Test API Manual
```bash
# Test dengan curl
curl -X GET "http://127.0.0.1:8000/api/listing" -H "Accept: application/json"

# Atau buka di browser
http://127.0.0.1:8000/api/listing
```

## Langkah Debugging
1. Cek log Laravel: `storage/logs/laravel.log`
2. Pastikan route ada di `routes/api.php`
3. Pastikan controller dan method ada
4. Pastikan model dan migration sudah dibuat
5. Test endpoint secara langsung

