// Pluxee'li Noktalar mock data
// Spec: Pluxee_li_Noktalar.pdf
// Mevcut data/places.ts ile çakışmamak için ayrı dosya.

export type BadgeType = 'magaza' | 'online' | 'magaza-online';

export interface HediyeBrand {
  id: string;
  name: string;
  logo: any;
  badge: BadgeType;
  category: HediyeCategory;
  addedAt: number; // timestamp — varsayılan sıralama için (en yeni → en eski)
}

export interface OnlineBrand {
  id: string;
  name: string;
  logo: any;
  validFor: ('yemek' | 'hediye' | 'gida')[];
  category: OnlineCategory;
  deeplink?: string;
  addedAt: number;
}

export interface YemekPlatform {
  id: string;
  name: string;
  logo: any;
  deeplink: string;
  iosStoreUrl?: string;
  androidStoreUrl?: string;
}

export interface RestoranMarket {
  id: string;
  name: string;
  rating: number;
  distanceKm: number;
  city: string;
  district: string;
  paymentTypes: ('mobil' | 'kartli')[];
  hasOnline: boolean;
  plusPuanPercent?: number;
  category: 'restoran' | 'market';
  subCategory?: string;
  iconName?: string;
}

export interface UlasimBrand {
  id: string;
  name: string;
  logo?: any;
  iconName?: string;
  isCategory?: boolean;
  addedAt: number;
}

export type HediyeCategory =
  | 'Akaryakit'
  | 'ETicaret'
  | 'EvYasam'
  | 'Giyim'
  | 'KahveIcecek'
  | 'KisiselBakim'
  | 'MarketGida'
  | 'SaglikSeyahat'
  | 'RestoranMarket'
  | 'Teknoloji'
  | 'Ulasim';

export type OnlineCategory =
  | 'Akaryakit'
  | 'ETicaret'
  | 'EvYasam'
  | 'Giyim'
  | 'KahveIcecek'
  | 'KisiselBakim'
  | 'MarketGida'
  | 'Teknoloji';

// HEDİYE MARKALARI (P9 — etiketli)
// HEDIYE MARKALARI (brands.ts ile ayni sirada — 34 marka)
export const HEDIYE_BRANDS: HediyeBrand[] = [
  { id: 'hb-pluxee-yemek', name: "Pluxee Yemek", logo: require('../../assets/brand-logos/pluxee-yemek.png'), badge: 'magaza-online', category: 'MarketGida', addedAt: 34 },
  { id: 'hb-pegasus', name: "Pegasus BolBol", logo: require('../../assets/brand-logos/pegasus-bolbol.png'), badge: 'online', category: 'SaglikSeyahat', addedAt: 33 },
  { id: 'hb-starbucks', name: "Starbucks", logo: require('../../assets/brand-logos/starbucks.png'), badge: 'magaza-online', category: 'KahveIcecek', addedAt: 32 },
  { id: 'hb-carrefour', name: "Carrefour SA", logo: require('../../assets/brand-logos/carrefour-sa.png'), badge: 'magaza-online', category: 'MarketGida', addedAt: 31 },
  { id: 'hb-pluxee-gida', name: "Pluxee Gida", logo: require('../../assets/brand-logos/pluxee-gida.png'), badge: 'magaza-online', category: 'MarketGida', addedAt: 30 },
  { id: 'hb-a101', name: "A101", logo: require('../../assets/brand-logos/a101.png'), badge: 'online', category: 'MarketGida', addedAt: 29 },
  { id: 'hb-decathlon', name: "Decathlon", logo: require('../../assets/brand-logos/decathlon.png'), badge: 'magaza-online', category: 'Giyim', addedAt: 28 },
  { id: 'hb-englishhome', name: "English Home", logo: require('../../assets/brand-logos/english-home.png'), badge: 'magaza-online', category: 'EvYasam', addedAt: 27 },
  { id: 'hb-beymen', name: "Beymen", logo: require('../../assets/brand-logos/beymen.png'), badge: 'magaza-online', category: 'Giyim', addedAt: 26 },
  { id: 'hb-pazarama', name: "Pazarama", logo: require('../../assets/brand-logos/pazarama.png'), badge: 'online', category: 'ETicaret', addedAt: 25 },
  { id: 'hb-pazaramatatil', name: "Pazarama Tatil", logo: require('../../assets/brand-logos/pazarama-alt.png'), badge: 'online', category: 'SaglikSeyahat', addedAt: 24 },
  { id: 'hb-hopi', name: "Hopi", logo: require('../../assets/brand-logos/hopi.png'), badge: 'magaza-online', category: 'ETicaret', addedAt: 23 },
  { id: 'hb-pazaramagiyim', name: "Pazarama Giyim Puan", logo: require('../../assets/brand-logos/pazarama-giyim-puan.png'), badge: 'online', category: 'Giyim', addedAt: 22 },
  { id: 'hb-kigili', name: "Kigili", logo: require('../../assets/brand-logos/kigili.png'), badge: 'magaza-online', category: 'Giyim', addedAt: 21 },
  { id: 'hb-teknosa', name: "TeknoSA", logo: require('../../assets/brand-logos/teknosa.png'), badge: 'magaza-online', category: 'Teknoloji', addedAt: 20 },
  { id: 'hb-boyner', name: "Boyner", logo: require('../../assets/brand-logos/boyner.png'), badge: 'magaza-online', category: 'Giyim', addedAt: 19 },
  { id: 'hb-hepsiburada', name: "Hepsiburada", logo: require('../../assets/brand-logos/hepsiburada.png'), badge: 'online', category: 'ETicaret', addedAt: 18 },
  { id: 'hb-gratis', name: "Gratis", logo: require('../../assets/brand-logos/gratis.png'), badge: 'online', category: 'KisiselBakim', addedAt: 17 },
  { id: 'hb-ikea', name: "IKEA", logo: require('../../assets/brand-logos/ikea.png'), badge: 'magaza-online', category: 'EvYasam', addedAt: 16 },
  { id: 'hb-mavi', name: "Mavi", logo: require('../../assets/brand-logos/mavi.png'), badge: 'magaza-online', category: 'Giyim', addedAt: 15 },
  { id: 'hb-defacto', name: "DeFacto", logo: require('../../assets/brand-logos/defacto.png'), badge: 'magaza-online', category: 'Giyim', addedAt: 14 },
  { id: 'hb-koton', name: "Koton", logo: require('../../assets/brand-logos/koton.png'), badge: 'magaza-online', category: 'Giyim', addedAt: 13 },
  { id: 'hb-mudo', name: "Mudo", logo: require('../../assets/brand-logos/mudo.png'), badge: 'magaza-online', category: 'Giyim', addedAt: 12 },
  { id: 'hb-mudoconcept', name: "Mudo Concept", logo: require('../../assets/brand-logos/mudo-concept.png'), badge: 'magaza-online', category: 'EvYasam', addedAt: 11 },
  { id: 'hb-ozdilek', name: "Ozdilek", logo: require('../../assets/brand-logos/ozdilek.png'), badge: 'magaza-online', category: 'EvYasam', addedAt: 10 },
  { id: 'hb-ayakkabi', name: "Ayakkabi Dunyasi", logo: require('../../assets/brand-logos/ayakkabi-dunyasi.png'), badge: 'magaza-online', category: 'Giyim', addedAt: 9 },
  { id: 'hb-network', name: "NetWork / Divarese", logo: require('../../assets/brand-logos/network-divarese.png'), badge: 'magaza-online', category: 'Giyim', addedAt: 8 },
  { id: 'hb-braunoral', name: "Braun / Oral-B", logo: require('../../assets/brand-logos/braun-oral-b.png'), badge: 'online', category: 'KisiselBakim', addedAt: 7 },
  { id: 'hb-meditopia', name: "Meditopia", logo: require('../../assets/brand-logos/meditopia.png'), badge: 'online', category: 'SaglikSeyahat', addedAt: 6 },
  { id: 'hb-meditopiawellness', name: "Meditopia WellnessPass", logo: require('../../assets/brand-logos/meditopia-wellness.png'), badge: 'online', category: 'SaglikSeyahat', addedAt: 5 },
  { id: 'hb-bodo', name: "Bodo", logo: require('../../assets/brand-logos/bodo.png'), badge: 'magaza-online', category: 'Giyim', addedAt: 4 },
  { id: 'hb-arkasturizm', name: "Arkas Turizm", logo: require('../../assets/brand-logos/arkas-turizm.png'), badge: 'online', category: 'SaglikSeyahat', addedAt: 3 },
  { id: 'hb-sok', name: "Sok", logo: require('../../assets/brand-logos/sok.png'), badge: 'magaza-online', category: 'MarketGida', addedAt: 2 },
  { id: 'hb-ofix', name: "Ofix", logo: require('../../assets/brand-logos/ofix.png'), badge: 'online', category: 'ETicaret', addedAt: 1 },
];

// ONLINE ALIŞVERİŞ MARKALARI (P16)
export const ONLINE_BRANDS: OnlineBrand[] = [
  { id: 'ob-sariyer', name: 'Sarıyer', logo: require('../../assets/brand-logos/sariyer.png'), validFor: ['yemek'], category: 'MarketGida', addedAt: 100 },
  { id: 'ob-dominos', name: "Domino's Pizza", logo: require('../../assets/brand-logos/dominos-pizza.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: 99 },
  { id: 'ob-mopas', name: 'Mopaş', logo: require('../../assets/brand-logos/mopas.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 98 },
  { id: 'ob-boyner', name: 'Boyner', logo: require('../../assets/brand-logos/boyner.png'), validFor: ['hediye'], category: 'Giyim', addedAt: 97 },
  { id: 'ob-mcdonalds', name: "McDonald's", logo: require('../../assets/brand-logos/mcdonalds.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: 96 },
  { id: 'ob-hopi', name: 'Hopi', logo: require('../../assets/brand-logos/hopi.png'), validFor: ['hediye'], category: 'ETicaret', addedAt: 95 },
  { id: 'ob-hepsiburada', name: 'Hepsiburada', logo: require('../../assets/brand-logos/hepsiburada.png'), validFor: ['hediye'], category: 'ETicaret', addedAt: 94 },
  { id: 'ob-teknosa', name: 'TeknoSA', logo: require('../../assets/brand-logos/teknosa.png'), validFor: ['hediye'], category: 'Teknoloji', addedAt: 93 },
  { id: 'ob-ikea', name: 'IKEA', logo: require('../../assets/brand-logos/ikea.png'), validFor: ['hediye'], category: 'EvYasam', addedAt: 92 },
  { id: 'ob-mavi', name: 'Mavi', logo: require('../../assets/brand-logos/mavi.png'), validFor: ['hediye'], category: 'Giyim', addedAt: 91 },
  { id: 'ob-ofix', name: 'Ofix', logo: require('../../assets/brand-logos/ofix.png'), validFor: ['hediye'], category: 'ETicaret', addedAt: 90 },
  { id: 'ob-koton', name: 'Koton', logo: require('../../assets/brand-logos/koton.png'), validFor: ['hediye'], category: 'Giyim', addedAt: 89 },
  { id: 'ob-tazemasa', name: 'Tazemasa', logo: require('../../assets/brand-logos/tazemasa.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 88 },
  { id: 'ob-pazarama-online', name: 'Pazarama', logo: require('../../assets/brand-logos/pazarama-online.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 87 },
  { id: 'ob-hurma', name: 'Hurma', logo: require('../../assets/brand-logos/hurma.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 86 },
  { id: 'ob-ozel-beslenme', name: 'Ozel Beslenme', logo: require('../../assets/brand-logos/ozel-beslenme.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 85 },
  { id: 'ob-10dangelsin', name: '10dangelsin', logo: require('../../assets/brand-logos/10dangelsin.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 84 },
  { id: 'ob-pindrinks', name: 'PinDrinks', logo: require('../../assets/brand-logos/pindrinks.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 83 },
  { id: 'ob-ideal-hipermarketleri', name: 'Ideal Hipermarketleri', logo: require('../../assets/brand-logos/ideal-hipermarketleri.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 82 },
  { id: 'ob-demtas-kapinda', name: 'Demtas Kapinda', logo: require('../../assets/brand-logos/demtas-kapinda.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 81 },
  { id: 'ob-thegoodwild', name: 'The Good Wild', logo: require('../../assets/brand-logos/thegoodwild.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 80 },
  { id: 'ob-enavmshop', name: 'EnAVMShop', logo: require('../../assets/brand-logos/enavmshop.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 79 },
  { id: 'ob-lokma-tarim', name: 'Lokma Tarim', logo: require('../../assets/brand-logos/lokma-tarim.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 78 },
  { id: 'ob-yasam-foods', name: 'Yasam Foods', logo: require('../../assets/brand-logos/yasam-foods.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 77 },
  { id: 'ob-ozbesin', name: 'Ozbesin', logo: require('../../assets/brand-logos/ozbesin.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 76 },
  { id: 'ob-usmar-market', name: 'Usmar Market', logo: require('../../assets/brand-logos/usmar-market.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 75 },
  { id: 'ob-arti-dukkan', name: 'Arti Dukkan', logo: require('../../assets/brand-logos/arti-dukkan.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 74 },
  { id: 'ob-10line-gross', name: '10line Gross', logo: require('../../assets/brand-logos/10line-gross.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 73 },
  { id: 'ob-ekonomik-olsun', name: 'Ekonomik Olsun', logo: require('../../assets/brand-logos/ekonomik-olsun.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 72 },
  { id: 'ob-hayatsu', name: 'Hayat Su', logo: require('../../assets/brand-logos/hayatsu.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 71 },
  { id: 'ob-sebosun', name: 'Sebosun', logo: require('../../assets/brand-logos/sebosun.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 70 },
  { id: 'ob-sebostan', name: 'Sebostan', logo: require('../../assets/brand-logos/sebostan.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 69 },
  { id: 'ob-atayname', name: 'Atayname', logo: require('../../assets/brand-logos/atayname.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 68 },
  { id: 'ob-komsu-kooperatif', name: 'Komsu Kooperatif', logo: require('../../assets/brand-logos/komsu-kooperatif.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 67 },
  { id: 'ob-hatay-dogal', name: 'Hatay Dogal', logo: require('../../assets/brand-logos/hatay-dogal.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 66 },
  { id: 'ob-canakkaleden', name: 'Canakkaleden.com', logo: require('../../assets/brand-logos/canakkaleden.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 65 },
  { id: 'ob-moston', name: 'Moston', logo: require('../../assets/brand-logos/moston.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 64 },
  { id: 'ob-gurmenatura', name: 'Gurmenatura', logo: require('../../assets/brand-logos/gurmenatura.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 63 },
  { id: 'ob-tellioglu', name: 'Tellioglu Degirmen', logo: require('../../assets/brand-logos/tellioglu.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 62 },
  { id: 'ob-yoresel-bakkal', name: 'Yoresel Bakkal', logo: require('../../assets/brand-logos/yoresel-bakkal.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 61 },
  { id: 'ob-alkan-zeytin', name: 'Alkan Zeytin', logo: require('../../assets/brand-logos/alkan-zeytin.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 60 },
  { id: 'ob-uzungol-bal', name: 'Uzungol Bal', logo: require('../../assets/brand-logos/uzungol-bal.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 59 },
  { id: 'ob-emu-baharat', name: 'Emu Baharat', logo: require('../../assets/brand-logos/emu-baharat.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 58 },
  { id: 'ob-lival-ciftligi', name: 'Lival Ciftligi', logo: require('../../assets/brand-logos/lival-ciftligi.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 57 },
  { id: 'ob-dervisoglu-olidea', name: 'Dervisoglu Olidea', logo: require('../../assets/brand-logos/dervisoglu-olidea.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 56 },
  { id: 'ob-anamurbahcesi', name: 'Anamurbahcesi.com', logo: require('../../assets/brand-logos/anamurbahcesi.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 55 },
  { id: 'ob-gonenli-peynircmm', name: 'Gonenli Peynircmm', logo: require('../../assets/brand-logos/gonenli-peynircmm.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 54 },
  { id: 'ob-balaban-sucuklari', name: 'Balaban Sucuklari', logo: require('../../assets/brand-logos/balaban-sucuklari.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 53 },
  { id: 'ob-palaz-et', name: 'Palaz Et', logo: require('../../assets/brand-logos/palaz-et.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 52 },
  { id: 'ob-danet', name: 'Danet', logo: require('../../assets/brand-logos/danet.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 51 },
  { id: 'ob-dink-gida', name: 'Dink Gida', logo: require('../../assets/brand-logos/dink-gida.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 50 },
  { id: 'ob-ben-gurme', name: 'Ben Gurme', logo: require('../../assets/brand-logos/ben-gurme.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 49 },
  { id: 'ob-araz-et', name: 'Araz Et', logo: require('../../assets/brand-logos/araz-et.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 48 },
  { id: 'ob-toruna', name: 'Toruna', logo: require('../../assets/brand-logos/toruna.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 47 },
  { id: 'ob-bizeyolla', name: 'Bize Yolla', logo: require('../../assets/brand-logos/bizeyolla.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 46 },
  { id: 'ob-etin-en-iyisi', name: 'Etin En Iyisi', logo: require('../../assets/brand-logos/etin-en-iyisi.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 45 },
  { id: 'ob-kemal-istif', name: 'Kemal Istif', logo: require('../../assets/brand-logos/kemal-istif.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 44 },
  { id: 'ob-tayas-online', name: 'Tayas Online', logo: require('../../assets/brand-logos/tayas-online.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 43 },
  { id: 'ob-taptazeal', name: 'Taptazeal', logo: require('../../assets/brand-logos/taptazeal.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 42 },
  { id: 'ob-ekici-kuruyemis', name: 'Ekici Kuruyemis', logo: require('../../assets/brand-logos/ekici-kuruyemis.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 41 },
  { id: 'ob-cerezciyiz-biz', name: 'Cerezciyiz Biz', logo: require('../../assets/brand-logos/cerezciyiz-biz.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 40 },
  { id: 'ob-unal-kuruyemis', name: 'Unal Kuruyemis', logo: require('../../assets/brand-logos/unal-kuruyemis.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 39 },
  { id: 'ob-keyfi-tat', name: 'Keyfi Tat', logo: require('../../assets/brand-logos/keyfi-tat.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 38 },
  { id: 'ob-snacks-for-party', name: 'Snacks for Party', logo: require('../../assets/brand-logos/snacks-for-party.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 37 },
  { id: 'ob-makedon-gurme', name: 'Makedon Gurme', logo: require('../../assets/brand-logos/makedon-gurme.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: 36 },
  { id: 'ob-saloon-burger', name: 'Saloon Burger', logo: require('../../assets/brand-logos/saloon-burger.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: 35 },
  { id: 'ob-pizzalazza', name: 'Pizzalazza', logo: require('../../assets/brand-logos/pizzalazza.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: 34 },
  { id: 'ob-meal-box', name: 'Meal Box', logo: require('../../assets/brand-logos/meal-box.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: 33 },
  { id: 'ob-yemece', name: 'Yemece', logo: require('../../assets/brand-logos/yemece.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: 32 },
  { id: 'ob-adile-sultan', name: 'Adile Sultan Ev Yemekleri', logo: require('../../assets/brand-logos/adile-sultan.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: 31 },
  { id: 'ob-ordinary-us', name: 'Ordinary-us Food', logo: require('../../assets/brand-logos/ordinary-us.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: 30 },
  { id: 'ob-cafe-kazanci', name: 'Cafe Kazanci', logo: require('../../assets/brand-logos/cafe-kazanci.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: 29 },
  { id: 'ob-coffy', name: 'Coffy', logo: require('../../assets/brand-logos/coffy.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: 28 },
  { id: 'ob-karakoy-gulluoglu', name: 'Karakoy Gulluoglu', logo: require('../../assets/brand-logos/karakoy-gulluoglu.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: 27 },
  { id: 'ob-yasar-pastanesi-mado', name: 'Yasar Pastanesi Mado', logo: require('../../assets/brand-logos/yasar-pastanesi-mado.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: 26 },
  { id: 'ob-kimbo-turkey', name: 'Kimbo Turkey', logo: require('../../assets/brand-logos/kimbo-turkey.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: 25 },
  { id: 'ob-balfit', name: 'Balfit', logo: require('../../assets/brand-logos/balfit.png'), validFor: ['gida'], category: 'SaglikSeyahat', addedAt: 24 },
  { id: 'ob-90fit', name: '90fit', logo: require('../../assets/brand-logos/90fit.png'), validFor: ['gida'], category: 'SaglikSeyahat', addedAt: 23 },
  { id: 'ob-slim-plus', name: 'Slim Plus', logo: require('../../assets/brand-logos/slim-plus.png'), validFor: ['gida'], category: 'SaglikSeyahat', addedAt: 22 },
  { id: 'ob-torq-nutrition', name: 'Torq Nutrition', logo: require('../../assets/brand-logos/torq-nutrition.png'), validFor: ['gida'], category: 'SaglikSeyahat', addedAt: 21 },
  { id: 'ob-baca-organik', name: 'Baca Organik', logo: require('../../assets/brand-logos/baca-organik.png'), validFor: ['gida'], category: 'SaglikSeyahat', addedAt: 20 },
  { id: 'ob-rafinera', name: 'Rafinera', logo: require('../../assets/brand-logos/rafinera.png'), validFor: ['gida'], category: 'SaglikSeyahat', addedAt: 19 },
  { id: 'ob-green-amour', name: 'Green Amour', logo: require('../../assets/brand-logos/green-amour.png'), validFor: ['hediye'], category: 'MarketGida', addedAt: 18 },
  { id: 'ob-beyorganik', name: 'Beyorganik', logo: require('../../assets/brand-logos/beyorganik.png'), validFor: ['hediye'], category: 'MarketGida', addedAt: 17 },
  { id: 'ob-fethiye-koy-urunleri', name: 'Fethiye Koy Urunleri', logo: require('../../assets/brand-logos/fethiye-koy-urunleri.png'), validFor: ['hediye'], category: 'MarketGida', addedAt: 16 },
  { id: 'ob-peynirci-baba', name: 'Peynirci Baba', logo: require('../../assets/brand-logos/peynirci-baba.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 15 },
  { id: 'ob-mmgstore', name: 'MMG Store', logo: require('../../assets/brand-logos/mmgstore.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 14 },
  { id: 'ob-marketis', name: 'Marketis', logo: require('../../assets/brand-logos/marketis.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 13 },
  { id: 'ob-dovanabahce', name: 'Dovanabahce', logo: require('../../assets/brand-logos/dovanabahce.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 12 },
  { id: 'ob-cocoas-chocolat', name: 'Cocoas Chocolat', logo: require('../../assets/brand-logos/cocoas-chocolat.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: 11 },
  { id: 'ob-getir-yemek-online', name: 'Getir Yemek', logo: require('../../assets/brand-logos/getir-yemek.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: 10 },
  { id: 'ob-tikla-gelsin', name: 'Tikla Gelsin', logo: require('../../assets/brand-logos/tikla-gelsin.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: 9 },
  { id: 'ob-dogru-kahvaltilik', name: 'Dogru Kahvaltilik', logo: require('../../assets/brand-logos/dogru-kahvaltilik.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 8 },
  { id: 'ob-levent-kardesler', name: 'Levent Kardesler Kuruyemis', logo: require('../../assets/brand-logos/levent-kardesler.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 7 },
  { id: 'ob-zeytin-ana', name: 'Zeytin Ana', logo: require('../../assets/brand-logos/zeytin-ana.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 6 },
  { id: 'ob-organik-ari', name: 'Organik Ari', logo: require('../../assets/brand-logos/organik-ari.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 5 },
  { id: 'ob-gurmejet', name: 'Gurmejet', logo: require('../../assets/brand-logos/gurmejet.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 4 },
  { id: 'ob-sadik-amca', name: 'Sadik Amca', logo: require('../../assets/brand-logos/sadik-amca.png'), validFor: ['gida'], category: 'MarketGida', addedAt: 3 },
  { id: 'ob-akdenizsepeti', name: 'Akdeniz Sepeti', logo: require('../../assets/brand-logos/akdenizsepeti.png'), validFor: ['hediye'], category: 'MarketGida', addedAt: 2 },
  { id: 'ob-franua', name: 'Franua', logo: require('../../assets/brand-logos/franua.png'), validFor: ['gida'], category: 'SaglikSeyahat', addedAt: 1 },
  { id: 'ob-joila-foods', name: 'Joila Foods', logo: require('../../assets/brand-logos/joila-foods.png'), validFor: ['hediye'], category: 'MarketGida', addedAt: 0 },
  { id: 'ob-szone', name: 'SZone', logo: require('../../assets/brand-logos/szone.png'), validFor: ['gida'], category: 'MarketGida', addedAt: -1 },
  { id: 'ob-bulutlar-kuruyemis-shopphp', name: 'Bulutlar Kuruyemis', logo: require('../../assets/brand-logos/bulutlar-kuruyemis-shopphp.png'), validFor: ['gida'], category: 'MarketGida', addedAt: -2 },
  { id: 'ob-doga-evinizde', name: 'Doga Evinizde', logo: require('../../assets/brand-logos/doga-evinizde.png'), validFor: ['gida'], category: 'MarketGida', addedAt: -3 },
  { id: 'ob-istanbul-bakkaliyesi', name: 'Istanbul Bakkaliyesi', logo: require('../../assets/brand-logos/istanbul-bakkaliyesi.png'), validFor: ['gida'], category: 'MarketGida', addedAt: -4 },
  { id: 'ob-harmandali', name: 'Harmandali', logo: require('../../assets/brand-logos/harmandali.png'), validFor: ['gida'], category: 'MarketGida', addedAt: -5 },
  { id: 'ob-musko-kuruyemis', name: 'Musko Kuruyemis', logo: require('../../assets/brand-logos/muskokuruyemis.png'), validFor: ['gida'], category: 'MarketGida', addedAt: -6 },
  { id: 'ob-gurmar-market', name: 'Gurmar Market', logo: require('../../assets/brand-logos/gurmar-market.png'), validFor: ['gida'], category: 'MarketGida', addedAt: -7 },
  { id: 'ob-marketten-ankara', name: 'Marketten (Ankara)', logo: require('../../assets/brand-logos/marketten-ankara.png'), validFor: ['gida'], category: 'MarketGida', addedAt: -8 },
  { id: 'ob-sepetleyin', name: 'Sepetleyin', logo: require('../../assets/brand-logos/sepetleyin.png'), validFor: ['gida'], category: 'MarketGida', addedAt: -9 },
  { id: 'ob-onyaka-market', name: 'Onyaka Market', logo: require('../../assets/brand-logos/onyaka-market.png'), validFor: ['gida'], category: 'MarketGida', addedAt: -10 },
  { id: 'ob-essen-market', name: 'Essen Market', logo: require('../../assets/brand-logos/essen-market.png'), validFor: ['gida'], category: 'MarketGida', addedAt: -11 },
  { id: 'ob-gurmemarket', name: 'Gurme Market', logo: require('../../assets/brand-logos/gurmemarket.png'), validFor: ['gida'], category: 'MarketGida', addedAt: -12 },
  { id: 'ob-lugano-kahve', name: 'Lugano Kahve', logo: require('../../assets/brand-logos/lugano-kahve.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: -13 },
  { id: 'ob-venado-coffee', name: 'Venado Coffee', logo: require('../../assets/brand-logos/venado-coffee.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: -14 },
  { id: 'ob-beans-bazaar', name: 'Beans Bazaar', logo: require('../../assets/brand-logos/beans-bazaar.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: -15 },
  { id: 'ob-saray-muhallebicisi', name: 'Saray Muhallebicisi', logo: require('../../assets/brand-logos/saray-muhallebicisi.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: -16 },
  { id: 'ob-federicostore', name: 'FedericoStore', logo: require('../../assets/brand-logos/federicostore.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: -17 },
  { id: 'ob-addis-ababa', name: 'Addis Ababa', logo: require('../../assets/brand-logos/addis-ababa.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: -18 },
  { id: 'ob-espressolab', name: 'EspressoLab', logo: require('../../assets/brand-logos/espressolab.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: -20 },
  { id: 'ob-homeless-chef', name: 'Homeless Chef', logo: require('../../assets/brand-logos/homeless-chef.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: -21 },
  { id: 'ob-kofteci-yusuf', name: 'Kofteci Yusuf', logo: require('../../assets/brand-logos/kofteci-yusuf.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: -22 },
  { id: 'ob-salatus', name: 'Salatus', logo: require('../../assets/brand-logos/salatus.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: -23 },
  { id: 'ob-saglikli-atistir', name: 'Saglikli Atistir', logo: require('../../assets/brand-logos/saglikli-atistir.png'), validFor: ['gida'], category: 'SaglikSeyahat', addedAt: -25 },
  { id: 'ob-haribo', name: 'Haribo', logo: require('../../assets/brand-logos/haribo.png'), validFor: ['gida'], category: 'MarketGida', addedAt: -26 },
  { id: 'ob-wefood', name: 'Wefood', logo: require('../../assets/brand-logos/wefood.png'), validFor: ['gida'], category: 'SaglikSeyahat', addedAt: -27 },
  { id: 'ob-nfestfood', name: 'NfestFood', logo: require('../../assets/brand-logos/nfestfood.png'), validFor: ['gida'], category: 'SaglikSeyahat', addedAt: -28 },
  { id: 'ob-ekozel-organik', name: 'Ekozel Organik', logo: require('../../assets/brand-logos/ekozelorganik.png'), validFor: ['gida'], category: 'SaglikSeyahat', addedAt: -29 },
  { id: 'ob-cold-fusion', name: 'Cold Fusion', logo: require('../../assets/brand-logos/cold-fusion.png'), validFor: ['hediye'], category: 'MarketGida', addedAt: -30 },
  { id: 'ob-botanik-saglik', name: 'Botanik Saglik', logo: require('../../assets/brand-logos/botaniksaglik.png'), validFor: ['hediye'], category: 'MarketGida', addedAt: -31 },
  { id: 'ob-hasatsepeti', name: 'Hasat Sepeti', logo: require('../../assets/brand-logos/hasatsepeti.png'), validFor: ['gida'], category: 'MarketGida', addedAt: -32 },
  { id: 'ob-ersanet', name: 'Ersanet', logo: require('../../assets/brand-logos/ersanet.png'), validFor: ['gida'], category: 'MarketGida', addedAt: -33 },
  { id: 'ob-arnas', name: 'Arnas', logo: require('../../assets/brand-logos/arnas.png'), validFor: ['gida'], category: 'MarketGida', addedAt: -34 },
  { id: 'ob-roda-farm', name: 'Roda Farm', logo: require('../../assets/brand-logos/roda-farm.png'), validFor: ['gida'], category: 'MarketGida', addedAt: -35 },
  { id: 'ob-memleket-gurmesi', name: 'Memleket Gurmesi', logo: require('../../assets/brand-logos/memleketgurmesi.png'), validFor: ['gida'], category: 'MarketGida', addedAt: -36 },
  { id: 'ob-bizimefe', name: 'Bizimefe', logo: require('../../assets/brand-logos/bizimefe.png'), validFor: ['gida'], category: 'MarketGida', addedAt: -37 },
  { id: 'ob-gourmet-garage', name: 'Gourmet Garage', logo: require('../../assets/brand-logos/gourmet-garage.png'), validFor: ['gida'], category: 'MarketGida', addedAt: -38 },
  { id: 'ob-delly', name: 'Delly', logo: require('../../assets/brand-logos/delly.png'), validFor: ['gida'], category: 'SaglikSeyahat', addedAt: -39 },
  { id: 'ob-trendyol-yemek-online', name: 'Trendyol Yemek', logo: require('../../assets/brand-logos/trendyol-yemek.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: -40 },
  { id: 'ob-yemeksepeti-online', name: 'Yemeksepeti', logo: require('../../assets/brand-logos/yemeksepeti.png'), validFor: ['yemek'], category: 'KahveIcecek', addedAt: -41 },
  { id: 'ob-hed-pluxee-yemek', name: 'Pluxee Yemek', logo: require('../../assets/brand-logos/pluxee-yemek.png'), validFor: ['hediye'], category: 'MarketGida', addedAt: -1 },
  { id: 'ob-hed-pegasus', name: 'Pegasus BolBol', logo: require('../../assets/brand-logos/pegasus-bolbol.png'), validFor: ['hediye'], category: 'SaglikSeyahat', addedAt: -2 },
  { id: 'ob-hed-starbucks', name: 'Starbucks', logo: require('../../assets/brand-logos/starbucks.png'), validFor: ['hediye'], category: 'KahveIcecek', addedAt: -3 },
  { id: 'ob-hed-carrefour', name: 'Carrefour SA', logo: require('../../assets/brand-logos/carrefour-sa.png'), validFor: ['hediye'], category: 'MarketGida', addedAt: -4 },
  { id: 'ob-hed-pluxee-gida', name: 'Pluxee Gida', logo: require('../../assets/brand-logos/pluxee-gida.png'), validFor: ['hediye'], category: 'MarketGida', addedAt: -5 },
  { id: 'ob-hed-a101', name: 'A101', logo: require('../../assets/brand-logos/a101.png'), validFor: ['hediye'], category: 'MarketGida', addedAt: -6 },
  { id: 'ob-hed-decathlon', name: 'Decathlon', logo: require('../../assets/brand-logos/decathlon.png'), validFor: ['hediye'], category: 'Giyim', addedAt: -7 },
  { id: 'ob-hed-englishhome', name: 'English Home', logo: require('../../assets/brand-logos/english-home.png'), validFor: ['hediye'], category: 'EvYasam', addedAt: -8 },
  { id: 'ob-hed-beymen', name: 'Beymen', logo: require('../../assets/brand-logos/beymen.png'), validFor: ['hediye'], category: 'Giyim', addedAt: -9 },
  { id: 'ob-hed-pazaramatatil', name: 'Pazarama Tatil', logo: require('../../assets/brand-logos/pazarama-alt.png'), validFor: ['hediye'], category: 'SaglikSeyahat', addedAt: -10 },
  { id: 'ob-hed-pazaramagiyim', name: 'Pazarama Giyim Puan', logo: require('../../assets/brand-logos/pazarama-giyim-puan.png'), validFor: ['hediye'], category: 'Giyim', addedAt: -11 },
  { id: 'ob-hed-kigili', name: 'Kigili', logo: require('../../assets/brand-logos/kigili.png'), validFor: ['hediye'], category: 'Giyim', addedAt: -12 },
  { id: 'ob-hed-gratis', name: 'Gratis', logo: require('../../assets/brand-logos/gratis.png'), validFor: ['hediye'], category: 'KisiselBakim', addedAt: -13 },
  { id: 'ob-hed-defacto', name: 'DeFacto', logo: require('../../assets/brand-logos/defacto.png'), validFor: ['hediye'], category: 'Giyim', addedAt: -14 },
  { id: 'ob-hed-mudo', name: 'Mudo', logo: require('../../assets/brand-logos/mudo.png'), validFor: ['hediye'], category: 'Giyim', addedAt: -15 },
  { id: 'ob-hed-mudoconcept', name: 'Mudo Concept', logo: require('../../assets/brand-logos/mudo-concept.png'), validFor: ['hediye'], category: 'EvYasam', addedAt: -16 },
  { id: 'ob-hed-ozdilek', name: 'Ozdilek', logo: require('../../assets/brand-logos/ozdilek.png'), validFor: ['hediye'], category: 'EvYasam', addedAt: -17 },
  { id: 'ob-hed-ayakkabi', name: 'Ayakkabi Dunyasi', logo: require('../../assets/brand-logos/ayakkabi-dunyasi.png'), validFor: ['hediye'], category: 'Giyim', addedAt: -18 },
  { id: 'ob-hed-network', name: 'NetWork / Divarese', logo: require('../../assets/brand-logos/network-divarese.png'), validFor: ['hediye'], category: 'Giyim', addedAt: -19 },
  { id: 'ob-hed-braunoral', name: 'Braun / Oral-B', logo: require('../../assets/brand-logos/braun-oral-b.png'), validFor: ['hediye'], category: 'KisiselBakim', addedAt: -20 },
  { id: 'ob-hed-meditopia', name: 'Meditopia', logo: require('../../assets/brand-logos/meditopia.png'), validFor: ['hediye'], category: 'SaglikSeyahat', addedAt: -21 },
  { id: 'ob-hed-meditopiawellness', name: 'Meditopia WellnessPass', logo: require('../../assets/brand-logos/meditopia-wellness.png'), validFor: ['hediye'], category: 'SaglikSeyahat', addedAt: -22 },
  { id: 'ob-hed-bodo', name: 'Bodo', logo: require('../../assets/brand-logos/bodo.png'), validFor: ['hediye'], category: 'Giyim', addedAt: -23 },
  { id: 'ob-hed-arkasturizm', name: 'Arkas Turizm', logo: require('../../assets/brand-logos/arkas-turizm.png'), validFor: ['hediye'], category: 'SaglikSeyahat', addedAt: -24 },
  { id: 'ob-hed-sok', name: 'Sok', logo: require('../../assets/brand-logos/sok.png'), validFor: ['hediye'], category: 'MarketGida', addedAt: -25 },
];

// YEMEK PLATFORMLARI (P3 — alt section, Tümünü Gör YOK)
export const YEMEK_PLATFORMS: YemekPlatform[] = [
  { id: 'yp-trendyol', name: 'Trendyol Yemek', logo: require('../../assets/brand-logos/trendyol-yemek.png'), deeplink: 'trendyolyemek://', iosStoreUrl: 'https://apps.apple.com/tr/app/trendyol-yemek/id1462996657' },
  { id: 'yp-yemeksepeti', name: 'Yemeksepeti', logo: require('../../assets/brand-logos/yemeksepeti.png'), deeplink: 'yemeksepeti://' },
  { id: 'yp-getir', name: 'Getir Yemek', logo: require('../../assets/brand-logos/getir-yemek.png'), deeplink: 'getir://yemek' },
  { id: 'yp-tikla', name: 'Tıkla Gelsin', logo: require('../../assets/brand-logos/tikla-gelsin.png'), deeplink: 'tiklagelsin://' },
];

// YAKINDAKİ RESTORANLAR (P78)
export const NEARBY_RESTAURANTS: RestoranMarket[] = [
  { id: 'rest-burgerking', name: 'Burger King', rating: 4.2, distanceKm: 1.26, city: 'İSTANBUL', district: 'MALTEPE', paymentTypes: ['mobil'], hasOnline: true, plusPuanPercent: 10, category: 'restoran', subCategory: 'Fast Food', iconName: 'cutlery' },
  { id: 'rest-simit', name: 'Simit Sarayı', rating: 4.5, distanceKm: 0.52, city: 'İSTANBUL', district: 'MALTEPE', paymentTypes: ['mobil', 'kartli'], hasOnline: false, category: 'restoran', subCategory: 'Büfe', iconName: 'cutlery' },
  { id: 'rest-tavuk', name: 'Tavuk Dünyası', rating: 4.4, distanceKm: 0.64, city: 'İSTANBUL', district: 'MALTEPE', paymentTypes: ['mobil', 'kartli'], hasOnline: true, plusPuanPercent: 8, category: 'restoran', subCategory: 'Fast Food', iconName: 'cutlery' },
  { id: 'rest-kirinti', name: 'Kırıntı', rating: 4.6, distanceKm: 0.26, city: 'İSTANBUL', district: 'MALTEPE', paymentTypes: ['mobil'], hasOnline: true, category: 'restoran', subCategory: 'Cafe/Kahve', iconName: 'cutlery' },
  { id: 'rest-life', name: 'Life Cafe', rating: 4.1, distanceKm: 1.43, city: 'İSTANBUL', district: 'MALTEPE', paymentTypes: [], hasOnline: true, category: 'restoran', subCategory: 'Cafe/Kahve', iconName: 'cutlery' },
  { id: 'rest-tika', name: 'Tika', rating: 4.3, distanceKm: 0.52, city: 'İSTANBUL', district: 'MALTEPE', paymentTypes: ['mobil'], hasOnline: false, category: 'restoran', subCategory: 'Restoran', iconName: 'cutlery' },
  { id: 'rest-sanliurfa', name: 'Şanlıurfa Şark Sofrası Restorancılık', rating: 4.6, distanceKm: 0.26, city: 'İSTANBUL', district: 'MALTEPE', paymentTypes: ['mobil', 'kartli'], hasOnline: true, plusPuanPercent: 10, category: 'restoran', subCategory: 'Restoran', iconName: 'cutlery' },
];

// YAKINDAKİ MARKETLER (P55, P77)
export const NEARBY_MARKETS: RestoranMarket[] = [
  { id: 'mkt-a101', name: 'A101', rating: 4.6, distanceKm: 0.26, city: 'İSTANBUL', district: 'MALTEPE', paymentTypes: ['mobil'], hasOnline: true, category: 'market', subCategory: 'Market', iconName: 'store' },
  { id: 'mkt-sok', name: 'Şok', rating: 5.0, distanceKm: 0.42, city: 'İSTANBUL', district: 'MALTEPE', paymentTypes: ['mobil', 'kartli'], hasOnline: false, category: 'market', subCategory: 'Market', iconName: 'store' },
  { id: 'mkt-mopas', name: 'Mopaş', rating: 3.6, distanceKm: 0.90, city: 'İSTANBUL', district: 'MALTEPE', paymentTypes: ['mobil', 'kartli'], hasOnline: true, category: 'market', subCategory: 'Market', iconName: 'store' },
  { id: 'mkt-tansas', name: 'Tansaş', rating: 4.2, distanceKm: 1.26, city: 'İSTANBUL', district: 'MALTEPE', paymentTypes: ['mobil'], hasOnline: true, plusPuanPercent: 10, category: 'market', subCategory: 'Market', iconName: 'store' },
  { id: 'mkt-bim', name: 'BIM', rating: 4.1, distanceKm: 1.43, city: 'İSTANBUL', district: 'MALTEPE', paymentTypes: [], hasOnline: true, category: 'market', subCategory: 'Market', iconName: 'store' },
  { id: 'mkt-tarim', name: 'Tarım Kredi', rating: 4.0, distanceKm: 0.44, city: 'İSTANBUL', district: 'MALTEPE', paymentTypes: ['mobil'], hasOnline: false, category: 'market', subCategory: 'Market', iconName: 'store' },
  { id: 'mkt-tugba', name: 'Tuğba Kuruyemiş', rating: 4.5, distanceKm: 0.47, city: 'İSTANBUL', district: 'MALTEPE', paymentTypes: ['mobil', 'kartli'], hasOnline: false, category: 'market', subCategory: 'Kuruyemiş', iconName: 'store' },
];

// ULAŞIM MARKALARI (P13) — Üst: gerçek markalar, Alt: kategoriler
export const ULASIM_BRANDS: UlasimBrand[] = [
  { id: 'ub-opet', name: 'Opet', logo: require('../../assets/brand-logos/opet.png'), addedAt: 100 },
  { id: 'ub-aytemiz', name: 'Aytemiz', logo: require('../../assets/brand-logos/aytemiz.png'), addedAt: 99 },
  { id: 'ub-lukoil', name: 'Lukoil', logo: require('../../assets/brand-logos/lukoil.png'), addedAt: 98 },
];

export const ULASIM_CATEGORIES: UlasimBrand[] = [
  { id: 'uc-toplu', name: 'Toplu Taşıma', iconName: 'bus', isCategory: true, addedAt: 100 },
  { id: 'uc-arac', name: 'Araç Kiralama', iconName: 'car', isCategory: true, addedAt: 99 },
  { id: 'uc-taksi', name: 'Taksi & Özel Ulaşım', iconName: 'car', isCategory: true, addedAt: 98 },
  { id: 'uc-elektrikli', name: 'Elektrikli Araç Şarj', iconName: 'warning', isCategory: true, addedAt: 97 },
  { id: 'uc-diger', name: 'Diğer Hizmetler', iconName: 'diamond', isCategory: true, addedAt: 96 },
  { id: 'uc-otoyol', name: 'Otoyol & Geçiş', iconName: 'info', isCategory: true, addedAt: 95 },
  { id: 'uc-otopark', name: 'Otopark & Oto Yıkama', iconName: 'info', isCategory: true, addedAt: 94 },
  { id: 'uc-scooter', name: 'Scooter & Bisiklet', iconName: 'bike', isCategory: true, addedAt: 93 },
];

// Filtre için kategoriler (spec: §9.1)
export const FILTER_CATEGORIES = [
  'Akaryakıt & Araç Bakım',
  'E-Ticaret',
  'Ev & Yaşam',
  'Giyim',
  'Kahve & İçecek',
  'Kişisel Bakım',
  'Market & Gıda',
  'Sağlıklı Yaşam & Seyahat',
  'Restoran & Market',
  'Teknoloji',
  'Ulaşım',
];

export const RESTORAN_MARKET_SUBCATEGORIES = [
  'Büfe', 'Cafe/Kahve', 'Catering', 'Deniz Ürünleri', 'Fast Food',
  'Pastane & Tatlıcı', 'Restoran', 'Market', 'Kuruyemiş',
];
