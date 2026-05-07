/**
 * Marka mock data - Hediye karti markalari (33 marka).
 *
 * 3 ODEME YONTEMI:
 *   - balance_transfer: Marka cuzdanina dogrudan bakiye aktarimi (Pegasus, Hopi)
 *   - mobile_code:      Tutarli mobil kod/cek (Starbucks, Boyner, ...) - kasiyere okutulur
 *   - wallet_transfer:  Marka uygulamasinin cuzdanina puan/bakiye aktarimi (Pazarama)
 *
 * LOGO STRATEJISI: Wikimedia Commons (public domain) - bulunamayinca text fallback.
 *
 * NOT: Bu prototype amacli - production'da legal team'in brand kit hakki gerekli.
 */

export type PaymentMethodType = 'balance_transfer' | 'mobile_code' | 'wallet_transfer';

export interface Brand {
  id: string;
  name: string;
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
}

export const MOCK_BRANDS: Brand[] = [
  // ===== TIP 1: BALANCE_TRANSFER (puan donusum) =====
  {
    id: 'pegasus',
    name: 'Pegasus BolBol',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Pegasus_Airlines_logo.svg/320px-Pegasus_Airlines_logo.svg.png',
    paymentMethod: 'balance_transfer',
    badge: 'ONLINE',
    tagline: 'Uctukca Kazan, Kazandikca Uc',
    about: 'BolBol sadakat programina cep telefonu numaran ve e-posta adresinle kayit olabilirsin. Bu program sayesinde her ucusundan ve is birliklerinden yuzlerce BolPuan kazanabilir, kazandigin BolPuanlar ile de odul bilet alabilirsin.',
    pointsRate: 7.2464,
    pointsName: 'BolPuan',
  },
  {
    id: 'hopi',
    name: 'Hopi',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Alisverisinde Hopi Para Kazan',
    about: 'Hopi Para sadakat programina katilarak yuzlerce markada gecerli puan biriktirebilirsin.',
    pointsRate: 1.0,
    pointsName: 'Hopi Para',
  },

  // ===== TIP 2: MOBILE_CODE =====
  {
    id: 'starbucks',
    name: 'Starbucks',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/320px-Starbucks_Corporation_Logo_2011.svg.png',
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Starbucks Favorilerinle Kendini Simart!',
    about: 'Tutkumuz sadece kahvemiz degil, onu tamamlayacak deneyimi en iyi sekilde sunabilmektir. Turkiye\u2019deki 680\u2019den fazla magazamizda Starbucks kahvesini ve sicak atmosferini deneyimleyebilirsiniz. Turkiye\u2019deki tum Starbucks magazalarinda ve Starbucks Mobil Uygulamasinda gecerlidir.',
    availableCodeAmounts: [1000, 500, 300],
  },
  {
    id: 'boyner',
    name: 'Boyner',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Boyner_Logo.svg/320px-Boyner_Logo.svg.png',
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Stilini Bulustur',
    about: 'Boyner magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin. SMS ile gonderilen QR kodu kasiyerlere gostererek alisverisini tamamlayabilirsin.',
    availableCodeAmounts: [1000, 500, 250, 100],
  },
  {
    id: 'a101',
    name: 'A101',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/A101_logo.png/320px-A101_logo.png',
    paymentMethod: 'mobile_code',
    badge: 'ONLINE',
    tagline: 'Harca Harca Bitmez',
    about: 'A101 online uygulamasinda gecerli mobil kodlarla alisverisini yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'decathlon',
    name: 'Decathlon',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Decathlon_Logo.png/320px-Decathlon_Logo.png',
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Spor Tutkunlarinin Adresi',
    about: 'Tum Decathlon magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [1000, 500, 250],
  },
  {
    id: 'english-home',
    name: 'English Home',
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
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Modanin Adresi',
    about: 'Beymen magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [2000, 1000, 500],
  },
  {
    id: 'kigili',
    name: 'Kigili',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Erkek Giyimde Klasik',
    about: 'Kigili magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'ikea',
    name: 'IKEA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ikea_logo.svg/320px-Ikea_logo.svg.png',
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Hayata Daha Iyi Yasanir',
    about: 'IKEA magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [1000, 500, 250],
  },
  {
    id: 'mavi',
    name: 'Mavi',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Stilini Sevenler Icin',
    about: 'Mavi magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'defacto',
    name: 'DeFacto',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Stilini Yansit',
    about: 'DeFacto magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'koton',
    name: 'Koton',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Genc Stilin Adresi',
    about: 'Koton magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'mudo',
    name: 'Mudo',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Yasayan Stiller',
    about: 'Mudo magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'mudo-concept',
    name: 'Mudo Concept',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Konsept Yasam',
    about: 'Mudo Concept magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'ozdilek',
    name: 'Ozdilek',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Ozunde Mutluluk Var',
    about: 'Ozdilek magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'ayakkabi-dunyasi',
    name: 'Ayakkabi Dunyasi',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Adimda Stil',
    about: 'Ayakkabi Dunyasi magazalarinda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'network-divarese',
    name: 'NetWork / Divarese',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Modaya Yon Ver',
    about: 'NetWork ve Divarese magazalarinda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [1000, 500, 250],
  },
  {
    id: 'braun-oralb',
    name: 'Braun / Oral-B',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'ONLINE',
    tagline: 'Saglikli Kullanim',
    about: 'Braun ve Oral-B online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'meditopia',
    name: 'Meditopia',
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
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Indirimli Alisveris',
    about: 'Sok magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'ofix',
    name: 'Ofix',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'ONLINE',
    tagline: 'Ofis Ihtiyaclarinda',
    about: 'Ofix online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },
  {
    id: 'sarikamis',
    name: 'Sarikamis',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'ONLINE',
    tagline: 'Kayak Tatilinin Adresi',
    about: 'Sarikamis tesislerinde mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [1000, 500, 250],
  },
  {
    id: 'teknosa',
    name: 'TeknoSA',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Teknolojinin Adresi',
    about: 'TeknoSA magazalarinda ve online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [1000, 500, 250],
  },
  {
    id: 'hepsiburada',
    name: 'Hepsiburada',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Hepsiburada_logo_official.svg/320px-Hepsiburada_logo_official.svg.png',
    paymentMethod: 'mobile_code',
    badge: 'ONLINE',
    tagline: 'Hepsi Burada',
    about: 'Hepsiburada online platformunda mobil kod ile odeme yapabilirsin.',
    availableCodeAmounts: [1000, 500, 250],
  },
  {
    id: 'opet',
    name: 'Opet',
    logoUrl: null,
    paymentMethod: 'mobile_code',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Yolculuk Senin',
    about: 'Opet istasyonlarinda mobil kod ile yakit alabilirsin.',
    availableCodeAmounts: [500, 250, 100],
  },

  // ===== TIP 3: WALLET_TRANSFER =====
  {
    id: 'pazarama',
    name: 'Pazarama',
    logoUrl: null,
    paymentMethod: 'wallet_transfer',
    badge: 'ONLINE',
    tagline: 'Alisverisin Yeni Adresi',
    about: 'Pazarama mobil uygulamasinda kullanmak uzere bakiyeni Pluxee Pazarama Puan olarak aktarabilirsin.',
    requirementText: 'Pazarama\u2019ya bakiyeni Pluxee Pazarama Puan olarak aktarabilmen icin oncelikle Pazarama\u2019da aktif hesabin olmali. Lutfen Pazarama\u2019da kayitli GSM numarani gir.',
  },
  {
    id: 'pazarama-tatil',
    name: 'Pazarama Tatil',
    logoUrl: null,
    paymentMethod: 'wallet_transfer',
    badge: 'ONLINE',
    tagline: 'Tatilinin Yeni Adresi',
    about: 'Pazarama Tatil uygulamasinda kullanmak uzere bakiyeni puan olarak aktarabilirsin.',
    requirementText: 'Pazarama Tatil\u2019da aktif hesabin olmali.',
  },
  {
    id: 'pazarama-giyim',
    name: 'Pazarama Giyim Puan',
    logoUrl: null,
    paymentMethod: 'wallet_transfer',
    badge: 'ONLINE',
    tagline: 'Giyimde Avantaj',
    about: 'Pazarama Giyim Puan icin bakiyeni puan olarak aktarabilirsin.',
    requirementText: 'Pazarama\u2019da aktif hesabin olmali.',
  },
  {
    id: 'carrefour-sa',
    name: 'Carrefour SA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Carrefour_logo.svg/320px-Carrefour_logo.svg.png',
    paymentMethod: 'wallet_transfer',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Marketin Yeni Adresi',
    about: 'CarrefourSA magazalarinda ve online platformunda kullanmak uzere bakiyeni puan olarak aktarabilirsin.',
    requirementText: 'CarrefourSA\u2019da aktif hesabin olmali.',
  },
  {
    id: 'pluxee-yemek',
    name: 'Pluxee Yemek',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Yemek Karti Bakiyeline Aktar',
    about: 'Hediye karti bakiyeni Pluxee Yemek karti bakiyene aktarabilirsin.',
    pointsRate: 1.0,
    pointsName: 'TL',
  },
  {
    id: 'pluxee-gida',
    name: 'Pluxee Gida',
    logoUrl: null,
    paymentMethod: 'balance_transfer',
    badge: 'MAGAZA & ONLINE',
    tagline: 'Gida Karti Bakiyeline Aktar',
    about: 'Hediye karti bakiyeni Pluxee Gida karti bakiyene aktarabilirsin.',
    pointsRate: 1.0,
    pointsName: 'TL',
  },
];

/**
 * Bir markayi id ile getirir.
 */
export function getBrandById(brandId: string): Brand | undefined {
  return MOCK_BRANDS.find((b) => b.id === brandId);
}

/**
 * Tum markalari liste halinde getirir (Markalarim grid icin).
 */
export function getAllBrands(): Brand[] {
  return MOCK_BRANDS;
}
