/**
 * Lokasyon mock data - Filtrele modal Lokasyon sekmesi icin.
 *
 * Yapi: Sehir (81 il) -> Ilce -> Mahalle (cascading dropdown)
 *
 * Buyuk sehirler (Istanbul, Ankara, Izmir, Bursa, Antalya, Adana) icin
 * gercek ilceler. Diger illerde 3-4 ilce mock + temsili mahalleler.
 *
 * Production'da bu liste Posta Kodlari API'sinden cekilir.
 */

export interface District {
  name: string;
  neighborhoods: string[];
}

export interface City {
  id: string;
  name: string;
  districts: District[];
}

export const TURKEY_CITIES: City[] = [
  {
    id: 'istanbul',
    name: 'Istanbul',
    districts: [
      { name: 'Adalar', neighborhoods: ['Buyukada', 'Heybeliada', 'Burgazada'] },
      { name: 'Arnavutkoy', neighborhoods: ['Hadimkoy', 'Bolluca', 'Tasoluk'] },
      { name: 'Atasehir', neighborhoods: ['Atatürk Mah.', 'Barbaros Mah.', 'Ferhatpasa'] },
      { name: 'Avcilar', neighborhoods: ['Ambarli', 'Cihangir', 'Tahtakale'] },
      { name: 'Bagcilar', neighborhoods: ['Bagcilar Merkez', 'Mahmutbey', 'Yenigun'] },
      { name: 'Bahcelievler', neighborhoods: ['Yenibosna', 'Bahcelievler Merkez', 'Sirinevler'] },
      { name: 'Bakirkoy', neighborhoods: ['Atakoy', 'Florya', 'Yenikoy'] },
      { name: 'Basaksehir', neighborhoods: ['Basaksehir Merkez', 'Kayasehir', 'Bahcesehir'] },
      { name: 'Bayrampasa', neighborhoods: ['Bayrampasa Merkez', 'Yildirim', 'Kartaltepe'] },
      { name: 'Besiktas', neighborhoods: ['Levent', 'Etiler', 'Ortakoy', 'Bebek'] },
      { name: 'Beykoz', neighborhoods: ['Anadolu Hisari', 'Cubuklu', 'Kavacik'] },
      { name: 'Beyoglu', neighborhoods: ['Galata', 'Cihangir', 'Taksim', 'Karakoy'] },
      { name: 'Buyukcekmece', neighborhoods: ['Mimarsinan', 'Tepecik', 'Cumhuriyet'] },
      { name: 'Catalca', neighborhoods: ['Catalca Merkez', 'Ferhatpasa', 'Subasi'] },
      { name: 'Cekmekoy', neighborhoods: ['Cekmekoy Merkez', 'Tasdelen', 'Alemdag'] },
      { name: 'Esenler', neighborhoods: ['Esenler Merkez', 'Davutpasa', 'Ferah'] },
      { name: 'Esenyurt', neighborhoods: ['Esenyurt Merkez', 'Akcaburgaz', 'Sanayi'] },
      { name: 'Eyupsultan', neighborhoods: ['Eyup Merkez', 'Defterdar', 'Goktepe'] },
      { name: 'Fatih', neighborhoods: ['Sultanahmet', 'Sirkeci', 'Aksaray', 'Kucukpazar'] },
      { name: 'Gaziosmanpasa', neighborhoods: ['Gazi Mah.', 'Mevlana', 'Yenidogan'] },
      { name: 'Gungoren', neighborhoods: ['Gungoren Merkez', 'Tozkoparan', 'Genctepe'] },
      { name: 'Kadikoy', neighborhoods: ['Caddebostan', 'Goztepe', 'Moda', 'Fenerbahce'] },
      { name: 'Kagithane', neighborhoods: ['Kagithane Merkez', 'Cendere', 'Hamidiye'] },
      { name: 'Kartal', neighborhoods: ['Kartal Merkez', 'Cevizli', 'Yakacik'] },
      { name: 'Kucukcekmece', neighborhoods: ['Halkali', 'Sefakoy', 'Atakent'] },
      { name: 'Maltepe', neighborhoods: ['Maltepe Merkez', 'Cevizli', 'Idealtepe', 'Kucukyali'] },
      { name: 'Pendik', neighborhoods: ['Pendik Merkez', 'Kurtkoy', 'Kaynarca'] },
      { name: 'Sancaktepe', neighborhoods: ['Sancaktepe Merkez', 'Samandira', 'Sariga'] },
      { name: 'Sariyer', neighborhoods: ['Buyukdere', 'Yenikoy', 'Tarabya'] },
      { name: 'Silivri', neighborhoods: ['Silivri Merkez', 'Selimpasa', 'Gumusyaka'] },
      { name: 'Sile', neighborhoods: ['Sile Merkez', 'Agva', 'Sahilkoy'] },
      { name: 'Sisli', neighborhoods: ['Mecidiyekoy', 'Nisantasi', 'Bomonti', 'Macka'] },
      { name: 'Sultanbeyli', neighborhoods: ['Sultanbeyli Merkez', 'Mecidiye', 'Yavuz Selim'] },
      { name: 'Sultangazi', neighborhoods: ['Sultangazi Merkez', 'Habipler', 'Esentepe'] },
      { name: 'Tuzla', neighborhoods: ['Tuzla Merkez', 'Aydinli', 'Tepeoren'] },
      { name: 'Umraniye', neighborhoods: ['Umraniye Merkez', 'Cakmak', 'Atakent'] },
      { name: 'Uskudar', neighborhoods: ['Uskudar Merkez', 'Cengelkoy', 'Beylerbeyi', 'Kuzguncuk'] },
      { name: 'Zeytinburnu', neighborhoods: ['Zeytinburnu Merkez', 'Telsiz', 'Yedikule'] },
    ],
  },
  {
    id: 'ankara',
    name: 'Ankara',
    districts: [
      { name: 'Cankaya', neighborhoods: ['Kizilay', 'Bahcelievler', 'Cukurambar', 'Oran'] },
      { name: 'Kecioren', neighborhoods: ['Kecioren Merkez', 'Etlik', 'Aktepe'] },
      { name: 'Yenimahalle', neighborhoods: ['Yenimahalle Merkez', 'Demetevler', 'Batikent'] },
      { name: 'Mamak', neighborhoods: ['Mamak Merkez', 'Tuzlucayir', 'Saimekadin'] },
      { name: 'Etimesgut', neighborhoods: ['Etimesgut Merkez', 'Eryaman', 'Bahcekapi'] },
      { name: 'Sincan', neighborhoods: ['Sincan Merkez', 'Andicen', 'Pinarbasi'] },
      { name: 'Altindag', neighborhoods: ['Ulus', 'Hamamonu', 'Hidirlik'] },
    ],
  },
  {
    id: 'izmir',
    name: 'Izmir',
    districts: [
      { name: 'Konak', neighborhoods: ['Alsancak', 'Pasaport', 'Goztepe'] },
      { name: 'Karsiyaka', neighborhoods: ['Bostanli', 'Atakent', 'Mavisehir'] },
      { name: 'Bornova', neighborhoods: ['Bornova Merkez', 'Erzene', 'Kazimdirik'] },
      { name: 'Buca', neighborhoods: ['Buca Merkez', 'Yildiz', 'Inonu'] },
      { name: 'Bayrakli', neighborhoods: ['Bayrakli Merkez', 'Salhane', 'Cumhuriyet'] },
      { name: 'Karabaglar', neighborhoods: ['Karabaglar Merkez', 'Bozyaka', 'Yesilyurt'] },
    ],
  },
  {
    id: 'bursa',
    name: 'Bursa',
    districts: [
      { name: 'Osmangazi', neighborhoods: ['Heykel', 'Tophane', 'Cekirge'] },
      { name: 'Nilufer', neighborhoods: ['Beskayraklar', 'Ataevler', 'Ihsaniye'] },
      { name: 'Yildirim', neighborhoods: ['Yildirim Merkez', 'Esenevler', 'Hacivat'] },
      { name: 'Mudanya', neighborhoods: ['Mudanya Merkez', 'Tirilye', 'Guzelyali'] },
      { name: 'Gemlik', neighborhoods: ['Gemlik Merkez', 'Umurbey', 'Kucuk Kumla'] },
    ],
  },
  {
    id: 'antalya',
    name: 'Antalya',
    districts: [
      { name: 'Muratpasa', neighborhoods: ['Lara', 'Konyaalti', 'Etiler'] },
      { name: 'Konyaalti', neighborhoods: ['Konyaalti Merkez', 'Liman', 'Hurma'] },
      { name: 'Kepez', neighborhoods: ['Kepez Merkez', 'Erenkoy', 'Aktoprak'] },
      { name: 'Aksu', neighborhoods: ['Aksu Merkez', 'Topcular', 'Pinarli'] },
      { name: 'Alanya', neighborhoods: ['Alanya Merkez', 'Mahmutlar', 'Avsallar'] },
      { name: 'Manavgat', neighborhoods: ['Manavgat Merkez', 'Side', 'Colakli'] },
    ],
  },
  {
    id: 'adana',
    name: 'Adana',
    districts: [
      { name: 'Seyhan', neighborhoods: ['Cumhuriyet', 'Kazimkarabekir', 'Mirzacelebi'] },
      { name: 'Yuregir', neighborhoods: ['Yuregir Merkez', 'Bahcelievler', 'Karsiyaka'] },
      { name: 'Cukurova', neighborhoods: ['Cukurova Merkez', 'Beyazevler', 'Belediye Evleri'] },
      { name: 'Saricam', neighborhoods: ['Saricam Merkez', 'Misis', 'Kucukoba'] },
      { name: 'Ceyhan', neighborhoods: ['Ceyhan Merkez', 'Adatepe', 'Yumurtalik'] },
    ],
  },
  // Diger 74 il - 3 ilce + 3 mahalle her birine
  ...generateDefaultCities([
    'Adiyaman', 'Afyonkarahisar', 'Agri', 'Aksaray', 'Amasya', 'Ardahan', 'Artvin',
    'Aydin', 'Balikesir', 'Bartin', 'Batman', 'Bayburt', 'Bilecik', 'Bingol', 'Bitlis',
    'Bolu', 'Burdur', 'Canakkale', 'Cankiri', 'Corum', 'Denizli', 'Diyarbakir', 'Duzce',
    'Edirne', 'Elazig', 'Erzincan', 'Erzurum', 'Eskisehir', 'Gaziantep', 'Giresun',
    'Gumushane', 'Hakkari', 'Hatay', 'Igdir', 'Isparta', 'Karabuk', 'Karaman', 'Kars',
    'Kastamonu', 'Kayseri', 'Kilis', 'Kirikkale', 'Kirklareli', 'Kirsehir', 'Kocaeli',
    'Konya', 'Kutahya', 'Malatya', 'Manisa', 'Mardin', 'Mersin', 'Mugla', 'Mus',
    'Nevsehir', 'Nigde', 'Ordu', 'Osmaniye', 'Rize', 'Sakarya', 'Samsun', 'Sanliurfa',
    'Siirt', 'Sinop', 'Sirnak', 'Sivas', 'Tekirdag', 'Tokat', 'Trabzon', 'Tunceli',
    'Usak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak',
  ]),
];

/**
 * Diger sehirler icin temsili 3 ilce + 3 mahalle uretir.
 * Production'da bu fonksiyon yerine gercek API verisi kullanilir.
 */
function generateDefaultCities(cityNames: string[]): City[] {
  return cityNames.map((name) => ({
    id: name.toLowerCase().replace(/[\s']/g, '-'),
    name,
    districts: [
      { name: name + ' Merkez', neighborhoods: ['Cumhuriyet', 'Yeni Mah.', 'Ataturk Mah.'] },
      { name: 'Sahil', neighborhoods: ['Sahil Merkez', 'Gunes Mah.', 'Deniz Mah.'] },
      { name: 'Carsi', neighborhoods: ['Carsi Merkez', 'Bahar Mah.', 'Yildiz Mah.'] },
    ],
  }));
}

/**
 * Bir sehri id ile getirir.
 */
export function getCityById(cityId: string): City | undefined {
  return TURKEY_CITIES.find((c) => c.id === cityId);
}

/**
 * Bir ilce icindeki mahalleleri getirir.
 */
export function getNeighborhoods(cityId: string, districtName: string): string[] {
  const city = getCityById(cityId);
  if (!city) return [];
  const district = city.districts.find((d) => d.name === districtName);
  return district?.neighborhoods ?? [];
}

/**
 * Bir sehrin ilcelerini liste halinde getirir.
 */
export function getDistricts(cityId: string): District[] {
  const city = getCityById(cityId);
  return city?.districts ?? [];
}
