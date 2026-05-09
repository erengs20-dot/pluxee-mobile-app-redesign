/**
 * PlacesScreen - Pluxee'li Noktalar
 *
 * Ana Mekanlar arama ekrani. 5 horizontal scroll bolgesinden olusur:
 *   1. Hediye markalari (5 + Tumunu gor)
 *   2. Online alisveris (5 + Tumunu gor)
 *   3. Yemek platformlari (4 - Tumunu gor YOK)
 *   4. Yakindaki restoranlar (3 + Tumunu gor)
 *   5. Yakindaki marketler (3 + Tumunu gor)
 *
 * Arama: Tum bolgelerden birlesik filtre. Bos sonuc -> empty state.
 *
 * NAVIGATION:
 *   navigation.navigate('Places') - bottom tab
 */
import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Text,
  Icon,
  SearchInput,
  EmptyState,
  semantic,
  spacing,
  radius,
  shadows,
} from '@pluxee/design-system';

import type { RootStackParamList } from '../navigation/types';
import {
  getGiftBrands,
  getOnlineBrands,
  getFoodPlatformBrands,
  type Brand,
} from '../data/brands';
import {
  getNearbyRestaurants,
  getNearbyMarkets,
  searchPlaces,
  type Place,
} from '../data/places';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';
import { openFoodPlatformApp } from '../utils/openApp';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function PlacesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  // Bolge data'lari (memo'lu)
  const giftBrands = useMemo(() => getGiftBrands().slice(0, 5), []);
  const onlineBrands = useMemo(() => getOnlineBrands().slice(0, 5), []);
  const foodPlatforms = useMemo(() => getFoodPlatformBrands(), []);
  const nearbyRestaurants = useMemo(() => getNearbyRestaurants(3), []);
  const nearbyMarkets = useMemo(() => getNearbyMarkets(3), []);

  // Arama sonuclari (sorgu varsa)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const placeMatches = searchPlaces(searchQuery);
    const giftMatches = getGiftBrands().filter((b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const onlineMatches = getOnlineBrands().filter((b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const foodMatches = getFoodPlatformBrands().filter((b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      places: placeMatches,
      gift: giftMatches,
      online: onlineMatches,
      food: foodMatches,
      total: placeMatches.length + giftMatches.length + onlineMatches.length + foodMatches.length,
    };
  }, [searchQuery]);

  const handleBrandPress = (brand: Brand) => {
    if (brand.category === 'online') {
      // TODO: Webview screen acilacak
      navigation.navigate('WebView' as any, { url: brand.websiteUrl, title: brand.name });
    } else if (brand.category === 'food_platform') {
      // Deep link dene -> yoksa store URL fallback
      openFoodPlatformApp({
        deepLink: brand.appDeepLink,
        appStoreUrl: brand.appStoreUrl,
        playStoreUrl: brand.playStoreUrl,
        brandName: brand.name,
      });
    } else {
      // gift/fuel - mevcut BrandDetail akisi
      navigation.navigate('BrandDetail', { brandId: brand.id });
    }
  };

  const handlePlacePress = (place: Place) => {
    // TODO: Faz 7.x - PlaceDetail ekrani
    console.log('Place press:', place.name);
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title="Pluxee'li Noktalar" onBack={() => navigation.goBack()} />

      {/* ARAMA BAR + FILTRELE */}
      <View style={styles.searchSection}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Pluxee'li Nokta ara"
        />
        {!searchQuery && (
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => navigation.navigate('PlacesFilter', { context: 'main' })}
            activeOpacity={0.7}
          >
            <Icon name="filter" size={16} color="primary" />
            <Text variant="body.smallBold" color="primary">
              Filtrele
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* === ARAMA SONUCLARI === */}
        {searchResults && (
          searchResults.total === 0 ? (
            <View style={styles.emptyWrap}>
              <EmptyState
                title="Aradiginiz sonuc bulunamadi"
                iconName="searchOff"
              />
            </View>
          ) : (
            <View style={styles.searchResultsWrap}>
              <Text variant="body.smallMedium" color="secondary" style={styles.resultCount}>
                {searchResults.total} sonuc
              </Text>

              {/* Markalar */}
              {[...searchResults.gift, ...searchResults.online, ...searchResults.food].map((brand) => (
                <TouchableOpacity
                  key={brand.id}
                  style={styles.searchResultCard}
                  onPress={() => handleBrandPress(brand)}
                  activeOpacity={0.7}
                >
                  <View style={styles.searchResultIcon}>
                    <Icon name="cardCredit" size={24} color="primary" />
                  </View>
                  <View style={styles.searchResultInfo}>
                    <Text variant="body.mediumBold" color="primary" numberOfLines={1}>
                      {brand.name}
                    </Text>
                    <Text variant="body.smallMedium" color="tertiary" numberOfLines={1}>
                      {brand.category === 'gift' && 'Hediye markasi'}
                      {brand.category === 'online' && 'Online alisveris'}
                      {brand.category === 'food_platform' && 'Yemek platformu'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}

              {/* Mekanlar */}
              {searchResults.places.map((place) => (
                <PlaceListCard key={place.id} place={place} onPress={() => handlePlacePress(place)} />
              ))}
            </View>
          )
        )}

        {/* === DEFAULT GORUNUM (5 bolge) === */}
        {!searchResults && (
          <>
            <BrandSection
              title="Hediye markalari"
              brands={giftBrands}
              onSeeAll={() => navigation.navigate('BrandsList' as any, { category: 'gift', title: 'Hediye Markalari' })}
              onBrandPress={handleBrandPress}
            />
            <BrandSection
              title="Online alisveris"
              brands={onlineBrands}
              onSeeAll={() => navigation.navigate('BrandsList' as any, { category: 'online', title: 'Online Alisveris Markalari' })}
              onBrandPress={handleBrandPress}
            />
            <BrandSection
              title="Yemek platformlari"
              brands={foodPlatforms}
              onSeeAll={null}
              onBrandPress={handleBrandPress}
            />
            <PlaceSection
              title="Yakindaki restoranlar"
              places={nearbyRestaurants}
              onSeeAll={() => navigation.navigate('NearbyPlacesList' as any, { placeType: 'restaurant', title: 'Plus Noktalari' })}
              onPlacePress={handlePlacePress}
            />
            <PlaceSection
              title="Yakindaki marketler"
              places={nearbyMarkets}
              onSeeAll={() => navigation.navigate('NearbyPlacesList' as any, { placeType: 'market', title: 'Yakindaki Marketler' })}
              onPlacePress={handlePlacePress}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

interface BrandSectionProps {
  title: string;
  brands: Brand[];
  onSeeAll: (() => void) | null;
  onBrandPress: (brand: Brand) => void;
}

function BrandSection({ title, brands, onSeeAll, onBrandPress }: BrandSectionProps) {
  if (brands.length === 0) return null;
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text variant="title.mobileSection" color="primary">
          {title}
        </Text>
        {onSeeAll && (
          <TouchableOpacity onPress={onSeeAll} activeOpacity={0.6} style={styles.seeAllBtn}>
            <Text variant="body.smallMedium" color="link">
              Tumunu gor
            </Text>
            <Icon name="arrowRight" size={16} color="info" />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={brands}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.brandCard}
            onPress={() => onBrandPress(item)}
            activeOpacity={0.7}
          >
            <Text variant="body.smallBold" color="primary" align="center" numberOfLines={2}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

interface PlaceSectionProps {
  title: string;
  places: Place[];
  onSeeAll: () => void;
  onPlacePress: (place: Place) => void;
}

function PlaceSection({ title, places, onSeeAll, onPlacePress }: PlaceSectionProps) {
  if (places.length === 0) return null;
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text variant="title.mobileSection" color="primary">
          {title}
        </Text>
        <TouchableOpacity onPress={onSeeAll} activeOpacity={0.6} style={styles.seeAllBtn}>
          <Text variant="body.smallMedium" color="link">
            Tumunu gor
          </Text>
          <Icon name="arrowRight" size={16} color="info" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.placeCard}
            onPress={() => onPlacePress(item)}
            activeOpacity={0.7}
          >
            <View style={styles.placeIconWrap}>
              <Icon
                name={item.placeType === 'restaurant' ? 'meal' : 'shoppingBag'}
                size={24}
                color="primary"
              />
            </View>
            <Text variant="body.smallBold" color="primary" numberOfLines={1} style={styles.placeName}>
              {item.name}
            </Text>
            <View style={styles.placeDistanceRow}>
              <Icon name="location" size={16} color="info" />
              <Text variant="body.smallMedium" color="link">
                {item.distanceKm.toFixed(2)} km
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

interface PlaceListCardProps {
  place: Place;
  onPress: () => void;
}

function PlaceListCard({ place, onPress }: PlaceListCardProps) {
  return (
    <TouchableOpacity style={styles.placeListCard} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.placeListHeader}>
        <Text variant="title.mobileCard" color="primary" numberOfLines={1} style={styles.placeListName}>
          {place.name}
        </Text>
        <View style={styles.placeListRating}>
          <Icon name="starFilled" size={16} color="warning" />
          <Text variant="body.smallBold" color="primary">
            {place.rating.toFixed(1)}
          </Text>
        </View>
      </View>
      <View style={styles.placeListMeta}>
        <Icon name="location" size={16} color="info" />
        <Text variant="body.smallMedium" color="link">
          {place.distanceKm.toFixed(2)} km
        </Text>
        <Text variant="body.smallMedium" color="tertiary">
          {' '}
          {place.city} {place.district}
        </Text>
      </View>
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
    paddingBottom: spacing[2],
    gap: spacing[3],
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    alignSelf: 'flex-start',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: radius.md,
    backgroundColor: semantic.background.primary,
    ...shadows.small,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: spacing[8] },
  section: {
    paddingTop: spacing[5],
    gap: spacing[3],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  horizontalList: {
    paddingHorizontal: spacing[4],
    gap: spacing[3],
  },
  brandCard: {
    width: 130,
    height: 130,
    backgroundColor: semantic.background.primary,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[3],
    ...shadows.small,
  },
  placeCard: {
    width: 160,
    backgroundColor: semantic.background.primary,
    borderRadius: radius.lg,
    padding: spacing[3],
    gap: spacing[2],
    ...shadows.small,
  },
  placeIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: semantic.background.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeName: { paddingTop: spacing[1] },
  placeDistanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  emptyWrap: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[8],
  },
  searchResultsWrap: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    gap: spacing[2],
  },
  resultCount: { paddingVertical: spacing[2] },
  searchResultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    backgroundColor: semantic.background.primary,
    borderRadius: radius.md,
    padding: spacing[3],
    ...shadows.small,
  },
  searchResultIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: semantic.background.disabled,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchResultInfo: { flex: 1, gap: spacing[1] },
  placeListCard: {
    backgroundColor: semantic.background.primary,
    borderRadius: radius.md,
    padding: spacing[4],
    gap: spacing[2],
    ...shadows.small,
  },
  placeListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeListName: { flex: 1 },
  placeListRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  placeListMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    flexWrap: 'wrap',
  },
});
