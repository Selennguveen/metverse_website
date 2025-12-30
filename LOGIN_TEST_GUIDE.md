# 🔐 Influencer & Marka Giriş Sistemi - Test Rehberi

## ✅ Sistem Durumu
Server **ŞU ANDA ÇALIŞIYOR** ✅

```
🚀 MetVerse Server: http://localhost:3000
📍 Giriş Sayfası: http://localhost:3000/giris-secim
```

---

## 🚀 Teknoloji Stack

| Bileşen | Teknoloji | Açıklama |
|---------|-----------|----------|
| Frontend | HTML + JavaScript | Fetch API ile asenkron giriş |
| Backend | Node.js + Express.js | /api/influencer-login endpoint |
| Şifre Güvenliği | Bcrypt | Hash'li şifre karşılaştırması |
| Oturum | JWT (JSON Web Token) | 24 saat geçerli token |
| Veri Depolama | localStorage | Browser tarafında token saklama |
| Veritabanı | JSON | /data/influencers.json ve /data/markalar.json |

---

## 👤 INFLUENCER GIRIŞ TEST

### Giriş Sayfası
```
http://localhost:3000/giris-secim
```

### Test Hesapları (Örnek Veriler)

#### Influencer 1: Irmak Süvari
```
Ad Soyad: Irmak Süvari
E-posta: irmak.suvari14@gmail.com
Şifre: Irmak1234
```

#### Influencer 2: Aylin Şeref
```
Ad Soyad: Aylin Şeref
E-posta: aylin.seref@example.com
Şifre: TestInfluencer123
```

#### Influencer 3: Emre Tekin
```
Ad Soyad: Emre Tekin
E-posta: emre.tekin@example.com
Şifre: TestInfluencer123
```

### Başarılı Giriş Akışı

1. **Giriş Sayfasına Git**
   ```
   http://localhost:3000/giris-secim
   ```

2. **"Influencer Olarak Giriş Yap" Kartını Doldur**
   - Ad Soyad VEYA E-posta: `Irmak Süvari` veya `irmak.suvari14@gmail.com`
   - Şifre: `Irmak1234`

3. **"Giriş Yap" Butonuna Tıkla**

4. **Beklenen Sonuç**
   ```
   ✅ Alert: "✅ Giriş başarılı!"
   🔄 Yönlendirme: http://localhost:3000/influencer-anasayfa
   💾 localStorage'da token ve kullanıcı bilgileri kaydedilir
   ```

### Token ve Veri Kontrolü (Browser Console)

F12 tuşu → Console tab'ı:
```javascript
// Token'ı gör
console.log(localStorage.getItem('token'));

// Kullanıcı bilgilerini gör
console.log(JSON.parse(localStorage.getItem('user')));
```

**Beklenen Çıkış:**
```
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

User: {
  id: 1765825018687,
  adSoyad: "Irmak Süvari",
  email: "irmak.suvari14@gmail.com",
  telefon: "+905320590179"
}
```

---

## 🏢 MARKA GIRIŞ TEST

### Test Hesapları (Örnek Veriler)

#### Marka 1: TechVerse
```
Marka Adı: TechVerse
E-posta: contact@techverse.com
Şifre: TechPass123
```

#### Marka 2: DMP Brand
```
Marka Adı: DMP Brand
E-posta: info@dmpbrand.com
Şifre: DMPAdmin456
```

#### Marka 3: CAI Creative
```
Marka Adı: CAI Creative
E-posta: hello@caicreative.com
Şifre: CreativePass789
```

### Başarılı Giriş Akışı

1. **Giriş Sayfasına Git**
   ```
   http://localhost:3000/giris-secim
   ```

2. **"Marka Olarak Giriş Yap" Kartını Doldur**
   - Marka Adı VEYA E-posta: `TechVerse` veya `contact@techverse.com`
   - Şifre: `TechPass123`

3. **"Giriş Yap" Butonuna Tıkla**

4. **Beklenen Sonuç**
   ```
   ✅ Alert: "✅ Giriş başarılı!"
   🔄 Yönlendirme: http://localhost:3000/marka-anasayfa
   💾 localStorage'da token ve kullanıcı bilgileri kaydedilir
   ```

---

## ❌ HATA TESTLERİ

### Test 1: Boş Form Gönder
```
Ad Soyad: (boş)
E-posta: (boş)
Şifre: (boş)
```
**Beklenen Sonuç**: Alert `❌ Lütfen Ad Soyad veya E-posta giriniz!`

### Test 2: Sadece Şifre Boş
```
Ad Soyad: Irmak Süvari
Şifre: (boş)
```
**Beklenen Sonuç**: Alert `❌ Lütfen şifre giriniz!`

### Test 3: Yanlış Ad Soyad/E-posta
```
Ad Soyad: Bilinmeyen Kişi
E-posta: bilinmeyen@example.com
Şifre: Irmak1234
```
**Beklenen Sonuç**: Alert `❌ Girdiğiniz ad soyad veya e-posta ile bir hesap bulunmamaktadır.`

### Test 4: Doğru Hesap, Yanlış Şifre
```
Ad Soyad: Irmak Süvari
E-posta: irmak.suvari14@gmail.com
Şifre: YanlisSifre123
```
**Beklenen Sonuç**: Alert `❌ Yanlış şifre. Lütfen tekrar deneyin.`

### Test 5: Ad Soyad VE E-posta ile Giriş
```
Ad Soyad: Irmak Süvari
E-posta: irmak.suvari14@gmail.com
Şifre: Irmak1234
```
**Beklenen Sonuç**: Her ikisi birlikte geçerli, giriş başarılı ✅

---

## 🔐 Şifre Hashing Sistemi

### Nasıl Çalışır?

1. **Kayıt Sırasında:**
   ```
   Plain Text Şifre: "Irmak1234"
                ↓
   Bcrypt ile Hash'leme (round: 10)
                ↓
   Hash: "$2b$10$KVN7K2.NaMdN5jQrV0VVwO5n8p8QmRcB2X7pNhM0eN1Y6z1J8mGXS"
                ↓
   JSON'a kaydedilir (plain text ASLA kaydedilmez!)
   ```

2. **Giriş Sırasında:**
   ```
   Kullanıcı Şifre: "Irmak1234"
                ↓
   Veritabanındaki Hash: "$2b$10$KVN7K2.NaMdN5jQrV0VVwO..."
                ↓
   bcrypt.compare(kullanıcı_şifre, veritabanı_hash)
                ↓
   Eşleşiyor mu? EVET ✅ / HAYIR ❌
   ```

### Güvenlik Avantajları

- ✅ **One-way Hash**: Hash'ten orijinal şifre çıkarılamaz
- ✅ **Salted Hash**: Her şifre için random salt eklenir
- ✅ **Slow Hash**: Brute force saldırısı yapması yavaş
- ✅ **Plain text asla kaydedilmez**: Veritabanı sızması halinde bile güvenli

---

## 🎫 JWT (JSON Web Token) Sistemi

### Token Yapısı

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6MTc2NTgyNTAxODY4NywiYWRTb3lhZCI6IklyY...
gXaZ7P8K2mL_vC3xJ9zN4qR5s6tU7vW8xY9zM0aP1bQ2cR
```

**Bölümler:**
1. **Header**: `{"alg":"HS256","typ":"JWT"}`
2. **Payload**: `{"id":1765825018687,"adSoyad":"Irmak Süvari"...}`
3. **Signature**: Kriptografik imza (gizli anahtar ile)

### Token Özellikleri

- **Geçerlilik**: 24 saat
- **Saklama Yeri**: localStorage (browser)
- **Kullanım**: Authorization header'ında
- **Kontrol**: Sunucu imzayı verify ediyor

---

## 🔗 API Endpoint Detayları

### POST /api/influencer-login

**Request:**
```json
{
  "adSoyad": "Irmak Süvari",
  "email": "irmak.suvari14@gmail.com",
  "sifre": "Irmak1234"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "✅ Giriş başarılı!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1765825018687,
    "adSoyad": "Irmak Süvari",
    "email": "irmak.suvari14@gmail.com",
    "telefon": "+905320590179"
  },
  "redirectUrl": "/influencer-anasayfa"
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Girdiğiniz ad soyad veya e-posta ile bir hesap bulunmamaktadır."
}
```

---

### POST /api/marka-login

**Request:**
```json
{
  "markaAdi": "TechVerse",
  "email": "contact@techverse.com",
  "sifre": "TechPass123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "✅ Giriş başarılı!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1734253847124,
    "markaAdi": "TechVerse",
    "email": "contact@techverse.com",
    "sirketAdi": "TechVerse Solutions"
  },
  "redirectUrl": "/marka-anasayfa"
}
```

---

## 🔍 Developer Tools İle Test (Network Tab)

### Adımlar

1. **DevTools Aç**: F12
2. **Network Tab**: Network sekmesine tıkla
3. **Giriş Yap**: Form'u doldur ve submit et
4. **API İstekini Gör**: `POST /api/influencer-login` görülecek
5. **Response'u Kontrol Et**:
   - Status: 200 (başarı) veya 401 (hata)
   - Body: JSON response

### Console'da Doğrulama

```javascript
// Token'ı decode et (online jwt.io kullanabilirsin)
const token = localStorage.getItem('token');
console.log('Token:', token);

// Kullanıcı bilgilerini gör
const user = JSON.parse(localStorage.getItem('user'));
console.log('Kullanıcı:', user);

// Token'ı temizle (test için)
localStorage.clear();
```

---

## 📊 Veri Tabanı Yapısı

### /data/influencers.json

```json
{
  "id": 1765825018687,
  "adSoyad": "Irmak Süvari",
  "email": "irmak.suvari14@gmail.com",
  "telefon": "+905320590179",
  "sifre": "$2b$10$KVN7K2.NaMdN5jQrV0VVwO5n8p8QmRcB2X7pNhM0eN1Y6z1J8mGXS",
  "kosullarKabul": 1,
  "createdAt": "2025-12-15T18:56:58.687Z",
  "updatedAt": "2025-12-15T18:56:58.687Z"
}
```

### /data/markalar.json

```json
{
  "id": 1734253847124,
  "sirketAdi": "TechVerse Solutions",
  "markaAdi": "TechVerse",
  "email": "contact@techverse.com",
  "sifre": "$2b$10$9Wdy/YJuQWZeFvjY1Y3leu0KPLVdOPyJxNPK.8.xQj2X1rKOKOxKC",
  "sorumluIsim": "Mehmet Kara",
  "sorumluTelefon": "+90 532 987 6543",
  "kosullarKabul": 1,
  "createdAt": "2025-12-15T10:30:47.124Z",
  "updatedAt": "2025-12-15T10:30:47.124Z"
}
```

---

## 🧪 Hızlı Test Checklist

| Test | Adım | Beklenen Sonuç | ✓ |
|------|------|---|---|
| Influencer Başarılı | Ad Soyad + Şifre doğru | Anasayfaya yönlendir | ◻️ |
| Marka Başarılı | E-posta + Şifre doğru | Anasayfaya yönlendir | ◻️ |
| Token Kaydedildi | localStorage kontrol | Token var | ◻️ |
| Yanlış Şifre | Doğru hesap, yanlış şifre | Hata mesajı | ◻️ |
| Bilinmeyen Hesap | Hatalı ad/email | Hata mesajı | ◻️ |
| Network Log | DevTools Network tab | POST /api/influencer-login | ◻️ |
| JWT Payload | Token'ı jwt.io'da decode et | Kullanıcı ID ve ad var | ◻️ |

---

## 🚀 Sistem Akış Diyagramı

```
┌─────────────────────────────────────┐
│  Giriş Sayfası (giris_yap.html)     │
│  ├─ Influencer Formu                │
│  └─ Marka Formu                     │
└────────────┬────────────────────────┘
             │
             ↓
    ┌────────────────────┐
    │ Form Submit        │
    │ JavaScript Event   │
    └────────┬───────────┘
             │
             ↓
    ┌────────────────────────────────┐
    │ Frontend Validasyon            │
    │ ✓ Ad Soyad/E-posta             │
    │ ✓ Şifre                        │
    └────────┬────────────────────────┘
             │
             ↓
    ┌───────────────────────────────────┐
    │ Fetch POST /api/influencer-login  │
    │ {adSoyad, email, sifre}           │
    └────────┬──────────────────────────┘
             │
             ↓
    ┌──────────────────────────────────┐
    │ Backend (server.js)              │
    │ ├─ Influencer bul (email/name)   │
    │ ├─ bcrypt.compare(şifre, hash)   │
    │ ├─ JWT.sign(token)               │
    │ └─ Response gönder               │
    └────────┬─────────────────────────┘
             │
      Hata Var mı?
      /              \
    EVET             HAYIR
    /                  \
   ↓                    ↓
Alert Göster      localStorage.setItem
("Hata Mesajı")   ├─ token
                  └─ user
                       │
                       ↓
                  Yönlendir
                  /influencer-anasayfa
```

---

## 🛑 Server'ı Kapat

```powershell
Stop-Process -Name node -Force
```

---

## 📝 Özet

✅ **Tamamlanan Özellikler:**
- Two-tier validation (frontend + backend)
- Bcrypt şifre hashing
- JWT token oluşturma
- localStorage'da session yönetimi
- Detaylı error handling
- Turkish mesajlar
- Responsive form tasarımı

✅ **Güvenlik Mimarisi:**
- Plain text şifre ASLA kaydedilmez
- Hash karşılaştırması ile giriş
- 24 saat geçerli JWT token
- Unique hesap kontrolü

✅ **Kullanıcı Deneyimi:**
- Clear error messages
- Automatic redirects
- Form validation before API call
- Stored authentication state

---

**Sistem Durumu**: 🚀 **PRODUCTION READY**

---

*Son Güncelleme: 15 Aralık 2025*
