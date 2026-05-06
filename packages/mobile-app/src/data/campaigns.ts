/**
 * Banner ve kampanya verileri.
 */

export interface Banner {
  id: string;
  badge: string;
  badgeBgColor: string;
  title: string;
  bgColor: string;
  textColor: string;
}

export const MOCK_BANNERS: Banner[] = [
  {
    id: '1',
    badge: 'TRENDYOL GO',
    badgeBgColor: '#ffd60a',
    title: "Trendyol Go'da Tum McDonald's Subeleri Pluxeeli",
    bgColor: '#00eb5e',
    textColor: '#221c46',
  },
  {
    id: '2',
    badge: 'BILETIX',
    badgeBgColor: '#a8d8ff',
    title: "Biletix'te %50'ye varan indirim!",
    bgColor: '#cdebff',
    textColor: '#221c46',
  },
  {
    id: '3',
    badge: 'PAZARAMA',
    badgeBgColor: '#ff9ec7',
    title: 'Pazarama Pluxee Market alisveris',
    bgColor: '#7d3cff',
    textColor: '#ffffff',
  },
  {
    id: '4',
    badge: 'STARBUCKS',
    badgeBgColor: '#ffd60a',
    title: 'Starbucks Pluxee Avantaji',
    bgColor: '#006241',
    textColor: '#ffffff',
  },
  {
    id: '5',
    badge: 'HAYAT SU',
    badgeBgColor: '#a8d8ff',
    title: 'Hayat Su Pluxee Ozel Indirim',
    bgColor: '#0099d4',
    textColor: '#ffffff',
  },
  {
    id: '6',
    badge: 'TIKTAK',
    badgeBgColor: '#ffd60a',
    title: 'TikTak Anlik Teslimat Avantaji',
    bgColor: '#1a1a1a',
    textColor: '#ffffff',
  },
  {
    id: '7',
    badge: 'MCDONALDS',
    badgeBgColor: '#ffd60a',
    title: 'McDonalds Pluxee Avantaji',
    bgColor: '#ffc72c',
    textColor: '#221c46',
  },
  {
    id: '8',
    badge: 'UNLEM SIGORTA',
    badgeBgColor: '#ffd60a',
    title: "Unlem Sigorta'dan 5000 TL Pluxee Hediye",
    bgColor: '#221c46',
    textColor: '#ffffff',
  },
];

export interface OfferCard {
  id: string;
  badge: string;
  badgeBgColor: string;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
}

export const MOCK_OFFERS: OfferCard[] = [
  {
    id: '1',
    badge: 'TRENDYOL GO',
    badgeBgColor: '#00eb5e',
    title: "McDonald's siparisini Trendyol Go'da kolayca ode",
    description: "Trendyol Go'da McDonald's siparisi ilk ve tek Pluxee'de!",
    bgColor: '#3d2169',
    textColor: '#ffffff',
  },
  {
    id: '2',
    badge: 'PAZARAMA',
    badgeBgColor: '#ff9ec7',
    title: "Pazarama Pluxee Market'ten alisveris yapma ayricaligini kesfet",
    description: "Pluxee bakiyenle Pazarama'da alisveris yap.",
    bgColor: '#5e2da8',
    textColor: '#ffffff',
  },
  {
    id: '3',
    badge: 'BILETIX',
    badgeBgColor: '#a8d8ff',
    title: "Biletix'te %50'ye varan indirim!",
    description: "Biletix'in populer etkinliklerinde sana ozel.",
    bgColor: '#221c46',
    textColor: '#ffffff',
  },
  {
    id: '4',
    badge: 'UNLEM SIGORTA',
    badgeBgColor: '#ffd60a',
    title: "Unlem Sigorta'dan 5000 TL Pluxee Hediye",
    description: "Sigortani Unlem Sigorta'dan yap, 5000 TL'ye varan hediye.",
    bgColor: '#3d2169',
    textColor: '#ffffff',
  },
];
