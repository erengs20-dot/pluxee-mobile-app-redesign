/**
 * PlacesScreen - Pluxee'li Noktalar
 *
 * Analiz dokumanina birebir sadik implementasyon.
 * 6 ana kategori basligi, dikeye gore dinamik siralama.
 *
 * SIRALAMA KURALLARI (dokumandan):
 *   Yemek/Business -> Online > Yemek Platformlari > Yakin Restoranlar > Yakin Marketler > Hediye > Ulasim
 *   Gida           -> Online > Yakin Marketler > Yemek Platformlari > Yakin Restoranlar > Hediye > Ulasim
 *   Hediye         -> Hediye > Online > Yemek Platformlari > Yakin Restoranlar > Yakin Marketler > Ulasim
 *   Ulasim         -> Ulasim > Hediye > Online > Yemek Platformlari > Yakin Restoranlar > Yakin Marketler
 *   Default (tab)  -> Yemek/Business sirasi
 *
 * SEARCH:
 *   1. karakter: baslayan (starts with)
 *   2+ karakter: iceriyor (includes)
 *   Turkce/Ingilizce karakter duyarsiz, buyuk/kucuk harf duyarsiz
 *   Bosluk farkli kelime = farkli marka (bitisik yazilirsa sonuc donmez)
 *   Sonucu olmayan baslik gizlenir
 */
import React, { useState, useMemo } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  Text,
  Icon,
  SearchInput,
  EmptyState,
  semantic,
  spacing,
  radius,
} from "@pluxee/design-system";

import type { RootStackParamList, CardCategory } from "../navigation/types";
import {
  getGiftBrands,
  getOnlineBrands,
  getFoodPlatformBrands,
  type Brand,
} from "../data/brands";
import {
  getNearbyRestaurants,
  getNearbyMarkets,
  type Place,
  PAYMENT_METHOD_LABELS,
} from "../data/places";
import { MOCK_BRANDS } from "../data/brands";
import { openFoodPlatformApp } from "../utils/openApp";

type Nav = NativeStackNavigationProp<RootStackParamList>;

// ============================================================
// SIRALAMA TABLOSU (Dokumandan)
// ============================================================
type SectionId = "online" | "foodPlatforms" | "restaurants" | "markets" | "gift" | "transport";

const SECTION_ORDER: Record<string, SectionId[]> = {
  meal:      ["online", "foodPlatforms", "restaurants", "markets", "gift", "transport"],
  business:  ["online", "foodPlatforms", "restaurants", "markets", "gift", "transport"],
  food:      ["online", "markets", "foodPlatforms", "restaurants", "gift", "transport"],
  gift:      ["gift", "online", "foodPlatforms", "restaurants", "markets", "transport"],
  transport: ["transport", "gift", "online", "foodPlatforms", "restaurants", "markets"],
  default:   ["online", "foodPlatforms", "restaurants", "markets", "gift", "transport"],
};

const SECTION_TITLES: Record<SectionId, string> = {
  online: "Online Alisveris",
  foodPlatforms: "Yemek Platformlari",
  restaurants: "Yakindaki Restoranlar",
  markets: "Yakindaki Marketler",
  gift: "Hediye Markalari",
  transport: "Ulasim Markalari",
};

// ============================================================
// TURKCE KARAKTER NORMALIZE
// ============================================================
function normalizeTr(text: string): string {
  return text
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/İ/g, "i")
    .replace(/Ğ/g, "g")
    .replace(/Ü/g, "u")
    .replace(/Ş/g, "s")
    .replace(/Ö/g, "o")
    .replace(/Ç/g, "c");
}

// ============================================================
// SEARCH LOGIC (Dokumandan: 1.karakter baslayan, 2+ iceriyor)
// ============================================================
function matchesSearch(name: string, query: string): boolean {
  if (!query.trim()) return true;
  const normalName = normalizeTr(name);
  const normalQuery = normalizeTr(query.trim());

  if (normalQuery.length === 1) {
    // 1. karakter: baslayan
    return normalName.startsWith(normalQuery);
  }
  // 2+ karakter: iceriyor
  return normalName.includes(normalQuery);
}

// ============================================================
// MARKA RENKLERI (basinicial icin)
// ============================================================
const BRAND_COLORS: Record<string, string> = {
  "Trendyol": "#ff6000", "Hepsiburada": "#ff8800", "LC Waikiki": "#e91e63",
  "Koton": "#6d4c41", "DeFacto": "#d32f2f", "Nike": "#111111",
  "Adidas": "#000000", "MediaMarkt": "#df0000", "Teknosa": "#00897b",
  "Migros": "#f57c00", "CarrefourSA": "#1565c0", "Watsons": "#00838f",
  "Gratis": "#ad1457", "Decathlon": "#0277bd", "Intersport": "#1a237e",
  "Boyner": "#7b1fa2", "Hopi": "#ff5722", "Sariyer": "#33691e",
  "Mopas": "#4e342e", "Opet": "#e53935", "BP": "#009688",
  "Petrol Ofisi": "#1565c0", "Aytemiz": "#ff9800", "TotalEnergies": "#d32f2f",
  "Starbucks": "#00704A", "Pegasus BolBol": "#fdd835",
};
function getBrandColor(name: string): string {
  return BRAND_COLORS[name] || semantic.brand.primary;
}

// ============================================================
// COMPONENT
// ============================================================
export function PlacesScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute();
  const sourceCategory = (route.params as any)?.sourceCategory ?? "meal";

  const [searchQuery, setSearchQuery] = useState("");

  // Data
  const giftBrands = useMemo(() => getGiftBrands(), []);
  const onlineBrands = useMemo(() => getOnlineBrands(), []);
  const foodPlatforms = useMemo(() => getFoodPlatformBrands(), []);
  const fuelBrands = useMemo(() => MOCK_BRANDS.filter(b => b.category === "fuel"), []);
  const nearbyRestaurants = useMemo(() => getNearbyRestaurants(10), []);
  const nearbyMarkets = useMemo(() => getNearbyMarkets(10), []);

  // Section data map
  const sectionData: Record<SectionId, { items: (Brand | Place)[]; type: "brand" | "place" }> = useMemo(() => ({
    online: { items: onlineBrands, type: "brand" },
    foodPlatforms: { items: foodPlatforms, type: "brand" },
    restaurants: { items: nearbyRestaurants, type: "place" },
    markets: { items: nearbyMarkets, type: "place" },
    gift: { items: giftBrands, type: "brand" },
    transport: { items: fuelBrands, type: "brand" },
  }), [giftBrands, onlineBrands, foodPlatforms, fuelBrands, nearbyRestaurants, nearbyMarkets]);

  // Siralama
  const orderedSections = useMemo(() => {
    return SECTION_ORDER[sourceCategory] || SECTION_ORDER.default;
  }, [sourceCategory]);

  // Filtrelenmis data (search)
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return null;

    const result: { id: SectionId; title: string; items: (Brand | Place)[] }[] = [];

    for (const sectionId of orderedSections) {
      const section = sectionData[sectionId];
      const filtered = section.items.filter((item) => {
        const name = "name" in item ? item.name : "";
        return matchesSearch(name, searchQuery);
      });
      if (filtered.length > 0) {
        result.push({ id: sectionId, title: SECTION_TITLES[sectionId], items: filtered });
      }
    }
    return result;
  }, [searchQuery, orderedSections, sectionData]);

  const hasSearchResults = filteredSections === null || filteredSections.length > 0;

  // Handlers
  const handleBrandPress = (brand: Brand) => {
    if (brand.category === "online") {
      navigation.navigate("WebView", { url: brand.websiteUrl, title: brand.name });
    } else if (brand.category === "food_platform") {
      openFoodPlatformApp({
        deepLink: brand.appDeepLink,
        appStoreUrl: brand.appStoreUrl,
        playStoreUrl: brand.playStoreUrl,
        brandName: brand.name,
      });
    } else {
      navigation.navigate("BrandDetail", { brandId: brand.id });
    }
  };

  const handlePlacePress = (place: Place) => {
    navigation.navigate("NearbyPlacesList", {
      placeType: place.placeType,
      title: place.placeType === "restaurant" ? "Yakindaki Restoranlar" : "Yakindaki Marketler",
    });
  };

  const handleSeeAll = (sectionId: SectionId) => {
    switch (sectionId) {
      case "gift":
        navigation.navigate("BrandsList", { category: "gift", title: "Hediye Markalari" });
        break;
      case "online":
        navigation.navigate("BrandsList", { category: "online", title: "Online Alisveris" });
        break;
      case "restaurants":
        navigation.navigate("NearbyPlacesList", { placeType: "restaurant", title: "Yakindaki Restoranlar" });
        break;
      case "markets":
        navigation.navigate("NearbyPlacesList", { placeType: "market", title: "Yakindaki Marketler" });
        break;
      case "transport":
        // Ulasim markalari 5ten az, Tumunu Gor yok (dokumandan)
        break;
      case "foodPlatforms":
        // Bu fazda Tumunu Gor yok (dokumandan)
        break;
    }
  };

  // ============================================================
  // RENDER HELPERS
  // ============================================================
  const renderBrandTile = (brand: Brand) => {
    const color = getBrandColor(brand.name);
    return (
      <TouchableOpacity
        key={brand.id}
        style={styles.tile}
        onPress={() => handleBrandPress(brand)}
        activeOpacity={0.7}
      >
        <View style={[styles.tileIcon, { backgroundColor: color }]}>
          <Text variant="title.mobileCard" color="inverse">
            {brand.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text variant="body.smallMedium" color="primary" align="center" numberOfLines={2}>
          {brand.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderPlaceTile = (place: Place) => {
    return (
      <TouchableOpacity
        key={place.id}
        style={styles.placeTile}
        onPress={() => handlePlacePress(place)}
        activeOpacity={0.7}
      >
        <View style={styles.placeTileTop}>
          <View style={styles.ratingBox}>
            <Text variant="body.smallBold" color="primary">{place.rating.toFixed(1)}</Text>
          </View>
          {place.plusPointsPercent > 0 && (
            <View style={styles.plusBadge}>
              <Text variant="body.xsmallBold" color="success">%{place.plusPointsPercent}</Text>
            </View>
          )}
        </View>
        <Text variant="body.smallBold" color="primary" numberOfLines={2} align="center">
          {place.name}
        </Text>
        <Text variant="body.smallMedium" color="secondary" align="center">
          {place.distanceKm.toFixed(2)} km
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSection = (sectionId: SectionId, items: (Brand | Place)[], showAll?: boolean) => {
    const title = SECTION_TITLES[sectionId];
    const dataType = sectionData[sectionId].type;
    const displayItems = showAll ? items : items.slice(0, 5);
    const showSeeAll = !showAll && items.length > 5 && sectionId !== "foodPlatforms" && sectionId !== "transport";

    return (
      <View key={sectionId} style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="title.mobileSection" color="primary">
            {title}
          </Text>
          {showSeeAll && (
            <TouchableOpacity onPress={() => handleSeeAll(sectionId)} activeOpacity={0.7}>
              <Text variant="body.mediumBold" color="link">
                Tumunu Gor
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {dataType === "brand"
            ? (displayItems as Brand[]).map(renderBrandTile)
            : (displayItems as Place[]).map(renderPlaceTile)}
        </ScrollView>
      </View>
    );
  };

  // ============================================================
  // MAIN RENDER
  // ============================================================
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text variant="title.mobileMain" color="primary">
          {"Pluxee'li Noktalar"}
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Pluxee'li Nokta ara"
        />
      </View>

      {/* Filtrele + Sirala */}
      <View style={styles.filterRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          <TouchableOpacity
            style={styles.filterChip}
            onPress={() => navigation.navigate("PlacesFilter", { context: "main" })}
            activeOpacity={0.7}
          >
            <Icon name="filter" size={16} color="primary" />
            <Text variant="body.mediumBold" color="primary">Filtrele</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip} activeOpacity={0.7}>
            <Icon name="sort" size={16} color="primary" />
            <Text variant="body.mediumBold" color="primary">Sirala</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredSections !== null ? (
          // SEARCH AKTIF
          filteredSections.length > 0 ? (
            filteredSections.map((s) => renderSection(s.id, s.items, true))
          ) : (
            <View style={styles.emptyWrap}>
              <EmptyState
                iconName="search"
                title="Sonuc bulunamadi"
                message="Aradiginiz marka veya mekan bulunamadi. Farkli bir terim deneyin."
              />
            </View>
          )
        ) : (
          // DEFAULT - siralama dikeye gore
          orderedSections.map((sectionId) => {
            const section = sectionData[sectionId];
            if (section.items.length === 0) return null;
            return renderSection(sectionId, section.items as any);
          })
        )}

        <View style={{ height: spacing[20] }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: semantic.background.canvas,
  },
  header: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[6],
    paddingBottom: spacing[2],
    backgroundColor: semantic.background.primary,
  },
  searchWrap: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    backgroundColor: semantic.background.primary,
  },
  filterRow: {
    backgroundColor: semantic.background.primary,
    paddingBottom: spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: semantic.border.tertiary,
  },
  filterScroll: {
    paddingHorizontal: spacing[4],
    gap: spacing[2],
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[1],
    borderWidth: 1.5,
    borderColor: semantic.brand.primary,
    borderRadius: radius.full,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  scrollContent: {
    paddingTop: spacing[4],
  },
  // Section
  section: {
    marginBottom: spacing[5],
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing[4],
    marginBottom: spacing[3],
  },
  horizontalScroll: {
    paddingHorizontal: spacing[4],
    gap: spacing[3],
  },
  // Brand Tile
  tile: {
    width: 80,
    alignItems: "center",
    gap: spacing[2],
  },
  tileIcon: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  // Place Tile
  placeTile: {
    width: 100,
    alignItems: "center",
    gap: spacing[1],
    backgroundColor: semantic.background.primary,
    borderRadius: radius.lg,
    padding: spacing[2],
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
  },
  placeTileTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: spacing[1],
  },
  ratingBox: {
    backgroundColor: semantic.background.successBanner,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: radius.sm,
  },
  plusBadge: {
    backgroundColor: semantic.background.successBanner,
    paddingHorizontal: spacing[1],
    paddingVertical: spacing[1],
    borderRadius: radius.sm,
  },
  // Empty
  emptyWrap: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[8],
  },
});
