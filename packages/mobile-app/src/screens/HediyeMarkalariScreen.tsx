import React, { useState, useMemo } from 'react';
import { View, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute} from '@react-navigation/native';
import type { PlacesFilters } from './PlacesFilterScreen';
import { EMPTY_FILTERS } from './PlacesFilterScreen';
import {
  Text, Icon, IconButton, SearchInput, EmptyState, Button,
  semantic, spacing, radius,
} from '@pluxee/design-system';
import { HEDIYE_BRANDS } from '../data/placesPoints';
import { MOCK_USER_PROFILE, searchFilter, evaluateHediyeBrandTap } from '../data/placesScenarios';
import { BrandCard } from '../components/places/BrandCard';
import { InfoModal, AktarimModal } from '../components/places/Modals';
import { PaketSecModal } from '../components/places/PaketSecModal';
import { SortDropdown, SortOption } from '../components/places/SortDropdown';

export const HediyeMarkalariScreen: React.FC = () => {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const [filters, setFilters] = useState<PlacesFilters>(EMPTY_FILTERS);
  const [search, setSearch] = useState<string>(route.params?.initialSearch ?? '');
  const [sort, setSort] = useState<SortOption>('default');
  const [sortOpen, setSortOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<{ visible: boolean; message: string }>({ visible: false, message: '' });
  const [aktarimModal, setAktarimModal] = useState<{ visible: boolean; message: string; target: 'yemek' | 'gida' | null }>({ visible: false, message: '', target: null });
  const [paketModal, setPaketModal] = useState<{ visible: boolean; brandId: string; brandName: string }>({ visible: false, brandId: '', brandName: '' });

  const filtered = useMemo(() => {
    let list = HEDIYE_BRANDS.filter((b) => searchFilter(search, b.name));
    if (sort === 'default') list = [...list].sort((a, b) => b.addedAt - a.addedAt);
    else list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'tr'));
    return list;
  }, [search, sort]);

  const handleBrandTap = (brandId: string, brandName: string) => {
    const action = evaluateHediyeBrandTap(brandId, MOCK_USER_PROFILE);
    switch (action.type) {
      case 'open-detail':
        nav.navigate('BrandDetail', { brandId });
        break;
      case 'modal-no-balance':
        setInfoModal({ visible: true, message: 'Hediye markalarinda harcayabilecegin bakiyen bulunmamaktadir.' });
        break;
      case 'modal-not-in-package':
        setInfoModal({ visible: true, message: 'Sahip oldugun Hediye paketlerinde bu marka bulunmamaktadir.' });
        break;
      case 'modal-select-package':
        setPaketModal({ visible: true, brandId, brandName });
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <IconButton iconName="chevronLeft" variant="ghost" size="md" color="inverse" onPress={() => nav.goBack()} accessibilityLabel="Geri" />
        <Text variant="title.mobileCard" color="inverse" align="center" style={styles.title}>Hediye Markalari</Text>
        <View style={styles.headerRight} />
      </View>
      <View style={styles.body}>
        <View style={styles.searchRow}>
          <SearchInput value={search} onChangeText={setSearch} placeholder="Pluxee'li Nokta ara" onClear={() => setSearch('')} />
        </View>
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.filtreChip} onPress={() => nav.navigate('PlacesFilter', { context: 'hediye', currentFilters: filters, onApply: setFilters })}>
            <Icon name="filter" size={16} color="primary" />
            <Text variant="body.mediumBold" color="primary" style={styles.chipText}>Filtrele</Text>
          </TouchableOpacity>
          <Text variant="body.medium" color="primary" style={styles.resultCount}>{filtered.length} sonuc</Text>
          <TouchableOpacity style={styles.siralaChip} onPress={() => setSortOpen(true)}>
            <Icon name="clickableSortingNeutral" size={16} color="primary" />
            <Text variant="body.mediumBold" color="primary" style={styles.chipText}>Sirala</Text>
          </TouchableOpacity>
        </View>

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
              <BrandCard logo={item.logo} name={item.name} badge={item.badge} size={104} onPress={() => handleBrandTap(item.id, item.name)} />
            )}
          />
        )}
      </View>

      <SortDropdown visible={sortOpen} selected={sort} onSelect={setSort} onClose={() => setSortOpen(false)} />
      <InfoModal visible={infoModal.visible} message={infoModal.message} onClose={() => setInfoModal({ visible: false, message: '' })} />
      <AktarimModal visible={aktarimModal.visible} message={aktarimModal.message}
        onConfirm={() => { setAktarimModal({ visible: false, message: '', target: null }); }}
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
  body: { flex: 1, backgroundColor: semantic.background.primary, borderTopLeftRadius: 0, paddingHorizontal: spacing[4], paddingTop: spacing[4] },
  searchRow: { marginBottom: spacing[3] },
  toolbar: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing[4], gap: spacing[3] },
  filtreChip: { flexDirection: 'row', alignItems: 'center', gap: spacing[1], backgroundColor: semantic.background.primary, paddingHorizontal: spacing[3], paddingVertical: spacing[2], borderRadius: radius.full },
  siralaChip: { flexDirection: 'row', alignItems: 'center', gap: spacing[1], backgroundColor: semantic.background.primary, paddingHorizontal: spacing[3], paddingVertical: spacing[2], borderRadius: radius.full, marginLeft: 'auto' },
  chipText: { fontSize: 13 },
  resultCount: { fontSize: 14 },
  gridRow: { justifyContent: 'space-between', marginBottom: spacing[3] },
  gridContent: { paddingBottom: spacing[8] },
  emptyWrap: { paddingVertical: spacing[8] },
});

export default HediyeMarkalariScreen;
