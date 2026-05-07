/**
 * PlacesFilterScreen
 *
 * Mekanlar ve liste ekranlari icin paylasilan filtreleme modal'i.
 * Mockup 11-13 - sol sidebar ile sekmeli yapi.
 *
 * CONTEXT-BASED:
 *   - main         (Mekanlar ana ekrani)         -> Lokasyon + Odeme
 *   - gift         (Hediye Markalari)             -> Odeme
 *   - online       (Online Alisveris)             -> (filtre yok)
 *   - restaurants  (Yakindaki Restoranlar)        -> Kategori + Urun + Harcama + Lokasyon + Odeme
 *   - markets      (Yakindaki Marketler)          -> Lokasyon + Odeme
 *
 * NOT: Faz 7.x'te filtreler GERCEKTEN listelere uygulanacak.
 * Su an sadece UI - "Sonuclari gor" basinca modal kapanir, secimler
 * parent'a callback ile iletilir ama parent simdilik kullanmaz.
 *
 * NAVIGATION:
 *   navigation.navigate('PlacesFilter', { context: 'restaurants', currentFilters: {...} })
 */
import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Text,
  Icon,
  Button,
  semantic,
  spacing,
  radius,
} from '@pluxee/design-system';

import type { RootStackParamList } from '../navigation/types';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';
import { RESTAURANT_CATEGORIES, PAYMENT_METHOD_LABELS, type PaymentMethod } from '../data/places';
import { TURKEY_CITIES, getDistricts, getNeighborhoods } from '../data/locations';

type Props = NativeStackScreenProps<RootStackParamList, 'PlacesFilter'>;

type FilterContext = 'main' | 'gift' | 'online' | 'restaurants' | 'markets';

type TabKey = 'category' | 'product' | 'spendPoint' | 'location' | 'payment';

interface FilterConfig {
  visibleTabs: TabKey[];
}

const CONFIGS: Record<FilterContext, FilterConfig> = {
  main: { visibleTabs: ['location', 'payment'] },
  gift: { visibleTabs: ['payment'] },
  online: { visibleTabs: [] },
  restaurants: { visibleTabs: ['category', 'product', 'spendPoint', 'location', 'payment'] },
  markets: { visibleTabs: ['location', 'payment'] },
};

const TAB_LABELS: Record<TabKey, string> = {
  category: 'Kategori',
  product: 'Urun Secimi',
  spendPoint: 'Harcama Noktasi',
  location: 'Lokasyon',
  payment: 'Odeme Yontemi',
};

// Mock urun secenekleri (Restaurants context icin)
const MOCK_PRODUCTS = ['Yemek', 'Icecek', 'Tatli', 'Atistirmalik', 'Kahvalti'];

// Mock harcama noktalari
const MOCK_SPEND_POINTS = ['Magaza', 'Online', 'Mobil', 'Self-checkout'];

export interface FilterState {
  categories: string[];
  products: string[];
  spendPoints: string[];
  cityId: string | null;
  district: string | null;
  neighborhood: string | null;
  paymentMethods: PaymentMethod[];
}

const EMPTY_FILTERS: FilterState = {
  categories: [],
  products: [],
  spendPoints: [],
  cityId: null,
  district: null,
  neighborhood: null,
  paymentMethods: [],
};

export function PlacesFilterScreen({ route, navigation }: Props) {
  const { context, currentFilters } = route.params;
  const config = CONFIGS[context];

  const [filters, setFilters] = useState<FilterState>(currentFilters ?? EMPTY_FILTERS);
  const [activeTab, setActiveTab] = useState<TabKey>(config.visibleTabs[0] ?? 'location');

  // Aktif sehrin ilceleri
  const districts = useMemo(() => {
    if (!filters.cityId) return [];
    return getDistricts(filters.cityId);
  }, [filters.cityId]);

  // Aktif ilcenin mahalleleri
  const neighborhoods = useMemo(() => {
    if (!filters.cityId || !filters.district) return [];
    return getNeighborhoods(filters.cityId, filters.district);
  }, [filters.cityId, filters.district]);

  // Aktif sekme icin secim sayisi (sidebar'da gosterilir)
  const getCount = (tab: TabKey): number => {
    switch (tab) {
      case 'category': return filters.categories.length;
      case 'product': return filters.products.length;
      case 'spendPoint': return filters.spendPoints.length;
      case 'location': return (filters.cityId ? 1 : 0) + (filters.district ? 1 : 0) + (filters.neighborhood ? 1 : 0);
      case 'payment': return filters.paymentMethods.length;
      default: return 0;
    }
  };

  const toggleArray = <T,>(arr: T[], value: T): T[] => {
    return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
  };

  const handleClearAll = () => {
    setFilters(EMPTY_FILTERS);
  };

  const handleApply = () => {
    // TODO Faz 7.x: Parent'a filtreleri callback ile gonder
    // Su an sadece modal kapanir
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title="Filtrele" onBack={() => navigation.goBack()} />

      {config.visibleTabs.length === 0 ? (
        <View style={styles.noFilterWrap}>
          <Text variant="body.medium" color="secondary" align="center">
            Bu ekran icin filtre bulunmuyor.
          </Text>
        </View>
      ) : (
        <View style={styles.body}>
          {/* SOL SIDEBAR */}
          <View style={styles.sidebar}>
            {config.visibleTabs.map((tab) => {
              const count = getCount(tab);
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.sidebarItem, isActive && styles.sidebarItemActive]}
                  onPress={() => setActiveTab(tab)}
                  activeOpacity={0.7}
                >
                  {isActive && <View style={styles.sidebarActiveIndicator} />}
                  <Text
                    variant={isActive ? 'body.smallBold' : 'body.smallMedium'}
                    color="primary"
                    style={styles.sidebarLabel}
                  >
                    {TAB_LABELS[tab]}
                    {count > 0 && ` (${count})`}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* SAG ICERIK */}
          <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
            {activeTab === 'category' && (
              <CheckboxList
                items={[...RESTAURANT_CATEGORIES]}
                selected={filters.categories}
                onToggle={(v) => setFilters({ ...filters, categories: toggleArray(filters.categories, v) })}
              />
            )}

            {activeTab === 'product' && (
              <CheckboxList
                items={MOCK_PRODUCTS}
                selected={filters.products}
                onToggle={(v) => setFilters({ ...filters, products: toggleArray(filters.products, v) })}
              />
            )}

            {activeTab === 'spendPoint' && (
              <CheckboxList
                items={MOCK_SPEND_POINTS}
                selected={filters.spendPoints}
                onToggle={(v) => setFilters({ ...filters, spendPoints: toggleArray(filters.spendPoints, v) })}
              />
            )}

            {activeTab === 'location' && (
              <View style={styles.locationSection}>
                {/* SEHIR */}
                <Text variant="body.smallBold" color="primary" style={styles.sectionLabel}>
                  Sehir
                </Text>
                <View style={styles.radioGroup}>
                  {TURKEY_CITIES.map((city) => (
                    <TouchableOpacity
                      key={city.id}
                      style={styles.radioRow}
                      onPress={() => setFilters({
                        ...filters,
                        cityId: city.id,
                        district: null,
                        neighborhood: null,
                      })}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.radio, filters.cityId === city.id && styles.radioActive]}>
                        {filters.cityId === city.id && <View style={styles.radioDot} />}
                      </View>
                      <Text variant="body.medium" color="primary">{city.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* ILCE */}
                {districts.length > 0 && (
                  <>
                    <Text variant="body.smallBold" color="primary" style={styles.sectionLabel}>
                      Ilce
                    </Text>
                    <View style={styles.radioGroup}>
                      {districts.map((d) => (
                        <TouchableOpacity
                          key={d.name}
                          style={styles.radioRow}
                          onPress={() => setFilters({
                            ...filters,
                            district: d.name,
                            neighborhood: null,
                          })}
                          activeOpacity={0.7}
                        >
                          <View style={[styles.radio, filters.district === d.name && styles.radioActive]}>
                            {filters.district === d.name && <View style={styles.radioDot} />}
                          </View>
                          <Text variant="body.medium" color="primary">{d.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </>
                )}

                {/* MAHALLE */}
                {neighborhoods.length > 0 && (
                  <>
                    <Text variant="body.smallBold" color="primary" style={styles.sectionLabel}>
                      Mahalle
                    </Text>
                    <View style={styles.radioGroup}>
                      {neighborhoods.map((n) => (
                        <TouchableOpacity
                          key={n}
                          style={styles.radioRow}
                          onPress={() => setFilters({ ...filters, neighborhood: n })}
                          activeOpacity={0.7}
                        >
                          <View style={[styles.radio, filters.neighborhood === n && styles.radioActive]}>
                            {filters.neighborhood === n && <View style={styles.radioDot} />}
                          </View>
                          <Text variant="body.medium" color="primary">{n}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </>
                )}
              </View>
            )}

            {activeTab === 'payment' && (
              <CheckboxList
                items={(['mobile', 'card', 'online'] as PaymentMethod[])}
                selected={filters.paymentMethods}
                onToggle={(v) => setFilters({ ...filters, paymentMethods: toggleArray(filters.paymentMethods, v) })}
                renderLabel={(v) => PAYMENT_METHOD_LABELS[v]}
              />
            )}
          </ScrollView>
        </View>
      )}

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleClearAll} activeOpacity={0.7}>
          <Text variant="body.smallBold" color="link" style={styles.clearLink}>
            Filtreleri temizle
          </Text>
        </TouchableOpacity>
        <View style={styles.applyBtnWrap}>
          <Button variant="primaryFilled" size="md" onPress={handleApply}>
            Sonuclari gor
          </Button>
        </View>
      </View>
    </View>
  );
}

// ============================================================
// SUB-COMPONENT: CheckboxList
// ============================================================

interface CheckboxListProps<T> {
  items: T[];
  selected: T[];
  onToggle: (item: T) => void;
  renderLabel?: (item: T) => string;
}

function CheckboxList<T extends string>({ items, selected, onToggle, renderLabel }: CheckboxListProps<T>) {
  return (
    <View style={styles.checkboxList}>
      {items.map((item) => {
        const isSelected = selected.includes(item);
        return (
          <TouchableOpacity
            key={item}
            style={styles.checkboxRow}
            onPress={() => onToggle(item)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
              {isSelected && <Icon name="checkmark" size={16} color="inverse" />}
            </View>
            <Text variant="body.medium" color="primary">
              {renderLabel ? renderLabel(item) : item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: semantic.background.primary,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 130,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: semantic.border.tertiary,
  },
  sidebarItem: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  sidebarItemActive: {
    backgroundColor: semantic.background.primary,
  },
  sidebarActiveIndicator: {
    position: 'absolute',
    left: 0,
    top: spacing[2],
    bottom: spacing[2],
    width: 3,
    backgroundColor: semantic.brand.tertiary, // mavi
    borderRadius: 2,
  },
  sidebarLabel: {
    flex: 1,
    flexShrink: 1,
  },
  content: {
    flex: 1,
  },
  contentInner: {
    padding: spacing[4],
    paddingBottom: spacing[8],
  },
  noFilterWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[6],
  },

  // Checkbox
  checkboxList: {
    gap: spacing[3],
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingVertical: spacing[2],
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: semantic.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: semantic.brand.primary,
  },

  // Radio (Lokasyon)
  locationSection: {
    gap: spacing[2],
  },
  sectionLabel: {
    paddingTop: spacing[3],
    paddingBottom: spacing[1],
  },
  radioGroup: {
    gap: spacing[1],
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingVertical: spacing[2],
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: semantic.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: semantic.cta.secondary,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: semantic.cta.secondary,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderTopWidth: 1,
    borderTopColor: semantic.border.tertiary,
    backgroundColor: '#ffffff',
  },
  clearLink: {
    textDecorationLine: 'underline',
  },
  applyBtnWrap: {
    flex: 1,
  },
});
