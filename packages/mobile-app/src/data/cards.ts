/**
 * Mock kart verileri ve kategori meta bilgileri.
 *
 * KATEGORI META: Detay sayfasinda kullanilan tum kategori-spesifik bilgiler.
 *   - label, subtitle, iconName: Hero'da gosterilen metinler
 *   - bgColor, stripeColor: Slope ve kart listesi serit rengi
 *   - balanceLabel: "Guncel Bakiye" vs "Kullanilabilir bakiye"
 *   - hasExtraLoad: Extra Yukle CTA gosterilsin mi (Business'ta false)
 *
 * Pluxee TR mockup eslemeleri:
 *   meal      -> Yemek / Mobil Kart / yesil (#00eb5e)
 *   business  -> Business / Mobil Kart / acik gri / Extra Yukle YOK
 *   food      -> Gida / Mobil Kart / sari (#ffdc37)
 *   gift      -> Hediye / Mix Paket / sari (Faz 6.2)
 *   transport -> Ulasim / Esnek ulasim / coral (#ff7375) (Faz 6.2)
 */
import { semantic, type ColorTriad } from '@pluxee/design-system';
import type { CardCategory } from '../navigation/types';

// Re-export icin (geri uyumluluk - eski importlari kirmasin)
export type { CardCategory };

export interface UserCard {
  id: string;
  category: CardCategory;
  name: string;                       // 'Yemek Kart 1'
  lastDigits: string;                 // '1234'
  fullCardNumber: string;             // '6273 9515 1468 4325' - detayda gosterilir
  cardOwner: string;                  // 'PLUXEE TEKNOLOJI A.S.' - detayda gosterilir
  balance: number;
  pendingLoad?: number;               // Bekleyen yukleme (default 0)
  plusPoints?: number;                // Plus puan (default 0)
  isDefault: boolean;
}

interface CategoryMeta {
  label: string;                      // 'Yemek' (header title)
  subtitle: string;                   // 'Mobil Kart' / 'Mix Paket' / 'Esnek ulasim'
  iconName: string;                   // Pluxee CDN icon name
  bgColor: string;                    // Slope rengi (navy hero arkasi)
  stripeColor: string;                // Kart listesi sol serit rengi
  balanceLabel: string;               // 'Guncel Bakiye' / 'Kullanilabilir bakiye'
  hasExtraLoad: boolean;              // Extra Yukle CTA gostersin mi
  hasPlusPoints: boolean;             // Plus Puan blogu gostersin mi (sadece Yemek)
  slopeColors: ColorTriad;            // CardHero slope arkaplan icin (dark/bright/light)
}

// Business icin gri ton (semantic.brand'de yok, hex direkt)
const BUSINESS_GRAY = '#dadcdf';

export const CARD_CATEGORY_META: Record<CardCategory, CategoryMeta> = {
  meal: {
    label: 'Yemek',
    subtitle: 'Mobil Kart',
    iconName: 'meal',
    bgColor: semantic.brand.secondary,    // #00eb5e yesil
    stripeColor: semantic.brand.secondary,
    balanceLabel: 'Guncel Bakiye',
    hasExtraLoad: true,
    hasPlusPoints: true,
    slopeColors: { dark: semantic.brand.primary, bright: '#00eb5e', light: '#dafcdb' },
  },
  business: {
    label: 'Business',
    subtitle: 'Mobil Kart',
    iconName: 'workBriefcase',
    bgColor: BUSINESS_GRAY,                // #dadcdf acik gri
    stripeColor: BUSINESS_GRAY,
    balanceLabel: 'Guncel Bakiye',
    hasExtraLoad: false,                  // Business'a bireysel yukleme YOK
    hasPlusPoints: false,
    slopeColors: { dark: semantic.brand.primary, bright: '#dadcdf', light: '#efefef' },
  },
  food: {
    label: 'Gida',
    subtitle: 'Mobil Kart',
    iconName: 'food',
    bgColor: semantic.background.brand3,  // #ffdc37 sari
    stripeColor: semantic.background.brand3,
    balanceLabel: 'Guncel Bakiye',
    hasExtraLoad: true,
    hasPlusPoints: false,
    slopeColors: { dark: semantic.brand.primary, bright: '#ffdc37', light: '#fff5c2' },
  },
  gift: {
    label: 'Hediye',
    subtitle: 'Mix Paket',
    iconName: 'gift',
    bgColor: semantic.background.brand3,  // sari (Gida ile ayni - Faz 6.2'de revize edilebilir)
    stripeColor: semantic.background.brand3,
    balanceLabel: 'Kullanilabilir bakiye',
    hasExtraLoad: true,
    hasPlusPoints: false,
    slopeColors: { dark: semantic.brand.primary, bright: '#ffdc37', light: '#fff5c2' },
  },
  transport: {
    label: 'Ulasim',
    subtitle: 'Esnek ulasim',
    iconName: 'car',
    bgColor: semantic.background.brand4,  // #ff7375 coral
    stripeColor: semantic.background.brand4,
    balanceLabel: 'Kullanilabilir bakiye',
    hasExtraLoad: true,
    hasPlusPoints: false,
    slopeColors: { dark: semantic.brand.primary, bright: '#ff7375', light: '#fcf1f0' },
  },
};

export const MOCK_CARDS: UserCard[] = [
  {
    id: '1',
    category: 'meal',
    name: 'Yemek Kart 1',
    lastDigits: '4325',
    fullCardNumber: '6273 9515 1468 4325',
    cardOwner: 'PLUXEE TEKNOLOJI A.S.',
    balance: 17325.0,
    pendingLoad: 0,
    plusPoints: 0,
    isDefault: true,
  },
  {
    id: '2',
    category: 'meal',
    name: 'Yemek Kart 2',
    lastDigits: '5678',
    fullCardNumber: '6273 1234 5678 5678',
    cardOwner: 'EREN GOKTAS',
    balance: 2325.0,
    pendingLoad: 0,
    plusPoints: 0,
    isDefault: false,
  },
  {
    id: '3',
    category: 'gift',
    name: 'Mix Paket',
    lastDigits: '7890',
    fullCardNumber: '6273 0000 0000 7890',
    cardOwner: 'EREN GOKTAS',
    balance: 2500.0,
    pendingLoad: 0,
    plusPoints: 0,
    isDefault: false,
  },
  {
    id: '4',
    category: 'food',
    name: 'Gida Kart',
    lastDigits: '0123',
    fullCardNumber: '6273 9999 8888 0123',
    cardOwner: 'EREN GOKTAS',
    balance: 500.0,
    pendingLoad: 0,
    plusPoints: 0,
    isDefault: false,
  },
  {
    id: '5',
    category: 'business',
    name: 'Business',
    lastDigits: '4567',
    fullCardNumber: '6273 7777 6666 4567',
    cardOwner: 'PLUXEE TEKNOLOJI A.S.',
    balance: 14000.0,
    pendingLoad: 0,
    plusPoints: 0,
    isDefault: false,
  },
  {
    id: '6',
    category: 'transport',
    name: 'Ulasim Kart',
    lastDigits: '2345',
    fullCardNumber: '2345 5678 9012 3456',
    cardOwner: 'EREN GOKTAS',
    balance: 32500.0,
    pendingLoad: 0,
    plusPoints: 0,
    isDefault: false,
  },
];

/**
 * Bir karta id ile erisim (CardDetailScreen'de kullanilir).
 */
export function getCardById(cardId: string): UserCard | undefined {
  return MOCK_CARDS.find((c) => c.id === cardId);
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
