/**
 * Banner, kampanya ve story verileri.
 * Story'ler kampanyalarla eslestirilir (storyBannerId).
 */

export interface Banner {
  id: string;
  badge: string;
  badgeBgColor: string;
  title: string;
  bgColor: string;
  textColor: string;
  /** Kampanya detay sayfasi icin */
  detailTitle: string;
  detailText: string;
  linkText?: string;
  linkUrl?: string;
  /** Kampanya kodu varsa gosterilir, yoksa buton olmaz */
  campaignCode?: string;
}

export const MOCK_BANNERS: Banner[] = [
  {
    id: '1',
    badge: 'TRENDYOL GO',
    badgeBgColor: '#ffd60a',
    title: "Trendyol Go'da Tum McDonald's Subeleri Pluxeeli",
    bgColor: '#00eb5e',
    textColor: '#221c46',
    detailTitle: "Trendyol Go'da Tum McDonald's Subeleri Pluxeeli",
    detailText: "Trendyol Go uzerinden McDonald's siparislerinizde Pluxee ile odeme yapabilirsiniz.\n\nKampanya Kosullari:\n1. Kampanya tum Pluxee kullanicilari icin gecerlidir.\n2. Trendyol Go uygulamasi uzerinden siparis verilmelidir.\n3. Odeme sirasinda Pluxee secenegi secilmelidir.",
    linkText: 'Siparis vermek icin tikla',
  },
  {
    id: '2',
    badge: 'BILETIX',
    badgeBgColor: '#a8d8ff',
    title: "Biletix'te %50'ye varan indirim!",
    bgColor: '#cdebff',
    textColor: '#221c46',
    detailTitle: "Biletix'te %50'ye Varan Indirim!",
    detailText: "Kampanya Kullanimi:\n\n1- Yukaridaki linke tikla,\n2- Istedigin etkinligi secdikten sonra Bilet Turu alanindan Pluxee Ozel sec,\n3- Acilan alanda Token kismina mobil uygulamadan aldigin sana ozel kampanya kodunu gir,\n4- Indirim uygulandiktan sonra odeme gerceklestirilir.\n\nKampanya Kosullari:\n1. Kampanyali biletler stoklarla sinirlidir.\n2. Kampanya kapsaminda indirimli bilet, 1+1 promosyonu sunulmaktadir.",
    linkText: 'Avantajli bilet almak icin tikla',
    campaignCode: 'PLUXEE50',
  },
  {
    id: '3',
    badge: 'PAZARAMA',
    badgeBgColor: '#ff9ec7',
    title: 'Pazarama Pluxee Market alisveris',
    bgColor: '#7d3cff',
    textColor: '#ffffff',
    detailTitle: 'Pazarama Pluxee Market Alisveris Ayricaligi',
    detailText: "Pluxee bakiyenle Pazarama'da alisveris yapma ayricaligini kesfet!\n\nKampanya Detaylari:\n1. Kampanya tum Pluxee kullanicilari icin gecerlidir.\n2. Pazarama uygulamasi uzerinden alisveris yapilmalidir.\n3. Minimum siparis tutari 100 TL'dir.",
    linkText: "Pazarama'da alisveris yap",
  },
  {
    id: '4',
    badge: 'STARBUCKS',
    badgeBgColor: '#ffd60a',
    title: 'Starbucks Pluxee Avantaji',
    bgColor: '#006241',
    textColor: '#ffffff',
    detailTitle: 'Starbucks Pluxee Avantaji',
    detailText: "Starbucks magazalarinda Pluxee kartinla odeme yap, ozel avantajlardan yararlan!\n\nKampanya Kosullari:\n1. Tum Starbucks magazalarinda gecerlidir.\n2. Pluxee Yemek ve Pluxee Hediye kartlari ile odeme yapilabilir.",
  },
  {
    id: '5',
    badge: 'HAYAT SU',
    badgeBgColor: '#a8d8ff',
    title: 'Hayat Su Pluxee Ozel Indirim',
    bgColor: '#0099d4',
    textColor: '#ffffff',
    detailTitle: 'Hayat Su Pluxee Ozel Indirim',
    detailText: "Hayat Su urunlerinde Pluxee kullanicilarina ozel indirim!\n\nKampanya Detaylari:\n1. Kampanya secili marketlerde gecerlidir.\n2. Kampanya 31.12.2026 tarihine kadar gecerlidir.",
    campaignCode: 'HAYATPLUXEE',
  },
  {
    id: '6',
    badge: 'TIKTAK',
    badgeBgColor: '#ffd60a',
    title: 'TikTak Anlik Teslimat Avantaji',
    bgColor: '#1a1a1a',
    textColor: '#ffffff',
    detailTitle: 'TikTak Anlik Teslimat Avantaji',
    detailText: "TikTak uygulamasindan anlik teslimat siparislerinde Pluxee ile ode!\n\nKampanyadan Nasil Yararlanilir?\n1. TikTak uygulamasini indir.\n2. Siparis olustur.\n3. Odeme yontemi olarak Pluxee sec.",
    linkText: 'TikTak uygulamasini indir',
  },
  {
    id: '7',
    badge: 'MCDONALDS',
    badgeBgColor: '#ffd60a',
    title: "McDonald's Pluxee Avantaji",
    bgColor: '#ffc72c',
    textColor: '#221c46',
    detailTitle: "McDonald's Pluxee Avantaji",
    detailText: "McDonald's restoranlarinda Pluxee kartinla odeme yaparak avantajlardan yararlan!\n\nKampanya Kosullari:\n1. Tum McDonald's restoranlarinda gecerlidir.\n2. Pluxee Yemek karti ile odeme yapilabilir.",
  },
  {
    id: '8',
    badge: 'UNLEM SIGORTA',
    badgeBgColor: '#ffd60a',
    title: "Unlem Sigorta'dan 5000 TL Pluxee Hediye",
    bgColor: '#221c46',
    textColor: '#ffffff',
    detailTitle: "Unlem Sigorta'dan 5000 TL Pluxee Hediye",
    detailText: "Sigortani Unlem Sigorta'dan yap, 5000 TL'ye varan Pluxee hediye kazan!\n\nKampanya Detaylari:\n1. Kampanya 01.01.2026 - 31.12.2026 tarihleri arasinda gecerlidir.\n2. Kampanyadan faydalanmak icin 444 83 73 numarali Securitas Alarm Musteri Hizmetleri'ne kupon sifresi iletilmelidir.\n3. Her abone kampanyadan 1 defa faydalanabilir.",
    linkText: 'Teklif almak icin tikla',
    campaignCode: 'TCEWQERHB',
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
  /** Banner id ile eslestirilir - tiklaninca CampaignDetail acilir */
  bannerId: string;
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
    bannerId: '1',
  },
  {
    id: '2',
    badge: 'PAZARAMA',
    badgeBgColor: '#ff9ec7',
    title: "Pazarama Pluxee Market'ten alisveris yapma ayricaligini kesfet",
    description: "Pluxee bakiyenle Pazarama'da alisveris yap.",
    bgColor: '#5e2da8',
    textColor: '#ffffff',
    bannerId: '3',
  },
  {
    id: '3',
    badge: 'BILETIX',
    badgeBgColor: '#a8d8ff',
    title: "Biletix'te %50'ye varan indirim!",
    description: "Biletix'in populer etkinliklerinde sana ozel.",
    bgColor: '#221c46',
    textColor: '#ffffff',
    bannerId: '2',
  },
  {
    id: '4',
    badge: 'UNLEM SIGORTA',
    badgeBgColor: '#ffd60a',
    title: "Unlem Sigorta'dan 5000 TL Pluxee Hediye",
    description: "Sigortani Unlem Sigorta'dan yap, 5000 TL'ye varan hediye.",
    bgColor: '#3d2169',
    textColor: '#ffffff',
    bannerId: '8',
  },
];

/**
 * Banner'i id ile getirir.
 */
export function getBannerById(id: string): Banner | undefined {
  return MOCK_BANNERS.find((b) => b.id === id);
}
