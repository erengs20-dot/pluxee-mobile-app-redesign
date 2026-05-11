import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Linking, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { PlacesFilters } from './PlacesFilterScreen';
import { EMPTY_FILTERS } from './PlacesFilterScreen';
import {
  Text, Icon, IconButton, SearchInput, EmptyState,
  semantic, spacing, radius,
} from '@pluxee/design-system';
import { ONLINE_BRANDS } from '../data/placesPoints';

// Urun Secimi filter -> validFor mapping
const URUN_TO_VALIDFOR: Record<string, ('yemek' | 'gida' | 'hediye')[]> = {
  'Yemek': ['yemek'],
  'Gıda': ['gida'],
  'Hediye': ['hediye'],
};

import { MOCK_USER_PROFILE, searchFilter, evaluateOnlineBrandTap, getOnlineBannerConfig } from '../data/placesScenarios';
import { OnlineBrandCard } from '../components/places/OnlineBrandCard';
import { InfoBanner } from '../components/places/InfoBanner';
import { InfoModal, AktarimModal } from '../components/places/Modals';
import { PaketSecModal } from '../components/places/PaketSecModal';
import { SortDropdown, SortOption } from '../components/places/SortDropdown';

export const OnlineAlisverisMarkalariScreen: React.FC = () => {
  const nav = useNavigation<any>();
  const [filters, setFilters] = useState<PlacesFilters>(EMPTY_FILTERS);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('default');
  const [sortOpen, setSortOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<{ visible: boolean; message: string }>({ visible: false, message: '' });
  const [aktarimModal, setAktarimModal] = useState<{ visible: boolean; message: string; target: 'yemek' | 'gida' | null }>({ visible: false, message: '', target: null });
  const [paketModal, setPaketModal] = useState<{ visible: boolean; brandId: string; brandName: string }>({ visible: false, brandId: '', brandName: '' });

  const banner = getOnlineBannerConfig(MOCK_USER_PROFILE);

  const filtered = useMemo(() => {
    let list = ONLINE_BRANDS.filter((b) => searchFilter(search, b.name));
    // Urun Secimi filtresi: secili urunlerin validFor'a denk gelen markalari getir
    if (filters.urunler && filters.urunler.length > 0) {
      const allowedValidFor = new Set<string>();
      filters.urunler.forEach(u => {
        const mapped = URUN_TO_VALIDFOR[u];
        if (mapped) mapped.forEach(v => allowedValidFor.add(v));
      });
      list = list.filter(b => b.validFor.some(v => allowedValidFor.has(v)));
    }
    if (sort === 'default') list = [...list].sort((a, b) => b.addedAt - a.addedAt);
    else list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'tr'));
    return list;
  }, [search, sort, filters]);

  const handleBrandTap = (brand: typeof ONLINE_BRANDS[0]) => {
    // Case 1: Yemek platformu (4 marka) -> deeplink ile uygulama ac
    const yemekPlatformDeeplinks: Record<string, string> = {
      'Trendyol Yemek': 'trendyolyemek://',
      'Yemeksepeti': 'yemeksepeti://',
      'Getir Yemek': 'getir://yemek',
      'Tıkla Gelsin': 'tiklagelsin://',
    };
    if (yemekPlatformDeeplinks[brand.name]) {
      Linking.openURL(yemekPlatformDeeplinks[brand.name]).catch(() => {
        Alert.alert('Uygulama bulunamadi', 'Bu platformun uygulamasi cihazinda yuklu degil.');
      });
      return;
    }
    // Case 2: Hediye markasi (validFor: ['hediye']) -> Marka detay
    if (brand.validFor.length === 1 && brand.validFor[0] === 'hediye') {
      nav.navigate('BrandDetail', { brandId: brand.id });
      return;
    }
    // Case 3: Diger hepsi -> WebView
    nav.navigate('OnlineWebView', { brandId: brand.id, brandName: brand.name });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <IconButton iconName="chevronLeft" variant="ghost" size="md" color="inverse" onPress={() => nav.goBack()} accessibilityLabel="Geri" />
        <Text variant="title.mobileCard" color="inverse" align="center" style={styles.title}>Online Alisveris Markalari</Text>
        <View style={styles.headerRight} />
      </View>
      <View style={styles.body}>
        <View style={styles.searchRow}>
          <SearchInput value={search} onChangeText={setSearch} placeholder="Pluxee'li Nokta ara" onClear={() => setSearch('')} />
        </View>
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.filtreChip} onPress={() => nav.navigate('PlacesFilter', { context: 'online', currentFilters: filters, onApply: setFilters })}>
            <Icon name="filter" size={16} color="primary" />
            <Text variant="body.mediumBold" color="primary" style={styles.chipText}>Filtrele</Text>
          </TouchableOpacity>
          <Text variant="body.medium" color="primary" style={styles.resultCount}>{filtered.length} sonuc</Text>
          <TouchableOpacity style={styles.siralaChip} onPress={() => setSortOpen(true)}>
            <Icon name="clickableSortingNeutral" size={16} color="primary" />
            <Text variant="body.mediumBold" color="primary" style={styles.chipText}>Sirala</Text>
          </TouchableOpacity>
        </View>

        {banner.show && (
          <InfoBanner text={banner.text} linkTexts={banner.linkTexts}
            onLinkPress={(target) => nav.navigate('BrandDetail', { brandId: target === 'yemek' ? 'pluxee-yemek' : 'pluxee-gida' })} />
        )}

        {filtered.length === 0 ? (
          <View style={styles.emptyWrap}>
            <EmptyState iconName="search" title="Aradiginiz sonuc bulunamadi" />
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            numColumns={3}
            columnWrapperStyle={styles.gridRow}
            contentContainerStyle={styles.gridContent}
            renderItem={({ item }) => (
              <OnlineBrandCard logo={item.logo} name={item.name} size={104} onPress={() => handleBrandTap(item)} />
            )}
          />
        )}
      </View>

      <SortDropdown visible={sortOpen} selected={sort} onSelect={setSort} onClose={() => setSortOpen(false)} />
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

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#1B1D45' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B1D45', paddingHorizontal: spacing[4], paddingBottom: spacing[3], paddingTop: spacing[2] },
  title: { flex: 1 },
  headerRight: { width: 40 },
  body: { flex: 1, backgroundColor: semantic.background.primary, paddingHorizontal: spacing[4], paddingTop: spacing[4] },
  searchRow: { marginBottom: spacing[3] },
  toolbar: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing[3], gap: spacing[3] },
  filtreChip: { flexDirection: 'row', alignItems: 'center', gap: spacing[1], backgroundColor: semantic.background.primary, paddingHorizontal: spacing[3], paddingVertical: spacing[2], borderRadius: radius.full },
  siralaChip: { flexDirection: 'row', alignItems: 'center', gap: spacing[1], backgroundColor: semantic.background.primary, paddingHorizontal: spacing[3], paddingVertical: spacing[2], borderRadius: radius.full, marginLeft: 'auto' },
  chipText: { fontSize: 13 },
  resultCount: { fontSize: 14 },
  gridRow: { justifyContent: 'space-between', marginBottom: spacing[3] },
  gridContent: { paddingBottom: spacing[8] },
  emptyWrap: { paddingVertical: spacing[8] },
});

export default OnlineAlisverisMarkalariScreen;
