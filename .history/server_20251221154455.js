const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;
const JWT_SECRET = 'metverse_super_secret_key_2025';

// JSON Database Setup
const dbDir = path.join(__dirname, 'data');
const influencersFile = path.join(dbDir, 'influencers.json');
const influencersCsvFile = path.join(dbDir, 'influencers_csv.json');
const markalarFile = path.join(dbDir, 'markalar.json');
const iletisimFile = path.join(dbDir, 'iletisim.json');
const paymentInfoFile = path.join(dbDir, 'payment-info.json');
const verificationInfoFile = path.join(dbDir, 'verification-info.json');
const eslesmemisKampanyalarFile = path.join(dbDir, 'eşleşmemiş_kampanyalarım.json');
const inflerinBasvuruFile = path.join(dbDir, 'inflerinBaşvuruları.json');
const yapılanTekliflerFile = path.join(dbDir, 'yapılan_teklifler.json');

// Create data directory
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Initialize Database
function initializeDatabase() {
    if (!fs.existsSync(influencersFile)) {
        fs.writeFileSync(influencersFile, JSON.stringify([], null, 2));
    }
    if (!fs.existsSync(markalarFile)) {
        fs.writeFileSync(markalarFile, JSON.stringify([], null, 2));
    }
    if (!fs.existsSync(iletisimFile)) {
        fs.writeFileSync(iletisimFile, JSON.stringify([], null, 2));
    }
    if (!fs.existsSync(paymentInfoFile)) {
        fs.writeFileSync(paymentInfoFile, JSON.stringify([], null, 2));
    }
    if (!fs.existsSync(verificationInfoFile)) {
        fs.writeFileSync(verificationInfoFile, JSON.stringify([], null, 2));
    }
    if (!fs.existsSync(eslesmemisKampanyalarFile)) {
        fs.writeFileSync(eslesmemisKampanyalarFile, JSON.stringify([], null, 2));
    }
    if (!fs.existsSync(inflerinBasvuruFile)) {
        fs.writeFileSync(inflerinBasvuruFile, JSON.stringify([], null, 2));
    }
}

function readData(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
        return [];
    }
}

function writeData(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Senkronizasyon Fonksiyonları
function generateUsernameFromName(ad, soyad) {
    // Ad ve soyadı lowercase yapıp birleştir ve @ ekle
    const username = `@${ad.toLowerCase()}${soyad.toLowerCase()}`;
    return username;
}

function syncInfluencerToCSV(influencer) {
    try {
        const csvData = readData(influencersCsvFile);
        // Aynı ID'ye sahip kayıt var mı kontrol et
        const existingIndex = csvData.findIndex(inf => inf.influencer_id === influencer.id);
        
        const csvRecord = {
            influencer_id: influencer.id,
            influencer_kullanici_adi: generateUsernameFromName(influencer.ad, influencer.soyad),
            influencer_platform: influencer.platform || "Instagram",
            influencer_tipi: influencer.tipi || "Mikro",
            influencer_nis: influencer.nis || "Genel",
            influencer_ulke: influencer.ulke || "Türkiye",
            influencer_sehir: influencer.sehir || "İstanbul",
            influencer_kayit_tarihi: influencer.createdAt ? influencer.createdAt.split('T')[0] : new Date().toISOString().split('T')[0],
            influencer_durum: "Aktif"
        };
        
        if (existingIndex !== -1) {
            // Mevcut kaydı güncelle
            csvData[existingIndex] = csvRecord;
        } else {
            // Yeni kayıt ekle
            csvData.push(csvRecord);
        }
        
        writeData(influencersCsvFile, csvData);
        console.log(`✅ İnfluencer CSV'ye senkronize edildi: ${influencer.ad} ${influencer.soyad}`);
    } catch (error) {
        console.error('❌ CSV senkronizasyon hatası:', error.message);
    }
}

initializeDatabase();

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/kayit-secim', (req, res) => res.sendFile(path.join(__dirname, 'kayit_secim.html')));
app.get('/marka-kayit', (req, res) => res.sendFile(path.join(__dirname, 'marka_kayit.html')));
app.get('/influencer-kayit', (req, res) => res.sendFile(path.join(__dirname, 'influencer_kayit.html')));
app.get('/giris-secim', (req, res) => res.sendFile(path.join(__dirname, 'kayit_secim.html')));
app.get('/giris-yap', (req, res) => res.sendFile(path.join(__dirname, 'giris_yap.html')));
app.get('/influencer-anasayfa', (req, res) => res.sendFile(path.join(__dirname, 'influencer_anasayfa.html')));
app.get('/marka-anasayfa', (req, res) => res.sendFile(path.join(__dirname, 'marka_anasayfa.html')));
app.get('/kampanyalarim', (req, res) => res.sendFile(path.join(__dirname, 'kampanyalarim.html')));
app.get('/isbirlikleri', (req, res) => res.sendFile(path.join(__dirname, 'isbirlikleri.html')));
app.get('/kesfet-marka', (req, res) => res.sendFile(path.join(__dirname, 'kesfetForMarka.html')));
app.get('/basari-hikayeleri', (req, res) => res.sendFile(path.join(__dirname, 'Basari_hikayeleri.html')));
app.get('/basvuru-ve-teklifler', (req, res) => res.sendFile(path.join(__dirname, 'BasvuruVeteklifler.html')));
app.get('/kesfet', (req, res) => res.sendFile(path.join(__dirname, 'kesfetForInf.html')));
app.get('/blog', (req, res) => res.sendFile(path.join(__dirname, 'blog.html')));
app.get('/hakkimizda', (req, res) => res.sendFile(path.join(__dirname, 'Hakkimizda.html')));
app.get('/iletisim', (req, res) => res.sendFile(path.join(__dirname, 'iletisim.html')));

// Register Influencer
app.post('/api/register-influencer', async (req, res) => {
    const { adSoyad, email, sifre, telefon, instagramHandle, takipciSayisi, niche, kosullarKabul } = req.body;
    if (!adSoyad || !email || !sifre || !telefon || !kosullarKabul) {
        return res.status(400).json({ success: false, message: 'Tüm alanlar gerekli.' });
    }
    try {
        const influencers = readData(influencersFile);
        if (influencers.some(u => u.email === email)) {
            return res.status(400).json({ success: false, message: 'Bu email zaten kayıtlı.' });
        }
        const hashedPassword = await bcrypt.hash(sifre, 10);
        
        // Ad ve soyadı ayır
        const nameParts = adSoyad.trim().split(/\s+/);
        const ad = nameParts[0];
        const soyad = nameParts.slice(1).join(' ') || '';
        
        const newInfluencer = {
            id: Date.now(),
            ad,
            soyad,
            email,
            sifre: hashedPassword,
            telefon,
            instagramHandle,
            takipciSayisi,
            niche,
            kosullarKabul: kosullarKabul ? 1 : 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        influencers.push(newInfluencer);
        writeData(influencersFile, influencers);
        
        // CSV dosyasına senkronize et
        syncInfluencerToCSV(newInfluencer);
        
        const token = jwt.sign({ id: newInfluencer.id, email }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ success: true, message: '✅ İnfluencer kaydı başarılı.', token, user: { id: newInfluencer.id, ad, soyad, email, telefon, instagramHandle, takipciSayisi, niche } });
        console.log('✅ İnfluencer giriş başarılı:', ad, soyad, email);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Kayıt sırasında hata oluştu.' });
    }
});

// Register Brand
app.post('/api/register-marka', async (req, res) => {
    const { sirketAdi, markaAdi, email, sifre, sorumluIsim, sorumluTelefon, kosullarKabul } = req.body;
    if (!sirketAdi || !markaAdi || !email || !sifre || !kosullarKabul) {
        return res.status(400).json({ success: false, message: 'Tüm alanlar gerekli.' });
    }
    try {
        const markalar = readData(markalarFile);
        if (markalar.some(m => m.email === email)) {
            return res.status(400).json({ success: false, message: 'Bu email zaten kayıtlı.' });
        }
        const hashedPassword = await bcrypt.hash(sifre, 10);
        const newMarka = {
            id: Date.now(),
            sirketAdi, markaAdi, email, sifre: hashedPassword, sorumluIsim, sorumluTelefon,
            kosullarKabul: kosullarKabul ? 1 : 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        markalar.push(newMarka);
        writeData(markalarFile, markalar);
        const token = jwt.sign({ id: newMarka.id, email }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ success: true, message: '✅ Marka kaydı başarılı.', token, user: { id: newMarka.id, sirketAdi, markaAdi, email, sorumluIsim, sorumluTelefon } });
        console.log('✅ Marka giriş başarılı:', markaAdi, email);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Kayıt sırasında hata oluştu.' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    const { email, sifre, userType } = req.body;
    if (!email || !sifre || !userType) {
        return res.status(400).json({ success: false, message: 'Email, şifre ve kullanıcı tipi gerekli.' });
    }
    try {
        const dataFile = userType === 'influencer' ? influencersFile : markalarFile;
        const users = readData(dataFile);
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Email veya şifre hatalı.' });
        }
        const isPasswordValid = await bcrypt.compare(sifre, user.sifre);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Email veya şifre hatalı.' });
        }
        const token = jwt.sign({ id: user.id, email }, JWT_SECRET, { expiresIn: '24h' });
        const userData = userType === 'influencer'
            ? { id: user.id, ad: user.ad || '', soyad: user.soyad || '', adSoyad: (user.ad || '') + ' ' + (user.soyad || ''), email, telefon: user.telefon, instagramHandle: user.instagramHandle }
            : { id: user.id, sirketAdi: user.sirketAdi, markaAdi: user.markaAdi, email, sorumluIsim: user.sorumluIsim };
        res.json({ success: true, message: '✅ Giriş başarılı.', token, user: userData, userType });
        console.log('✅ Giriş başarılı:', email, userType);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Giriş sırasında hata oluştu.' });
    }
});

// Influencer Login
app.post('/api/influencer-login', async (req, res) => {
    const { email, sifre } = req.body;
    if (!email || !sifre) {
        return res.status(400).json({ success: false, message: 'Email ve şifre gerekli.' });
    }
    try {
        const influencers = readData(influencersFile);
        const user = influencers.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Email veya şifre hatalı.' });
        }
        const isPasswordValid = await bcrypt.compare(sifre, user.sifre);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Email veya şifre hatalı.' });
        }
        const token = jwt.sign({ id: user.id, email }, JWT_SECRET, { expiresIn: '24h' });
        const userData = { id: user.id, ad: user.ad || '', soyad: user.soyad || '', adSoyad: (user.ad || '') + ' ' + (user.soyad || ''), email, telefon: user.telefon, instagramHandle: user.instagramHandle, userType: 'influencer' };
        res.json({ success: true, message: '✅ Giriş başarılı.', token, user: userData, redirectUrl: '/influencer-anasayfa' });
        console.log('✅ İnfluencer giriş başarılı:', email);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Giriş sırasında hata oluştu.' });
    }
});

// Brand Login
app.post('/api/marka-login', async (req, res) => {
    const { email, sifre } = req.body;
    if (!email || !sifre) {
        return res.status(400).json({ success: false, message: 'Email ve şifre gerekli.' });
    }
    try {
        const markalar = readData(markalarFile);
        const user = markalar.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Email veya şifre hatalı.' });
        }
        const isPasswordValid = await bcrypt.compare(sifre, user.sifre);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Email veya şifre hatalı.' });
        }
        const token = jwt.sign({ id: user.id, email }, JWT_SECRET, { expiresIn: '24h' });
        const userData = { id: user.id, sirketAdi: user.sirketAdi, markaAdi: user.markaAdi, email, sorumluIsim: user.sorumluIsim, userType: 'marka' };
        res.json({ success: true, message: '✅ Giriş başarılı.', token, user: userData, redirectUrl: '/marka-anasayfa' });
        console.log('✅ Marka giriş başarılı:', email);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Giriş sırasında hata oluştu.' });
    }
});

// Logout
app.post('/api/logout', (req, res) => {
    console.log('✅ Çıkış yapıldı');
    res.json({ success: true, message: 'Başarıyla çıkış yapıldı.' });
});

// Marka Doğrulama Bilgileri Kaydet
app.post('/api/save-marka-verification-info', (req, res) => {
    const { markaId, markaAdi, faturaAdresi, vergino, kartNumarasi, kartAdı, kartAyAl, cvv, eposta } = req.body;

    console.log('📥 Doğrulama bilgileri POST isteği:', { markaId, markaAdi, faturaAdresi, vergino, eposta });

    // Validation
    if (!markaId || !markaAdi || !faturaAdresi || !vergino || !kartNumarasi || !kartAdı || !kartAyAl || !cvv || !eposta) {
        console.warn('⚠️ Validation hatası: Eksik alanlar');
        console.log('Alınan veriler:', { markaId, markaAdi, faturaAdresi, vergino, kartNumarasi, kartAdı, kartAyAl, cvv, eposta });
        return res.status(400).json({ success: false, message: 'Tüm alanlar gereklidir.' });
    }

    try {
        const verificationData = readData(verificationInfoFile);
        
        // Aynı marka için mevcut kaydı kontrol et ve güncelle
        const existingIndex = verificationData.findIndex(v => v.markaId === markaId);
        
        const newRecord = {
            markaId,
            markaAdi,
            faturaAdresi,
            vergino,
            kartNumarasi,
            kartAdı,
            kartAyAl,
            cvv,
            eposta,
            updatedAt: new Date().toISOString()
        };

        if (existingIndex !== -1) {
            // Mevcut kaydı güncelle
            verificationData[existingIndex] = newRecord;
        } else {
            // Yeni kayıt ekle
            newRecord.createdAt = new Date().toISOString();
            verificationData.push(newRecord);
        }

        fs.writeFileSync(verificationInfoFile, JSON.stringify(verificationData, null, 2));
        res.json({ success: true, message: '✅ Doğrulama bilgileri başarıyla kaydedildi.' });
        console.log('✅ Marka doğrulama bilgileri kaydedildi:', markaAdi);
    } catch (error) {
        console.error('❌ Doğrulama bilgileri kaydetme hatası:', error.message);
        console.error('Stack:', error.stack);
        res.status(500).json({ success: false, message: 'Kayıt sırasında hata oluştu: ' + error.message });
    }
});

// Verify Token
app.get('/api/verify-token', (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    console.log('🔐 Token doğrulaması istendi, token:', token ? '✅ VAR' : '❌ YOK');
    
    if (!token) {
        return res.status(401).json({ success: false, message: 'Token gerekli.' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('✅ Token doğrulandı, user ID:', decoded.id);
        
        // Kullanıcı bilgilerini döndür
        const influencers = readData(influencersFile);
        const user = influencers.find(u => u.id === decoded.id);
        
        if (!user) {
            return res.status(401).json({ success: false, message: 'Kullanıcı bulunamadı.' });
        }
        
        res.json({ 
            success: true, 
            user: { 
                id: user.id, 
                adSoyad: user.adSoyad, 
                email: user.email,
                telefon: user.telefon,
                instagramHandle: user.instagramHandle
            } 
        });
    } catch (error) {
        console.error('❌ Token doğrulama hatası:', error.message);
        res.status(401).json({ success: false, message: 'Token geçersiz veya süresi doldu.' });
    }
});

// Save Payment Info (Ödeme Bilgileri)
app.post('/api/save-payment-info', async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { tcNo, adres, iban } = req.body;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token gerekli.' });
    }

    if (!tcNo || !adres || !iban) {
        return res.status(400).json({ success: false, message: 'Tüm alanlar gerekli.' });
    }

    try {
        // Token'ı doğrula
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('🔐 Token doğrulandı, Influencer ID:', decoded.id);

        // Influencer'ı bul
        const influencers = readData(influencersFile);
        const influencer = influencers.find(u => u.id === decoded.id);

        if (!influencer) {
            return res.status(401).json({ success: false, message: 'Kullanıcı bulunamadı.' });
        }

        // Ödeme bilgilerini yükle
        const paymentInfos = readData(paymentInfoFile);

        // Aynı influencer'ın ödeme bilgilerini kontrol et (update veya create)
        const existingIndex = paymentInfos.findIndex(p => p.influencerId === decoded.id);

        if (existingIndex !== -1) {
            // Mevcut kaydı güncelle
            paymentInfos[existingIndex] = {
                ...paymentInfos[existingIndex],
                tcNo,
                adres,
                iban,
                updatedAt: new Date().toISOString()
            };
            console.log('✏️ Ödeme bilgileri güncellendi:', influencer.adSoyad);
        } else {
            // Yeni kayıt oluştur
            const newPaymentInfo = {
                id: Date.now(),
                influencerId: decoded.id,
                influencerEmail: influencer.email,
                influencerName: influencer.adSoyad,
                tcNo,
                adres,
                iban,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            paymentInfos.push(newPaymentInfo);
            console.log('✅ Yeni ödeme bilgileri kaydedildi:', influencer.adSoyad);
        }

        writeData(paymentInfoFile, paymentInfos);

        res.json({ 
            success: true, 
            message: '✅ Ödeme bilgileri başarıyla kaydedildi.',
            data: {
                influencerId: decoded.id,
                influencerName: influencer.adSoyad
            }
        });
    } catch (error) {
        console.error('❌ Ödeme bilgileri kaydetme hatası:', error.message);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Token geçersiz veya süresi doldu.' });
        }
        
        res.status(500).json({ success: false, message: 'Ödeme bilgileri kaydedilirken hata oluştu.' });
    }
});

// Hesap Bilgilerini Kaydet (Ödeme + Adres Bilgileri + İlgi Alanları)
app.post('/api/save-account-info', async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { influencerId, tcNo, adres, iban, ulke, sehir, adresDetay, ilgiAlanları } = req.body;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token gerekli.' });
    }

    if (!influencerId || !tcNo || !adres || !iban || !ulke || !sehir || !adresDetay || !ilgiAlanları) {
        return res.status(400).json({ success: false, message: 'Tüm alanlar gerekli.' });
    }

    try {
        // Token'ı doğrula
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('🔐 Hesap bilgileri için token doğrulandı, Influencer ID:', decoded.id);

        // Influencers CSV dosyasını oku
        const csvFile = path.join(__dirname, 'data', 'influencers_csv.json');
        const influencers = readData(csvFile);

        // Influencer'ı ID'ye göre bul
        const influencerIndex = influencers.findIndex(inf => inf.influencer_id === parseInt(influencerId));

        if (influencerIndex === -1) {
            return res.status(404).json({ success: false, message: 'Influencer bulunamadı.' });
        }

        // Influencer'ın adres ve ilgi alanları bilgilerini güncelle
        influencers[influencerIndex].influencer_ulke = ulke;
        influencers[influencerIndex].influencer_sehir = sehir;
        influencers[influencerIndex].influencer_adres = adresDetay;
        influencers[influencerIndex].influencer_nis = ilgiAlanları;

        console.log('📝 Güncellenen influencer bilgileri:', {
            id: influencers[influencerIndex].influencer_id,
            kullanici_adi: influencers[influencerIndex].influencer_kullanici_adi,
            ulke: ulke,
            sehir: sehir,
            adres: adresDetay,
            ilgi_alanları: ilgiAlanları
        });

        // Dosyaya yaz
        writeData(csvFile, influencers);

        // Aynı zamanda ödeme bilgilerini de kaydet
        const paymentInfos = readData(paymentInfoFile);
        const existingIndex = paymentInfos.findIndex(p => p.influencerId === decoded.id);

        if (existingIndex !== -1) {
            paymentInfos[existingIndex] = {
                ...paymentInfos[existingIndex],
                tcNo,
                adres,
                iban,
                updatedAt: new Date().toISOString()
            };
        } else {
            const newPaymentInfo = {
                id: Date.now(),
                influencerId: decoded.id,
                influencerEmail: influencers[influencerIndex].influencer_kullanici_adi,
                influencerName: influencers[influencerIndex].influencer_kullanici_adi,
                tcNo,
                adres,
                iban,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            paymentInfos.push(newPaymentInfo);
        }

        writeData(paymentInfoFile, paymentInfos);

        res.json({ 
            success: true, 
            message: '✅ Hesap bilgileri başarıyla kaydedildi.',
            data: {
                influencerId: influencers[influencerIndex].influencer_id,
                influencerName: influencers[influencerIndex].influencer_kullanici_adi,
                ulke: ulke,
                sehir: sehir,
                adres: adresDetay,
                ilgiAlanları: ilgiAlanları
            }
        });
    } catch (error) {
        console.error('❌ Hesap bilgileri kaydetme hatası:', error.message);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Token geçersiz veya süresi doldu.' });
        }
        
        res.status(500).json({ success: false, message: 'Hesap bilgileri kaydedilirken hata oluştu.' });
    }
});

// Contact
app.post('/api/contact', (req, res) => {
    const { ad, email, telefon, mesaj } = req.body;
    if (!ad || !email || !telefon || !mesaj) {
        return res.status(400).json({ success: false, message: 'Tüm alanlar gerekli.' });
    }
    try {
        const iletisim = readData(iletisimFile);
        const newMessage = { id: Date.now(), ad, email, telefon, mesaj, createdAt: new Date().toISOString() };
        iletisim.push(newMessage);
        writeData(iletisimFile, iletisim);
        res.json({ success: true, message: 'Mesajınız gönderildi. Teşekkürler!' });
        console.log('✅ Yeni mesaj:', ad, 'Email:', email);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Mesaj gönderme sırasında hata oluştu.' });
    }
});

// Yeni Kampanya Ekle Endpoint
app.post('/api/kampanya-ekle', (req, res) => {
    try {
        const yeniKampanya = req.body;
        
        // Gerekli alanları kontrol et
        if (!yeniKampanya.kampanya_adi || !yeniKampanya.marka_id || !yeniKampanya.kampanya_turu) {
            return res.status(400).json({ success: false, message: 'Gerekli alanlar eksik.' });
        }

        // Eşleşmemiş kampanyalar dosyasını oku
        const eslesmemisKampanyalar = readData(eslesmemisKampanyalarFile);
        
        // Yeni kampanyayı ekle
        eslesmemisKampanyalar.push(yeniKampanya);
        
        // Dosyaya yaz
        writeData(eslesmemisKampanyalarFile, eslesmemisKampanyalar);
        
        console.log('✅ Yeni kampanya eklendi:', yeniKampanya.kampanya_adi, 'Marka ID:', yeniKampanya.marka_id);
        res.json({ success: true, message: 'Kampanya başarıyla eklendi.', kampanya: yeniKampanya });
    } catch (error) {
        console.error('❌ Kampanya ekleme hatası:', error);
        res.status(500).json({ success: false, message: 'Kampanya eklenirken hata oluştu.' });
    }
});

// İnfluencer Başvuru Ekle Endpoint
app.post('/api/basvuru-ekle', (req, res) => {
    try {
        const yeniBasvuru = req.body;
        
        // Gerekli alanları kontrol et
        if (!yeniBasvuru.inf_id || !yeniBasvuru.kampanya_id) {
            return res.status(400).json({ success: false, message: 'Gerekli alanlar eksik.' });
        }

        // İnfluencer başvuruları dosyasını oku
        const basvurular = readData(inflerinBasvuruFile);
        
        // Yeni başvuruyu ekle
        basvurular.push(yeniBasvuru);
        
        // Dosyaya yaz
        writeData(inflerinBasvuruFile, basvurular);
        
        console.log('✅ Yeni başvuru eklendi:', yeniBasvuru.inf_adi, '-', yeniBasvuru.kampanya_adi);
        res.json({ success: true, message: 'Başvuru başarıyla kaydedildi.', basvuru: yeniBasvuru });
    } catch (error) {
        console.error('❌ Başvuru ekleme hatası:', error);
        res.status(500).json({ success: false, message: 'Başvuru kaydedilirken hata oluştu.' });
    }
});

// Platform Bilgisini Kaydet
app.post('/api/save-platform', async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { influencerId, platform } = req.body;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token gerekli.' });
    }

    if (!influencerId || !platform) {
        return res.status(400).json({ success: false, message: 'influencerId ve platform alanları gerekli.' });
    }

    try {
        // Token'ı doğrula
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('🔐 Platform kayıt token doğrulandı, Influencer ID:', decoded.id);

        // Influencers CSV dosyasını oku
        const csvFile = path.join(__dirname, 'data', 'influencers_csv.json');
        const influencers = readData(csvFile);

        // Influencer'ı ID'ye göre bul
        const influencerIndex = influencers.findIndex(inf => inf.influencer_id === parseInt(influencerId));

        if (influencerIndex === -1) {
            return res.status(404).json({ success: false, message: 'Influencer bulunamadı.' });
        }

        const influencer = influencers[influencerIndex];
        let currentPlatforms = influencer.influencer_platform || '';
        
        // Platform zaten bağlı mı kontrol et
        const platformList = currentPlatforms
            .split(',')
            .map(p => p.trim())
            .filter(p => p.length > 0);

        if (platformList.includes(platform)) {
            return res.status(400).json({ success: false, message: `${platform} zaten bağlıdır.` });
        }

        // Platform'u mevcut listeye ekle
        if (currentPlatforms && currentPlatforms.trim()) {
            influencers[influencerIndex].influencer_platform = currentPlatforms + ', ' + platform;
        } else {
            influencers[influencerIndex].influencer_platform = platform;
        }

        console.log('📝 Güncellenen platform bilgisi:', {
            id: influencer.influencer_id,
            kullanici_adi: influencer.influencer_kullanici_adi,
            platformlar: influencers[influencerIndex].influencer_platform
        });

        // Dosyaya yaz
        writeData(csvFile, influencers);

        res.json({ 
            success: true, 
            message: `✅ ${platform} başarıyla bağlandı.`,
            data: {
                influencerId: influencer.influencer_id,
                influencerName: influencer.influencer_kullanici_adi,
                platform: platform,
                allPlatforms: influencers[influencerIndex].influencer_platform
            }
        });
    } catch (error) {
        console.error('❌ Platform kayıt hatası:', error.message);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Token geçersiz veya süresi doldu.' });
        }
        
        res.status(500).json({ success: false, message: 'Platform kaydedilirken hata oluştu.' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log('🚀 MetVerse Server çalışıyor: http://localhost:' + PORT);
    console.log('\n📍 Sayfalar:');
    console.log('   - Ana Sayfa: http://localhost:' + PORT);
    console.log('   - Kayıt Seçim: http://localhost:' + PORT + '/kayit-secim');
    console.log('   - Marka Kayıt: http://localhost:' + PORT + '/marka-kayit');
    console.log('   - İnfluencer Kayıt: http://localhost:' + PORT + '/influencer-kayit');
});
