# 📱 MetVerse - Influencer & Brand Collaboration Platform

**Proje Durumu:** ✅ **TAM ÇALIŞIR DURUMDA**  
**Son Güncelleme:** 27 Aralık 2025  
**Sunucu:** http://localhost:3000

---

## 🎯 Proje Özeti

MetVerse, influencerler ve markalar arasında işbirliği platformudur. Kullanıcılar kayıt olabilir, profil oluşturabilir, kampanyalar başlatabilir ve işbirliği teklifleri alabilir. Platform tamamen responsive tasarlanmıştır ve modern web teknolojileri kullanılmaktadır.

---

## 🚀 Başlangıç

### Gereksinimler
- Node.js v14 veya üzeri
- npm veya yarn

### Kurulum ve Başlatma

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Sunucuyu başlat
npm start

# 3. Tarayıcıda aç
# http://localhost:3000
```

---

## 📁 Proje Yapısı

```
MetVerse Site/
├── 📄 index.html                    # Ana sayfa
├── 📄 kayit_secim.html              # Kayıt seçim sayfası (Marka/Influencer)
├── 📄 marka_kayit.html              # Marka kayıt formu
├── 📄 influencer_kayit.html         # Influencer kayıt formu
├── 📄 giris_yap.html                # Giriş sayfası
├── 📄 Hakkimizda.html               # Hakkımızda sayfası
├── 📄 iletisim.html                 # İletişim sayfası
├── 📄 blog.html                     # Blog sayfası
├── 📄 isbirlikleri.html             # İşbirlikleri sayfası
├── 📄 Basari_hikayeleri.html        # Başarı hikayeleri
├── 📄 kesfetForMarka.html           # Marka taraması sayfası
├── 📄 kesfetForInf.html             # Influencer taraması sayfası
├── 📄 marka_anasayfa.html           # Marka dashboard
├── 📄 influencer_anasayfa.html      # Influencer dashboard
├── 📄 kampanyalarim.html            # Kampanyadar (Marka)
├── 📄 BasvuruVeteklifler.html       # Başvurular ve teklifler
├── 📄 PremiumBilgilendirme.html    # Premium bilgilendirme
│
├── 🔧 server.js                     # Express.js sunucu (1000+ satır)
├── 📦 package.json                  # NPM yapılandırması
├── 🎨 styles.css                    # Genel stil dosyası
│
├── 📁 data/                         # JSON veritabanı dosyaları
│   ├── influencers.json             # İnfluencer verileri
│   ├── influencers_csv.json         # CSV formatında influencer verileri
│   ├── markalar.json                # Marka verileri
│   ├── markalar_csv.json            # CSV formatında marka verileri
│   ├── kampanyalar.json             # Kampanya verileri
│   ├── iletisim.json                # İletişim form verileri
│   ├── payment-info.json            # Ödeme bilgileri
│   ├── verification-info.json       # Doğrulama bilgileri
│   ├── eşleşmemiş_kampanyalarım.json# Eşleşmemiş kampanyalar
│   ├── inflerinBaşvuruları.json     # Influencer başvuruları
│   ├── yapılan_teklifler.json       # Yapılan teklifler
│   ├── influencer_reputation.json   # Influencer itibar verileri
│   └── marka_trust.json             # Marka güven verileri
│
├── 📁 js/                           # JavaScript dosyaları
│   ├── header.js                    # Header/Navigasyon scripti
│   └── footer.js                    # Footer scripti
│
├── 📁 includes/                     # HTML include dosyaları
│   ├── header.html                  # Header bileşeni
│   └── footer.html                  # Footer bileşeni
│
├── 📁 görseller/                    # İmaj dosyaları
│   ├── anasayfaKayanResimler/       # Carousel görselleri
│   ├── Başarı hikayeleri/           # Başarı hikayeleri görselleri
│   └── Premium kartlar/             # Premium kart görselleri
│
├── 📁 fonts/                        # Font dosyaları
│   └── OFL.txt
│
├── 📁 Metinler/                     # Metin dosyaları
│   └── Başarı Hikayeleri/           # Başarı hikayeleri metinleri
│
└── 📄 Diğer Belge Dosyaları
    ├── IMPLEMENTATION_SUMMARY.md    # Form validasyon özeti
    ├── SETUP_SUMMARY.md             # Backend kurulum özeti
    ├── ROUTING_CHECK_REPORT.md      # Yönlendirme raporu
    ├── TESTING_GUIDE.md             # Test rehberi
    ├── FORM_VALIDATION_GUIDE.md     # Form doğrulama rehberi
    ├── FORM_VALIDATION_REPORT.md    # Form validasyon raporu
    ├── LOGIN_TEST_GUIDE.md          # Giriş testi rehberi
    ├── SECURE_ACCESS_GUIDE.md       # Güvenli erişim rehberi
    └── DYNAMIC_HEADER_TEST.md       # Header test belgeleri
```

---

## 🌐 Ana Sayfalar ve Yönlendirmeler

| URL | Sayfa | Açıklama |
|-----|-------|----------|
| `/` | index.html | Ana sayfa |
| `/kayit-secim` | kayit_secim.html | Kayıt türü seçimi (Marka/Influencer) |
| `/marka-kayit` | marka_kayit.html | Marka kayıt formu |
| `/influencer-kayit` | influencer_kayit.html | Influencer kayıt formu |
| `/giris` | giris_yap.html | Giriş sayfası |
| `/hakkimizda` | Hakkimizda.html | Hakkımızda sayfası |
| `/iletisim` | iletisim.html | İletişim sayfası |
| `/blog` | blog.html | Blog sayfası |
| `/isbirlikleri` | isbirlikleri.html | İşbirlikleri sayfası |
| `/basari-hikayeleri` | Basari_hikayeleri.html | Başarı hikayeleri |
| `/kesfet-marka` | kesfetForMarka.html | Marka araştırma |
| `/kesfet-influencer` | kesfetForInf.html | Influencer araştırma |
| `/marka-dashboard` | marka_anasayfa.html | Marka kontrol paneli |
| `/influencer-dashboard` | influencer_anasayfa.html | Influencer kontrol paneli |
| `/kampanyalarim` | kampanyalarim.html | Kampanya yönetimi |
| `/basvarular-teklifler` | BasvuruVeteklifler.html | Başvurular ve teklifler |
| `/premium` | PremiumBilgilendirme.html | Premium bilgilendirme |

---

## 🔌 API Endpoints

### Authentication & Registration

```javascript
POST /api/kayit
├─ Body: { userType, email, password, passwordConfirm, ...other fields }
├─ Validations:
│  ├─ Email format doğrulaması
│  ├─ Şifre minimum 6 karakter
│  ├─ Şifre eşleşme kontrolü
│  ├─ Zorunlu alanlar kontrolü
│  └─ Email benzersizliği kontrolü
└─ Response: { success: true/false, message, redirectUrl }

POST /api/giris
├─ Body: { email, password }
├─ Validations:
│  ├─ Email ve şifre kontrolü
│  ├─ Şifre bcrypt ile doğrulama
│  └─ JWT token oluşturma
└─ Response: { success: true/false, token, message }

GET /api/verify-token
├─ Headers: { Authorization: 'Bearer token' }
└─ Response: { valid: true/false, user: {...} }
```

### Influencer APIs

```javascript
GET /api/influencers
├─ Query: { limit, page, category, followers_min }
└─ Response: [{ id, name, email, category, followers, ... }]

GET /api/influencers/:id
└─ Response: { id, name, email, category, bio, instagram, ... }

POST /api/influencers/:id/contact
├─ Body: { name, email, message }
└─ Response: { success: true/false, message }
```

### Brand APIs

```javascript
GET /api/markalar
├─ Query: { limit, page, sector }
└─ Response: [{ id, name, email, sector, website, ... }]

GET /api/markalar/:id
└─ Response: { id, name, email, sector, description, ... }

POST /api/markalar/:id/campaign
├─ Body: { title, description, budget, duration }
└─ Response: { success: true/false, campaignId }
```

### Campaign APIs

```javascript
POST /api/kampanya/olustur
├─ Body: { title, description, budget, category, duration }
└─ Response: { success: true/false, campaignId, message }

GET /api/kampanyalar
├─ Query: { markId, limit, page }
└─ Response: [{ id, title, description, budget, ... }]

POST /api/kampanya/:id/basvur
├─ Body: { influencerId, message, proposedBudget }
└─ Response: { success: true/false, message }

POST /api/basvuru/:id/teklif-ver
├─ Body: { proposedBudget, additionalTerms }
└─ Response: { success: true/false, message }
```

### Communication APIs

```javascript
POST /api/iletisim
├─ Body: { name, email, subject, message }
├─ Validations:
│  ├─ Email format kontrolü
│  ├─ Tüm alanların dolu olması
│  └─ Spam kontrolü
└─ Response: { success: true/false, message }

POST /api/mesaj/gonder
├─ Body: { recipientId, message }
└─ Response: { success: true/false, messageId }

GET /api/mesajlar
├─ Query: { limit, page }
└─ Response: [{ id, sender, message, timestamp }]
```

### User Profile APIs

```javascript
GET /api/profil
├─ Headers: { Authorization: 'Bearer token' }
└─ Response: { id, name, email, type, ...profileData }

PUT /api/profil/guncelle
├─ Body: { field, value }
└─ Response: { success: true/false, updatedProfile }

POST /api/profil/fotograf
├─ Body: { file (multipart) }
└─ Response: { success: true/false, photoUrl }
```

---

## ✨ Uygulanmış Özellikler

### 1. **Kayıt ve Kimlik Doğrulama**
- ✅ Influencer kayıt formu (8 alan)
- ✅ Marka kayıt formu (12 alan)
- ✅ Frontend doğrulama (JavaScript)
- ✅ Backend doğrulama (Express.js)
- ✅ Bcrypt şifre şifreleme
- ✅ JWT token tabanlı oturum
- ✅ Email benzersizliği kontrolü

### 2. **Form Doğrulaması**

**Frontend Validasyonlar:**
- Email format: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Telefon format: `/^[0-9\s\-\+\(\)]{10,}$/`
- Şifre minimum 6 karakter
- Şifre eşleşme kontrolü
- Zorunlu alanlar kontrolü
- Türkçe hata mesajları

**Backend Validasyonlar:**
- Tüm frontend kontrolleri tekrar
- Veritabanında email benzersizliği
- Dosya boyutu kontrolleri
- Rate limiting hazırlığı

### 3. **Veri Tabanı Sistemi**

**JSON Tabanlı Veritabanı:**
- `influencers.json` - İnfluencer profilleri
- `markalar.json` - Marka profilleri
- `kampanyalar.json` - Kampanya bilgileri
- `iletisim.json` - İletişim formları
- `inflerinBaşvuruları.json` - Başvurular
- `yapılan_teklifler.json` - Teklif yönetimi
- `influencer_reputation.json` - İtibar puanları
- `marka_trust.json` - Güven puanları

### 4. **Responsive Tasarım**

**Breakpoints:**
```css
Desktop:        1200px+
Tablet:         768px - 1199px
Mobile:         480px - 767px
Small Mobile:   <480px
```

**Features:**
- ✅ Hamburger menü (mobil)
- ✅ Sticky header
- ✅ Flexible grid sistemi
- ✅ Touch-friendly buttons
- ✅ Mobile optimized forms

### 5. **Animasyonlar ve İnteraktivite**

**GSAP Animasyonları:**
- Fade-in scroll animasyonları
- Staggered menu animasyonları
- Hover efektleri
- Button transitions
- Smooth scroll

**CSS Animasyonları:**
- Pulse efekti
- Slide efekti
- Gradient animasyonları
- Transform efektleri

### 6. **Navigasyon Sistemi**

**Header Features:**
- Sticky/fixed positioning
- Dynamic menu binding
- Hamburger menu (mobil)
- Responsive layout
- User session display
- Logout functionality

### 7. **Güvenlik Özellikleri**

- ✅ Bcrypt şifre şifreleme
- ✅ JWT token doğrulaması
- ✅ CORS hazırlığı
- ✅ Input sanitization
- ✅ Email doğrulama
- ✅ Rate limiting hazırlığı

### 8. **Kampanya Yönetimi**

- Kampanya oluşturma
- Kampanya taraması
- Başvuru yönetimi
- Teklif sistemi
- Durum takibi

### 9. **Dashboard Panelleri**

**Marka Dashboard:**
- Kampanya yönetimi
- Başvuru görüntüleme
- Influencer arama
- Profil yönetimi

**Influencer Dashboard:**
- Kampanya taraması
- Başvuru takibi
- Teklif yönetimi
- Profil düzenleme

### 10. **İletişim Sistemi**

- İletişim formu
- Mesajlaşma
- Bildirim sistemi (hazır)
- Email gönderimi (hazır)

---

## 🔐 Güvenlik Yapılandırması

### Şifre Politikası
- Minimum uzunluk: 6 karakter
- Bcrypt hashing (10 salt round)
- Password confirmation doğrulaması

### Token Yönetimi
- JWT ile session yönetimi
- Token expiration: 24 saat (yapılandırılabilir)
- Refresh token mekanizması (hazır)

### Veri Validasyonu
- Frontend input validation
- Backend re-validation
- Dosya upload kontrolleri
- Rate limiting (hazır)

---

## 🎨 Tasarım Sistemi

### Ana Renkler
```css
Primary Dark:       rgb(4, 0, 29)       /* Koyu arka plan */
Accent Gold:        rgb(255, 223, 152)  /* Altın vurgular */
Accent Pink:        rgb(250, 139, 255)  /* Pembe vurgular */
Text Primary:       #fffffffe           /* Ana metin */
Text Secondary:     #B0B0B0             /* İkincil metin */
```

### Typography
```css
Font Family:        'Arial', sans-serif
Heading Sizes:      h1: 2.5rem, h2: 2rem, h3: 1.5rem
Body Text:          1rem
Line Height:        1.6
```

### Spacing
```css
Base Unit:          1rem (16px)
Small:              0.5rem
Medium:             1rem
Large:              2rem
XLarge:             3rem
```

---

## 📊 Veritabanı Şeması

### Influencer Schema
```json
{
  "id": "unique_id",
  "ad": "string",
  "soyad": "string",
  "username": "@string",
  "email": "string",
  "password": "bcrypt_hash",
  "telefon": "string",
  "kategori": "string",
  "takipci_sayisi": "number",
  "instagram": "string",
  "bio": "string",
  "puan": "number (0-5)",
  "basvurular": ["campaign_id"],
  "tamamlanan_kampanyalar": "number",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Brand Schema
```json
{
  "id": "unique_id",
  "sirket_adi": "string",
  "marka_adi": "string",
  "email": "string",
  "password": "bcrypt_hash",
  "telefon": "string",
  "sektor": "string",
  "website": "string",
  "hakkinda": "string",
  "logo": "url",
  "sorumlu_kisi": "string",
  "puan": "number (0-5)",
  "kampanyalar": ["campaign_id"],
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Campaign Schema
```json
{
  "id": "unique_id",
  "marka_id": "string",
  "baslik": "string",
  "aciklama": "string",
  "butce": "number",
  "kategori": "string",
  "sure": "string",
  "basvurular": ["influencer_id"],
  "secilen_influencerler": ["influencer_id"],
  "durum": "string (aktif/tamamlandi/iptal)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

---

## 🧪 Test Edilmiş Senaryolar

### Registration Tests
- ✅ Geçerli Influencer kaydı
- ✅ Geçerli Brand kaydı
- ✅ Email doğrulama hataları
- ✅ Şifre eşleşme hataları
- ✅ Duplicate email tespiti
- ✅ Zorunlu alan kontrolleri

### Form Validation Tests
- ✅ Email format validasyonu
- ✅ Telefon format validasyonu
- ✅ Şifre minimum uzunluk
- ✅ Özel karakterler işleme
- ✅ Türkçe karakterler desteği
- ✅ Boş alan tespiti

### Navigation Tests
- ✅ Header navigasyonu
- ✅ Hamburger menü (mobil)
- ✅ Page routing
- ✅ Button redirects
- ✅ Link aktifleştirme

### Responsive Tests
- ✅ Desktop (1920px)
- ✅ Tablet (768px)
- ✅ Mobile (375px)
- ✅ Small Mobile (320px)
- ✅ Landscape orientation

---

## 🚀 Deployment Hazırlığı

### Production Checklist
- [ ] `.env` dosyası oluştur
  ```
  NODE_ENV=production
  JWT_SECRET=your_strong_secret
  PORT=3000
  ```
- [ ] Bcrypt salt rounds arttır (12+)
- [ ] JWT expiration ayarla
- [ ] CORS yapılandır
- [ ] Rate limiting aktifleştir
- [ ] Email doğrulama aktifleştir
- [ ] Payment integration (hazır)
- [ ] Error logging kur
- [ ] Database backup kur
- [ ] SSL/HTTPS kur

### Server Gereksinimleri
- Node.js v14+
- 512MB+ RAM
- 1GB+ Storage
- Stable internet connection

---

## 📝 Dosya Tanımlamaları

### JavaScript Dosyaları

**server.js (1056 satır)**
- Express.js uygulaması
- API endpoints
- Middleware konfigürasyonu
- Database operations
- Authentication sistemi
- File upload handling
- Error handling

**header.js**
- Header HTML binding
- Navigation menu handling
- Hamburger menu toggle
- Sticky header logic
- User session display
- Dynamic content loading

**footer.js**
- Footer HTML binding
- Social media links
- Legal links
- Dynamic year display
- Mobile optimization

**js/main.js** (my-project klasöründe)
- Counter functionality
- Event handling
- DOM manipulation

### HTML Dosyaları

**index.html** - Ana sayfa
- Hero section
- Features overview
- Testimonials
- Call-to-action buttons
- Video backgrounds
- Responsive grid

**kayit_secim.html** - Kayıt seçim
- Influencer card
- Brand card
- Hover animations
- Navigation integration
- Responsive cards

**marka_kayit.html** - Marka kayıt formu
- Company info section
- Responsible person section
- Contact information
- Form validation
- Error messages
- Success feedback

**influencer_kayit.html** - Influencer kayıt formu
- Personal info section
- Social media info
- Category selection
- Biography field
- Form validation
- Terms acceptance

**giris_yap.html** - Giriş sayfası
- Email field
- Password field
- Remember me checkbox
- Forgot password link
- Social login (hazır)
- Registration link

### CSS Dosyaları

**styles.css** - Ana stil dosyası
- Global styles
- Color variables
- Typography
- Layout utilities
- Responsive breakpoints
- Animation keyframes
- Component styles

---

## 🔄 Development Workflow

### Sunucuyu Başlatma
```bash
npm start
# veya geliştirme modu
npm run dev
```

### File İzleme (Watch Mode)
```bash
# Sunucuyu otomatik yeniden başlat (nodemon kurulu ise)
nodemon server.js
```

### API Testing
```bash
# cURL ile test
curl -X POST http://localhost:3000/api/kayit \
  -H "Content-Type: application/json" \
  -d '{"userType":"influencer", "email":"test@example.com", ...}'

# Postman ile test
# URL: http://localhost:3000/api/kayit
# Method: POST
# Body: Raw JSON
```

### Veri Kontrol
```bash
# data/ klasöründeki JSON dosyaları doğrudan görüntülenebilir
# VS Code's JSON Viewer kullan veya herhangi bir text editor
```

---

## 🐛 Troubleshooting

### "Cannot find module 'express'"
```bash
npm install
npm install express
```

### Port 3000 zaten kullanımda
```bash
# Başka bir port kullan
PORT=3001 npm start

# Veya server.js dosyasında port değiştir
const PORT = 3001;
```

### CORS Hatası
- CORS middleware konfigürasyonu `server.js` satır 30'da
- Access-Control-Allow-Origin ayarla

### JSON Dosyası Korumpu
- `data/` klasörü sil ve yeniden başlat
- `server.js` otomatik olarak JSON dosyalarını yeniden oluşturacak

### Şifre Doğrulama Hatası
- Bcrypt kütüphanesinin yüklü olduğundan emin ol
- `npm install bcrypt`

---

## 📚 Referans Belgeler

| Belge | İçerik |
|-------|--------|
| [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) | Form validasyon sistemi detayları |
| [SETUP_SUMMARY.md](SETUP_SUMMARY.md) | Backend kurulum ve konfigürasyonu |
| [ROUTING_CHECK_REPORT.md](ROUTING_CHECK_REPORT.md) | Tüm yönlendirmeler ve sayfalar |
| [TESTING_GUIDE.md](TESTING_GUIDE.md) | Test senaryoları ve yönergeleri |
| [FORM_VALIDATION_GUIDE.md](FORM_VALIDATION_GUIDE.md) | Form doğrulama kuralları |
| [LOGIN_TEST_GUIDE.md](LOGIN_TEST_GUIDE.md) | Giriş işlevselliği test yönergeleri |
| [SECURE_ACCESS_GUIDE.md](SECURE_ACCESS_GUIDE.md) | Güvenli erişim ve JWT konfigürasyonu |

---

## 📞 İletişim ve Destek

**Proje Sorumlusu:** [İletişim formunu kullan]  
**Bug Raporlama:** iletisim.html sayfasını ziyaret et  
**Feature İsteği:** Başvuru Ve Teklifler sayfasında öner  

---

## 📄 Lisans

Bu proje ISC lisansı altında sunulmuştur.

---

## ✅ Tamamlanan Öğeler (Checklist)

- ✅ Express.js sunucusu kurulu
- ✅ Routing sistemi tamamlandı
- ✅ Form validasyonu (Frontend & Backend)
- ✅ Şifre şifreleme (bcrypt)
- ✅ JWT authentication
- ✅ JSON veritabanı
- ✅ Responsive tasarım
- ✅ Hamburger menü
- ✅ GSAP animasyonları
- ✅ API endpoints
- ✅ Error handling
- ✅ Security validations
- ✅ Email format kontrolleri
- ✅ Telefon format kontrolleri
- ✅ Dashboard panelleri
- ✅ Kampanya sistemi
- ✅ Başvuru yönetimi
- ✅ Teklif sistemi
- ✅ İletişim formu
- ✅ Staggered menu animasyonları
- ✅ Sticky header
- ✅ Türkçe UI
- ✅ Mobile optimization
- ✅ Başarı hikayeleri
- ✅ Blog sayfası
- ✅ İşbirlikleri sayfası
- ✅ Premium bilgilendirme
- ✅ Hakkımızda sayfası

---

## 🎉 Son Notlar

MetVerse platformu tam olarak çalışır durumda ve tüm önemli özellikler uygulanmıştır. Platform:

1. **Tam Functional** - Tüm ana özellikler çalışıyor
2. **Responsive** - Mobil, tablet ve desktop cihazlarında uyumlu
3. **Secure** - Şifre şifreleme ve token doğrulaması var
4. **Scalable** - Yeni özellikler eklemek kolay
5. **Well-Documented** - Tüm API ve özellikler belgelenmiş

Projeyi production'a almak için `Deployment Hazırlığı` bölümünü izle!

---

**Son Güncelleme:** 27 Aralık 2025  
**Durum:** ✅ TAM ÇALIŞIR DURUMDA
