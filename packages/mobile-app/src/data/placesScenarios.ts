// Pluxee'li Noktalar senaryo matrix logic
// Spec: Pluxee_li_Noktalar.pdf §6

export type Vertical = 'yemek' | 'business' | 'gida' | 'hediye' | 'ulasim';

export interface UserProfile {
  // Hangi dikeylere sahip
  hasYemek: boolean;
  hasBusiness: boolean;
  hasGida: boolean;
  hasHediye: boolean;
  hasUlasim: boolean;
  // Hediye paketlerinde hangi Pluxee markaları var
  hediyeHasPluxeeYemek: boolean;
  hediyeHasPluxeeGida: boolean;
  // Hediye paketleri (markaların hangi paketlerde olduğu)
  hediyePaketler: HediyePaket[];
}

export interface HediyePaket {
  id: string;
  name: string;
  balance: number; // TL
  brandIds: string[]; // İçindeki marka id'leri
}

// Mock — geliştirme için kullanılan user profili
// Spec §6 senaryo matrisini test etmek için bu değerleri değiştir.
export const MOCK_USER_PROFILE: UserProfile = {
  hasYemek: true,
  hasBusiness: false,
  hasGida: true,
  hasHediye: true,
  hasUlasim: false,
  hediyeHasPluxeeYemek: true,
  hediyeHasPluxeeGida: true,
  hediyePaketler: [
    {
      id: 'pkt-mix',
      name: 'Mix',
      balance: 15000,
      brandIds: ['hb-boyner', 'hb-mavi', 'hb-starbucks', 'hb-pegasus', 'hb-decathlon', 'hb-mcdonalds', 'hb-koton', 'hb-ikea', 'hb-hepsiburada', 'hb-pluxee-yemek', 'hb-pluxee-gida', 'hb-englishhome', 'hb-ofix', 'hb-teknosa', 'hb-braunoral'],
    },
    {
      id: 'pkt-teknoloji',
      name: 'Teknoloji',
      balance: 1000,
      brandIds: ['hb-boyner', 'hb-teknosa', 'hb-braunoral'],
    },
  ],
};

// Section sıralaması — dikeye göre (spec §4.3)
export const getSectionOrder = (source: Vertical): string[] => {
  switch (source) {
    case 'yemek':
    case 'business':
      return ['online-alisveris', 'yemek-platformlari', 'yakindaki-restoranlar', 'yakindaki-marketler', 'hediye-markalari', 'ulasim-markalari'];
    case 'gida':
      return ['online-alisveris', 'yakindaki-marketler', 'yemek-platformlari', 'yakindaki-restoranlar', 'hediye-markalari', 'ulasim-markalari'];
    case 'hediye':
      return ['hediye-markalari', 'online-alisveris', 'yemek-platformlari', 'yakindaki-restoranlar', 'yakindaki-marketler', 'ulasim-markalari'];
    case 'ulasim':
      return ['ulasim-markalari', 'hediye-markalari', 'online-alisveris', 'yemek-platformlari', 'yakindaki-restoranlar', 'yakindaki-marketler'];
  }
};

// Default gösterim adedi (spec §4.4)
export const DEFAULT_DISPLAY_COUNT = 5;

// HEDİYE MARKASI tıklanınca ne olmalı? (spec §5.1)
export type ScenarioAction =
  | { type: 'open-detail'; brandId: string; packageId?: string }
  | { type: 'modal-no-balance'; verticalText: string }
  | { type: 'modal-not-in-package' }
  | { type: 'modal-select-package'; brandId: string; brandName: string }
  | { type: 'modal-transfer-required'; targetBrand: 'yemek' | 'gida' }
  | { type: 'modal-card-blocked' }
  | { type: 'open-deeplink'; deeplink: string }
  | { type: 'navigate-mekan-detay'; placeId: string };

export const evaluateHediyeBrandTap = (
  brandId: string,
  profile: UserProfile
): ScenarioAction => {
  if (!profile.hasHediye) {
    return { type: 'modal-no-balance', verticalText: 'Hediye markalarında' };
  }
  // Markanın hangi paketlerde olduğunu bul
  const eligiblePackages = profile.hediyePaketler.filter(
    (p) => p.brandIds.includes(brandId) && p.balance > 0
  );
  if (eligiblePackages.length === 0) {
    return { type: 'modal-not-in-package' };
  }
  if (eligiblePackages.length === 1) {
    return { type: 'open-detail', brandId, packageId: eligiblePackages[0].id };
  }
  return { type: 'modal-select-package', brandId, brandName: '' };
};

// ONLINE markası tıklanınca (spec §5.2)
export const evaluateOnlineBrandTap = (
  brand: { id: string; validFor: ('yemek' | 'hediye' | 'gida')[] },
  profile: UserProfile
): ScenarioAction => {
  // Hediye paketinde marka yoksa
  const inHediye = profile.hediyePaketler.some((p) => p.brandIds.includes(brand.id));
  if (!inHediye && brand.validFor.includes('hediye')) {
    return { type: 'modal-not-in-package' };
  }
  // Yemek odaklı bir marka, kullanıcının Yemek dikeyi yok
  if (brand.validFor.includes('yemek') && !profile.hasYemek) {
    if (profile.hediyeHasPluxeeYemek) {
      return { type: 'modal-transfer-required', targetBrand: 'yemek' };
    }
    return { type: 'modal-no-balance', verticalText: 'Bu markada' };
  }
  // Gıda odaklı bir marka, kullanıcının Gıda dikeyi yok
  if (brand.validFor.includes('gida') && !profile.hasGida) {
    if (profile.hediyeHasPluxeeGida) {
      return { type: 'modal-transfer-required', targetBrand: 'gida' };
    }
    return { type: 'modal-no-balance', verticalText: 'Bu markada' };
  }
  // Sadece hediye, hediye dikeyi var
  if (brand.validFor.includes('hediye') && !profile.hasHediye) {
    return { type: 'modal-no-balance', verticalText: 'Bu markada' };
  }
  return { type: 'open-detail', brandId: brand.id };
};

// RESTORAN tıklanınca (spec §5.4)
export const evaluateRestoranTap = (
  placeId: string,
  profile: UserProfile
): ScenarioAction => {
  if (profile.hasYemek) {
    return { type: 'navigate-mekan-detay', placeId };
  }
  if (profile.hediyeHasPluxeeYemek) {
    return { type: 'modal-transfer-required', targetBrand: 'yemek' };
  }
  return { type: 'modal-no-balance', verticalText: 'Restoranlarda' };
};

// MARKET tıklanınca (spec §5.5)
export const evaluateMarketTap = (
  placeId: string,
  profile: UserProfile
): ScenarioAction => {
  if (profile.hasGida) {
    return { type: 'navigate-mekan-detay', placeId };
  }
  if (profile.hediyeHasPluxeeGida) {
    return { type: 'modal-transfer-required', targetBrand: 'gida' };
  }
  return { type: 'modal-no-balance', verticalText: 'Marketlerde' };
};

// YEMEK PLATFORMU tıklanınca (spec §5.3)
export const evaluateYemekPlatformTap = (
  deeplink: string,
  profile: UserProfile
): ScenarioAction => {
  if (profile.hasYemek) {
    return { type: 'open-deeplink', deeplink };
  }
  if (profile.hediyeHasPluxeeYemek) {
    return { type: 'modal-transfer-required', targetBrand: 'yemek' };
  }
  return { type: 'modal-no-balance', verticalText: 'Bu platformlarda' };
};

// ULAŞIM markası tıklanınca (§5.6)
export const evaluateUlasimBrandTap = (
  brandId: string,
  profile: UserProfile
): ScenarioAction => {
  if (!profile.hasUlasim) {
    return { type: 'modal-no-balance', verticalText: 'Ulaşım markalarında' };
  }
  return { type: 'open-detail', brandId };
};

// Üst bilgilendirme banner (Tümünü Gör ekranlarındaki — §5.4.1, §5.5.1, §5.2.7)
export interface InfoBannerConfig {
  show: boolean;
  text: string;
  linkTexts: { label: string; targetBrand: 'yemek' | 'gida' }[];
}

export const getRestoranBannerConfig = (profile: UserProfile): InfoBannerConfig => {
  if (profile.hasYemek) return { show: false, text: '', linkTexts: [] };
  if (profile.hediyeHasPluxeeYemek) {
    return {
      show: true,
      text: 'Hediye bakiyeni, [LINK0] kartlarına bakiye aktararak aşağıdaki noktalarda harcayabilirsin.',
      linkTexts: [{ label: 'Yemek', targetBrand: 'yemek' }],
    };
  }
  return {
    show: true,
    text: 'Aşağıdaki noktalarda harcama yapabileceğin bir bakiyen bulunmamaktadır.',
    linkTexts: [],
  };
};

export const getMarketBannerConfig = (profile: UserProfile): InfoBannerConfig => {
  if (profile.hasGida) return { show: false, text: '', linkTexts: [] };
  if (profile.hediyeHasPluxeeGida) {
    return {
      show: true,
      text: 'Hediye bakiyeni, [LINK0] kartlarına bakiye aktararak aşağıdaki noktalarda harcayabilirsin.',
      linkTexts: [{ label: 'Gıda', targetBrand: 'gida' }],
    };
  }
  return {
    show: true,
    text: 'Aşağıdaki noktalarda harcama yapabileceğin bir bakiyen bulunmamaktadır.',
    linkTexts: [],
  };
};

export const getOnlineBannerConfig = (profile: UserProfile): InfoBannerConfig => {
  const hasYemekOrGidaInHediye = profile.hediyeHasPluxeeYemek || profile.hediyeHasPluxeeGida;
  if (profile.hasYemek && profile.hasGida) return { show: false, text: '', linkTexts: [] };
  if (!hasYemekOrGidaInHediye) {
    return {
      show: true,
      text: 'Aşağıdaki noktalarda harcama yapabileceğin bir bakiyen bulunmamaktadır.',
      linkTexts: [],
    };
  }
  const links: { label: string; targetBrand: 'yemek' | 'gida' }[] = [];
  if (profile.hediyeHasPluxeeYemek && !profile.hasYemek) links.push({ label: 'Yemek', targetBrand: 'yemek' });
  if (profile.hediyeHasPluxeeGida && !profile.hasGida) links.push({ label: 'Gıda', targetBrand: 'gida' });
  if (links.length === 2) {
    return {
      show: true,
      text: 'Hediye bakiyeni, [LINK0] veya [LINK1] kartlarına bakiye aktararak aşağıdaki noktalarda harcayabilirsin.',
      linkTexts: links,
    };
  }
  if (links.length === 1) {
    return {
      show: true,
      text: 'Hediye bakiyeni, [LINK0] kartlarına bakiye aktararak aşağıdaki noktalarda harcayabilirsin.',
      linkTexts: links,
    };
  }
  return { show: false, text: '', linkTexts: [] };
};

// Search: 1 karakter "başlar", 2+ karakter "içerir" (spec §8.2)
export const searchFilter = (query: string, name: string): boolean => {
  if (!query) return true;
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/ı/g, 'i')
      .replace(/i̇/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ç/g, 'c')
      .replace(/ğ/g, 'g');
  const q = normalize(query);
  const n = normalize(name);
  if (q.length === 1) return n.startsWith(q);
  return n.includes(q);
};
