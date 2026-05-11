import React, { useState, useMemo } from 'react';
import { View, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  Text, Icon, IconButton, SearchInput, EmptyState,
  semantic, spacing, radius,
} from '@pluxee/design-system';
import { ULASIM_BRANDS, ULASIM_CATEGORIES } from '../data/placesPoints';
import { MOCK_USER_PROFILE, searchFilter, evaluateUlasimBrandTap } from '../data/placesScenarios';
import { UlasimBrandCard } from '../components/places/UlasimBrandCard';
import { InfoBanner } from '../components/places/InfoBanner';
import { InfoModal } from '../components/places/Modals';
import { SortDropdown, SortOption } from '../components/places/SortDropdown';

export const UlasimMarkalariScreen: React.FC = () => {
  const nav = useNavigation<any>();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('default');
  const [sortOpen, setSortOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<{ visible: boolean; message: string }>({ visible: false, message: '' });

  const showBanner = !MOCK_USER_PROFILE.hasUlasim;

  const filteredBrands = useMemo(() => {
    let list = ULASIM_BRANDS.filter((b) => searchFilter(search, b.name));
    if (sort === 'default') list = [...list].sort((a, b) => b.addedAt - a.addedAt);
    else list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'tr'));
    return list;
  }, [search, sort]);

  const filteredCategories = useMemo(() => {
    let list = ULASIM_CATEGORIES.filter((b) => searchFilter(search, b.name));
    if (sort === 'default') list = [...list].sort((a, b) => b.addedAt - a.addedAt);
    else list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'tr'));
    return list;
  }, [search, sort]);

  const handleBrandTap = (brandId: string) => {
    const action = evaluateUlasimBrandTap(brandId, MOCK_USER_PROFILE);
    switch (action.type) {
      case 'open-detail':
        nav.navigate('BrandDetail', { brandId });
        break;
      case 'modal-no-balance':
        setInfoModal({ visible: true, message: 'Ulasim markalarinda harcayabilecegin bakiyen bulunmamaktadir.' });
        break;
    }
  };

  const noResults = filteredBrands.length === 0 && filteredCategories.length === 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <IconButton iconName="chevronLeft" variant="ghost" size="md" color="inverse" onPress={() => nav.goBack()} accessibilityLabel="Geri" />
        <Text variant="title.mobileCard" color="inverse" align="center" style={styles.title}>Ulasim Markalari</Text>
        <View style={styles.headerRight} />
      </View>
      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        <SearchInput value={search} onChangeText={setSearch} placeholder="Pluxee'li Nokta ara" onClear={() => setSearch('')} />
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.filtreChip} onPress={() => nav.navigate('PlacesFilter', { context: 'ulasim' })}>
            <Icon name="filter" size={16} color="primary" />
            <Text variant="body.mediumBold" color="primary" style={styles.chipText}>Filtrele</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.siralaChip} onPress={() => setSortOpen(true)}>
            <Icon name="clickableSortingNeutral" size={16} color="primary" />
            <Text variant="body.mediumBold" color="primary" style={styles.chipText}>Sirala</Text>
          </TouchableOpacity>
        </View>

        {showBanner && (
          <InfoBanner text="Asagidaki markalarda harcayabilecegin Ulasim bakiyen bulunmamaktadir." />
        )}

        {noResults ? (
          <View style={styles.emptyWrap}>
            <EmptyState iconName="search" title="Aradiginiz sonuc bulunamadi" />
          </View>
        ) : (
          <>
            {filteredBrands.length > 0 && (
              <View style={styles.gridSection}>
                <FlatList
                  data={filteredBrands}
                  keyExtractor={(item) => item.id}
                  numColumns={3}
                  scrollEnabled={false}
                  columnWrapperStyle={styles.gridRow}
                  renderItem={({ item }) => (
                    <UlasimBrandCard logo={item.logo} name={item.name} size={104} onPress={() => handleBrandTap(item.id)} />
                  )}
                />
              </View>
            )}
            {filteredCategories.length > 0 && (
              <View style={styles.gridSection}>
                <FlatList
                  data={filteredCategories}
                  keyExtractor={(item) => item.id}
                  numColumns={3}
                  scrollEnabled={false}
                  columnWrapperStyle={styles.gridRow}
                  renderItem={({ item }) => (
                    <UlasimBrandCard
                      name={item.name}
                      iconName={item.iconName}
                      isCategory
                      size={104}
                      onPress={() => handleBrandTap(item.id)}
                    />
                  )}
                />
              </View>
            )}
          </>
        )}
      </ScrollView>

      <SortDropdown visible={sortOpen} selected={sort} onSelect={setSort} onClose={() => setSortOpen(false)} />
      <InfoModal visible={infoModal.visible} message={infoModal.message} onClose={() => setInfoModal({ visible: false, message: '' })} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#1B1D45' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B1D45', paddingHorizontal: spacing[4], paddingBottom: spacing[3], paddingTop: spacing[2] },
  title: { flex: 1 },
  headerRight: { width: 40 },
  body: { flex: 1, backgroundColor: semantic.background.primary },
  bodyContent: { paddingHorizontal: spacing[4], paddingTop: spacing[4], paddingBottom: spacing[8] },
  toolbar: { flexDirection: 'row', alignItems: 'center', marginTop: spacing[3], marginBottom: spacing[4], gap: spacing[3] },
  filtreChip: { flexDirection: 'row', alignItems: 'center', gap: spacing[1], backgroundColor: semantic.background.primary, paddingHorizontal: spacing[3], paddingVertical: spacing[2], borderRadius: radius.full },
  siralaChip: { flexDirection: 'row', alignItems: 'center', gap: spacing[1], backgroundColor: semantic.background.primary, paddingHorizontal: spacing[3], paddingVertical: spacing[2], borderRadius: radius.full, marginLeft: 'auto' },
  chipText: { fontSize: 13 },
  gridSection: { marginBottom: spacing[2] },
  gridRow: { justifyContent: 'space-between', marginBottom: spacing[3] },
  emptyWrap: { paddingVertical: spacing[8] },
});

export default UlasimMarkalariScreen;
