/**
 * Marka mock data - Hediye + Ulasim (Akaryakit) markalari.
 *
 * KATEGORI:
 *   - 'gift': Hediye karti markalari (default)
 *   - 'fuel': Ulasim karti akaryakit markalari (Opet, BP, Aytemiz, TotalEnergies, Lukoil, Petrol Ofisi)
 *
 * 4 ODEME YONTEMI:
 *   - balance_transfer: Marka cuzdanina dogrudan bakiye aktarimi
 *   - mobile_code:      Tutarli mobil kod/cek
 *   - wallet_transfer:  Marka uygulama cuzdanina puan/bakiye aktarimi
 *   - payment_code:     Tek seferlik odeme kodu
 *
 * NOT: Bu prototype amacli - production'da legal team'in brand kit hakki gerekli.
 */

export type PaymentMethodType = 'balance_transfer' | 'mobile_code' | 'wallet_transfer' | 'payment_code';
export type BrandCategory = 'gift' | 'fuel' | 'online' | 'food_platform';

export interface Brand {
  id: string;
  name: string;
  /** 'gift' (Hediye karti) | 'fuel' (Ulasim akaryakit). Default 'gift'. */
  category: BrandCategory;
  /** Wikimedia veya markanin resmi sitesinden public logo. null ise text fallback. */
  logoUrl: string | null;
  paymentMethod: PaymentMethodType;
  /** Kategori badge: 'MAGAZA & ONLINE' | 'ONLINE' */
  badge: 'MAGAZA & ONLINE' | 'ONLINE';
  /** Marka detay sayfasi icin slogan / kisa aciklama */
  tagline: string;
  /** "Hakkinda" bolumu uzun aciklama */
  about: string;
  /** Ekstra kosul metni (Pazarama gibi: "aktif hesabin olmali") */
  requirementText?: string;

  // === Tip-spesifik alanlar ===

  /** balance_transfer + puan donusum oraninda kullanilir (orn. Pegasus 7.2464). */
  pointsRate?: number;
  /** Puan ismi (orn. 'BolPuan') */
  pointsName?: string;
  /** mobile_code icin alinabilir tutar listesi (orn. [1000, 500, 300]) */
  availableCodeAmounts?: number[];

  // === Mekanlar sayfasi icin (online + food_platform kategorileri) ===
  /** 'online' kategori markalari icin web sitesi URL (webview'de acilir) */
  websiteUrl?: string;
  /** 'food_platform' kategori icin deep link (orn. 'trendyolyemek://') */
  appDeepLink?: string;
  /** Deep link basarisiz olursa iOS App Store URL */
  appStoreUrl?: string;
  /** Deep link basarisiz olursa Android Play Store URL */
  playStoreUrl?: string;
}

export const MOCK_BRANDS: Brand[] = [
  // === HEDIYE KARTI MARKALARI (gift) ===
  {
    id: 'pluxee-yemek',
    name: 'Pluxee Yemek',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Yemek Karti Bakiyeline Aktar',
    about: 'Hediye karti bakiyeni Pluxee Yemek karti bakiyene aktarabilirsin.',
    pointsRate: 1.0,
    pointsName: 'TL',
  },
  {
    id: 'pegasus',
    name: 'Pegasus BolBol',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'ONLINE',
    tagline: 'Uctukca Kazan, Kazandikca Uc',
    about: 'BolBol sadakat programina cep telefonu numaran ve e-posta adresinle kayit olabilirsin. Bu program sayesinde her ucusundan ve is birliklerinden yuzlerce BolPuan kazanabilir, kazandigin BolPuanlar ile de odul bilet alabilirsin.',
    pointsRate: 7.2464,
    pointsName: 'BolPuan',
  },
  {
    id: 'starbucks',
    name: 'Starbucks',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Starbucks Favorilerinle Kendini Simart!',
    about: 'Tutkumuz sadece kahvemiz degil, onu tamamlayacak deneyimi en iyi sekilde sunabilmektir. Turkiye\u2019deki 680\u2019den fazla magazamizda Starbucks kahvesini ve sicak atmosferini deneyimleyebilirsiniz. Turkiye\u2019deki tum Starbucks magazalarinda ve Starbucks Mobil Uygulamasinda gecerlidir.',
    availableCodeAmounts: [1000, 500, 300],
  },
  {
    id: 'carrefour-sa',
    name: 'Carrefour SA',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'payment_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Marketin Yeni Adresi',
    about: 'CarrefourSA magazalarinda ve online platformunda kullanmak uzere bakiyeni puan olarak aktarabilirsin.',
    requirementText: 'CarrefourSA\u2019da aktif hesabin olmali.',
  },
  {
    id: 'pluxee-gida',
    name: 'Pluxee Gida',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Gida Karti Bakiyeline Aktar',
    about: 'Hediye karti bakiyeni Pluxee Gida karti bakiyene aktarabilirsin.',
    pointsRate: 1.0,
    pointsName: 'TL',
  },
  {
    id: 'a101',
    name: 'A101',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'payment_code',
    badge: 'ONLINE',
    tagline: 'Harca Harca Bitmez',
    about: 'A101 online uygulamasinda gecerli mobil kodlarla alisverisini yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'decathlon',
    name: 'Decathlon',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Spor Tutkunlarinin Adresi',
    about: 'Tum Decathlon magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [1000, 500, 250],
  },
  {
    id: 'english-home',
    name: 'English Home',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Evine Konfor',
    about: 'English Home magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'beymen',
    name: 'Beymen',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Modanin Adresi',
    about: 'Beymen magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [2000, 1000, 500],
  },
  {
    id: 'pazarama',
    name: 'Pazarama',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'ONLINE',
    tagline: 'Alisverisin Yeni Adresi',
    about: 'Pazarama mobil uygulamasinda kullanmak uzere bakiyeni Pluxee Pazarama Puan olarak aktarabilirsin.',
    requirementText: 'Pazarama\u2019ya bakiyeni Pluxee Pazarama Puan olarak aktarabilmen icin oncelikle Pazarama\u2019da aktif hesabin olmali. Lutfen Pazarama\u2019da kayitli GSM numarani gir.',
  },
  {
    id: 'pazarama-tatil',
    name: 'Pazarama Tatil',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'ONLINE',
    tagline: 'Tatilinin Yeni Adresi',
    about: 'Pazarama Tatil uygulamasinda kullanmak uzere bakiyeni puan olarak aktarabilirsin.',
    requirementText: 'Pazarama Tatil\u2019da aktif hesabin olmali.',
  },
  {
    id: 'hopi',
    name: 'Hopi',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Alisverisinde Hopi Para Kazan',
    about: 'Hopi Para sadakat programina katilarak yuzlerce markada gecerli puan biriktirebilirsin.',
    pointsRate: 1.0,
    pointsName: 'Hopi Para',
  },
  {
    id: 'pazarama-giyim',
    name: 'Pazarama Giyim Puan',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'ONLINE',
    tagline: 'Giyimde Avantaj',
    about: 'Pazarama Giyim Puan icin bakiyeni puan olarak aktarabilirsin.',
    requirementText: 'Pazarama\u2019da aktif hesabin olmali.',
  },
  {
    id: 'kigili',
    name: 'Kigili',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Erkek Giyimde Klasik',
    about: 'Kigili magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'teknosa',
    name: 'TeknoSA',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'payment_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Teknolojinin Adresi',
    about: 'TeknoSA magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [1000, 500, 250],
  },
  {
    id: 'boyner',
    name: 'Boyner',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Stilini Bulustur',
    about: 'Boyner magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin. SMS ile gonderilen QR kodu kasiyerlere gostererek alisverisini tamamlayabilirsin.',
    availableCodeAmounts: [1000, 500, 250, 100],
  },
  {
    id: 'hepsiburada',
    name: 'Hepsiburada',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'ONLINE',
    tagline: 'Hepsi Burada',
    about: 'Hepsiburada online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [1000, 500, 250],
  },
  {
    id: 'gratis',
    name: 'Gratis',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'ONLINE',
    tagline: 'Guzellik ve Bakim',
    about: 'Gratis magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [1000, 500, 250],
  },
  {
    id: 'ikea',
    name: 'IKEA',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Hayata Daha Iyi Yasanir',
    about: 'IKEA magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [1000, 500, 250],
  },
  {
    id: 'mavi',
    name: 'Mavi',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'payment_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Stilini Sevenler Icin',
    about: 'Mavi magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'defacto',
    name: 'DeFacto',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'payment_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Stilini Yansit',
    about: 'DeFacto magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'koton',
    name: 'Koton',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'payment_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Genc Stilin Adresi',
    about: 'Koton magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'mudo',
    name: 'Mudo',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'payment_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Yasayan Stiller',
    about: 'Mudo magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'mudo-concept',
    name: 'Mudo Concept',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'payment_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Konsept Yasam',
    about: 'Mudo Concept magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'ozdilek',
    name: 'Ozdilek',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'payment_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Ozunde Mutluluk Var',
    about: 'Ozdilek magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'ayakkabi-dunyasi',
    name: 'Ayakkabi Dunyasi',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'payment_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Adimda Stil',
    about: 'Ayakkabi Dunyasi magazalarinda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'network-divarese',
    name: 'NetWork / Divarese',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'payment_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Modaya Yon Ver',
    about: 'NetWork ve Divarese magazalarinda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [1000, 500, 250],
  },
  {
    id: 'braun-oralb',
    name: 'Braun / Oral-B',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'payment_code',
    badge: 'ONLINE',
    tagline: 'Saglikli Kullanim',
    about: 'Braun ve Oral-B online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'meditopia',
    name: 'Meditopia',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'ONLINE',
    tagline: 'Zihin Icin Anlamli',
    about: 'Meditopia uygulama icin mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [250, 100, 50],
  },
  {
    id: 'meditopia-wellness',
    name: 'Meditopia WellnessPass',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'ONLINE',
    tagline: 'Saglikli Yasam',
    about: 'WellnessPass uyeligi icin mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250],
  },
  {
    id: 'bodo',
    name: 'Bodo',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Ev Tekstilinde Kalite',
    about: 'Bodo magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'arkas-turizm',
    name: 'Arkas Turizm',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'ONLINE',
    tagline: 'Yola Cikma Zamani',
    about: 'Arkas Turizm uygulamasinda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [1000, 500, 250],
  },
  {
    id: 'sok',
    name: 'Sok',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'payment_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Indirimli Alisveris',
    about: 'Sok magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'ofix',
    name: 'Ofix',
    category: 'gift',
    logoUrl: null,
    paymentMethod: 'payment_code',
    badge: 'ONLINE',
    tagline: 'Ofis Ihtiyaclarinda',
    about: 'Ofix online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },

  // === ULASIM AKARYAKIT MARKALARI (fuel) ===
  // Hepsi balance_transfer - Pluxee Sanal Kart cuzdanina aktarim ile aktif olur
  {
    id: 'opet',
    name: 'Opet',
    category: 'fuel',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Tum Turkiye Opet istasyonlarinda gecerli',
    about: 'Turkiye\u2019nin en sevilen akaryakit markasi Opet, Ultra Force ile performans ve tasarruf, temiz tuvaletleriyle hijyen, Ultramarket iyle de yollardaki ihtiyaclara cozum sunuyor. Tum OPET istasyonlarinda gecerlidir!',
    pointsRate: 1.0,
    pointsName: 'TL',
  },
  {
    id: 'petrol-ofisi',
    name: 'Petrol Ofisi',
    category: 'fuel',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Tum Turkiye Petrol Ofisi istasyonlarinda gecerli',
    about: 'Turkiye\u2019nin koklu akaryakit markasi Petrol Ofisi, kaliteli yakit ve genis istasyon agi ile yolculuk deneyimini iyilestiriyor. Tum Petrol Ofisi istasyonlarinda gecerlidir!',
    pointsRate: 1.0,
    pointsName: 'TL',
  },
  {
    id: 'bp',
    name: 'BP',
    category: 'fuel',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Tum Turkiye BP istasyonlarinda gecerli',
    about: 'BP, dunya capinda tanidik kalitesiyle Turkiye\u2019deki tum istasyonlarinda hizmet veriyor. Premium yakitlari ve mukemmel servis anlayisi ile yolculugun guvencesi.',
    pointsRate: 1.0,
    pointsName: 'TL',
  },
  {
    id: 'aytemiz',
    name: 'Aytemiz',
    category: 'fuel',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Tum Turkiye Aytemiz istasyonlarinda gecerli',
    about: 'Aytemiz, Turkiye genelindeki istasyon agi ile kaliteli akaryakit ve hizmet sunuyor. Tum Aytemiz istasyonlarinda gecerlidir!',
    pointsRate: 1.0,
    pointsName: 'TL',
  },
  {
    id: 'totalenergies',
    name: 'TotalEnergies',
    category: 'fuel',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Tum Turkiye TotalEnergies istasyonlarinda gecerli',
    about: 'TotalEnergies, dunya capinda enerji devi olarak Turkiye\u2019deki istasyonlarinda kaliteli yakit sunuyor. Tum TotalEnergies istasyonlarinda gecerlidir!',
    pointsRate: 1.0,
    pointsName: 'TL',
  },
  {
    id: 'lukoil',
    name: 'Lukoil',
    category: 'fuel',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Tum Turkiye Lukoil istasyonlarinda gecerli',
    about: 'Lukoil, kaliteli yakit ve premium servis anlayisi ile Turkiye\u2019deki istasyonlarinda hizmet veriyor. Tum Lukoil istasyonlarinda gecerlidir!',
    pointsRate: 1.0,
    pointsName: 'TL',
  },

  // === ONLINE ALISVERIS MARKALARI (online) ===
  // Webview'de marka web sitesi acilir - marka detay sayfasi YOK
  {
    id: 'boyner-online',
    name: 'Boyner',
    category: 'online',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'ONLINE',
    tagline: 'Boyner online alisveris',
    about: 'Boyner online platformunda Pluxee ile odeme yapabilirsin.',
    websiteUrl: 'https://www.boyner.com.tr',
  },
  {
    id: 'hopi-online',
    name: 'Hopi',
    category: 'online',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'ONLINE',
    tagline: 'Hopi online alisveris',
    about: 'Hopi platformunda Pluxee ile odeme yapabilirsin.',
    websiteUrl: 'https://www.hopi.com.tr',
  },
  {
    id: 'dominos-online',
    name: "Domino's Pizza",
    category: 'online',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'ONLINE',
    tagline: "Domino's online siparis",
    about: "Domino's Pizza online platformunda Pluxee ile odeme yapabilirsin.",
    websiteUrl: 'https://www.dominos.com.tr',
  },
  {
    id: 'sariyer-online',
    name: 'Sariyer',
    category: 'online',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'ONLINE',
    tagline: 'Sariyer market online',
    about: 'Sariyer online market platformunda Pluxee ile odeme yapabilirsin.',
    websiteUrl: 'https://www.sariyermarket.com',
  },
  {
    id: 'mopas-online',
    name: 'Mopas',
    category: 'online',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'ONLINE',
    tagline: 'Mopas market online',
    about: 'Mopas online platformunda Pluxee ile odeme yapabilirsin.',
    websiteUrl: 'https://www.mopas.com.tr',
  },
  {
    id: 'mcdonalds-online',
    name: "McDonald's",
    category: 'online',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'ONLINE',
    tagline: "McDonald's online siparis",
    about: "McDonald's online platformunda Pluxee ile odeme yapabilirsin.",
    websiteUrl: 'https://www.mcdonalds.com.tr',
  },

  // === YEMEK PLATFORMLARI (food_platform) ===
  // Mobil uygulama acilir - deep link denenir, yoksa store
  {
    id: 'trendyol-yemek',
    name: 'Trendyol Yemek',
    category: 'food_platform',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'ONLINE',
    tagline: 'Trendyol Yemek ile siparis',
    about: 'Trendyol Yemek uygulamasinda Pluxee ile odeme yapabilirsin.',
    appDeepLink: 'trendyolyemek://',
    appStoreUrl: 'https://apps.apple.com/tr/app/trendyol-yemek/id1117408000',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.trendyol.tyfoodapp',
  },
  {
    id: 'yemeksepeti',
    name: 'Yemeksepeti',
    category: 'food_platform',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'ONLINE',
    tagline: 'Yemeksepeti ile yemek',
    about: 'Yemeksepeti uygulamasinda Pluxee ile odeme yapabilirsin.',
    appDeepLink: 'yemeksepeti://',
    appStoreUrl: 'https://apps.apple.com/tr/app/yemeksepeti/id375556925',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.inovel.app.yemeksepeti',
  },
  {
    id: 'getir-yemek',
    name: 'Getir Yemek',
    category: 'food_platform',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'ONLINE',
    tagline: 'Getir Yemek ile siparis',
    about: 'Getir Yemek uygulamasinda Pluxee ile odeme yapabilirsin.',
    appDeepLink: 'getir://',
    appStoreUrl: 'https://apps.apple.com/tr/app/getir/id955751530',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.getir',
  },
  {
    id: 'migros-yemek',
    name: 'Migros Yemek',
    category: 'food_platform',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'ONLINE',
    tagline: 'Migros Yemek ile siparis',
    about: 'Migros Yemek uygulamasinda Pluxee ile odeme yapabilirsin.',
    appDeepLink: 'migros://',
    appStoreUrl: 'https://apps.apple.com/tr/app/migros/id1052168057',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.migros.android',
  },
];

/**
 * Bir markayi id ile getirir.
 */
export function getBrandById(brandId: string): Brand | undefined {
  return MOCK_BRANDS.find((b) => b.id === brandId);
}

/**
 * Tum markalari liste halinde getirir.
 * NOT: Hediye ekrani icin getGiftBrands(), Ulasim icin getFuelBrands() kullan.
 */
export function getAllBrands(): Brand[] {
  return MOCK_BRANDS;
}

/**
 * Sadece Hediye karti markalarini getirir (Hediye detay ekraninda BrandGrid icin).
 */
export function getGiftBrands(): Brand[] {
  return MOCK_BRANDS.filter((b) => b.category === 'gift');
}

/**
 * Sadece Ulasim akaryakit markalarini getirir (Ulasim detay ekraninda BrandGrid icin).
 */
export function getFuelBrands(): Brand[] {
  return MOCK_BRANDS.filter((b) => b.category === 'fuel');
}

/**
 * Sadece Online alisveris markalarini getirir (Mekanlar sayfasinda
 * "Online alisveris" bolumu icin).
 */
export function getOnlineBrands(): Brand[] {
  return MOCK_BRANDS.filter((b) => b.category === 'online');
}

/**
 * Sadece Yemek platformlarini getirir (Mekanlar sayfasinda
 * "Yemek platformlari" bolumu icin).
 */
export function getFoodPlatformBrands(): Brand[] {
  return MOCK_BRANDS.filter((b) => b.category === 'food_platform');
}
