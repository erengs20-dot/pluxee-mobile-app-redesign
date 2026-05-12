import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute} from '@react-navigation/native';
import type { PlacesFilters } from './PlacesFilterScreen';
import { EMPTY_FILTERS } from './PlacesFilterScreen';
import {
  Text, Icon, IconButton, SearchInput, EmptyState,
  semantic, spacing, radius,
} from '@pluxee/design-system';
import { NEARBY_MARKETS } from '../data/placesPoints';
import { MOCK_USER_PROFILE, searchFilter, evaluateMarketTap, getMarketBannerConfig } from '../data/placesScenarios';
import { RestoranMarketListCard } from '../components/places/RestoranMarketListCard';
import { InfoBanner } from '../components/places/InfoBanner';
import { InfoModal, AktarimModal } from '../components/places/Modals';
import { SortDropdown, SortOption } from '../components/places/SortDropdown';

export const YakindakiMarketlerScreen: React.FC = () => {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const [filters, setFilters] = useState<PlacesFilters>(EMPTY_FILTERS);
  const [search, setSearch] = useState<string>(route.params?.initialSearch ?? '');
  const [sort, setSort] = useState<SortOption>('default');
  const [sortOpen, setSortOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<{ visible: boolean; message: string }>({ visible: false, message: '' });
  const [aktarimModal, setAktarimModal] = useState<{ visible: boolean; message: string; target: 'yemek' | 'gida' | null }>({ visible: false, message: '', target: null });

  const banner = getMarketBannerConfig(MOCK_USER_PROFILE);

  const filtered = useMemo(() => {
    let list = NEARBY_MARKETS.filter((b) => searchFilter(search, b.name));
    if (sort === 'default') list = [...list].sort((a, b) => a.distanceKm - b.distanceKm);
    else list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'tr'));
    return list;
  }, [search, sort]);

  const handlePlaceTap = (placeId: string) => {
    const action = evaluateMarketTap(placeId, MOCK_USER_PROFILE);
    switch (action.type) {
      case 'navigate-mekan-detay':
        nav.navigate('MekanDetay', { placeId });
        break;
      case 'modal-no-balance':
        setInfoModal({ visible: true, message: 'Marketlerde harcayabilecegin bakiyen bulunmamaktadir.' });
        break;
      case 'modal-transfer-required':
        setAktarimModal({ visible: true, message: "Marketlerde harcama yapabilmen icin Pluxee Gida'ya aktarim yapman gerekmektedir.", target: 'gida' });
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <IconButton iconName="chevronLeft" variant="ghost" size="md" color="inverse" onPress={() => nav.goBack()} accessibilityLabel="Geri" />
        <Text variant="title.mobileCard" color="inverse" align="center" style={styles.title}>Yakindaki Marketler</Text>
        <View style={styles.headerRight} />
      </View>
      <View style={styles.body}>
        <View style={styles.searchRow}>
          <SearchInput value={search} onChangeText={setSearch} placeholder="Pluxee'li Nokta ara" onClear={() => setSearch('')} />
        </View>
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.filtreChip} onPress={() => nav.navigate('PlacesFilter', { context: 'market', currentFilters: filters, onApply: setFilters })}>
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
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => <RestoranMarketListCard place={item} onPress={() => handlePlaceTap(item.id)} />}
          />
        )}
      </View>

      <InfoModal visible={infoModal.visible} message={infoModal.message} onClose={() => setInfoModal({ visible: false, message: '' })} />
      <AktarimModal visible={aktarimModal.visible} message={aktarimModal.message}
        onConfirm={() => {
          const t = aktarimModal.target;
          setAktarimModal({ visible: false, message: '', target: null });
          if (t) nav.navigate('BrandDetail', { brandId: t === 'yemek' ? 'pluxee-yemek' : 'pluxee-gida' });
        }}
        onCancel={() => setAktarimModal({ visible: false, message: '', target: null })} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#1B1D45' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B1D45', paddingHorizontal: spacing[4], paddingBottom: spacing[3], paddingTop: spacing[2] },
  title: { flex: 1 },
  headerRight: { width: 40 },
  body: { flex: 1, backgroundColor: '#F5F6F8', paddingHorizontal: spacing[4], paddingTop: spacing[4] },
  searchRow: { marginBottom: spacing[3] },
  toolbar: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing[3], gap: spacing[3] },
  filtreChip: { flexDirection: 'row', alignItems: 'center', gap: spacing[1], backgroundColor: semantic.background.primary, paddingHorizontal: spacing[3], paddingVertical: spacing[2], borderRadius: radius.full },
  siralaChip: { flexDirection: 'row', alignItems: 'center', gap: spacing[1], backgroundColor: semantic.background.primary, paddingHorizontal: spacing[3], paddingVertical: spacing[2], borderRadius: radius.full, marginLeft: 'auto' },
  chipText: { fontSize: 13 },
  resultCount: { fontSize: 14 },
  listContent: { paddingBottom: spacing[8] },
  emptyWrap: { paddingVertical: spacing[8] },
});

export default YakindakiMarketlerScreen;
