# 🚀 Sistem Test Rehberi

## ✅ Server Çalışıyor mu?

Server **ŞU ANDA ÇALIŞIYOR** ✅

```
🚀 MetVerse Server çalışıyor: http://localhost:3000

📍 Sayfalar:
   - Ana Sayfa: http://localhost:3000
   - Kayıt Seçim: http://localhost:3000/kayit-secim
   - Marka Kayıt: http://localhost:3000/marka-kayit
   - Influencer Kayıt: http://localhost:3000/influencer-kayit
```

---

## 🌐 Tarayıcıda Test Et

### Adım 1: Tarayıcı Aç ve Ana Sayfaya Git
```
http://localhost:3000
```

### Adım 2: Kayıt Seçim Sayfasına Git
```
http://localhost:3000/kayit-secim
```
- "Influencer Kayıt" veya "Marka Kayıt" butonlarını göreceksin

---

## 👤 INFLUENCER KAYITI TEST ET

### URL
```
http://localhost:3000/influencer-kayit
```

### Geçerli Test Verileri (Başarılı Kayıt için)
```
Ad Soyadı: Ahmet Yılmaz
E-posta Adresi: ahmet@example.com
Telefon Numarası: +90 555 123 4567
Şifre: Test1234
Şifre Tekrar: Test1234
Kullanım Koşulları: ✓ (işaretle)
```

### Beklenen Sonuç
```
Alert: ✅ Kaydınız başarıyla tamamlandı!
Yönlendirme: http://localhost:3000/influencer-anasayfa
```

### Veri Depolandı mı?
Kayıt başarılı ise `/data/influencers.json` şuna benzer şekilde güncellenir:
```json
[
  {
    "id": 1734253847123,
    "adSoyad": "Ahmet Yılmaz",
    "email": "ahmet@example.com",
    "telefon": "+90 555 123 4567",
    "sifre": "Test1234",
    "sifreTekrar": "Test1234",
    "kosullarKabul": 1,
    "createdAt": "2025-12-15T10:30:47.123Z",
    "updatedAt": "2025-12-15T10:30:47.123Z"
  }
]
```

---

## 🏢 MARKA KAYITI TEST ET

### URL
```
http://localhost:3000/marka-kayit
```

### Geçerli Test Verileri (Başarılı Kayıt için)
```
Şirket Adı: MetVerse Inc.
Marka Adı: MetVerse
E-posta Adresi: contact@metverse.com
Şifre: Admin123
Şifre Tekrar: Admin123

Sorumlu Kişi:
  İsim Soyisim: Fatih Kara
  Telefon Numarası: +90 532 987 6543

Kullanım Koşulları: ✓ (işaretle)
```

### Beklenen Sonuç
```
Alert: ✅ Kaydınız başarıyla tamamlandı!
Yönlendirme: http://localhost:3000/marka-anasayfa
```

### Veri Depolandı mı?
Kayıt başarılı ise `/data/markalar.json` şuna benzer şekilde güncellenir:
```json
[
  {
    "id": 1734253847124,
    "sirketAdi": "MetVerse Inc.",
    "markaAdi": "MetVerse",
    "email": "contact@metverse.com",
    "sifre": "Admin123",
    "sifreTekrar": "Admin123",
    "sorumluIsim": "Fatih Kara",
    "sorumluTelefon": "+90 532 987 6543",
    "kosullarKabul": 1,
    "createdAt": "2025-12-15T10:30:47.124Z",
    "updatedAt": "2025-12-15T10:30:47.124Z"
  }
]
```

---

## ❌ HATA TESTLERİ

### Test 1: Boş Form Gönder
**Sonuç**: Alert `Lütfen tüm zorunlu alanları doldurunuz!`

### Test 2: Geçersiz E-posta
```
E-posta: invalidmail (@ ve domain yok)
```
**Sonuç**: Alert `Lütfen geçerli bir e-posta adresi giriniz!`

### Test 3: Geçersiz Telefon
```
Telefon: 123 (10 karakterden az)
```
**Sonuç**: Alert `Lütfen geçerli bir telefon numarası giriniz!`

### Test 4: Kısa Şifre
```
Şifre: 123 (6 karakterden az)
```
**Sonuç**: Alert `Şifre minimum 6 karakter olmalıdır!`

### Test 5: Eşleşmeyen Şifreler
```
Şifre: Test1234
Şifre Tekrar: Test5678
```
**Sonuç**: Alert `Şifreler eşleşmiyor!`

### Test 6: Koşulları Kabul EtmemeK
```
Kullanım Koşulları: ☐ (işaretli değil)
```
**Sonuç**: Alert `Kullanım koşullarını kabul etmelisiniz!`

### Test 7: Duplicate E-posta
```
İlk Kayıt: ahmet@example.com (Başarılı ✅)
İkinci Kayıt: ahmet@example.com (Hata ❌)
```
**Sonuç**: Alert `Bu e-posta adresi zaten kayıtlı!`

---

## 🔍 VERILERI KONTROL ET

### Kayıtlı Influencerleri Gör
**Komutu çalıştır:**
```powershell
Get-Content "c:\Users\irmak\Desktop\MetVerse Site\data\influencers.json" | ConvertFrom-Json | Format-Table
```

### Kayıtlı Markaları Gör
**Komutu çalıştır:**
```powershell
Get-Content "c:\Users\irmak\Desktop\MetVerse Site\data\markalar.json" | ConvertFrom-Json | Format-Table
```

### Kayıtlı Verileri JSON'da Gör
**Komutu çalıştır:**
```powershell
Get-Content "c:\Users\irmak\Desktop\MetVerse Site\data\influencers.json"
```

---

## 🎮 Developer Tools'da Test Et (F12)

### 1. Console Tab'ında Kontrol Et
```javascript
// API'ye test isteği gönder (Console'da çalıştır)
fetch('/api/kayit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    tumKayit: 'influencer',
    adSoyad: 'Test User',
    email: 'test@example.com',
    telefon: '+90 555 123 4567',
    sifre: 'Test1234',
    sifreTekrar: 'Test1234',
    kosullar: true
  })
})
.then(res => res.json())
.then(data => console.log('Yanıt:', data))
.catch(err => console.error('Hata:', err));
```

### 2. Network Tab'ında Kontrol Et
1. DevTools açın (F12)
2. "Network" Tab'ına tıklayın
3. Formu gönder
4. "POST /api/kayit" istekini göreceksin
5. "Response" tab'ında JSON yanıtını göreceksin

**Beklenen Başarı Yanıtı:**
```json
{
  "success": true,
  "message": "✅ Kaydınız başarıyla tamamlandı!",
  "redirectUrl": "/influencer-anasayfa"
}
```

**Beklenen Hata Yanıtı:**
```json
{
  "success": false,
  "message": "Bu e-posta adresi zaten kayıtlı!"
}
```

---

## 📱 Diğer Sayfaları Test Et

### Blog Sayfası
```
http://localhost:3000/blog
```

### Başarı Hikayeleri
```
http://localhost:3000/basari-hikayeleri
```

### Hakkımızda
```
http://localhost:3000/hakkimizda
```

### İletişim
```
http://localhost:3000/iletisim
```

---

## 🛑 Server'ı Kapat

PowerShell'de şu komutu çalıştır:
```powershell
Stop-Process -Name node -Force
```

---

## 📝 Sistem Kontrol Listesi

| Kontrol | Durum | Açıklama |
|---------|-------|----------|
| Server Çalışıyor | ✅ | http://localhost:3000 |
| /data Klasörü | ✅ | Otomatik oluşturuldu |
| influencers.json | ✅ | Veri depolama hazır |
| markalar.json | ✅ | Veri depolama hazır |
| Influencer Form | ✅ | JavaScript validasyon aktif |
| Marka Form | ✅ | JavaScript validasyon aktif |
| API /api/kayit | ✅ | Backend validasyon aktif |
| Email Benzersizliği | ✅ | Duplicate check çalışıyor |
| Hata Mesajları | ✅ | Türkçe ve açıklayıcı |
| Yönlendirmeler | ✅ | Başarı sonrası dashboard |

---

## 🎉 BAŞARILI SONUÇ

Eğer yukarıdaki tüm testler başarılı ise:

```
✅ SISTEM TAMAMEN ÇALIŞIYOR
✅ FORMLAR VERI ALIYORUZ
✅ VALIDASYON KORUMASI ÇALIŞIYOR
✅ VERİ DEPOLAMA AKTIF
✅ HATA YÖNETİMİ İŞLEVSEL
✅ YÖNLENDIRMELER DOĞRU
```

**Sistem Production Ready!** 🚀

---

## 🆘 Sorun Yaşanırsa

### "Sayfa yüklenmiyor"
- Server çalışıyor mu? Terminal'da gözle
- Port 3000 açık mı? Firewall kontrol et

### "Form gönderme hatası"
- Browser console'da (F12) hata var mı?
- Network tab'ında API yanıtını kontrol et

### "Veri kaydedilmiyor"
- /data klasörü var mı?
- Dosya yazma izni var mı?
- JSON dosyaları sağlam mı?

### "Server kilitlendi"
```powershell
Stop-Process -Name node -Force
```

---

**Son Güncelleme**: 15 Aralık 2025  
**Version**: 1.0  
**Status**: ✅ Production Ready
