/**
 * Header Manager - Dinamik Header Yönetimi
 * - Misafir Header (Giriş Yapılı Değilse)
 * - Influencer Header (Giriş Yapılı İse)
 */

class HeaderManager {
    constructor() {
        this.loadHeader();
    }

    /**
     * Header HTML'ini includes/header.html'den yükle
     */
    async loadHeader() {
        try {
            const response = await fetch('/includes/header.html');
            if (!response.ok) {
                console.warn('⚠️ Header dosyası yüklenemedi, varsayılan header kullanılıyor');
                return;
            }

            const headerHTML = await response.text();
            const headerContainer = document.getElementById('header-container');
            
            if (headerContainer) {
                headerContainer.innerHTML = headerHTML;
                
                // Header yüklendikten sonra logic'i kur
                setTimeout(async () => {
                    this.setupHeaderLogic();
                    await this.updateHeaderView();
                    console.log('✅ Header yüklendi ve updateHeaderView() çalıştı');
                }, 0);
            }
        } catch (error) {
            console.warn('⚠️ Header yükleme hatası:', error);
        }
    }

    /**
     * Header elemanlarını kur (toggle menü, profil dropdown, vb.)
     */
    setupHeaderLogic() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        const navOverlay = document.getElementById('navOverlay');
        const profileBtn = document.getElementById('profileBtn');
        const dropdownMenu = document.getElementById('dropdownMenu');
        const logoutBtn = document.getElementById('logoutBtn');
        const navMenuItems = document.querySelectorAll('.nav-menu-item');
        const logoWrapper = document.querySelector('.logo-wrapper');

        // Menüyü ve overlay'i başlangıçta kapalı yap
        if (navMenu) navMenu.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');

        // Toggle Menü
        if (menuToggle && navMenu && navOverlay) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                menuToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                navOverlay.classList.toggle('active');
                if (logoWrapper) logoWrapper.classList.toggle('logo-expanded');
            });

            // Overlay'e tıklanırsa menüyü kapat
            navOverlay.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navOverlay.classList.remove('active');
                if (logoWrapper) logoWrapper.classList.remove('logo-expanded');
            });

            // Menü öğelerine tıklanırsa menüyü kapat
            navMenuItems.forEach(item => {
                item.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    navOverlay.classList.remove('active');
                    if (logoWrapper) logoWrapper.classList.remove('logo-expanded');
                });
            });
        }

        // Profil Dropdown (Giriş Yapılı Modu)
        if (profileBtn && dropdownMenu) {
            profileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownMenu.style.display = 
                    dropdownMenu.style.display === 'none' ? 'block' : 'none';
            });

            // Dropdown dışına tıklanırsa kapat
            document.addEventListener('click', (e) => {
                if (!profileBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
                    dropdownMenu.style.display = 'none';
                }
            });
        }

        // Logout Butonu
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                try {
                    const token = localStorage.getItem('token');
                    if (token) {
                        await fetch('/api/logout', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        });
                    }
                } catch (error) {
                    console.error('Logout hatası:', error);
                }

                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/';
            });
        }

        // Hesabı Tamamla Butonu - updateHeaderView()da set edilir
        
        // Bağlantılar Butonu
        const baglantilarBtn = document.getElementById('baglantilarBtn');
        if (baglantilarBtn) {
            baglantilarBtn.addEventListener('click', () => {
                console.log('🔗 Bağlantılar modal açılıyor...');
                this.openBaglantilarModal();
                
                // Dropdown'u kapat
                if (dropdownMenu) {
                    dropdownMenu.style.display = 'none';
                }
            });
        }
    }

    /**
     * Header görünümünü güncelle (Misafir vs. Influencer vs. Marka)
     */
    async updateHeaderView() {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const generalNav = document.getElementById('general-nav-actions');
        const userNav = document.getElementById('user-nav-actions');
        const authenticatedNav = document.getElementById('authenticatedNav');
        const markaAuthenticatedNav = document.getElementById('markaAuthenticatedNav');

        console.log('🔍 updateHeaderView() çalıştı');
        console.log('📦 Token:', token ? '✅ VAR' : '❌ YOK');
        console.log('👤 User:', user ? '✅ VAR' : '❌ YOK');
        console.log('📌 authenticatedNav:', authenticatedNav ? '✅ VAR' : '❌ YOK');
        console.log('📌 markaAuthenticatedNav:', markaAuthenticatedNav ? '✅ VAR' : '❌ YOK');

        if (token && user) {
            try {
                const userData = JSON.parse(user);
                const userType = userData.userType || 'influencer'; // Default: influencer
                console.log('🎯 userType:', userType);

                if (userType === 'marka') {
                    console.log('✅ MARKA HEADER GÖSTERILIYOR');
                    // Marka header
                    if (generalNav) generalNav.style.display = 'none';
                    if (userNav) userNav.style.display = 'flex';
                    if (authenticatedNav) authenticatedNav.style.display = 'none';
                    if (markaAuthenticatedNav) markaAuthenticatedNav.style.display = 'flex';

                    // Marka bilgilerini doldur
                    const userNameEl = document.getElementById('userName');
                    const userEmailEl = document.getElementById('userEmail');
                    const displayUserNameEl = document.getElementById('displayUserName');

                    if (userNameEl) userNameEl.textContent = userData.markaAdi || userData.sirketAdi || 'Marka';
                    if (userEmailEl) userEmailEl.textContent = userData.email || '';
                    if (displayUserNameEl) displayUserNameEl.textContent = userData.markaAdi || userData.sirketAdi || 'Marka';

                    // Marka dropdown menu özelleştirmesi
                    const hesabıTamamlaBtn = document.getElementById('hesabıTamamlaBtn');
                    const baglantilarBtn = document.getElementById('baglantilarBtn');

                    if (hesabıTamamlaBtn) {
                        hesabıTamamlaBtn.textContent = '✓ Hesabı Doğrula';
                        // Marka için yeni click handler
                        hesabıTamamlaBtn.onclick = () => {
                            console.log('✓ Hesabı Doğrula modal açılıyor...');
                            this.openHesabıDoğrulaModal();
                            if (dropdownMenu) {
                                dropdownMenu.style.display = 'none';
                            }
                        };
                    }
                    if (baglantilarBtn) baglantilarBtn.style.display = 'none';
                } else {
                    console.log('✅ İNFLUENCER HEADER GÖSTERILIYOR');
                    // Influencer header
                    if (generalNav) generalNav.style.display = 'none';
                    if (userNav) userNav.style.display = 'flex';
                    if (authenticatedNav) authenticatedNav.style.display = 'flex';
                    if (markaAuthenticatedNav) markaAuthenticatedNav.style.display = 'none';

                    // Influencer bilgilerini doldur
                    const userNameEl = document.getElementById('userName');
                    const userEmailEl = document.getElementById('userEmail');
                    const displayUserNameEl = document.getElementById('displayUserName');

                    // influencer_kullanici_adi'ni influencers_csv.json'dan al
                    await this.loadInfluencerUsername(userData, userNameEl, displayUserNameEl);
                    
                    if (userEmailEl) userEmailEl.textContent = userData.email || '';

                    // Influencer dropdown menu orijinal hali
                    const hesabıTamamlaBtn = document.getElementById('hesabıTamamlaBtn');
                    const baglantilarBtn = document.getElementById('baglantilarBtn');

                    if (hesabıTamamlaBtn) {
                        hesabıTamamlaBtn.textContent = '✓ Hesabı Tamamla';
                        // Influencer için click handler
                        hesabıTamamlaBtn.onclick = () => {
                            console.log('✓ Hesabı Tamamla modal açılıyor...');
                            this.openHesabıTamamlaModal();
                            const dropdownMenu = document.getElementById('dropdownMenu');
                            if (dropdownMenu) {
                                dropdownMenu.style.display = 'none';
                            }
                        };
                    }
                    if (baglantilarBtn) baglantilarBtn.style.display = 'block';
                }
            } catch (error) {
                console.warn('❌ User bilgisi parse hatası:', error);
                // Fallback: influencer header göster
                if (generalNav) generalNav.style.display = 'none';
                if (userNav) userNav.style.display = 'flex';
                if (authenticatedNav) authenticatedNav.style.display = 'flex';
                if (markaAuthenticatedNav) markaAuthenticatedNav.style.display = 'none';
            }
        } else {
            // Çıkış yapılı: Misafir header
            if (generalNav) generalNav.style.display = 'flex';
            if (userNav) userNav.style.display = 'none';
            if (authenticatedNav) authenticatedNav.style.display = 'none';
            if (markaAuthenticatedNav) markaAuthenticatedNav.style.display = 'none';
        }

        // Marka Profil linki click handler'ı
        const markaProfilLink = document.getElementById('markaProfilLink');
        if (markaProfilLink) {
            markaProfilLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = '/marka-anasayfa';
            });
        }

        // Marka Kampanyalarım linki click handler'ı
        const markaKampanyalarimLink = document.getElementById('markaKampanyalarimLink');
        if (markaKampanyalarimLink) {
            markaKampanyalarimLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = '/kampanyalarim';
            });
        }

        // Marka İşbirlikleri linki click handler'ı
        const markaIsbirliklerLink = document.getElementById('markaIsbirliklerLink');
        if (markaIsbirliklerLink) {
            markaIsbirliklerLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = '/isbirlikleri';
            });
        }

        // Marka Keşfet linki click handler'ı
        const markaKesfetLink = document.getElementById('markaKesfetLink');
        if (markaKesfetLink) {
            markaKesfetLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = '/kesfet-marka';
            });
        }
    }

    /**
     * Bağlantılar Modal'ını aç
     */
    openBaglantilarModal() {
        // Modal'ın HTML'sini oluştur
        let modal = document.getElementById('baglantilarModal');
        
        if (!modal) {
            const modalHTML = `
                <div id="baglantilarModal" class="modal-overlay">
                    <div class="modal-container baglantilar-modal">
                        <div class="modal-header">
                            <h2>🔗 Bağlantılar</h2>
                            <button class="modal-close-btn" onclick="document.getElementById('baglantilarModal').style.display='none';">&times;</button>
                        </div>
                        <div class="modal-content baglantilar-content">
                            <div id="baglantilarLoading" style="text-align: center; padding: 20px; color: rgba(255,255,255,0.6);">
                                Yükleniyor...
                            </div>
                            <div id="baglantilarContent" style="display: none;"></div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            modal = document.getElementById('baglantilarModal');
        }
        
        // Modal'ı göster
        if (modal) {
            modal.style.display = 'flex';
            
            // Bağlantılar içeriğini yükle
            this.loadBaglantilarContent();
            
            // Overlay'e tıklanırsa modal'ı kapat
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    }

    /**
     * Bağlantılar içeriğini yükle ve göster
     */
    async loadBaglantilarContent() {
        try {
            const loadingDiv = document.getElementById('baglantilarLoading');
            const contentDiv = document.getElementById('baglantilarContent');
            
            // Giriş yapan kullanıcının bilgilerini al
            const user = localStorage.getItem('user');
            if (!user) {
                if (loadingDiv) loadingDiv.innerHTML = '<p style="color: red;">❌ Kullanıcı bilgisi bulunamadı</p>';
                return;
            }
            
            const userData = JSON.parse(user);
            const userId = userData.id;
            
            console.log('🔗 Influencer ID:', userId);
            
            // influencers_csv.json'den platform bilgisini al
            const response = await fetch('/data/influencers_csv.json');
            if (!response.ok) {
                throw new Error('influencers_csv.json yüklenemedi');
            }
            
            const influencersData = await response.json();
            const influencerRecord = influencersData.find(inf => inf.influencer_id === userId);
            
            if (!influencerRecord) {
                if (loadingDiv) loadingDiv.innerHTML = '<p style="color: orange;">⚠️ İnfluencer bilgisi bulunamadı</p>';
                return;
            }
            
            console.log('✅ Platform bulundu:', influencerRecord.influencer_platform);
            
            // Platform bilgisini göster
            let platformEmoji = '🔗';
            if (influencerRecord.influencer_platform === 'Instagram') {
                platformEmoji = '📸';
            } else if (influencerRecord.influencer_platform === 'YouTube') {
                platformEmoji = '▶️';
            } else if (influencerRecord.influencer_platform === 'TikTok') {
                platformEmoji = '🎵';
            } else if (influencerRecord.influencer_platform === 'Twitter') {
                platformEmoji = '𝕏';
            } else if (influencerRecord.influencer_platform === 'LinkedIn') {
                platformEmoji = '💼';
            }
            
            let html = `
                <div class="baglantı-info-item">
                    <span class="baglantı-label">Platform</span>
                    <span class="baglantı-value">${platformEmoji} ${influencerRecord.influencer_platform || 'Belirtilmemiş'}</span>
                </div>
            `;
            
            // Eğer diğer platform bilgileri varsa ekle (username, vb.)
            if (influencerRecord.influencer_kullanici_adi) {
                html += `
                    <div class="baglantı-info-item">
                        <span class="baglantı-label">Kullanıcı Adı</span>
                        <span class="baglantı-value">${influencerRecord.influencer_kullanici_adi}</span>
                    </div>
                `;
            }
            
            // Bağlantı Ekle Butonu yerine Platform Bağla Butonları
            // Kullanıcının bağlı olduğu platformu kontrol et
            const connectedPlatform = influencerRecord.influencer_platform;
            const availablePlatforms = [
                { name: 'Instagram', emoji: '📸', class: 'instagram-baglantı' },
                { name: 'YouTube', emoji: '▶️', class: 'youtube-baglantı' },
                { name: 'TikTok', emoji: '🎵', class: 'tiktok-baglantı' }
            ];
            
            // Bağlı olmayan platformları filtrele
            const platformButtonsHTML = availablePlatforms
                .filter(platform => platform.name !== connectedPlatform)
                .map(platform => `
                    <button class="btn-platform-baglantı ${platform.class}" onclick="window.headerManager.connectPlatform('${platform.name}')">
                        ${platform.emoji} ${platform.name} Bağla
                    </button>
                `)
                .join('');
            
            html += `
                <div class="baglantı-button-container platform-connect-buttons">
                    ${platformButtonsHTML}
                </div>
            `;
            
            // CSS stillerini ekle (eğer modal style'lar için ekli değilse)
            if (!document.getElementById('baglantilar-modal-styles')) {
                const style = document.createElement('style');
                style.id = 'baglantilar-modal-styles';
                style.textContent = `
                    .baglantilar-modal {
                        max-width: 500px;
                    }
                    
                    .baglantı-info-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 15px;
                        border-bottom: 1px solid rgba(232, 133, 202, 0.2);
                        background: rgba(232, 133, 202, 0.05);
                        border-radius: 8px;
                        margin-bottom: 12px;
                    }
                    
                    .baglantı-info-item:last-child {
                        border-bottom: none;
                        margin-bottom: 0;
                    }
                    
                    .baglantı-label {
                        font-size: 0.9rem;
                        color: rgba(255, 255, 255, 0.6);
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    
                    .baglantı-value {
                        font-size: 1rem;
                        font-weight: 600;
                        color: #fffffffe;
                    }
                    
                    .baglantı-button-container {
                        margin-top: 25px;
                        padding-top: 20px;
                        border-top: 1px solid rgba(232, 133, 202, 0.2);
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }
                    
                    .btn-baglanti-ekle {
                        flex: 1;
                        padding: 12px 20px;
                        background: linear-gradient(135deg, rgb(232, 133, 202), rgb(220, 100, 180));
                        border: none;
                        color: white;
                        border-radius: 8px;
                        font-size: 0.95rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    
                    .btn-baglanti-ekle:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 5px 15px rgba(232, 133, 202, 0.3);
                    }
                    
                    .btn-baglanti-ekle:active {
                        transform: translateY(0px);
                    }
                    
                    .platform-connect-buttons {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }
                    
                    .btn-platform-baglantı {
                        width: 100%;
                        padding: 12px 16px;
                        border: 1px solid rgba(232, 133, 202, 0.3);
                        border-radius: 8px;
                        font-size: 0.9rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        color: white;
                    }
                    
                    .btn-platform-baglantı:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 5px 15px rgba(232, 133, 202, 0.3);
                    }
                    
                    .instagram-baglantı {
                        background: linear-gradient(135deg, rgba(225, 48, 108, 0.3), rgba(245, 96, 65, 0.2));
                        border-color: rgba(225, 48, 108, 0.5);
                    }
                    
                    .instagram-baglantı:hover {
                        background: linear-gradient(135deg, rgba(225, 48, 108, 0.5), rgba(245, 96, 65, 0.4));
                    }
                    
                    .youtube-baglantı {
                        background: linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(204, 0, 0, 0.15));
                        border-color: rgba(255, 0, 0, 0.4);
                    }
                    
                    .youtube-baglantı:hover {
                        background: linear-gradient(135deg, rgba(255, 0, 0, 0.3), rgba(204, 0, 0, 0.25));
                    }
                    
                    .tiktok-baglantı {
                        background: linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(254, 44, 85, 0.2));
                        border-color: rgba(0, 0, 0, 0.4);
                    }
                    
                    .tiktok-baglantı:hover {
                        background: linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(254, 44, 85, 0.3));
                    }
                `;
                document.head.appendChild(style);
            }
            
            contentDiv.innerHTML = html;
            contentDiv.style.display = 'block';
            
            if (loadingDiv) {
                loadingDiv.style.display = 'none';
            }
            
        } catch (error) {
            console.error('❌ Bağlantılar yükleme hatası:', error);
            const loadingDiv = document.getElementById('baglantilarLoading');
            if (loadingDiv) {
                loadingDiv.innerHTML = `<p style="color: red;">❌ Yükleme hatası: ${error.message}</p>`;
            }
        }
    }

    /**
     * Platform Bağlantı Fonksiyonu - "API Yetkisi Alındı" uyarısı göster
     */
    connectPlatform(platform) {
        console.log(`🔗 ${platform} bağlantısı başlatılıyor...`);
        
        // Platform emoji'si
        let platformEmoji = {
            'Instagram': '📸',
            'YouTube': '▶️',
            'TikTok': '🎵'
        }[platform] || '🔗';
        
        // Uyarı göster
        alert(`✅ ${platformEmoji} ${platform} API Yetkisi Alındı!\n\nHesabınız başarıyla doğrulanmıştır.`);
        
        console.log(`✅ ${platform} API yetkisi onaylandı`);
    }

    /**
     * Bağlantı Ekle Modal'ını aç
     */
    openAddBaglantiModal() {
        let modal = document.getElementById('addBaglantiModal');
        
        if (!modal) {
            const modalHTML = `
                <div id="addBaglantiModal" class="modal-overlay">
                    <div class="modal-container add-baglanti-modal">
                        <div class="modal-header">
                            <h2>➕ Bağlantı Ekle</h2>
                            <button class="modal-close-btn" onclick="document.getElementById('addBaglantiModal').style.display='none';">&times;</button>
                        </div>
                        <div class="modal-content add-baglanti-content">
                            <form id="addBaglantiForm" class="add-baglanti-form">
                                <div class="form-group">
                                    <label for="baglantiPlatform">Platform Seçin</label>
                                    <select id="baglantiPlatform" name="baglantiPlatform" required>
                                        <option value="">-- Platform Seçiniz --</option>
                                        <option value="Instagram">📸 Instagram</option>
                                        <option value="YouTube">▶️ YouTube</option>
                                        <option value="TikTok">🎵 TikTok</option>
                                        <option value="Twitter">𝕏 Twitter</option>
                                        <option value="LinkedIn">💼 LinkedIn</option>
                                        <option value="Facebook">👥 Facebook</option>
                                        <option value="Twitch">🎮 Twitch</option>
                                        <option value="Pinterest">📌 Pinterest</option>
                                        <option value="Snapchat">👻 Snapchat</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="baglantiUrl">URL veya Kullanıcı Adı</label>
                                    <input type="text" id="baglantiUrl" name="baglantiUrl" placeholder="https://instagram.com/kullaniciadi veya @kullaniciadi" required>
                                </div>
                                <div class="form-actions">
                                    <button type="button" class="btn-iptal" onclick="document.getElementById('addBaglantiModal').style.display='none';">İptal</button>
                                    <button type="submit" class="btn-ekle">Ekle</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            modal = document.getElementById('addBaglantiModal');
            
            // Form submit handler
            const form = modal.querySelector('#addBaglantiForm');
            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    await this.saveBaglanti(
                        document.getElementById('baglantiPlatform').value,
                        document.getElementById('baglantiUrl').value
                    );
                });
            }
            
            // CSS stillerini ekle (eğer ekli değilse)
            if (!document.getElementById('add-baglanti-modal-styles')) {
                const style = document.createElement('style');
                style.id = 'add-baglanti-modal-styles';
                style.textContent = `
                    .add-baglanti-modal {
                        max-width: 450px;
                    }
                    
                    .add-baglanti-form .form-group {
                        margin-bottom: 20px;
                    }
                    
                    .add-baglanti-form label {
                        display: block;
                        margin-bottom: 8px;
                        color: rgba(255, 255, 255, 0.7);
                        font-size: 0.9rem;
                        font-weight: 600;
                    }
                    
                    .add-baglanti-form select,
                    .add-baglanti-form input {
                        width: 100%;
                        padding: 12px;
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(232, 133, 202, 0.3);
                        border-radius: 8px;
                        color: white;
                        font-size: 0.95rem;
                        font-family: inherit;
                        transition: all 0.3s ease;
                    }
                    
                    .add-baglanti-form select:focus,
                    .add-baglanti-form input:focus {
                        outline: none;
                        border-color: rgb(232, 133, 202);
                        background: rgba(232, 133, 202, 0.1);
                        box-shadow: 0 0 10px rgba(232, 133, 202, 0.2);
                    }
                    
                    .add-baglanti-form select option {
                        background: rgb(4, 0, 29);
                        color: white;
                    }
                    
                    .form-actions {
                        display: flex;
                        gap: 12px;
                        margin-top: 25px;
                        padding-top: 20px;
                        border-top: 1px solid rgba(232, 133, 202, 0.2);
                    }
                    
                    .btn-iptal,
                    .btn-ekle {
                        flex: 1;
                        padding: 12px 20px;
                        border: none;
                        border-radius: 8px;
                        font-size: 0.95rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    
                    .btn-iptal {
                        background: rgba(232, 133, 202, 0.1);
                        border: 1px solid rgba(232, 133, 202, 0.3);
                        color: rgb(232, 133, 202);
                    }
                    
                    .btn-iptal:hover {
                        background: rgba(232, 133, 202, 0.2);
                        border-color: rgba(232, 133, 202, 0.5);
                    }
                    
                    .btn-ekle {
                        background: linear-gradient(135deg, rgb(232, 133, 202), rgb(220, 100, 180));
                        color: white;
                    }
                    
                    .btn-ekle:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 5px 15px rgba(232, 133, 202, 0.3);
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        // Modal'ı göster
        if (modal) {
            modal.style.display = 'flex';
            
            // Overlay'e tıklanırsa modal'ı kapat
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    }

    /**
     * Yeni bağlantıyı kaydet
     */
    async saveBaglanti(platform, url) {
        try {
            if (!platform || !url) {
                alert('❌ Lütfen tüm alanları doldurunuz!');
                return;
            }
            
            const user = localStorage.getItem('user');
            if (!user) {
                alert('❌ Kullanıcı bilgisi bulunamadı!');
                return;
            }
            
            const userData = JSON.parse(user);
            const userId = userData.id;
            
            console.log('💾 Bağlantı kaydediliyor:', { userId, platform, url });
            
            // API key modal'ını aç
            this.openApiKeyModal(userId, platform, url);
            
        } catch (error) {
            console.error('❌ Bağlantı kayıt hatası:', error);
            alert('❌ Bir hata oluştu. Lütfen tekrar deneyin: ' + error.message);
        }
    }

    /**
     * API Key Modal'ını aç
     */
    openApiKeyModal(userId, platform, url) {
        let modal = document.getElementById('apiKeyModal');
        
        if (!modal) {
            const modalHTML = `
                <div id="apiKeyModal" class="modal-overlay">
                    <div class="modal-container api-key-modal">
                        <div class="modal-header">
                            <h2>🔐 API Key Ayarla</h2>
                            <button class="modal-close-btn" onclick="document.getElementById('apiKeyModal').style.display='none';">&times;</button>
                        </div>
                        <div class="modal-content api-key-content">
                            <div class="api-key-info">
                                <p class="info-text">Bu bağlantı için API key belirlemek isterseniz aşağıya giriniz. (İsteğe bağlı)</p>
                                <div class="platform-display">
                                    <span class="platform-badge" id="platformDisplay"></span>
                                </div>
                            </div>
                            
                            <form id="apiKeyForm" class="api-key-form">
                                <div class="form-group">
                                    <label for="apiKeyInput">API Key</label>
                                    <input type="password" id="apiKeyInput" name="apiKeyInput" placeholder="API key giriniz..." required>
                                    <div class="show-hide-toggle">
                                        <input type="checkbox" id="showApiKey">
                                        <label for="showApiKey" class="toggle-label">Göster</label>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="apiKeyDescription">Açıklama (İsteğe Bağlı)</label>
                                    <textarea id="apiKeyDescription" name="apiKeyDescription" placeholder="Bu API key neyin için kullanılacak? (örn: Hashtag tracking, Post scheduling)..." rows="3"></textarea>
                                </div>
                                
                                <div class="form-actions">
                                    <button type="button" class="btn-iptal" onclick="document.getElementById('apiKeyModal').style.display='none';">Atla</button>
                                    <button type="submit" class="btn-kaydet">Kaydet</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            modal = document.getElementById('apiKeyModal');
            
            // Show/Hide toggle
            const showApiKeyCheckbox = modal.querySelector('#showApiKey');
            const apiKeyInput = modal.querySelector('#apiKeyInput');
            if (showApiKeyCheckbox) {
                showApiKeyCheckbox.addEventListener('change', (e) => {
                    apiKeyInput.type = e.target.checked ? 'text' : 'password';
                });
            }
            
            // Form submit handler
            const form = modal.querySelector('#apiKeyForm');
            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    await this.saveWithApiKey(
                        userId,
                        platform,
                        url,
                        document.getElementById('apiKeyInput').value,
                        document.getElementById('apiKeyDescription').value
                    );
                });
            }
            
            // CSS stillerini ekle
            if (!document.getElementById('api-key-modal-styles')) {
                const style = document.createElement('style');
                style.id = 'api-key-modal-styles';
                style.textContent = `
                    .api-key-modal {
                        max-width: 500px;
                    }
                    
                    .api-key-info {
                        margin-bottom: 25px;
                        padding-bottom: 20px;
                        border-bottom: 1px solid rgba(232, 133, 202, 0.2);
                    }
                    
                    .info-text {
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 0.9rem;
                        line-height: 1.6;
                        margin: 0 0 15px 0;
                    }
                    
                    .platform-display {
                        display: flex;
                        gap: 10px;
                        align-items: center;
                    }
                    
                    .platform-badge {
                        display: inline-block;
                        padding: 8px 16px;
                        background: linear-gradient(135deg, rgba(232, 133, 202, 0.3), rgba(220, 100, 180, 0.2));
                        border: 1px solid rgba(232, 133, 202, 0.4);
                        border-radius: 20px;
                        color: rgba(255, 255, 255, 0.9);
                        font-weight: 600;
                        font-size: 0.9rem;
                    }
                    
                    .api-key-form .form-group {
                        margin-bottom: 20px;
                        position: relative;
                    }
                    
                    .api-key-form label {
                        display: block;
                        margin-bottom: 8px;
                        color: rgba(255, 255, 255, 0.7);
                        font-size: 0.9rem;
                        font-weight: 600;
                    }
                    
                    .api-key-form input[type="password"],
                    .api-key-form input[type="text"],
                    .api-key-form textarea {
                        width: 100%;
                        padding: 12px;
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(232, 133, 202, 0.3);
                        border-radius: 8px;
                        color: white;
                        font-size: 0.95rem;
                        font-family: inherit;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    }
                    
                    .api-key-form input[type="password"]:focus,
                    .api-key-form input[type="text"]:focus,
                    .api-key-form textarea:focus {
                        outline: none;
                        border-color: rgb(232, 133, 202);
                        background: rgba(232, 133, 202, 0.1);
                        box-shadow: 0 0 10px rgba(232, 133, 202, 0.2);
                    }
                    
                    .show-hide-toggle {
                        position: absolute;
                        right: 12px;
                        top: 40px;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                    }
                    
                    .show-hide-toggle input[type="checkbox"] {
                        width: auto;
                        height: auto;
                        margin: 0;
                        cursor: pointer;
                        accent-color: rgb(232, 133, 202);
                    }
                    
                    .toggle-label {
                        color: rgba(255, 255, 255, 0.5);
                        font-size: 0.8rem;
                        cursor: pointer;
                        margin: 0;
                    }
                    
                    .form-actions {
                        display: flex;
                        gap: 12px;
                        margin-top: 25px;
                        padding-top: 20px;
                        border-top: 1px solid rgba(232, 133, 202, 0.2);
                    }
                    
                    .btn-iptal,
                    .btn-kaydet {
                        flex: 1;
                        padding: 12px 20px;
                        border: none;
                        border-radius: 8px;
                        font-size: 0.95rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    
                    .btn-iptal {
                        background: rgba(232, 133, 202, 0.1);
                        border: 1px solid rgba(232, 133, 202, 0.3);
                        color: rgb(232, 133, 202);
                    }
                    
                    .btn-iptal:hover {
                        background: rgba(232, 133, 202, 0.2);
                        border-color: rgba(232, 133, 202, 0.5);
                    }
                    
                    .btn-kaydet {
                        background: linear-gradient(135deg, rgb(232, 133, 202), rgb(220, 100, 180));
                        color: white;
                    }
                    
                    .btn-kaydet:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 5px 15px rgba(232, 133, 202, 0.3);
                    }
                    
                    .btn-kaydet:disabled {
                        opacity: 0.6;
                        cursor: not-allowed;
                        transform: none;
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        // Platform badge'ini güncelle
        let platformEmoji = '🔗';
        if (platform === 'Instagram') platformEmoji = '📸';
        else if (platform === 'YouTube') platformEmoji = '▶️';
        else if (platform === 'TikTok') platformEmoji = '🎵';
        else if (platform === 'Twitter') platformEmoji = '𝕏';
        else if (platform === 'LinkedIn') platformEmoji = '💼';
        else if (platform === 'Facebook') platformEmoji = '👥';
        else if (platform === 'Twitch') platformEmoji = '🎮';
        else if (platform === 'Pinterest') platformEmoji = '📌';
        else if (platform === 'Snapchat') platformEmoji = '👻';
        
        const platformDisplay = document.getElementById('platformDisplay');
        if (platformDisplay) {
            platformDisplay.textContent = `${platformEmoji} ${platform}`;
        }
        
        // Modal'ı göster
        if (modal) {
            modal.style.display = 'flex';
            
            // Overlay'e tıklanırsa modal'ı kapat
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    }

    /**
     * API key ile bağlantıyı kaydet
     */
    async saveWithApiKey(userId, platform, url, apiKey, description) {
        try {
            console.log('💾 Bağlantı + API Key kaydediliyor:', { userId, platform, url, apiKey: apiKey ? '***' : 'empty', description });
            
            // API'ye POST isteği gönder
            const response = await fetch('/api/save-baglanti', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    influencer_id: userId,
                    platform: platform,
                    url: url,
                    api_key: apiKey || null,
                    description: description || null
                })
            });
            
            const data = await response.json();
            console.log('📥 API Yanıtı:', data);
            
            if (data.success) {
                alert('✅ Bağlantı ve API key başarıyla eklendi!');
                
                // Modal'ları kapat
                const apiKeyModal = document.getElementById('apiKeyModal');
                const addBaglantiModal = document.getElementById('addBaglantiModal');
                if (apiKeyModal) apiKeyModal.style.display = 'none';
                if (addBaglantiModal) addBaglantiModal.style.display = 'none';
                
                // Bağlantılar modal'ını yenile
                this.loadBaglantilarContent();
            } else {
                alert('❌ ' + (data.message || 'Bağlantı eklenirken hata oluştu'));
            }
        } catch (error) {
            console.error('❌ Bağlantı + API Key kayıt hatası:', error);
            alert('❌ Bir hata oluştu. Lütfen tekrar deneyin: ' + error.message);
        }
    }

    /**
     * Hesabı Tamamla Modal'ını aç
     */
    openHesabıTamamlaModal() {
        // Modal'ın HTML'sini oluştur
        let modal = document.getElementById('hesabıTamamlaModal');
        
        if (!modal) {
            const modalHTML = `
                <div id="hesabıTamamlaModal" class="modal-overlay">
                    <div class="modal-container hesabi-tamamla-modal">
                        <div class="modal-header">
                            <h2>✓ Hesabı Tamamla</h2>
                            <button class="modal-close-btn" onclick="document.getElementById('hesabıTamamlaModal').style.display='none';">&times;</button>
                        </div>
                        <div class="modal-content hesabi-tamamla-content">
                            <!-- Kart 1: Ödeme Bilgileri -->
                            <div class="form-card">
                                <h3 class="form-card-title">Ödeme Bilgileri</h3>
                                <form id="kimlikForm" class="hesabi-tamamla-form">
                                    <div class="form-group">
                                        <label for="tcNo">TC Kimlik No (11 Haneli)</label>
                                        <input type="text" id="tcNo" name="tcNo" placeholder="12345678901" maxlength="11" inputmode="numeric" required>
                                        <span class="form-error" id="tcError"></span>
                                    </div>
                                    <div class="form-group">
                                        <label for="adres">Adres</label>
                                        <textarea id="adres" name="adres" placeholder="Tam adresinizi giriniz..." rows="3" required></textarea>
                                        <span class="form-error" id="adresError"></span>
                                    </div>
                                    <div class="form-group">
                                        <label for="iban">IBAN (26 Haneli)</label>
                                        <input type="text" id="iban" name="iban" placeholder="TR1234567890123456789012345" maxlength="26" required>
                                        <span class="form-error" id="ibanError"></span>
                                    </div>
                                </form>
                            </div>

                            <!-- Kart 2: Adres Bilgileri -->
                            <div class="form-card">
                                <h3 class="form-card-title">📍 Adres Bilgileri</h3>
                                <form id="adresForm" class="hesabi-tamamla-form">
                                    <div class="form-group">
                                        <label for="ulke">Ülke</label>
                                        <input type="text" id="ulke" name="ulke" placeholder="Türkiye" required>
                                        <span class="form-error" id="ulkeError"></span>
                                    </div>
                                    <div class="form-group">
                                        <label for="sehir">Şehir</label>
                                        <input type="text" id="sehir" name="sehir" placeholder="İstanbul, Ankara, vb..." required>
                                        <span class="form-error" id="sehirError"></span>
                                    </div>
                                    <div class="form-group">
                                        <label for="adresDetay">Adres Detayı</label>
                                        <textarea id="adresDetay" name="adresDetay" placeholder="Açık adresinizi giriniz..." rows="3" required></textarea>
                                        <span class="form-error" id="adresDetayError"></span>
                                    </div>
                                </form>
                            </div>

                            <!-- Kart 3: İlgi Alanları -->
                            <div class="form-card">
                                <h3 class="form-card-title">💼 İlgi Alanları</h3>
                                <form id="ilgiAlanlarForm" class="hesabi-tamamla-form">
                                    <div class="form-group">
                                        <label for="ilgiAlanSelect">İlgi Alanlarınızı Seçin (Birden fazla seçebilirsiniz)</label>
                                        <select id="ilgiAlanSelect" name="ilgiAlanSelect" multiple required style="min-height: 150px;">
                                            <option value="Lifestyle">Lifestyle</option>
                                            <option value="Moda">Moda</option>
                                            <option value="Teknoloji">Teknoloji</option>
                                            <option value="Vegan Yaşam">Vegan Yaşam</option>
                                            <option value="Doğal Ürünler">Doğal Ürünler</option>
                                            <option value="Kozmetik">Kozmetik</option>
                                            <option value="Spor">Spor</option>
                                            <option value="Anne-Bebek">Anne-Bebek</option>
                                            <option value="Oyun">Oyun</option>
                                            <option value="El Yapımı">El Yapımı</option>
                                            <option value="Eğitim">Eğitim</option>
                                            <option value="Sürdürülebilir Moda">Sürdürülebilir Moda</option>
                                            <option value="İnceleme">İnceleme</option>
                                            <option value="Cilt Bakımı">Cilt Bakımı</option>
                                            <option value="3D Tasarım & Teknoloji">3D Tasarım & Teknoloji</option>
                                            <option value="Diğer">Diğer</option>
                                        </select>
                                        <small style="color: #666; margin-top: 8px; display: block;">💡 Mac/Linux: Ctrl+Click, Windows: Ctrl+Click kullanarak birden fazla seçim yapabilirsiniz</small>
                                        <span class="form-error" id="ilgiAlanlarError"></span>
                                    </div>
                                </form>
                            </div>

                            <!-- Kart 4: E-posta Doğrulama -->
                            <div class="form-card">
                                <h3 class="form-card-title">E-posta Doğrulama</h3>
                                <form id="epostaForm" class="hesabi-tamamla-form">
                                    <div class="form-group">
                                        <label for="epostaDogru">E-posta Doğrula</label>
                                        <div class="eposta-verify-group">
                                            <input type="email" id="epostaDogru" name="epostaDogru" placeholder="E-postanız: email@example.com" readonly>
                                            <button type="button" class="btn-verify-code" id="sendCodeBtn">Kod Gönder</button>
                                        </div>
                                        <span class="form-error" id="epostaError"></span>
                                    </div>
                                    <div class="form-group" id="codeInputGroup" style="display: none;">
                                        <label for="verificationCode">Doğrulama Kodu</label>
                                        <input type="text" id="verificationCode" name="verificationCode" placeholder="6 haneli kodu giriniz" maxlength="6" inputmode="numeric">
                                        <button type="button" class="btn-verify-submit" id="verifyCodeBtn">Doğrula</button>
                                        <span class="form-error" id="codeError"></span>
                                    </div>
                                </form>
                            </div>

                            <!-- Action Buttons -->
                            <div class="modal-actions">
                                <button class="btn-cancel" onclick="document.getElementById('hesabıTamamlaModal').style.display='none';">İptal</button>
                                <button class="btn-save" id="saveAccountBtn">Kaydet</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            modal = document.getElementById('hesabıTamamlaModal');
            
            // Event listeners ekle
            this.setupHesabıTamamlaEvents();
        }
        
        // Modal'ı göster
        if (modal) {
            modal.style.display = 'flex';
            
            // Overlay'e tıklanırsa modal'ı kapat
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    }

    /**
     * Marka için Hesabı Doğrula Modal'ını aç
     */
    openHesabıDoğrulaModal() {
        // Modal'ın HTML'sini oluştur
        let modal = document.getElementById('hesabıDoğrulaModal');
        
        if (!modal) {
            const modalHTML = `
                <div id="hesabıDoğrulaModal" class="modal-overlay">
                    <div class="modal-container hesabi-tamamla-modal">
                        <div class="modal-header">
                            <h2>✓ Hesabı Doğrula</h2>
                            <button class="modal-close-btn" onclick="document.getElementById('hesabıDoğrulaModal').style.display='none';">&times;</button>
                        </div>
                        <div class="modal-content hesabi-tamamla-content">
                            <!-- Kart 1: Fatura Bilgileri -->
                            <div class="form-card">
                                <h3 class="form-card-title">Fatura Bilgileri</h3>
                                <form id="faturaForm" class="hesabi-tamamla-form">
                                    <div class="form-group">
                                        <label for="faturaAdresi">Fatura Adresi</label>
                                        <textarea id="faturaAdresi" name="faturaAdresi" placeholder="Fatura adresinizi giriniz..." rows="3" required></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="vergino">Vergi No</label>
                                        <input type="text" id="vergino" name="vergino" placeholder="Vergi numaranız" required>
                                    </div>
                                </form>
                            </div>

                            <!-- Kart 2: Kart Bilgileri -->
                            <div class="form-card">
                                <h3 class="form-card-title">Kart Bilgileri</h3>
                                <form id="kartForm" class="hesabi-tamamla-form">
                                    <div class="form-group">
                                        <label for="kartNumarasi">Kart Numarası</label>
                                        <input type="text" id="kartNumarasi" name="kartNumarasi" placeholder="1234 5678 9012 3456" maxlength="19" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="kartAdı">Kart Sahibinin Adı</label>
                                        <input type="text" id="kartAdı" name="kartAdı" placeholder="Ad Soyad" required>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group" style="flex: 1;">
                                            <label for="kartAyAl">Ay/Yıl</label>
                                            <input type="text" id="kartAyAl" name="kartAyAl" placeholder="MM/YY" maxlength="5" required>
                                        </div>
                                        <div class="form-group" style="flex: 1; margin-left: 10px;">
                                            <label for="cvv">CVV</label>
                                            <input type="text" id="cvv" name="cvv" placeholder="123" maxlength="3" required>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <!-- Kart 3: E-posta Doğrulama -->
                            <div class="form-card">
                                <h3 class="form-card-title">E-posta Doğrulama</h3>
                                <form id="epostaDogrulaForm" class="hesabi-tamamla-form">
                                    <div class="form-group">
                                        <label for="epostaDogrula">E-posta Doğrula</label>
                                        <div class="eposta-verify-group">
                                            <input type="email" id="epostaDogrula" name="epostaDogrula" placeholder="E-postanız: email@example.com" readonly>
                                            <button type="button" class="btn-verify-code" id="sendCodeBtn">Kod Gönder</button>
                                        </div>
                                    </div>
                                    <div class="form-group" id="codeInputGroup" style="display: none;">
                                        <label for="verificationCode">Doğrulama Kodu</label>
                                        <input type="text" id="verificationCode" name="verificationCode" placeholder="6 haneli kodu giriniz" maxlength="6" inputmode="numeric">
                                        <button type="button" class="btn-verify-submit" id="verifyCodeBtn">Doğrula</button>
                                    </div>
                                </form>
                            </div>

                            <!-- Action Buttons -->
                            <div class="modal-actions">
                                <button class="btn-cancel" id="iptalBtn">İptal</button>
                                <button class="btn-save" id="saveAccountBtn">Kaydet</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            modal = document.getElementById('hesabıDoğrulaModal');
            
            // İptal butonuna event listener ekle
            const iptalBtn = modal.querySelector('#iptalBtn');
            if (iptalBtn) {
                iptalBtn.addEventListener('click', () => {
                    modal.style.display = 'none';
                });
            }

            // E-posta alanını doldur
            const epostaDogrulaInput = modal.querySelector('#epostaDogrula');
            if (epostaDogrulaInput) {
                const user = localStorage.getItem('user');
                if (user) {
                    try {
                        const userData = JSON.parse(user);
                        epostaDogrulaInput.value = userData.email || '';
                    } catch (error) {
                        console.error('E-posta set etme hatası:', error);
                    }
                }
            }

            // Kod Gönder Butonu
            const sendCodeBtn = modal.querySelector('#sendCodeBtn');
            if (sendCodeBtn) {
                sendCodeBtn.addEventListener('click', () => {
                    const codeInputGroup = modal.querySelector('#codeInputGroup');
                    if (codeInputGroup) {
                        codeInputGroup.style.display = 'block';
                        // Doğrulama kodu input'una focus ver
                        const codeInput = modal.querySelector('#verificationCode');
                        if (codeInput) {
                            codeInput.focus();
                        }
                    }
                });
            }

            // Kaydet Butonu
            const kaydetBtn = modal.querySelector('#saveAccountBtn');
            if (kaydetBtn) {
                kaydetBtn.addEventListener('click', async () => {
                    // Form validation
                    const faturaAdresi = modal.querySelector('#faturaAdresi')?.value?.trim();
                    const vergino = modal.querySelector('#vergino')?.value?.trim();
                    const kartNumarasi = modal.querySelector('#kartNumarasi')?.value?.trim();
                    const kartAdı = modal.querySelector('#kartAdı')?.value?.trim();
                    const kartAyAl = modal.querySelector('#kartAyAl')?.value?.trim();
                    const cvv = modal.querySelector('#cvv')?.value?.trim();

                    // Validation kontrolleri
                    if (!faturaAdresi || !vergino || !kartNumarasi || !kartAdı || !kartAyAl || !cvv) {
                        alert('❌ Lütfen tüm alanları doldurunuz!');
                        return;
                    }

                    // Kart numarası format kontrolü (16-19 digit)
                    const cleanCardNumber = kartNumarasi.replace(/\s/g, '');
                    if (!/^\d{16,19}$/.test(cleanCardNumber)) {
                        alert('❌ Kart numarası geçersiz!');
                        return;
                    }

                    // CVV format kontrolü (3-4 digit)
                    if (!/^\d{3,4}$/.test(cvv)) {
                        alert('❌ CVV geçersiz!');
                        return;
                    }

                    // Ay/Yıl format kontrolü
                    if (!/^\d{2}\/\d{2}$/.test(kartAyAl)) {
                        alert('❌ Ay/Yıl formatı yanlış! (MM/YY olmalı)');
                        return;
                    }

                    // localStorage'dan user bilgilerini al
                    const user = localStorage.getItem('user');
                    if (!user) {
                        alert('❌ Kullanıcı bilgisi bulunamadı!');
                        return;
                    }

                    try {
                        const userData = JSON.parse(user);
                        const markaId = userData.id;
                        const markaAdi = userData.markaAdi || userData.sirketAdi;
                        const eposta = userData.email;

                        console.log('📤 Gönderilen veriler:', { markaId, markaAdi, faturaAdresi, vergino, kartNumarasi: cleanCardNumber, kartAdı, kartAyAl, cvv, eposta });

                        // API'ye POST isteği gönder
                        const response = await fetch('/api/save-marka-verification-info', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                markaId,
                                markaAdi,
                                faturaAdresi,
                                vergino,
                                kartNumarasi: cleanCardNumber,
                                kartAdı,
                                kartAyAl,
                                cvv,
                                eposta
                            })
                        });

                        console.log('📥 API Yanıtı status:', response.status);
                        const data = await response.json();
                        console.log('📥 API Yanıt verisi:', data);

                        if (data.success) {
                            alert('✅ ' + data.message);
                            modal.style.display = 'none';
                        } else {
                            alert('❌ ' + data.message);
                        }
                    } catch (error) {
                        console.error('❌ Hata:', error);
                        console.error('Hata detayı:', error.message);
                        alert('❌ Bir hata oluştu. Lütfen tekrar deneyin.');
                    }
                });
            }
        }
        
        // Modal'ı göster
        if (modal) {
            modal.style.display = 'flex';
            
            // Overlay'e tıklanırsa modal'ı kapat
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    }

    /**
     * Hesabı Tamamla Modal Event Listeners
     */
    setupHesabıTamamlaEvents() {
        const tcNo = document.getElementById('tcNo');
        const iban = document.getElementById('iban');
        const ulke = document.getElementById('ulke');
        const sehir = document.getElementById('sehir');
        const adresDetay = document.getElementById('adresDetay');
        const ilgiAlanSelect = document.getElementById('ilgiAlanSelect');
        const sendCodeBtn = document.getElementById('sendCodeBtn');
        const verifyCodeBtn = document.getElementById('verifyCodeBtn');
        const saveAccountBtn = document.getElementById('saveAccountBtn');
        const epostaDogru = document.getElementById('epostaDogru');
        const codeInputGroup = document.getElementById('codeInputGroup');

        // Giriş yapan kullanıcının e-postasını göster
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.email) {
                epostaDogru.value = user.email;
            }
            // Ülke için varsayılan değer
            if (ulke && !ulke.value) {
                ulke.value = 'Türkiye';
            }
        } catch (error) {
            console.error('User bilgisi hatası:', error);
        }

        // TC Kimlik No validasyonu
        if (tcNo) {
            tcNo.addEventListener('blur', () => {
                const value = tcNo.value.trim();
                const tcError = document.getElementById('tcError');
                if (value && (isNaN(value) || value.length !== 11)) {
                    tcError.textContent = '❌ TC Kimlik No 11 haneli olmalıdır ve sadece sayı içermelidir';
                    tcNo.classList.add('input-error');
                } else {
                    tcError.textContent = '';
                    tcNo.classList.remove('input-error');
                }
            });
        }

        // IBAN validasyonu
        if (iban) {
            iban.addEventListener('blur', () => {
                const value = iban.value.trim().toUpperCase();
                const ibanError = document.getElementById('ibanError');
                if (value && value.length !== 26) {
                    ibanError.textContent = '❌ IBAN 26 haneli olmalıdır';
                    iban.classList.add('input-error');
                } else if (value && !value.startsWith('TR')) {
                    ibanError.textContent = '❌ IBAN TR ile başlamalıdır';
                    iban.classList.add('input-error');
                } else {
                    ibanError.textContent = '';
                    iban.classList.remove('input-error');
                }
            });
        }

        // Ülke validasyonu
        if (ulke) {
            ulke.addEventListener('blur', () => {
                const value = ulke.value.trim();
                const ulkeError = document.getElementById('ulkeError');
                if (!value) {
                    ulkeError.textContent = '❌ Lütfen ülke giriniz';
                    ulke.classList.add('input-error');
                } else {
                    ulkeError.textContent = '';
                    ulke.classList.remove('input-error');
                }
            });
        }

        // Şehir validasyonu
        if (sehir) {
            sehir.addEventListener('blur', () => {
                const value = sehir.value.trim();
                const sehirError = document.getElementById('sehirError');
                if (!value) {
                    sehirError.textContent = '❌ Lütfen şehir giriniz';
                    sehir.classList.add('input-error');
                } else {
                    sehirError.textContent = '';
                    sehir.classList.remove('input-error');
                }
            });
        }

        // Adres Detayı validasyonu
        if (adresDetay) {
            adresDetay.addEventListener('blur', () => {
                const value = adresDetay.value.trim();
                const adresDetayError = document.getElementById('adresDetayError');
                if (!value) {
                    adresDetayError.textContent = '❌ Lütfen adres detayı giriniz';
                    adresDetay.classList.add('input-error');
                } else {
                    adresDetayError.textContent = '';
                    adresDetay.classList.remove('input-error');
                }
            });
        }

        // İlgi Alanları seçim ve validasyonu
        if (ilgiAlanSelect) {
            ilgiAlanSelect.addEventListener('change', () => {
                const selectedOptions = Array.from(ilgiAlanSelect.selectedOptions);
                const ilgiAlanlarError = document.getElementById('ilgiAlanlarError');
                
                if (selectedOptions.length === 0) {
                    ilgiAlanlarError.textContent = '❌ Lütfen en az bir ilgi alanı seçiniz';
                    ilgiAlanSelect.classList.add('input-error');
                } else {
                    ilgiAlanlarError.textContent = '';
                    ilgiAlanSelect.classList.remove('input-error');
                }
            });
        }

        // Kod gönder
        if (sendCodeBtn) {
            sendCodeBtn.addEventListener('click', () => {
                console.log('📧 E-posta doğrulama kodu gönderiliyor...');
                sendCodeBtn.textContent = 'Kod Gönderildi ✓';
                sendCodeBtn.disabled = true;
                codeInputGroup.style.display = 'block';
                
                // 60 saniye sonra tekrar gönderme butonunu etkinleştir
                setTimeout(() => {
                    sendCodeBtn.textContent = 'Kod Gönder';
                    sendCodeBtn.disabled = false;
                }, 60000);
            });
        }

        // Kodu doğrula
        if (verifyCodeBtn) {
            verifyCodeBtn.addEventListener('click', () => {
                const code = document.getElementById('verificationCode').value.trim();
                const codeError = document.getElementById('codeError');
                
                if (!code || code.length !== 6) {
                    codeError.textContent = '❌ Lütfen 6 haneli kodu giriniz';
                    return;
                }
                
                console.log('✓ Kod doğrulandı');
                codeError.textContent = '';
                verifyCodeBtn.textContent = 'Doğrulandı ✓';
                verifyCodeBtn.disabled = true;
                document.getElementById('verificationCode').disabled = true;
            });
        }

        // Kaydet
        if (saveAccountBtn) {
            saveAccountBtn.addEventListener('click', () => {
                const tcValue = tcNo.value.trim();
                const adresValue = document.getElementById('adres').value.trim();
                const ibanValue = iban.value.trim().toUpperCase();
                const codeValue = document.getElementById('verificationCode').value.trim();
                const ulkeValue = ulke.value.trim();
                const sehirValue = sehir.value.trim();
                const adresDetayValue = adresDetay.value.trim();
                
                // İlgi alanlarını seç
                const selectedOptions = Array.from(ilgiAlanSelect.selectedOptions);
                const ilgiAlanları = selectedOptions.map(option => option.value).join(', ');

                // Validasyonlar
                if (!tcValue || tcValue.length !== 11 || isNaN(tcValue)) {
                    alert('❌ Lütfen geçerli bir TC Kimlik No giriniz (11 haneli)');
                    return;
                }
                if (!adresValue) {
                    alert('❌ Lütfen adres giriniz');
                    return;
                }
                if (!ibanValue || ibanValue.length !== 26 || !ibanValue.startsWith('TR')) {
                    alert('❌ Lütfen geçerli bir IBAN giriniz (26 haneli, TR ile başlayan)');
                    return;
                }
                if (!codeValue || codeValue.length !== 6) {
                    alert('❌ Lütfen e-postanızı doğrulayın');
                    return;
                }
                if (!ulkeValue) {
                    alert('❌ Lütfen ülke giriniz');
                    return;
                }
                if (!sehirValue) {
                    alert('❌ Lütfen şehir giriniz');
                    return;
                }
                if (!adresDetayValue) {
                    alert('❌ Lütfen adres detayını giriniz');
                    return;
                }
                if (selectedOptions.length === 0) {
                    alert('❌ Lütfen en az bir ilgi alanı seçiniz');
                    return;
                }

                console.log('💾 Tüm bilgiler kaydediliyor:', { tcValue, adresValue, ibanValue, ulkeValue, sehirValue, adresDetayValue, ilgiAlanları });

                // Server'a kaydet
                this.saveAccountInfo(tcValue, adresValue, ibanValue, ulkeValue, sehirValue, adresDetayValue, ilgiAlanları);
            });
        }
    }

    /**
     * Hesap bilgilerini server'a kaydet (Ödeme + Adres + İlgi Alanları)
     */
    async saveAccountInfo(tcNo, adres, iban, ulke, sehir, adresDetay, ilgiAlanları) {
        try {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            
            if (!token || !user) {
                alert('❌ Oturum hatası. Lütfen tekrar giriş yapınız.');
                return;
            }

            const userData = JSON.parse(user);
            const influencerId = userData.id;

            console.log('📤 POST /api/save-account-info gönderiliyor...', {
                influencerId,
                tcNo,
                adres,
                iban,
                ulke,
                sehir,
                adresDetay,
                ilgiAlanları
            });

            const response = await fetch('/api/save-account-info', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    influencerId,
                    tcNo,
                    adres,
                    iban,
                    ulke,
                    sehir,
                    adresDetay,
                    ilgiAlanları
                })
            });

            const data = await response.json();
            console.log('📍 Response:', data);

            if (data.success) {
                console.log('✅ Hesap bilgileri kaydedildi!');
                alert('✅ Hesap bilgileri başarıyla kaydedildi!');
                
                // Modal'ı kapat
                const modal = document.getElementById('hesabıTamamlaModal');
                if (modal) {
                    modal.style.display = 'none';
                }
            } else {
                alert('❌ ' + (data.message || 'Kaydedilirken hata oluştu'));
            }
        } catch (error) {
            console.error('❌ Kayıt hatası:', error);
            alert('❌ Bir hata oluştu. Lütfen tekrar deneyin: ' + error.message);
        }
    }

    /**
     * Ödeme bilgilerini server'a kaydet (eski fonksiyon)
     */
    async savePaymentInfo(tcNo, adres, iban) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('❌ Oturum hatası. Lütfen tekrar giriş yapınız.');
                return;
            }

            console.log('📤 POST /api/save-payment-info gönderiliyor...');
            const response = await fetch('/api/save-payment-info', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tcNo,
                    adres,
                    iban
                })
            });

            const data = await response.json();
            console.log('📍 Response:', data);

            if (data.success) {
                console.log('✅ Ödeme bilgileri kaydedildi!');
                alert('✅ Ödeme bilgileri başarıyla kaydedildi!');
                
                // Modal'ı kapat
                const modal = document.getElementById('hesabıTamamlaModal');
                if (modal) {
                    modal.style.display = 'none';
                }
            } else {
                alert('❌ ' + (data.message || 'Kaydedilirken hata oluştu'));
            }
        } catch (error) {
            console.error('❌ Kayıt hatası:', error);
            alert('❌ Bir hata oluştu. Lütfen tekrar deneyin: ' + error.message);
        }
    }

    /**
     * influencer_kullanici_adi'ni influencers_csv.json'dan al ve header'da göster
     */
    async loadInfluencerUsername(userData, userNameEl, displayUserNameEl) {
        try {
            const response = await fetch('/data/influencers_csv.json');
            if (!response.ok) {
                throw new Error('influencers_csv.json yüklenemedi');
            }

            const influencersData = await response.json();
            
            // Giriş yapan kullanıcının ID'sini kullan
            const userId = userData.id;
            
            // influencers_csv.json'da bu ID'ye sahip kullanıcıyı bul
            const influencerRecord = influencersData.find(inf => inf.influencer_id === userId);
            
            if (influencerRecord && influencerRecord.influencer_kullanici_adi) {
                const username = influencerRecord.influencer_kullanici_adi;
                console.log('✅ Username bulundu:', username);
                
                if (userNameEl) userNameEl.textContent = username;
                if (displayUserNameEl) displayUserNameEl.textContent = username;
            } else {
                // Username bulunamazsa fallback olarak ad soyadı göster
                const fallbackName = userData.adSoyad || 'Kullanıcı';
                console.log('⚠️ Username bulunamadı, fallback kullanılıyor:', fallbackName);
                
                if (userNameEl) userNameEl.textContent = fallbackName;
                if (displayUserNameEl) displayUserNameEl.textContent = fallbackName;
            }
        } catch (error) {
            console.error('❌ Username yükleme hatası:', error);
            
            // Hata durumunda ad soyadı göster
            const fallbackName = userData.adSoyad || 'Kullanıcı';
            if (userNameEl) userNameEl.textContent = fallbackName;
            if (displayUserNameEl) displayUserNameEl.textContent = fallbackName;
        }
    }
}

// Scroll Event Listener - Header opaklaş/transparan
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav.main-header');
    if (nav) {
        if (window.scrollY > 50) {
            // Sayfayı scroll yapınca background color ekle
            nav.style.backgroundColor = 'rgba(4, 0, 29, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
        } else {
            // Scroll top'a döndüğünde transparent yap
            nav.style.backgroundColor = 'transparent';
            nav.style.backdropFilter = 'none';
            nav.style.boxShadow = 'none';
        }
    }
});

// Sayfa yüklendiğinde header manager'ı başlat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.headerManager = new HeaderManager();
    });
} else {
    window.headerManager = new HeaderManager();
}
