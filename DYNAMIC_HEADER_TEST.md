# 📱 DİNAMİK HEADER SİSTEMİ - TEST SENARYOSU

## ✅ Sistem Oluşturuldu!

**Kullanılan Teknoloji:**
- `header.html` - İki farklı header görünümü (Genel + Influencer)
- `header.js` - Header yönetim sistemi (Token kontrol, görünüm değişimi, logout)
- Tüm sayfalara entegre edildi: index.html, giris_yap.html, influencer_anasayfa.html

---

## 🧪 TEST ADIMLARI

### TEST 1: Giriş Yapılı Olmayan Durumda (Başlangıç)
**Ne yapmalı:**
1. http://localhost:3000 adresine git (index.html)
2. Tarayıcı DevTools açın (F12)
3. Console sekmesine bak

**Beklenen Sonuç:**
- Header'da **"Giriş Yap"** ve **"Kayıt Ol"** butonları görülmeli ✅
- Console'da: "👤 Genel Header gösteriliyor (Giriş yapılı değil)"
- localStorage'da token yoktur

**Screenshot Örneği:**
```
┌─────────────────────────────────────────────────┐
│  🏠 Logo            Kayıt Ol  |  Giriş Yap     │  ← Genel Header
└─────────────────────────────────────────────────┘
```

---

### TEST 2: Giriş Yap Sayfasına Git
**Ne yapmalı:**
1. "Giriş Yap" butonuna tıkla
2. http://localhost:3000/giris-secim açılmalı
3. Console'a bak

**Beklenen Sonuç:**
- Yine **Genel Header** görülmeli (Giriş yapılmamış çünkü)
- Header'ın yeni header sistemi kullanıyor (dinamik yüklenmiş olmalı)

---

### TEST 3: Başarılı Giriş Yapma
**Ne yapmalı:**
1. Giriş formuna Influencer bilgilerini gir:
   - **Ad Soyad:** Irmak Süvari
   - **Email:** irmak.suvari14@gmail.com
   - **Şifre:** Irmak1234
2. "Giriş Yap" butonuna tıkla
3. Console'a ve header'a bak

**Beklenen Sonuç:**
- ✅ `/influencer-anasayfa` sayfasına yönlendir
- Header **otomatik olarak değişmeli** → Profil (👤) + Çıkış Yap menüsü görülmeli
- Console'da:
  ```
  📦 Header bileşeni yükleniyor...
  ✅ Header HTML yüklendi
  🔍 Header görünümü kontrol ediliyor...
     Token: ✅ VAR
  👥 Influencer Header gösteriliyor: Irmak Süvari
  ✅ Header sistemi hazır
  ```

**Screenshot Örneği:**
```
┌─────────────────────────────────────────────────┐
│  🏠 Logo                              👤 ▼       │  ← Influencer Header
│                                     ├─ Irmak Süvari
│                                     ├─ irmak.suvari14@...
│                                     └─ Çıkış Yap
└─────────────────────────────────────────────────┘
```

---

### TEST 4: Profil Dropdown Menüsü
**Ne yapmalı:**
1. Profil simgesine (👤) tıkla
2. Dropdown menüsün açıldığını gözle

**Beklenen Sonuç:**
- Dropdown menü açılmalı
- Kullanıcı adı ve email görülmeli
- "Çıkış Yap" butonu görülmeli

---

### TEST 5: Çıkış Yapma (Logout)
**Ne yapmalı:**
1. Profil dropdown'unda "Çıkış Yap" butonuna tıkla
2. Console ve header'a bak

**Beklenen Sonuç:**
- Console'da:
  ```
  🔴 Çıkış işlemi başlatılıyor...
  ✅ Çıkış başarılı!
  👤 Genel Header gösteriliyor (Giriş yapılı değil)
  ```
- Ana sayfaya (/) yönlendir
- Header otomatik olarak "Giriş Yap" ve "Kayıt Ol" butonlarına geri döner ✅
- localStorage temizlenir

**Screenshot Örneği:**
```
Çıkış yapıldıktan sonra, ana sayfada yine Genel Header görülmeli:
┌─────────────────────────────────────────────────┐
│  🏠 Logo            Kayıt Ol  |  Giriş Yap     │  ← Geri Genel Header'a
└─────────────────────────────────────────────────┘
```

---

### TEST 6: Token Olmadan Direkt Anasayfaya Gitmek
**Ne yapmalı:**
1. http://localhost:3000/influencer-anasayfa adresine direkt git (login olmadan)
2. Console'a bak

**Beklenen Sonuç:**
- Token yoksa `/giris-secim` yönlendir
- Console'da:
  ```
  🔍 [İnfluencer Anasayfa] Token kontrolü başladı
  ❌ Token bulunamadı, giriş sayfasına yönlendir
  ```

---

### TEST 7: Sayfa Yenilemede Header Durumu Korunsun
**Ne yapmalı:**
1. Giriş yap (Influencer Header görmeli)
2. Sayfayı yenile (F5 veya Ctrl+R)
3. Header'a bak

**Beklenen Sonuç:**
- localStorage'daki token korunur
- Header yeniden yüklenir
- Influencer Header tekrar görülmeli ✅
- Kullanıcı bilgileri geri yüklenir

---

## 🔍 Console Çıktıları Örneği

### Başlangıçta (Token YOK):
```
📦 Header bileşeni yükleniyor...
✅ Header HTML yüklendi
🔍 Header görünümü kontrol ediliyor...
   Token: ❌ YOK
👤 Genel Header gösteriliyor (Giriş yapılı değil)
✅ Header sistemi hazır
```

### Giriş Yaptıktan Sonra:
```
📦 Header bileşeni yükleniyor...
✅ Header HTML yüklendi
🔍 Header görünümü kontrol ediliyor...
   Token: ✅ VAR
👥 Influencer Header gösteriliyor: Irmak Süvari
✅ Header sistemi hazır

🔍 [İnfluencer Anasayfa] Token kontrolü başladı
🔐 Token gönderiliyor /api/verify-token'e
✅ Kullanıcı doğrulandı: Irmak Süvari
```

### Çıkış Yaptıktan Sonra:
```
🔴 Çıkış işlemi başlatılıyor...
POST /api/logout başarılı
localStorage temizleniyor
👤 Genel Header gösteriliyor (Giriş yapılı değil)
→ Ana sayfaya yönlendir
```

---

## 📁 Dosya Yapısı

```
MetVerse Site/
├── index.html                    ← Dinamik header ile güncellendi
├── giris_yap.html               ← Dinamik header ile güncellendi
├── influencer_anasayfa.html      ← Dinamik header ile güncellendi
├── includes/
│   └── header.html               ← YENİ: Header bileşen şablonu
├── js/
│   └── header.js                 ← YENİ: Header yönetim sistemi
└── server.js                      ← Önceki halinde kalırken, /includes/header.html serv ediyor
```

---

## 🎯 Özellikler

✅ **Tek Header Bileşeni**: `includes/header.html` kullanılıyor
✅ **Dinamik Görünüm**: Token'a göre 2 farklı görünüm
✅ **Otomatik Kontrol**: Her sayfa yüklendiğinde token kontrol edilir
✅ **Logout Entegrasyon**: Çıkış yapıldığında header otomatik reset olur
✅ **localStorage Yönetimi**: Token ve user bilgileri localStorage'da saklanır
✅ **Tüm Sayfalarda Kullanılabilir**: index.html, giris_yap.html, influencer_anasayfa.html (ve daha fazlası)
✅ **Mobile Responsive**: Menu toggle ve dropdown mobil cihazlarda çalışır

---

## 🚀 Şundan Sonra Yapılabilecekler

1. **Marka Anasayfası** (marka_anasayfa.html): Aynı header sistemi eklenebilir
2. **Blog, Hakkımızda, vb.**: Tüm sayfalar dinamik header kullanabilir
3. **Refresh Token**: Token süresi dolmadığında tazelenebilir
4. **Session Timeout Uyarısı**: Çıkış yapmadan 5 dakika kala uyarı
5. **Rol Bazlı Header**: Farklı kullanıcı rolleri için farklı header'lar

---

**Sistem Durumu**: 🚀 **HAZIR VE TEST EDİLMEYE HAZIR**

*Son Güncelleme: 15 Aralık 2025*
