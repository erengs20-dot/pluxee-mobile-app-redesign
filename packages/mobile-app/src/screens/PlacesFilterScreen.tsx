/**
 * PlacesFilterScreen
 *
 * Pluxee'li Noktalar filtre ekrani. 5 sol tab + sag panel.
 * Sol tab'lar: Kategori / Urun Secimi / Harcama Noktasi / Lokasyon / Odeme Yontemi
 * State PlacesScreen'e aktarilir (callback ile route param).
 */
import React, { useState, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Text, Icon, IconButton, Button, semantic, spacing, radius,
} from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { LOCATION_CITIES } from '../data/locations';

type Nav = NativeStackNavigationProp<RootStackParamList>;

// === Filtre state tipi (export edilecek, PlacesScreen kullanacak) ===
export interface PlacesFilters {
  kategoriler: string[];           // ['Giyim', 'Market & Gıda', ...]
  restoranMarketAlt: string[];     // ['Cafe/Kahve', 'Fast Food', ...]
  urunler: string[];               // ['Yemek', 'Hediye', 'Gıda', 'Ulaşım', 'Business']
  harcamaNoktasi: string[];        // ['Online', 'Fiziksel']
  plusPuan: boolean;
  lokasyonIl: string | null;
  lokasyonIlce: string | null;
  lokasyonMahalle: string | null;
  odemeYontemi: string[];          // ['Mobil Kod ile Öde', 'Fiziksel Kart ile Öde']
}

export const EMPTY_FILTERS: PlacesFilters = {
  kategoriler: [],
  restoranMarketAlt: [],
  urunler: [],
  harcamaNoktasi: [],
  plusPuan: false,
  lokasyonIl: null,
  lokasyonIlce: null,
  lokasyonMahalle: null,
  odemeYontemi: [],
};

// === Tab data ===
type TabKey = 'kategori' | 'urun' | 'harcama' | 'lokasyon' | 'odeme';


// Her context icin gosterilecek tab'lar
const TABS_BY_CONTEXT: Record<string, TabKey[]> = {
  general:  ['kategori', 'urun', 'harcama', 'lokasyon', 'odeme'],
  main:     ['kategori', 'urun', 'harcama', 'lokasyon', 'odeme'],
  hediye:   ['kategori', 'harcama'],
  online:   ['kategori', 'urun'],
  restoran: ['kategori', 'lokasyon', 'odeme'],
  market:   ['kategori', 'lokasyon', 'odeme'],
};

const TABS: { key: TabKey; label: string }[] = [
  { key: 'kategori',  label: 'Kategori' },
  { key: 'urun',      label: 'Ürün Seçimi' },
  { key: 'harcama',   label: 'Harcama Noktası' },
  { key: 'lokasyon',  label: 'Lokasyon' },
  { key: 'odeme',     label: 'Ödeme Yöntemi' },
];

const KATEGORI_OPTIONS = [
  'Akaryakıt & Araç Bakım',
  'E-Ticaret',
  'Ev & Yaşam',
  'Giyim',
  'Kişisel Bakım',
  'Market & Gıda',
  'Sağlıklı Yaşam & Seyahat',
  'Restoran & Market',
  'Teknoloji',
];

const RESTORAN_MARKET_SUB = [
  'Büfe', 'Cafe/Kahve', 'Catering', 'Deniz Ürünleri',
  'Döner/Kebap/Pide/Köfte', 'Dünya Mutfağı', 'Ev Yemekleri',
  'Fast Food', 'Kuruyemiş', 'Pastane/Tatlıcı', 'Pizza',
  'Salon Yemek', 'Sokak Lezzetleri', 'Spor & Diyet',
  'Tavuk', 'Vejetaryen', 'Market',
];

const URUN_OPTIONS = ['Yemek', 'Hediye', 'Gıda', 'Ulaşım', 'Business'];

// Context'e gore Urun Secimi seceneklerinin sinirlanmasi
const URUN_OPTIONS_BY_CONTEXT: Record<string, string[]> = {
  online: ['Yemek', 'Hediye', 'Gıda'],
};
const HARCAMA_OPTIONS = ['Online', 'Fiziksel'];
const ODEME_OPTIONS = ['Mobil Kod ile Öde', 'Fiziksel Kart ile Öde'];

// === Checkbox bileseni ===
function Checkbox({ checked, label, onPress }: { checked: boolean; label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.checkboxRow}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Icon name="xmark" size={16} color="inverse" />}
      </View>
      <Text variant="body.mediumNormal" color="primary" style={{ flex: 1 }}>{label}</Text>
    </Pressable>
  );
}

// === Radio (single-select) ===
function RadioRow({ checked, label, onPress }: { checked: boolean; label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.checkboxRow}>
      <View style={[styles.radio, checked && styles.radioChecked]}>
        {checked && <View style={styles.radioDot} />}
      </View>
      <Text variant="body.mediumNormal" color="primary" style={{ flex: 1 }}>{label}</Text>
    </Pressable>
  );
}

// === Toggle (Plus Puan icin) ===
function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <Pressable onPress={onChange} style={[styles.toggleTrack, value && styles.toggleTrackOn]}>
      <View style={[styles.toggleThumb, value && styles.toggleThumbOn]}>
        <Icon name={value ? 'checkmark' : 'xmark'} size={16} color="primary" />
      </View>
    </Pressable>
  );
}

export function PlacesFilterScreen() {
  const nav = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();

  // Mevcut filtreyi route param'dan al
  const initialFilters: PlacesFilters = route.params?.currentFilters ?? EMPTY_FILTERS;
  const onApply = route.params?.onApply as ((f: PlacesFilters) => void) | undefined;

  const context = (route.params?.context ?? 'general') as string;
  const visibleTabKeys = TABS_BY_CONTEXT[context] ?? TABS_BY_CONTEXT.general;
  const visibleTabs = TABS.filter(t => visibleTabKeys.includes(t.key));

  const [activeTab, setActiveTab] = useState<TabKey>(visibleTabKeys[0] ?? 'kategori');
  const [filters, setFilters] = useState<PlacesFilters>(initialFilters)
  const [expandedSection, setExpandedSection] = useState<'sehir' | 'ilce' | 'mahalle' | null>('sehir');

  // Sayaclar (her tabin yaninda gosterilecek)
  const counts = useMemo(() => ({
    kategori: filters.kategoriler.length + filters.restoranMarketAlt.length,
    urun: filters.urunler.length,
    harcama: filters.harcamaNoktasi.length + (filters.plusPuan ? 1 : 0),
    lokasyon: (filters.lokasyonIl ? 1 : 0) + (filters.lokasyonIlce ? 1 : 0) + (filters.lokasyonMahalle ? 1 : 0),
    odeme: filters.odemeYontemi.length,
  }), [filters]);

  // Helpers
  const toggleMulti = (key: keyof PlacesFilters, value: string) => {
    setFilters(prev => {
      const arr = (prev[key] as string[]) ?? [];
      const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
      return { ...prev, [key]: next };
    });
  };

  const isChecked = (key: keyof PlacesFilters, value: string) => {
    const arr = (filters[key] as string[]) ?? [];
    return arr.includes(value);
  };

  const selectedCity = LOCATION_CITIES.find(c => c.name === filters.lokasyonIl);
  const selectedDistrict = selectedCity?.districts.find(d => d.name === filters.lokasyonIlce);

  const handleClearAll = () => setFilters(EMPTY_FILTERS);

  const handleApply = () => {
    if (onApply) onApply(filters);
    nav.goBack();
  };

  return (
    <View style={styles.root}>
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => nav.goBack()} accessibilityLabel="Geri" style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#FFFFFF', fontSize: 28, lineHeight: 28, fontWeight: '300' }}>‹</Text>
        </TouchableOpacity>
        <Text variant="title.mobileCard" color="inverse" align="center" style={styles.title}>Filtrele</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* CONTENT */}
      <View style={styles.body}>
        {/* SOL TAB STRIP */}
        <View style={styles.tabStrip}>
          {visibleTabs.map(tab => {
            const active = activeTab === tab.key;
            const count = counts[tab.key];
            return (
              <Pressable
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={[styles.tabItem, active && styles.tabItemActive]}
              >
                {active && <View style={styles.tabItemBar} />}
                <Text variant="body.mediumBold" color="primary" style={styles.tabLabel}>
                  {tab.label}{count > 0 ? ` (${count})` : ''}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* SAG PANEL */}
        <ScrollView style={styles.panel} contentContainerStyle={styles.panelContent} showsVerticalScrollIndicator={false}>
          {activeTab === 'kategori' && (
            <View>
              {KATEGORI_OPTIONS.map(cat => (
                <View key={cat}>
                  <Checkbox
                    checked={isChecked('kategoriler', cat)}
                    label={cat}
                    onPress={() => toggleMulti('kategoriler', cat)}
                  />
                  {cat === 'Restoran & Market' && isChecked('kategoriler', cat) && (
                    <View style={styles.subList}>
                      {RESTORAN_MARKET_SUB.map(sub => (
                        <Checkbox
                          key={sub}
                          checked={isChecked('restoranMarketAlt', sub)}
                          label={sub}
                          onPress={() => toggleMulti('restoranMarketAlt', sub)}
                        />
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {activeTab === 'urun' && (
            <View>
              {(URUN_OPTIONS_BY_CONTEXT[context] ?? URUN_OPTIONS).map(u => (
                <Checkbox
                  key={u}
                  checked={isChecked('urunler', u)}
                  label={u}
                  onPress={() => toggleMulti('urunler', u)}
                />
              ))}
            </View>
          )}

          {activeTab === 'harcama' && (
            <View>
              {HARCAMA_OPTIONS.map(h => (
                <Checkbox
                  key={h}
                  checked={isChecked('harcamaNoktasi', h)}
                  label={h}
                  onPress={() => toggleMulti('harcamaNoktasi', h)}
                />
              ))}
              <View style={{ height: 24 }} />
              <View style={styles.plusPuanRow}>
                <View style={{ flex: 1, paddingRight: spacing[3] }}>
                  <Text variant="body.mediumBold" color="primary">Plus Puan Noktaları</Text>
                  <Text variant="body.smallNormal" color="info" style={{ marginTop: 4 }}>
                    Plus Puan kazanabileceğin ve harcayabileceğin noktalar
                  </Text>
                </View>
                <Toggle value={filters.plusPuan} onChange={() => setFilters(p => ({ ...p, plusPuan: !p.plusPuan }))} />
              </View>
            </View>
          )}

          {activeTab === 'lokasyon' && (
            <View>
              {/* SEHIR ACCORDION */}
              <Pressable
                onPress={() => setExpandedSection(expandedSection === 'sehir' ? null : 'sehir')}
                style={styles.accordionHeader}
              >
                <Text variant="body.mediumBold" color="primary" style={{ flex: 1 }}>Şehir</Text>
                <Icon name={expandedSection === 'sehir' ? 'chevronUp' : 'chevronDown'} size={24} color="info" />
              </Pressable>
              {expandedSection === 'sehir' && (
                <View style={styles.accordionBody}>
                  <ScrollView style={styles.locationScroll} nestedScrollEnabled showsVerticalScrollIndicator={false}>
                    {LOCATION_CITIES.map(city => (
                      <RadioRow
                        key={city.name}
                        checked={filters.lokasyonIl === city.name}
                        label={city.name}
                        onPress={() => {
                          setFilters(p => ({
                            ...p,
                            lokasyonIl: p.lokasyonIl === city.name ? null : city.name,
                            lokasyonIlce: null,
                            lokasyonMahalle: null,
                          }));
                          // Sehir secilince ilce accordion'unu otomatik ac
                          if (filters.lokasyonIl !== city.name) {
                            setExpandedSection('ilce');
                          }
                        }}
                      />
                    ))}
                  </ScrollView>
                </View>
              )}

              {/* ILCE ACCORDION */}
              <Pressable
                onPress={() => {
                  if (!selectedCity) return;
                  setExpandedSection(expandedSection === 'ilce' ? null : 'ilce');
                }}
                style={[styles.accordionHeader, !selectedCity && styles.accordionDisabled]}
              >
                <Text variant="body.mediumBold" color={selectedCity ? 'primary' : 'info'} style={{ flex: 1 }}>İlçe</Text>
                <Icon name={expandedSection === 'ilce' ? 'chevronUp' : 'chevronDown'} size={24} color="info" />
              </Pressable>
              {expandedSection === 'ilce' && selectedCity && (
                <View style={styles.accordionBody}>
                  <ScrollView style={styles.locationScroll} nestedScrollEnabled showsVerticalScrollIndicator={false}>
                    {selectedCity.districts.map(d => (
                      <RadioRow
                        key={d.name}
                        checked={filters.lokasyonIlce === d.name}
                        label={d.name}
                        onPress={() => {
                          setFilters(p => ({
                            ...p,
                            lokasyonIlce: p.lokasyonIlce === d.name ? null : d.name,
                            lokasyonMahalle: null,
                          }));
                          if (filters.lokasyonIlce !== d.name) {
                            setExpandedSection('mahalle');
                          }
                        }}
                      />
                    ))}
                  </ScrollView>
                </View>
              )}

              {/* MAHALLE ACCORDION */}
              <Pressable
                onPress={() => {
                  if (!selectedDistrict) return;
                  setExpandedSection(expandedSection === 'mahalle' ? null : 'mahalle');
                }}
                style={[styles.accordionHeader, !selectedDistrict && styles.accordionDisabled]}
              >
                <Text variant="body.mediumBold" color={selectedDistrict ? 'primary' : 'info'} style={{ flex: 1 }}>Mahalle</Text>
                <Icon name={expandedSection === 'mahalle' ? 'chevronUp' : 'chevronDown'} size={24} color="info" />
              </Pressable>
              {expandedSection === 'mahalle' && selectedDistrict && (
                <View style={styles.accordionBody}>
                  <ScrollView style={styles.locationScroll} nestedScrollEnabled showsVerticalScrollIndicator={false}>
                    {selectedDistrict.neighborhoods.map(n => (
                      <RadioRow
                        key={n}
                        checked={filters.lokasyonMahalle === n}
                        label={n}
                        onPress={() => setFilters(p => ({
                          ...p,
                          lokasyonMahalle: p.lokasyonMahalle === n ? null : n,
                        }))}
                      />
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          )}

          {activeTab === 'odeme' && (
            <View>
              {ODEME_OPTIONS.map(o => (
                <Checkbox
                  key={o}
                  checked={isChecked('odemeYontemi', o)}
                  label={o}
                  onPress={() => toggleMulti('odemeYontemi', o)}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleClearAll} activeOpacity={0.7} style={styles.clearLink}>
          <Text variant="body.mediumBold" color="link" style={{ textDecorationLine: 'underline' }}>
            Filtreleri temizle
          </Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Button variant="primaryFilled" size="lg" onPress={handleApply}>Sonuçları gör</Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1D45',
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[3],
    },
  title: { flex: 1 },

  body: { flex: 1, flexDirection: 'row' },

  tabStrip: {
    width: 130,
    backgroundColor: '#F5F4F8',
  },
  tabItem: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 64,
  },
  tabItemActive: { backgroundColor: '#FFFFFF' },
  tabItemBar: {
    position: 'absolute',
    left: 0, top: 0, bottom: 0,
    width: 3,
    backgroundColor: semantic.brand.primary,
  },
  tabLabel: { fontSize: 14 },

  panel: { flex: 1, backgroundColor: '#FFFFFF' },
  panelContent: { padding: spacing[4], paddingBottom: 100 },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    gap: spacing[3],
  },
  checkbox: {
    width: 24, height: 24,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: '#1B1D45',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#1B1D45',
  },

  radio: {
    width: 24, height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#1B1D45',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioChecked: { borderColor: semantic.brand.primary },
  radioDot: {
    width: 12, height: 12, borderRadius: 6,
    backgroundColor: semantic.brand.primary,
  },

  subList: {
    paddingLeft: spacing[6],
  },
  subHeading: {
    marginTop: spacing[3],
    marginBottom: spacing[1],
    textTransform: 'uppercase',
  },

  plusPuanRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleTrack: {
    width: 48, height: 28,
    borderRadius: 14,
    backgroundColor: '#9B9DAA',
    padding: 2,
    justifyContent: 'center',
  },
  toggleTrackOn: { backgroundColor: semantic.brand.primary },
  toggleThumb: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
  },
  toggleThumbOn: { alignSelf: 'flex-end' },

  footer: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    padding: spacing[4],
    paddingBottom: spacing[6],
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  clearLink: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[2],
  },

  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[3],
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  accordionDisabled: { opacity: 0.5 },
  accordionBody: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing[3],
  },
  locationScroll: {
    maxHeight: 320,
  },
});
