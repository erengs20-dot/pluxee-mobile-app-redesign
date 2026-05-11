import React, { useState, useMemo, useCallback } from 'react';
import { View, ScrollView, FlatList, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import {
  Text, Icon, IconButton, SearchInput, EmptyState,
  semantic, spacing, radius,
} from '@pluxee/design-system';
import {
  HEDIYE_BRANDS, ONLINE_BRANDS, YEMEK_PLATFORMS,
  NEARBY_RESTAURANTS, NEARBY_MARKETS, ULASIM_BRANDS,
} from '../data/placesPoints';
import {
  MOCK_USER_PROFILE, searchFilter, getSectionOrder, DEFAULT_DISPLAY_COUNT,
  evaluateHediyeBrandTap, evaluateOnlineBrandTap, evaluateYemekPlatformTap,
  evaluateRestoranTap, evaluateMarketTap, evaluateUlasimBrandTap, Vertical,
} from '../data/placesScenarios';
import type { PlacesFilters } from './PlacesFilterScreen';
import { EMPTY_FILTERS } from './PlacesFilterScreen';
import { MOCK_CARDS } from '../data/cards';
import { BrandCard } from '../components/places/BrandCard';
import { OnlineBrandCard } from '../components/places/OnlineBrandCard';
import { YemekPlatformCard } from '../components/places/YemekPlatformCard';
import { RestoranMarketCard } from '../components/places/RestoranMarketCard';
import { UlasimBrandCard } from '../components/places/UlasimBrandCard';
import { InfoModal, AktarimModal } from '../components/places/Modals';
import { PaketSecModal } from '../components/places/PaketSecModal';

type SectionId = 'hediye-markalari' | 'online-alisveris' | 'yemek-platformlari' | 'yakindaki-restoranlar' | 'yakindaki-marketler' | 'ulasim-markalari';




// === FILTRE LOGIC ===
// Urun secimi -> hangi section'lar gosterilecek (SectionId tipinde)
const URUN_TO_SECTIONS: Record<string, SectionId[]> = {
  'Yemek':    ['online-alisveris', 'yemek-platformlari', 'yakindaki-restoranlar', 'yakindaki-marketler'],
  'Hediye':   ['online-alisveris', 'hediye-markalari'],
  'Gıda':     ['online-alisveris', 'yakindaki-marketler'],
  'Ulaşım':   ['ulasim-markalari'],
  'Business': ['online-alisveris', 'yemek-platformlari', 'yakindaki-restoranlar'],
};

// Online alisveris section'inda hangi validFor'a sahip markalar gorunsun
const URUN_TO_ONLINE_TYPES: Record<string, Array<'yemek' | 'gida' | 'hediye'>> = {
  'Yemek':    ['yemek'],
  'Hediye':   ['hediye'],
  'Gıda':     ['yemek'],     // Gıda secilince yemek markalari gelir
  'Business': ['yemek'],
};

const ALL_SECTIONS: SectionId[] = ['hediye-markalari', 'online-alisveris', 'yemek-platformlari', 'yakindaki-restoranlar', 'yakindaki-marketler', 'ulasim-markalari'];

function getVisibleSections(urunler: string[]): Set<SectionId> {
  // Hicbir urun secilmediyse hepsi gorunur (default)
  if (urunler.length === 0) {
    return new Set(ALL_SECTIONS);
  }
  const visible = new Set<SectionId>();
  urunler.forEach(u => {
    const sections = URUN_TO_SECTIONS[u] ?? [];
    sections.forEach(s => visible.add(s));
  });
  return visible;
}

function getAllowedOnlineTypes(urunler: string[]): Set<'yemek' | 'gida' | 'hediye'> {
  if (urunler.length === 0) return new Set(['yemek', 'gida', 'hediye']);
  const allowed = new Set<'yemek' | 'gida' | 'hediye'>();
  urunler.forEach(u => {
    const types = URUN_TO_ONLINE_TYPES[u] ?? [];
    types.forEach(t => allowed.add(t));
  });
  return allowed;
}
// Mevcut sistem kart kategorisini Pluxee'li Noktalar dikeyine cevir
const CARD_CATEGORY_TO_VERTICAL: Record<string, Vertical> = {
  meal: 'yemek',
  business: 'business',
  food: 'gida',
  gift: 'hediye',
  transport: 'ulasim',
};

const getDefaultVertical = (): Vertical => {
  const defaultCard = MOCK_CARDS.find((c) => c.isDefault) ?? MOCK_CARDS[0];
  if (!defaultCard) return 'yemek';
  return CARD_CATEGORY_TO_VERTICAL[defaultCard.category] ?? 'yemek';
};

const SECTION_TITLES: Record<SectionId, string> = {
  'hediye-markalari': 'Hediye markalari',
  'online-alisveris': 'Online alisveris',
  'yemek-platformlari': 'Yemek platformlari',
  'yakindaki-restoranlar': 'Yakindaki restoranlar',
  'yakindaki-marketler': 'Yakindaki marketler',
  'ulasim-markalari': 'Ulasim markalari',
};

const SECTION_ROUTES: Record<SectionId, string> = {
  'hediye-markalari': 'HediyeMarkalari',
  'online-alisveris': 'OnlineAlisverisMarkalari',
  'yemek-platformlari': '',
  'yakindaki-restoranlar': 'YakindakiRestoranlar',
  'yakindaki-marketler': 'YakindakiMarketler',
  'ulasim-markalari': 'UlasimMarkalari',
};

export const PlacesScreen: React.FC = () => {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const [sourceCategory, setSourceCategory] = useState<Vertical>(
    (route.params?.sourceCategory as Vertical) || getDefaultVertical()
  );
  const [filters, setFilters] = useState<PlacesFilters>(EMPTY_FILTERS);

  // Filtre uygulayarak gorunecek section'lari hesapla
  const visibleSections = useMemo(() => getVisibleSections(filters.urunler), [filters.urunler]);
  const allowedOnlineTypes = useMemo(() => getAllowedOnlineTypes(filters.urunler), [filters.urunler]);

  // Tab'a her donuldugunde default kart kontrolu — kullanici Home'da default karti
  // degistirdiyse PlacesScreen siralamasi guncellenmeli
  useFocusEffect(
    useCallback(() => {
      if (!route.params?.sourceCategory) {
        setSourceCategory(getDefaultVertical());
      }
    }, [route.params?.sourceCategory])
  );
  const [search, setSearch] = useState('');
  const [infoModal, setInfoModal] = useState<{ visible: boolean; message: string }>({ visible: false, message: '' });
  const [aktarimModal, setAktarimModal] = useState<{ visible: boolean; message: string; target: 'yemek' | 'gida' | null }>({ visible: false, message: '', target: null });
  const [paketModal, setPaketModal] = useState<{ visible: boolean; brandId: string; brandName: string }>({ visible: false, brandId: '', brandName: '' });

  const order = getSectionOrder(sourceCategory) as SectionId[];
  // Sadece filtreden gecen section'lari goster (default kart sirasini koru)
  const filteredOrder = order.filter(s => visibleSections.has(s));

  const totalResultCount = useMemo(() => {
    if (!search) return 0;
    const counts = [
      HEDIYE_BRANDS.filter(b => searchFilter(search, b.name)).length,
      ONLINE_BRANDS.filter(b => searchFilter(search, b.name) && b.validFor.some(v => allowedOnlineTypes.has(v))).length,
      YEMEK_PLATFORMS.filter(b => searchFilter(search, b.name)).length,
      NEARBY_RESTAURANTS.filter(b => searchFilter(search, b.name)).length,
      NEARBY_MARKETS.filter(b => searchFilter(search, b.name)).length,
      ULASIM_BRANDS.filter(b => searchFilter(search, b.name)).length,
    ];
    return counts.reduce((a, b) => a + b, 0);
  }, [search]);

  const hasAnyResult = totalResultCount > 0 || !search;

  // ============ Tap handlers ============
  const handleHediyeTap = (brandId: string, brandName: string) => {
    const action = evaluateHediyeBrandTap(brandId, MOCK_USER_PROFILE);
    switch (action.type) {
      case 'open-detail': nav.navigate('BrandDetail', { brandId }); break;
      case 'modal-no-balance': setInfoModal({ visible: true, message: 'Hediye markalarinda harcayabilecegin bakiyen bulunmamaktadir.' }); break;
      case 'modal-not-in-package': setInfoModal({ visible: true, message: 'Sahip oldugun Hediye paketlerinde bu marka bulunmamaktadir.' }); break;
      case 'modal-select-package': setPaketModal({ visible: true, brandId, brandName }); break;
    }
  };
  const handleOnlineTap = (brand: typeof ONLINE_BRANDS[0]) => {
    // Case 1: Yemek platformu (4 marka) -> deeplink ile uygulama ac
    const yemekPlatformDeeplinks: Record<string, string> = {
      'Trendyol Yemek': 'trendyolyemek://',
      'Yemeksepeti': 'yemeksepeti://',
      'Getir Yemek': 'getir://yemek',
      'Tıkla Gelsin': 'tiklagelsin://',
    };
    if (yemekPlatformDeeplinks[brand.name]) {
      handleYemekPlatformTap(yemekPlatformDeeplinks[brand.name]);
      return;
    }
    // Case 2: Hediye markasi (validFor: ['hediye']) -> Marka detay
    if (brand.validFor.length === 1 && brand.validFor[0] === 'hediye') {
      nav.navigate('BrandDetail', { brandId: brand.id });
      return;
    }
    // Case 3: Diger hepsi -> WebView (iframe) + kod al butonu
    nav.navigate('OnlineWebView', { brandId: brand.id, brandName: brand.name });
  };
  const handleYemekPlatformTap = (deeplink: string) => {
    const action = evaluateYemekPlatformTap(deeplink, MOCK_USER_PROFILE);
    switch (action.type) {
      case 'open-deeplink':
        Linking.openURL(deeplink).catch(() => {
          Alert.alert('Uygulama bulunamadi', 'Bu platformun uygulamasi cihazinda yuklu degil.');
        });
        break;
      case 'modal-no-balance': setInfoModal({ visible: true, message: 'Bu platformlarda harcayabilecegin bakiyen bulunmamaktadir.' }); break;
      case 'modal-transfer-required': {
        setAktarimModal({ visible: true, message: "Bu platformlarda harcama yapabilmen icin Pluxee Yemek'e aktarim yapman gerekmektedir.", target: 'yemek' });
        break;
      }
    }
  };
  const handleRestoranTap = (placeId: string) => {
    const action = evaluateRestoranTap(placeId, MOCK_USER_PROFILE);
    switch (action.type) {
      case 'navigate-mekan-detay': nav.navigate('MekanDetay', { placeId }); break;
      case 'modal-no-balance': setInfoModal({ visible: true, message: 'Restoranlarda harcayabilecegin bakiyen bulunmamaktadir.' }); break;
      case 'modal-transfer-required': setAktarimModal({ visible: true, message: "Restoranlarda harcama yapabilmen icin Pluxee Yemek'e aktarim yapman gerekmektedir.", target: 'yemek' }); break;
    }
  };
  const handleMarketTap = (placeId: string) => {
    const action = evaluateMarketTap(placeId, MOCK_USER_PROFILE);
    switch (action.type) {
      case 'navigate-mekan-detay': nav.navigate('MekanDetay', { placeId }); break;
      case 'modal-no-balance': setInfoModal({ visible: true, message: 'Marketlerde harcayabilecegin bakiyen bulunmamaktadir.' }); break;
      case 'modal-transfer-required': setAktarimModal({ visible: true, message: "Marketlerde harcama yapabilmen icin Pluxee Gida'ya aktarim yapman gerekmektedir.", target: 'gida' }); break;
    }
  };
  const handleUlasimTap = (brandId: string) => {
    const action = evaluateUlasimBrandTap(brandId, MOCK_USER_PROFILE);
    switch (action.type) {
      case 'open-detail': nav.navigate('BrandDetail', { brandId }); break;
      case 'modal-no-balance': setInfoModal({ visible: true, message: 'Ulasim markalarinda harcayabilecegin bakiyen bulunmamaktadir.' }); break;
    }
  };

  // ============ Section renderer ============
  const renderSection = (sectionId: SectionId) => {
    const title = SECTION_TITLES[sectionId];
    const route_ = SECTION_ROUTES[sectionId];

    if (sectionId === 'hediye-markalari') {
      const filtered = HEDIYE_BRANDS.filter(b => searchFilter(search, b.name));
      const items = filtered.slice(0, DEFAULT_DISPLAY_COUNT);
      if (items.length === 0) return null;
      const remainingCount = filtered.length - DEFAULT_DISPLAY_COUNT;
      const showAll = filtered.length >= DEFAULT_DISPLAY_COUNT;
      return (
        <View key={sectionId} style={styles.section}>
          <SectionHeader title={title} showAll={showAll} onShowAll={() => nav.navigate(route_)} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScrollContent}>
            {items.map(item => (
              <View key={item.id} style={styles.hItem}>
                <BrandCard logo={item.logo} name={item.name} size={110} onPress={() => handleHediyeTap(item.id, item.name)} />
              </View>
            ))}
            {remainingCount > 0 && (
              <View style={styles.hItem}>
                <TouchableOpacity
                  onPress={() => nav.navigate(route_)}
                  activeOpacity={0.7}
                  style={styles.plusMoreCard}
                  accessibilityLabel={`${remainingCount} marka daha`}
                >
                  <Text variant="title.mobileCard" color="primary" align="center">+{remainingCount}</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      );
    }

    if (sectionId === 'online-alisveris') {
      const filtered = ONLINE_BRANDS.filter(b => searchFilter(search, b.name) && b.validFor.some(v => allowedOnlineTypes.has(v)));
      const items = filtered.slice(0, DEFAULT_DISPLAY_COUNT);
      if (items.length === 0) return null;
      const remainingCount = filtered.length - DEFAULT_DISPLAY_COUNT;
      const showAll = filtered.length >= DEFAULT_DISPLAY_COUNT;
      return (
        <View key={sectionId} style={styles.section}>
          <SectionHeader title={title} showAll={showAll} onShowAll={() => nav.navigate(route_)} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScrollContent}>
            {items.map(item => (
              <View key={item.id} style={styles.hItem}>
                <OnlineBrandCard logo={item.logo} name={item.name} size={110} onPress={() => handleOnlineTap(item)} />
              </View>
            ))}
            {remainingCount > 0 && (
              <View style={styles.hItem}>
                <TouchableOpacity
                  onPress={() => nav.navigate(route_)}
                  activeOpacity={0.7}
                  style={styles.plusMoreCard}
                  accessibilityLabel={`${remainingCount} marka daha`}
                >
                  <Text variant="title.mobileCard" color="primary" align="center">+{remainingCount}</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      );
    }

    if (sectionId === 'yemek-platformlari') {
      const items = YEMEK_PLATFORMS.filter(b => searchFilter(search, b.name));
      if (items.length === 0) return null;
      return (
        <View key={sectionId} style={styles.section}>
          <SectionHeader title={title} showAll={false} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScrollContent}>
            {items.map(item => (
              <View key={item.id} style={styles.hItem}>
                <YemekPlatformCard logo={item.logo} name={item.name} size={110} onPress={() => handleYemekPlatformTap(item.deeplink)} />
              </View>
            ))}
          </ScrollView>
        </View>
      );
    }

    if (sectionId === 'yakindaki-restoranlar') {
      const items = NEARBY_RESTAURANTS.filter(b => searchFilter(search, b.name)).slice(0, DEFAULT_DISPLAY_COUNT);
      if (items.length === 0) return null;
      const showAll = NEARBY_RESTAURANTS.length >= DEFAULT_DISPLAY_COUNT;
      return (
        <View key={sectionId} style={styles.section}>
          <SectionHeader title={title} showAll={showAll} onShowAll={() => nav.navigate(route_)} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScrollContent}>
            {items.map(item => (
              <View key={item.id} style={styles.hItem}>
                <RestoranMarketCard name={item.name} distanceKm={item.distanceKm} iconName={item.iconName} category="restoran" onPress={() => handleRestoranTap(item.id)} />
              </View>
            ))}
          </ScrollView>
        </View>
      );
    }

    if (sectionId === 'yakindaki-marketler') {
      const items = NEARBY_MARKETS.filter(b => searchFilter(search, b.name)).slice(0, DEFAULT_DISPLAY_COUNT);
      if (items.length === 0) return null;
      const showAll = NEARBY_MARKETS.length >= DEFAULT_DISPLAY_COUNT;
      return (
        <View key={sectionId} style={styles.section}>
          <SectionHeader title={title} showAll={showAll} onShowAll={() => nav.navigate(route_)} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScrollContent}>
            {items.map(item => (
              <View key={item.id} style={styles.hItem}>
                <RestoranMarketCard name={item.name} distanceKm={item.distanceKm} iconName={item.iconName} category="market" onPress={() => handleMarketTap(item.id)} />
              </View>
            ))}
          </ScrollView>
        </View>
      );
    }

    if (sectionId === 'ulasim-markalari') {
      const items = ULASIM_BRANDS.filter(b => searchFilter(search, b.name)).slice(0, DEFAULT_DISPLAY_COUNT);
      if (items.length === 0) return null;
      const showAll = ULASIM_BRANDS.length >= DEFAULT_DISPLAY_COUNT;
      return (
        <View key={sectionId} style={styles.section}>
          <SectionHeader title={title} showAll={showAll} onShowAll={() => nav.navigate(route_)} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScrollContent}>
            {items.map(item => (
              <View key={item.id} style={styles.hItem}>
                <UlasimBrandCard logo={item.logo} name={item.name} size={110} onPress={() => handleUlasimTap(item.id)} />
              </View>
            ))}
          </ScrollView>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <IconButton iconName="chevronLeft" variant="ghost" size="md" color="inverse" onPress={() => nav.goBack()} accessibilityLabel="Geri" />
        <Text variant="title.mobileCard" color="inverse" align="center" style={styles.title}>Pluxee'li Noktalar</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} showsVerticalScrollIndicator={false}>
        <View style={styles.searchRow}>
          <SearchInput value={search} onChangeText={setSearch} placeholder="Pluxee'li Nokta ara" onClear={() => setSearch('')} />
        </View>
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.filtreChip} onPress={() => nav.navigate('PlacesFilter', { context: 'general', currentFilters: filters, onApply: setFilters })}>
            <Icon name="filter" size={16} color="primary" />
            <Text variant="body.mediumBold" color="primary" style={styles.chipText}>Filtrele</Text>
          </TouchableOpacity>
          {search.length > 0 && (
            <Text variant="body.medium" color="primary" style={styles.resultCount}>{totalResultCount} sonuc</Text>
          )}
        </View>

        {!hasAnyResult ? (
          <View style={styles.emptyWrap}>
            <EmptyState iconName="search" title="Aradiginiz sonuc bulunamadi" />
          </View>
        ) : (
          filteredOrder.map(renderSection)
        )}
      </ScrollView>

      <InfoModal visible={infoModal.visible} message={infoModal.message} onClose={() => setInfoModal({ visible: false, message: '' })} />
      <AktarimModal visible={aktarimModal.visible} message={aktarimModal.message}
        onConfirm={() => {
          const t = aktarimModal.target;
          setAktarimModal({ visible: false, message: '', target: null });
          if (t) nav.navigate('BrandDetail', { brandId: t === 'yemek' ? 'pluxee-yemek' : 'pluxee-gida' });
        }}
        onCancel={() => setAktarimModal({ visible: false, message: '', target: null })} />
      <PaketSecModal visible={paketModal.visible} brandName={paketModal.brandName}
        packages={MOCK_USER_PROFILE.hediyePaketler.filter(p => p.brandIds.includes(paketModal.brandId))}
        onSelect={(pkgId) => { setPaketModal({ visible: false, brandId: '', brandName: '' }); nav.navigate('BrandDetail', { brandId: paketModal.brandId, packageId: pkgId }); }}
        onClose={() => setPaketModal({ visible: false, brandId: '', brandName: '' })} />
    </SafeAreaView>
  );
};

interface SectionHeaderProps {
  title: string;
  showAll: boolean;
  onShowAll?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, showAll, onShowAll }) => (
  <View style={styles.sectionHeader}>
    <Text variant="title.mobileSection" color="primary" style={styles.sectionTitle}>{title}</Text>
    {showAll && onShowAll && (
      <TouchableOpacity style={styles.showAllBtn} onPress={onShowAll} activeOpacity={0.7}>
        <Text variant="body.mediumBold" color="info" style={styles.showAllText}>Tumunu gor</Text>
        <Icon name="arrowRight" size={16} color="info" />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  plusMoreCard: {
    width: 110,
    height: 110,
    borderRadius: radius.lg,
    backgroundColor: '#E8E5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safe: { flex: 1, backgroundColor: '#1B1D45' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B1D45', paddingHorizontal: spacing[4], paddingBottom: spacing[3], paddingTop: spacing[2] },
  title: { flex: 1 },
  headerRight: { width: 40 },
  body: { flex: 1, backgroundColor: semantic.background.primary },
  bodyContent: { paddingHorizontal: spacing[4], paddingTop: spacing[4], paddingBottom: spacing[8] },
  searchRow: { marginBottom: spacing[3] },
  toolbar: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing[5], gap: spacing[3] },
  filtreChip: { flexDirection: 'row', alignItems: 'center', gap: spacing[2], backgroundColor: '#FFFFFF', paddingHorizontal: spacing[4], paddingVertical: spacing[3], borderRadius: radius.full },
  chipText: { fontSize: 14 },
  resultCount: { fontSize: 14 },
  section: { marginBottom: spacing[5] },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing[3] },
  sectionTitle: { fontSize: 18 },
  showAllBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing[1] },
  showAllText: { fontSize: 13 },
  hScrollContent: { gap: spacing[3], paddingRight: spacing[4] },
  hItem: {},
  emptyWrap: { paddingVertical: spacing[8] },
});

export default PlacesScreen;
