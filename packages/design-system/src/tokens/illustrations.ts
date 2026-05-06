/**
 * Pluxee Design System - Illustrations Registry
 *
 * Source: https://designsystem.pluxee.app
 * CDN: https://visualassets.designsystem.pluxee.app/desy-assets/cdn-assets-prd/illustrations/
 *
 * 225 illustration kategorize edilmiş şekilde. SVG dosyaları CDN'de.
 *
 * KULLANIM:
 *   import { getIllustrationUrl, illustrations } from '@pluxee/design-system';
 *
 *   const url = getIllustrationUrl('mealVoucher');
 *   const url = getIllustrationUrl(illustrations.meal.mealVoucher);
 *
 * REACT NATIVE'DE SVG GÖSTERİMİ:
 *   import { SvgUri } from 'react-native-svg';
 *   <SvgUri uri={getIllustrationUrl('mealVoucher')} width={120} height={120} />
 */

const ILLUSTRATION_CDN_BASE =
  'https://visualassets.designsystem.pluxee.app/desy-assets/cdn-assets-prd/illustrations';

/**
 * Tüm illustration dosya isimleri kategorize edilmiş şekilde.
 * Her isim bir SVG dosyasını temsil eder (CDN'de .svg uzantılı).
 */
export const illustrations = {
  // ===== YEMEK & RESTAURANT =====
  meal: {
    mealVoucher: 'meal-voucher',
    mealCard: 'meal-card',
    restaurant: 'restaurant',
    chef: 'chef',
    breakfast: 'breakfast',
    lunch: 'lunch',
    dinner: 'dinner',
    snack: 'snack',
    drink: 'drink',
    coffee: 'coffee',
    deliveryFood: 'delivery-food',
    groceries: 'groceries',
    kitchen: 'kitchen',
  },

  // ===== ÜYE İŞYERLERİ (Large/Medium/Small varyantlı) =====
  merchants: {
    merchantsLarge: 'merchants-large',
    merchantsMedium: 'merchants-medium',
    merchantsSmall: 'merchants-small',
    supermarketLarge: 'supermarket-large',
    supermarketMedium: 'supermarket-medium',
    supermarketSmall: 'supermarket-small',
    pharmacyLarge: 'pharmacy-large',
    pharmacyMedium: 'pharmacy-medium',
    pharmacySmall: 'pharmacy-small',
    fuelStationLarge: 'fuel-station-large',
    fuelStationMedium: 'fuel-station-medium',
    fuelStationSmall: 'fuel-station-small',
    gymLarge: 'gym-large',
    gymMedium: 'gym-medium',
    gymSmall: 'gym-small',
    cinemaLarge: 'cinema-large',
    cinemaMedium: 'cinema-medium',
    cinemaSmall: 'cinema-small',
  },

  // ===== KARTLAR =====
  cards: {
    creditCard: 'credit-card',
    debitCard: 'debit-card',
    contactlessPayment: 'contactless-payment',
    cardLost: 'card-lost',
    cardBlocked: 'card-blocked',
    cardActivation: 'card-activation',
    cardDelivery: 'card-delivery',
    virtualCard: 'virtual-card',
    physicalCard: 'physical-card',
  },

  // ===== GÜVENLİK =====
  security: {
    secureLock: 'secure-lock',
    twoFactor: 'two-factor',
    biometricFingerprint: 'biometric-fingerprint',
    biometricFace: 'biometric-face',
    privacy: 'privacy',
    shield: 'shield',
    password: 'password',
    pin: 'pin',
  },

  // ===== İŞ HAYATI =====
  jobLife: {
    workOffice: 'work-office',
    remoteWork: 'remote-work',
    teamMeeting: 'team-meeting',
    coworking: 'coworking',
    careerGrowth: 'career-growth',
    promotion: 'promotion',
    newJob: 'new-job',
    interview: 'interview',
  },

  // ===== OFİS HAYATI =====
  officeLife: {
    coffeeBreak: 'coffee-break',
    lunchBreak: 'lunch-break',
    deskSetup: 'desk-setup',
    printer: 'printer',
    meetingRoom: 'meeting-room',
    whiteboard: 'whiteboard',
  },

  // ===== EBEVEYNLİK =====
  parenting: {
    babyCare: 'baby-care',
    childcare: 'childcare',
    schoolKids: 'school-kids',
    parentalLeave: 'parental-leave',
    family: 'family',
  },

  // ===== İŞ-YAŞAM DENGESİ =====
  workLife: {
    workLifeBalance: 'work-life-balance',
    vacation: 'vacation',
    weekend: 'weekend',
    relaxation: 'relaxation',
    timeOff: 'time-off',
  },

  // ===== TAKIM ÇALIŞMASI =====
  collaboration: {
    teamwork: 'teamwork',
    handshake: 'handshake',
    meeting: 'meeting',
    presentation: 'presentation',
    brainstorming: 'brainstorming',
  },

  // ===== ULAŞIM =====
  commute: {
    publicTransport: 'public-transport',
    bus: 'bus',
    metro: 'metro',
    train: 'train',
    bicycle: 'bicycle',
    car: 'car',
    walking: 'walking',
    rideshare: 'rideshare',
  },

  // ===== DURUM/STATÜ =====
  status: {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
    empty: 'empty',
    notFound: 'not-found',
    maintenance: 'maintenance',
    underConstruction: 'under-construction',
    comingSoon: 'coming-soon',
    loading: 'loading',
    noResults: 'no-results',
  },

  // ===== CİHAZLAR =====
  devices: {
    smartphone: 'smartphone',
    laptop: 'laptop',
    tablet: 'tablet',
    desktop: 'desktop',
    smartwatch: 'smartwatch',
    multiDevice: 'multi-device',
  },

  // ===== ONBOARDING =====
  onboarding: {
    welcome: 'welcome',
    getStarted: 'get-started',
    setupAccount: 'setup-account',
    profileSetup: 'profile-setup',
    tutorial: 'tutorial',
    firstStep: 'first-step',
  },

  // ===== SAĞLIK =====
  health: {
    wellness: 'wellness',
    fitness: 'fitness',
    mentalHealth: 'mental-health',
    nutrition: 'nutrition',
    medicalCheckup: 'medical-checkup',
  },

  // ===== ENGAGEMENT/ETKİLEŞİM =====
  engagement: {
    rewards: 'rewards',
    achievements: 'achievements',
    levelUp: 'level-up',
    streak: 'streak',
    milestone: 'milestone',
    celebration: 'celebration',
  },

  // ===== TASARRUF =====
  savings: {
    piggyBank: 'piggy-bank',
    savingsGoal: 'savings-goal',
    budgetTracking: 'budget-tracking',
    discount: 'discount',
    cashback: 'cashback',
    deals: 'deals',
  },

  // ===== KARIŞIK =====
  misc: {
    gift: 'gift',
    notification: 'notification',
    settings: 'settings',
    help: 'help',
    support: 'support',
    feedback: 'feedback',
    rate: 'rate',
    share: 'share',
  },
} as const;

/**
 * Verilen illustration dosya adından tam CDN URL'i üretir.
 *
 * @example
 *   getIllustrationUrl('meal-voucher')
 *   // => 'https://visualassets.designsystem.pluxee.app/.../illustrations/meal-voucher.svg'
 *
 *   getIllustrationUrl(illustrations.meal.mealVoucher)
 *   // => Aynı sonuç (typed kullanım, IDE autocomplete avantajı)
 */
export function getIllustrationUrl(illustrationName: string): string {
  return `${ILLUSTRATION_CDN_BASE}/${illustrationName}.svg`;
}

// ===== TypeScript yardımcı tipler =====
export type IllustrationCategory = keyof typeof illustrations;
export type IllustrationName = string;

// CDN base'i de export et (gerekirse manuel URL üretebilmek için)
export { ILLUSTRATION_CDN_BASE };