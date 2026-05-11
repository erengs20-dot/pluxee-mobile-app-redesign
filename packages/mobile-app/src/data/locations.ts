// Lokasyon data — Pluxee'li Noktalar filtre Lokasyon tab'i icin
// 81 il (Istanbul/Ankara/Izmir oncelikli, kalani alfabetik)

export interface LocationCity {
  name: string;
  districts: LocationDistrict[];
}

export interface LocationDistrict {
  name: string;
  neighborhoods: string[];
}

export const LOCATION_CITIES: LocationCity[] = [
  {
    name: 'İstanbul',
    districts: [
      { name: 'Maltepe', neighborhoods: ['Bağlarbaşı Mh.', 'Cevizli Mh.', 'Esenkent Mh.', 'Feyzullah Mh.'] },
      { name: 'Kadıköy', neighborhoods: ['Caddebostan Mh.', 'Fenerbahçe Mh.', 'Göztepe Mh.', 'Suadiye Mh.'] },
      { name: 'Beşiktaş', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Şişli', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Beyoğlu', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Üsküdar', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Bakırköy', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Ataşehir', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Ankara',
    districts: [
      { name: 'Çankaya', neighborhoods: ['Bahçelievler Mh.', 'Çukurambar Mh.', 'Kızılay Mh.', 'Oran Mh.'] },
      { name: 'Keçiören', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yenimahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Mamak', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Etimesgut', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Sincan', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'İzmir',
    districts: [
      { name: 'Konak', neighborhoods: ['Alsancak Mh.', 'Basmane Mh.', 'Çankaya Mh.', 'Kahramanlar Mh.'] },
      { name: 'Bornova', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Karşıyaka', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Buca', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Çiğli', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Gaziemir', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Adana',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Adıyaman',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Afyonkarahisar',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Aksaray',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Amasya',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Antalya',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Ardahan',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Artvin',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Aydın',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Ağrı',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Balıkesir',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Bartın',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Batman',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Bayburt',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Bilecik',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Bingöl',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Bitlis',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Bolu',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Burdur',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Bursa',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Çanakkale',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Çankırı',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Çorum',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Denizli',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Diyarbakır',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Düzce',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Edirne',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Elazığ',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Erzincan',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Erzurum',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Eskişehir',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Gaziantep',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Giresun',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Gümüşhane',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Hakkari',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Hatay',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Isparta',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Iğdır',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Kahramanmaraş',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Karabük',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Karaman',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Kars',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Kastamonu',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Kayseri',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Kilis',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Kocaeli',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Konya',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Kütahya',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Kırklareli',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Kırıkkale',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Kırşehir',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Malatya',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Manisa',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Mardin',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Mersin',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Muğla',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Muş',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Nevşehir',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Niğde',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Ordu',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Osmaniye',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Rize',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Sakarya',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Samsun',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Şanlıurfa',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Siirt',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Sinop',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Sivas',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Şırnak',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Tekirdağ',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Tokat',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Trabzon',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Tunceli',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Uşak',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Van',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Yalova',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Yozgat',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
  {
    name: 'Zonguldak',
    districts: [
      { name: 'Merkez', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Yeni Mahalle', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
      { name: 'Atatürk', neighborhoods: ['Cumhuriyet Mh.', 'Atatürk Mh.', 'Yeni Mh.', 'Fatih Mh.'] },
    ],
  },
];
