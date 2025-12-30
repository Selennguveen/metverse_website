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
const markalarFile = path.join(dbDir, 'markalar.json');
const iletisimFile = path.join(dbDir, 'iletisim.json');
const paymentInfoFile = path.join(dbDir, 'payment-info.json');

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
app.get('/basari-hikayeleri', (req, res) => res.sendFile(path.join(__dirname, 'Basari_hikayeleri.html')));
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
        const newInfluencer = {
            id: Date.now(),
            adSoyad, email, sifre: hashedPassword, telefon, instagramHandle, takipciSayisi, niche,
            kosullarKabul: kosullarKabul ? 1 : 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        influencers.push(newInfluencer);
        writeData(influencersFile, influencers);
        const token = jwt.sign({ id: newInfluencer.id, email }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ success: true, message: '✅ İnfluencer kaydı başarılı.', token, user: { id: newInfluencer.id, adSoyad, email, telefon, instagramHandle, takipciSayisi, niche } });
        console.log('✅ İnfluencer giriş başarılı:', adSoyad, email);
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
            ? { id: user.id, adSoyad: user.adSoyad, email, telefon: user.telefon, instagramHandle: user.instagramHandle }
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
        const userData = { id: user.id, adSoyad: user.adSoyad, email, telefon: user.telefon, instagramHandle: user.instagramHandle };
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
        const userData = { id: user.id, sirketAdi: user.sirketAdi, markaAdi: user.markaAdi, email, sorumluIsim: user.sorumluIsim };
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

// Error handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
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
