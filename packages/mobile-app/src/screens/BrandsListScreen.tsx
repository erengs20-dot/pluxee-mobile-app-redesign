/**
 * BrandsListScreen
 *
 * Hediye markalari (Mockup 3-4) ve Online alisveris (Mockup 5-6)
 * icin ortak liste ekrani. Route param ile category secilir.
 *
 * Hediye -> sari badge'li grid (MAGAZA & ONLINE / ONLINE / MAGAZA)
 * Online -> sade beyaz grid (badge yok)
 *
 * NAVIGATION:
 *   navigation.navigate('BrandsList', { category: 'gift', title: 'Hediye Markalari' })
 */
import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Text,
  Icon,
  SearchInput,
  semantic,
  spacing,
  radius,
  shadows,
} from '@pluxee/design-system';

import type { RootStackParamList } from '../navigation/types';
import {
  getGiftBrands,
  getOnlineBrands,
  type Brand,
} from '../data/brands';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'BrandsList'>;

type SortOption = 'default' | 'alphabetical';

export function BrandsListScreen({ route, navigation }: Props) {
  const { category, title } = route.params;

  const [searchQuery, setSearchQuery] = useState('');
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const isGift = category === 'gift';

  // Tum markalar (kategoriye gore)
  const allBrands = useMemo(() => {
    return isGift ? getGiftBrands() : getOnlineBrands();
  }, [isGift]);

  // Filtreleme + siralama
  const displayedBrands = useMemo(() => {
    let result = allBrands;

    // Arama filtresi
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((b) => b.name.toLowerCase().includes(q));
    }

    // Siralama
    if (sortBy === 'alphabetical') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'tr'));
    }

    return result;
  }, [allBrands, searchQuery, sortBy]);

  const handleBrandPress = (brand: Brand) => {
    if (brand.category === 'online') {
      navigation.navigate('WebView' as any, { url: brand.websiteUrl, title: brand.name });
    } else {
      navigation.navigate('BrandDetail', { brandId: brand.id });
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title={title} onBack={() => navigation.goBack()} />

      {/* ARAMA */}
      <View style={styles.searchSection}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Pluxee'li Nokta ara"
        />

        {/* Filtrele + Sonuc + Sirala */}
        <View style={styles.toolbarRow}>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => navigation.navigate('PlacesFilter', { context: category })}
            activeOpacity={0.7}
          >
            <Icon name="filter" size={16} color="primary" />
            <Text variant="body.smallBold" color="primary">
              Filtrele
            </Text>
          </TouchableOpacity>

          <Text variant="body.smallMedium" color="secondary" style={styles.resultCount}>
            {displayedBrands.length} sonuc
          </Text>

          <TouchableOpacity
            style={styles.sortBtn}
            onPress={() => setSortMenuVisible(true)}
            activeOpacity={0.7}
          >
            <Icon name="sort" size={16} color="primary" />
            <Text variant="body.smallBold" color="primary">
              Sirala
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* GRID */}
      <FlatList
        data={displayedBrands}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={styles.gridRow}
        renderItem={({ item }) => (
          <BrandGridCard brand={item} isGift={isGift} onPress={() => handleBrandPress(item)} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text variant="body.medium" color="secondary" align="center">
              Sonuc bulunamadi
            </Text>
          </View>
        }
      />

      {/* SIRALAMA MENU MODAL */}
      <Modal
        visible={sortMenuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSortMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setSortMenuVisible(false)}
        >
          <View style={styles.sortMenuBox}>
            <TouchableOpacity
              style={styles.sortMenuItem}
              onPress={() => {
                setSortBy('default');
                setSortMenuVisible(false);
              }}
              activeOpacity={0.7}
            >
              <Text variant="body.medium" color={sortBy === 'default' ? 'link' : 'primary'}>
                Varsayilan
              </Text>
              {sortBy === 'default' && <Icon name="checkmark" size={16} color="info" />}
            </TouchableOpacity>
            <View style={styles.sortMenuDivider} />
            <TouchableOpacity
              style={styles.sortMenuItem}
              onPress={() => {
                setSortBy('alphabetical');
                setSortMenuVisible(false);
              }}
              activeOpacity={0.7}
            >
              <Text variant="body.medium" color={sortBy === 'alphabetical' ? 'link' : 'primary'}>
                Alfabetik
              </Text>
              {sortBy === 'alphabetical' && <Icon name="checkmark" size={16} color="info" />}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

// ============================================================
// SUB-COMPONENT: BrandGridCard
// ============================================================

interface BrandGridCardProps {
  brand: Brand;
  isGift: boolean;
  onPress: () => void;
}

function BrandGridCard({ brand, isGift, onPress }: BrandGridCardProps) {
  return (
    <TouchableOpacity
      style={[styles.gridCard, isGift && styles.gridCardGift]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.gridCardLogo}>
        <Text variant="body.smallBold" color="primary" align="center" numberOfLines={3}>
          {brand.name}
        </Text>
      </View>
      {isGift && (
        <View style={styles.giftBadge}>
          <Text variant="body.smallBold" color="primary" align="center" style={styles.giftBadgeText}>
            {brand.badge}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: semantic.background.primary,
  },
  searchSection: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: spacing[3],
    gap: spacing[3],
  },
  toolbarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: radius.md,
    backgroundColor: '#ffffff',
    ...shadows.small,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: radius.md,
    backgroundColor: semantic.tag.defaultEnable,
    marginLeft: 'auto',
  },
  resultCount: {},
  gridContent: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
    gap: spacing[3],
  },
  gridRow: {
    gap: spacing[3],
  },
  gridCard: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#ffffff',
    borderRadius: radius.md,
    padding: spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.small,
    overflow: 'hidden',
  },
  gridCardGift: {
    borderWidth: 1.5,
    borderColor: semantic.brand.quaternary, // sari border
  },
  gridCardLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  giftBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: semantic.brand.quaternary, // sari
    paddingVertical: 4,
    paddingHorizontal: spacing[1],
  },
  giftBadgeText: {
    ...require('@pluxee/design-system').typography.body.xsmallMedium,
    letterSpacing: 0.5,
  },
  emptyWrap: {
    padding: spacing[8],
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(34, 28, 70, 0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 180,
    paddingRight: spacing[4],
  },
  sortMenuBox: {
    backgroundColor: '#ffffff',
    borderRadius: radius.md,
    minWidth: 200,
    paddingVertical: spacing[2],
    ...shadows.small,
  },
  sortMenuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  sortMenuDivider: {
    height: 1,
    backgroundColor: semantic.border.tertiary,
    marginHorizontal: spacing[3],
  },
});
