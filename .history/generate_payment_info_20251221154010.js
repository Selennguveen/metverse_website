const fs = require('fs');
const path = require('path');

// TC No oluştur (11 haneli)
function generateTCNo() {
  let tcNo = '';
  for (let i = 0; i < 11; i++) {
    tcNo += Math.floor(Math.random() * 10);
  }
  return tcNo;
}

// IBAN oluştur (Türk IBAN formatı)
function generateIBAN() {
  let iban = 'TR';
  for (let i = 0; i < 24; i++) {
    iban += Math.floor(Math.random() * 10);
  }
  return iban;
}

// Adres oluştur
function generateAdres() {
  const cities = [
    'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Gaziantep', 'Konya', 'Kayseri',
    'Samsun', 'Diyarbakır', 'Adana', 'Şanlıurfa', 'Mersin', 'Kocaeli', 'Sakarya', 'Eskişehir',
    'Balıkesir', 'Adıyaman', 'Aydın', 'Bandırma', 'Muğla', 'Manisa', 'Kastamonu', 'Çorum',
    'Bartın', 'Rize', 'Ordu', 'Giresun', 'Sinop', 'Trabzon', 'Gümüşhane', 'Tokat'
  ];
  
  const districts = ['Merkez', 'Ataşehir', 'Beyoğlu', 'Kadıköy', 'Beşiktaş', 'Fatih', 'Eyüp', 'Zeytinburnu'];
  
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  const randomDistrict = districts[Math.floor(Math.random() * districts.length)];
  const randomNumber = Math.floor(Math.random() * 9999) + 1;
  
  return `${randomCity}/${randomDistrict} Mah. ${randomNumber}. Sk.`;
}

// influencers.json oku
const influencersPath = path.join(__dirname, 'data', 'influencers.json');
const influencers = JSON.parse(fs.readFileSync(influencersPath, 'utf-8'));

// Her influencer için ödeme bilgisi oluştur
const paymentInfo = influencers.map(influencer => {
  return {
    id: Date.now() + Math.random(),
    influencerId: influencer.id,
    influencerEmail: influencer.email,
    influencerName: `${influencer.ad} ${influencer.soyad}`,
    tcNo: generateTCNo(),
    adres: generateAdres(),
    iban: generateIBAN(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
});

// payment-info.json dosyasına yaz
const paymentPath = path.join(__dirname, 'data', 'payment-info.json');
fs.writeFileSync(paymentPath, JSON.stringify(paymentInfo, null, 2));

console.log(`✅ ${paymentInfo.length} influencer için ödeme bilgisi oluşturuldu!`);
console.log(`📁 Dosya kaydedildi: ${paymentPath}`);
console.log(`\nÖrnekler:`);
paymentInfo.slice(0, 3).forEach((info, index) => {
  console.log(`\n${index + 1}. ${info.influencerName}`);
  console.log(`   TC No: ${info.tcNo}`);
  console.log(`   IBAN: ${info.iban}`);
  console.log(`   Adres: ${info.adres}`);
});
