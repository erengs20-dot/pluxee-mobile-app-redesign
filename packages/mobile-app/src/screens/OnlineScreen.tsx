/**
 * OnlineScreen
 *
 * Online Alisveris tab'i.
 * - SearchInput atom ile arama
 * - Filtrele butonu -> PlacesFilterScreen (context: online)
 * - Sirala butonu -> siralama modal
 * - Kategori chip filtreleri (yatay scroll)
 * - 3 sutun marka grid (renkli basinitiyal + marka adi)
 */
import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  Icon,
  SearchInput,
  Button,
  semantic,
  spacing,
  radius,
} from "@pluxee/design-system";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MOCK_BRANDS, type Brand } from "../data/brands";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

// Kategori filtreleri
const CATEGORIES = [
  { id: "all", label: "Tumu" },
  { id: "yemek", label: "Yemek & Restoran" },
  { id: "market", label: "Market & Gida" },
  { id: "moda", label: "Moda & Aksesuar" },
  { id: "teknoloji", label: "Teknoloji" },
  { id: "spor", label: "Spor" },
  { id: "bakim", label: "Kisisel Bakim" },
];

// Siralama secenekleri
type SortOption = "default" | "az" | "za";
const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "default", label: "Varsayilan" },
  { id: "az", label: "A-Z" },
  { id: "za", label: "Z-A" },
];

// Marka -> kategori eslestirme (mock)
function getBrandCategory(brand: Brand): string {
  const name = brand.name.toLowerCase();
  if (["trendyol", "hepsiburada", "boyner", "hopi"].some(k => name.includes(k))) return "yemek";
  if (["migros", "carrefoursa", "sariyer", "mopas"].some(k => name.includes(k))) return "market";
  if (["lc waikiki", "koton", "defacto"].some(k => name.includes(k))) return "moda";
  if (["mediamarkt", "teknosa"].some(k => name.includes(k))) return "teknoloji";
  if (["nike", "adidas", "decathlon", "intersport"].some(k => name.includes(k))) return "spor";
  if (["watsons", "gratis"].some(k => name.includes(k))) return "bakim";
  if (["domino", "mcdonald"].some(k => name.includes(k))) return "yemek";
  return "all";
}

// Marka renkleri
const BRAND_COLORS: Record<string, string> = {
  "Trendyol": "#ff6000",
  "Hepsiburada": "#ff8800",
  "LC Waikiki": "#e91e63",
  "Koton": "#6d4c41",
  "DeFacto": "#d32f2f",
  "Nike": "#111111",
  "Adidas": "#000000",
  "MediaMarkt": "#df0000",
  "Teknosa": "#00897b",
  "Migros": "#f57c00",
  "CarrefourSA": "#1565c0",
  "Watsons": "#00838f",
  "Gratis": "#ad1457",
  "Decathlon": "#0277bd",
  "Intersport": "#1a237e",
  "Boyner": "#7b1fa2",
  "Hopi": "#ff5722",
  "Sariyer": "#33691e",
  "Mopas": "#4e342e",
};

function getBrandColor(name: string): string {
  return BRAND_COLORS[name] || semantic.brand.primary;
}

function getInitials(name: string): string {
  return name.charAt(0).toUpperCase();
}

export function OnlineScreen() {
  const navigation = useNavigation<Nav>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  // Online + gift markalari
  const allBrands = useMemo(
    () => MOCK_BRANDS.filter((b) => b.category === "online" || b.category === "gift"),
    []
  );

  const filteredBrands = useMemo(() => {
    let result = allBrands;

    // Arama
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((b) => b.name.toLowerCase().includes(q));
    }

    // Kategori
    if (selectedCategory !== "all") {
      result = result.filter((b) => getBrandCategory(b) === selectedCategory);
    }

    // Siralama
    if (sortBy === "az") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name, "tr"));
    } else if (sortBy === "za") {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name, "tr"));
    }

    return result;
  }, [allBrands, searchQuery, selectedCategory, sortBy]);

  const resultCount = filteredBrands.length;

  const handleBrandPress = (brand: Brand) => {
    if (brand.websiteUrl) {
      navigation.navigate("WebView", {
        url: brand.websiteUrl,
        title: brand.name,
      });
    } else {
      navigation.navigate("BrandDetail", { brandId: brand.id });
    }
  };

  const handleSort = useCallback((option: SortOption) => {
    setSortBy(option);
    setSortModalOpen(false);
  }, []);

  const renderBrandTile = ({ item }: { item: Brand }) => {
    const color = getBrandColor(item.name);
    return (
      <TouchableOpacity
        style={styles.brandTile}
        onPress={() => handleBrandPress(item)}
        activeOpacity={0.7}
      >
        <View style={[styles.brandIcon, { backgroundColor: color }]}>
          <Text variant="title.mobileCard" color="inverse">
            {getInitials(item.name)}
          </Text>
        </View>
        <Text
          variant="body.smallMedium"
          color="primary"
          align="center"
          numberOfLines={2}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="title.mobileMain" color="primary">
          Online Alisveris
        </Text>
      </View>

      {/* Arama */}
      <View style={styles.searchSection}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Pluxee'li Nokta ara"
        />

      </View>

      {/* Filtrele + Sirala + Chip'ler tek satir */}
      <View style={styles.chipSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipScroll}
        >
          {/* Filtrele */}
          <TouchableOpacity
            style={[
              styles.filterChip,
              activeFilterCount > 0 && styles.filterChipActive,
            ]}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate("PlacesFilter", {
                context: "online",
              })
            }
          >
            <Icon
              name="filter"
              size={16}
              color={activeFilterCount > 0 ? "inverse" : "primary"}
            />
            <Text
              variant="body.mediumBold"
              color={activeFilterCount > 0 ? "inverse" : "primary"}
            >
              {activeFilterCount > 0
                ? `Filtrele (${activeFilterCount})`
                : "Filtrele"}
            </Text>
          </TouchableOpacity>

          {/* Sirala */}
          <TouchableOpacity
            style={styles.filterChip}
            activeOpacity={0.7}
            onPress={() => setSortModalOpen(true)}
          >
            <Icon name="sort" size={16} color="primary" />
            <Text variant="body.mediumBold" color="primary">
              Sirala
            </Text>
          </TouchableOpacity>

          {/* Kategori chip'leri */}
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => setSelectedCategory(cat.id)}
                activeOpacity={0.7}
              >
                <Text
                  variant="body.mediumBold"
                  color={isActive ? "inverse" : "primary"}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Marka Grid */}
      <FlatList
        data={filteredBrands}
        renderItem={renderBrandTile}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={styles.gridRow}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="search" size={24} color="secondary" />
            <Text variant="body.medium" color="secondary" align="center">
              Aramanizla eslesen marka bulunamadi
            </Text>
          </View>
        }
      />

      {/* ========== SIRALAMA MODAL ========== */}
      <Modal
        visible={sortModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setSortModalOpen(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setSortModalOpen(false)}
        >
          <Pressable
            style={styles.sortSheet}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.dragHandle} />
            <View style={styles.sortHeader}>
              <View style={{ width: 32 }} />
              <Text variant="title.mobileCard" color="primary">
                Sirala
              </Text>
              <TouchableOpacity
                onPress={() => setSortModalOpen(false)}
                hitSlop={12}
              >
                <Icon name="xmark" size={24} color="primary" />
              </TouchableOpacity>
            </View>

            {SORT_OPTIONS.map((opt) => {
              const isActive = sortBy === opt.id;
              return (
                <TouchableOpacity
                  key={opt.id}
                  style={[styles.sortOption, isActive && styles.sortOptionActive]}
                  onPress={() => handleSort(opt.id)}
                  activeOpacity={0.7}
                >
                  <Text
                    variant="body.largeBold"
                    color={isActive ? "primary" : "secondary"}
                  >
                    {opt.label}
                  </Text>
                  {isActive && (
                    <Icon name="checkmark" size={24} color="success" />
                  )}
                </TouchableOpacity>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: semantic.background.canvas,
  },
  header: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    backgroundColor: semantic.background.primary,
  },
  searchSection: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    backgroundColor: semantic.background.primary,
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
  filterChipActive: {
    backgroundColor: semantic.brand.primary,
    borderColor: semantic.brand.primary,
  },
  chipSection: {
    backgroundColor: semantic.background.primary,
    paddingVertical: spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: semantic.border.tertiary,
  },
  chipScroll: {
    paddingHorizontal: spacing[4],
    gap: spacing[2],
  },
  chip: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: semantic.border.tertiary,
    backgroundColor: semantic.background.primary,
  },
  chipActive: {
    backgroundColor: semantic.brand.primary,
    borderColor: semantic.brand.primary,
  },
  gridContent: {
    padding: spacing[4],
    paddingBottom: spacing[20],
  },
  gridRow: {
    justifyContent: "flex-start",
    gap: spacing[3],
    marginBottom: spacing[4],
  },
  brandTile: {
    width: "30%",
    alignItems: "center",
    gap: spacing[2],
  },
  brandIcon: {
    width: 72,
    height: 72,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing[12],
    gap: spacing[3],
  },
  // Siralama modal
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: semantic.border.tertiary,
    borderRadius: radius.sm,
    alignSelf: "center",
    marginTop: spacing[3],
    marginBottom: spacing[2],
  },
  sortSheet: {
    backgroundColor: semantic.background.primary,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
  },
  sortHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing[3],
    marginBottom: spacing[2],
  },
  sortOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: semantic.border.tertiary,
  },
  sortOptionActive: {
    backgroundColor: semantic.background.successBanner,
    marginHorizontal: -spacing[4],
    paddingHorizontal: spacing[4],
    borderBottomColor: semantic.background.successBanner,
  },
});
