/**
 * Pluxee'li Noktalar - Yakindaki restoran ve market mock data.
 *
 * Restoran kategorileri (Mockup Filtrele -> Kategori sekmesinden):
 *   - Bufe, Cafe/Kahve, Catering, Deniz Urunleri, Doner/Kebap/Pide/Kofte,
 *     Dunya Mutfagi, Ev Yemekleri, Fast Food, Kuruyemis, Pizza,
 *     Pastane/Firin/Borek, Sarkuteri, Tuketime Hazir Gida, Uzakdogu Mutfagi
 *
 * Market: zincir tipi (BIM, A101, Sok, Migros vb.)
 *
 * Mesafe: km cinsinden, kullanici Maltepe/Istanbul'da varsayim ile
 * en yakindan en uzaga sirali (mock).
 */

export type PlaceType = 'restaurant' | 'market';

export type PaymentMethod = 'mobile' | 'card' | 'online';

/** Restoran kategori sabitleri (Filtrele modal icin) */
export const RESTAURANT_CATEGORIES = [
  'Bufe',
  'Cafe/Kahve',
  'Catering',
  'Deniz Urunleri',
  'Doner/Kebap/Pide/Kofte',
  'Dunya Mutfagi',
  'Ev Yemekleri',
  'Fast Food',
  'Kuruyemis',
  'Pizza',
  'Pastane/Firin/Borek',
  'Sarkuteri',
  'Tuketime Hazir Gida',
  'Uzakdogu Mutfagi',
] as const;

export type RestaurantCategory = typeof RESTAURANT_CATEGORIES[number];

export interface Place {
  id: string;
  name: string;
  placeType: PlaceType;
  /** Restaurant icin kategori, market icin marka tipi (zincir vb.) */
  category: string;
  /** km cinsinden mesafe (mock - kullanici lokasyonuna gore degisken degil) */
  distanceKm: number;
  city: string;
  district: string;
  /** 1.0 - 5.0 arasi puan */
  rating: number;
  /** %10 Plus Puan icin 10. 0 ise "Plus Puan yok". */
  plusPointsPercent: number;
  /** Hangi odeme yontemlerini destekliyor */
  paymentMethods: PaymentMethod[];
}

export const MOCK_PLACES: Place[] = [
  // === RESTORANLAR (10 adet, mesafeye gore sirali) ===
  {
    id: 'r1',
    name: 'KIRINTI',
    placeType: 'restaurant',
    category: 'Cafe/Kahve',
    distanceKm: 0.26,
    city: 'ISTANBUL',
    district: 'MALTEPE',
    rating: 4.6,
    plusPointsPercent: 10,
    paymentMethods: ['mobile', 'online'],
  },
  {
    id: 'r2',
    name: 'CAFFE NERO',
    placeType: 'restaurant',
    category: 'Cafe/Kahve',
    distanceKm: 0.42,
    city: 'ISTANBUL',
    district: 'MALTEPE',
    rating: 5.0,
    plusPointsPercent: 10,
    paymentMethods: ['mobile', 'card'],
  },
  {
    id: 'r3',
    name: 'SIMIT SARAYI',
    placeType: 'restaurant',
    category: 'Pastane/Firin/Borek',
    distanceKm: 0.52,
    city: 'ISTANBUL',
    district: 'MALTEPE',
    rating: 4.3,
    plusPointsPercent: 10,
    paymentMethods: ['mobile', 'card'],
  },
  {
    id: 'r4',
    name: 'TAVUK DUNYASI',
    placeType: 'restaurant',
    category: 'Fast Food',
    distanceKm: 0.64,
    city: 'ISTANBUL',
    district: 'MALTEPE',
    rating: 4.4,
    plusPointsPercent: 10,
    paymentMethods: ['mobile', 'online', 'card'],
  },
  {
    id: 'r5',
    name: 'SANLIURFA SARK RESTAURANT',
    placeType: 'restaurant',
    category: 'Doner/Kebap/Pide/Kofte',
    distanceKm: 0.90,
    city: 'ISTANBUL',
    district: 'MALTEPE',
    rating: 3.6,
    plusPointsPercent: 10,
    paymentMethods: ['mobile', 'card', 'online'],
  },
  {
    id: 'r6',
    name: 'BURGER KING',
    placeType: 'restaurant',
    category: 'Fast Food',
    distanceKm: 1.26,
    city: 'ISTANBUL',
    district: 'MALTEPE',
    rating: 4.2,
    plusPointsPercent: 10,
    paymentMethods: ['mobile', 'online'],
  },
  {
    id: 'r7',
    name: 'LIFE CAFE',
    placeType: 'restaurant',
    category: 'Cafe/Kahve',
    distanceKm: 1.43,
    city: 'ISTANBUL',
    district: 'MALTEPE',
    rating: 4.1,
    plusPointsPercent: 10,
    paymentMethods: ['online'],
  },
  {
    id: 'r8',
    name: 'STARBUCKS',
    placeType: 'restaurant',
    category: 'Cafe/Kahve',
    distanceKm: 1.85,
    city: 'ISTANBUL',
    district: 'MALTEPE',
    rating: 4.7,
    plusPointsPercent: 0,
    paymentMethods: ['mobile', 'card'],
  },
  {
    id: 'r9',
    name: 'DOMINOS PIZZA',
    placeType: 'restaurant',
    category: 'Pizza',
    distanceKm: 2.10,
    city: 'ISTANBUL',
    district: 'MALTEPE',
    rating: 4.0,
    plusPointsPercent: 10,
    paymentMethods: ['mobile', 'online'],
  },
  {
    id: 'r10',
    name: 'MADO',
    placeType: 'restaurant',
    category: 'Pastane/Firin/Borek',
    distanceKm: 2.45,
    city: 'ISTANBUL',
    district: 'MALTEPE',
    rating: 4.5,
    plusPointsPercent: 0,
    paymentMethods: ['mobile', 'card'],
  },

  // === MARKETLER (10 adet, mesafeye gore sirali) ===
  {
    id: 'm1',
    name: 'A101',
    placeType: 'market',
    category: 'Indirim Marketi',
    distanceKm: 0.26,
    city: 'ISTANBUL',
    district: 'MALTEPE',
    rating: 4.6,
    plusPointsPercent: 10,
    paymentMethods: ['mobile', 'online'],
  },
  {
    id: 'm2',
    name: 'SOK',
    placeType: 'market',
    category: 'Indirim Marketi',
    distanceKm: 0.42,
    city: 'ISTANBUL',
    district: 'MALTEPE',
    rating: 5.0,
    plusPointsPercent: 0,
    paymentMethods: ['mobile', 'card'],
  },
  {
    id: 'm3',
    name: 'MOPAS',
    placeType: 'market',
    category: 'Yerel Market',
    distanceKm: 0.90,
    city: 'ISTANBUL',
    district: 'MALTEPE',
    rating: 3.6,
    plusPointsPercent: 10,
    paymentMethods: ['mobile', 'card', 'online'],
  },
  {
    id: 'm4',
    name: 'TANSAS',
    placeType: 'market',
    category: 'Buyuk Market',
    distanceKm: 1.26,
    city: 'ISTANBUL',
    district: 'MALTEPE',
    rating: 4.2,
    plusPointsPercent: 10,
    paymentMethods: ['mobile', 'online'],
  },
  {
    id: 'm5',
    name: 'BIM',
    placeType: 'market',
    category: 'Indirim Marketi',
    distanceKm: 1.43,
    city: 'ISTANBUL',
    district: 'MALTEPE',
    rating: 4.1,
    plusPointsPercent: 0,
    paymentMethods: ['online'],
  },
  {
    id: 'm6',
    name: 'CARREFOUR SA',
    placeType: 'market',
    category: 'Hipermarket',
    distanceKm: 1.78,
    city: 'ISTANBUL',
    district: 'MALTEPE',
    rating: 4.4,
    plusPointsPercent: 10,
    paymentMethods: ['mobile', 'card', 'online'],
  },
  {
    id: 'm7',
    name: 'MIGROS',
    placeType: 'market',
    category: 'Buyuk Market',
    distanceKm: 2.05,
    city: 'ISTANBUL',
    district: 'MALTEPE',
    rating: 4.3,
    plusPointsPercent: 10,
    paymentMethods: ['mobile', 'card', 'online'],
  },
  {
    id: 'm8',
    name: 'HAKMAR EXPRESS',
    placeType: 'market',
    category: 'Indirim Marketi',
    distanceKm: 2.34,
    city: 'ISTANBUL',
    district: 'MALTEPE',
    rating: 3.9,
    plusPointsPercent: 0,
    paymentMethods: ['mobile'],
  },
  {
    id: 'm9',
    name: 'ONUR MARKET',
    placeType: 'market',
    category: 'Yerel Market',
    distanceKm: 2.78,
    city: 'ISTANBUL',
    district: 'MALTEPE',
    rating: 4.0,
    plusPointsPercent: 10,
    paymentMethods: ['mobile', 'card'],
  },
  {
    id: 'm10',
    name: 'OZDILEK HIPERMARKET',
    placeType: 'market',
    category: 'Hipermarket',
    distanceKm: 3.12,
    city: 'ISTANBUL',
    district: 'MALTEPE',
    rating: 4.2,
    plusPointsPercent: 10,
    paymentMethods: ['mobile', 'card', 'online'],
  },
];

// ===== Helper functions =====

/**
 * Tip filtresi ile mekanlari getir.
 * Sirasi: en yakindan en uzaga (distanceKm ascending).
 */
export function getPlacesByType(type: PlaceType): Place[] {
  return MOCK_PLACES
    .filter((p) => p.placeType === type)
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

/**
 * Yakindaki restoranlari getir (anasayfa horizontal scroll icin).
 * Default: ilk N tane (mesafe sirali).
 */
export function getNearbyRestaurants(limit: number = 5): Place[] {
  return getPlacesByType('restaurant').slice(0, limit);
}

/**
 * Yakindaki marketleri getir (anasayfa horizontal scroll icin).
 * Default: ilk N tane (mesafe sirali).
 */
export function getNearbyMarkets(limit: number = 5): Place[] {
  return getPlacesByType('market').slice(0, limit);
}

/**
 * Bir mekani id ile getir.
 */
export function getPlaceById(placeId: string): Place | undefined {
  return MOCK_PLACES.find((p) => p.id === placeId);
}

/**
 * Mekan adi ile arama (Pluxee'li nokta arama icin).
 * Buyuk-kucuk harf duyarsiz, kismi eslesme.
 */
export function searchPlaces(query: string): Place[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return MOCK_PLACES.filter((p) =>
    p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );
}

/**
 * Odeme yontemi label'lari (UI gosterimi icin).
 */
export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  mobile: 'Mobil odeme',
  card: 'Kartli odeme',
  online: 'Online alisveris',
};
