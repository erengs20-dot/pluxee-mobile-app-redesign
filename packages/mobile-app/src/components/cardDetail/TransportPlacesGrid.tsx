/**
 * TransportPlacesGrid
 *
 * Ulasim karti detayinda "Gecerli noktalar" bolumu - 6 ikon grid.
 * Her ikona basinca ayni TransportPlaceDetailScreen acilir (icerik dinamik).
 *
 * NOT: Tum ikonlar ayni hedef ekrana gider - kullanici hangi noktanin
 * hangi markalari kapsadigini anlar (orn. Toplu Tasima -> IETT, IDO, TCDD).
 */
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Icon, semantic, spacing, radius } from '@pluxee/design-system';

export interface TransportPlace {
  id: string;
  label: string;
  iconName: string;
  description: string;
}

export const TRANSPORT_PLACES: TransportPlace[] = [
  {
    id: 'public_transport',
    label: 'Toplu Tasima',
    iconName: 'meal', // car/bus benzeri ikon yoksa fallback
    description: 'Otobus, hizli tren, metro ve daha fazlasi...',
  },
  {
    id: 'taxi',
    label: 'Taksi &\nOzel Ulasim',
    iconName: 'car',
    description: 'Taksi ve ozel ulasim hizmetleri',
  },
  {
    id: 'car_rental',
    label: 'Arac\nKiralama',
    iconName: 'car',
    description: 'Arac kiralama hizmetleri',
  },
  {
    id: 'ev_charging',
    label: 'Elektrikli\nArac Sarj',
    iconName: 'energy',
    description: 'Elektrikli arac sarj istasyonlari',
  },
  {
    id: 'highway',
    label: 'Otoyol &\nGecis',
    iconName: 'arrowExportRight',
    description: 'Otoyol ve gecis ucret odemeleri',
  },
  {
    id: 'other',
    label: 'Diger\nHizmetler',
    iconName: 'support',
    description: 'Diger ulasim hizmetleri',
  },
];

interface TransportPlacesGridProps {
  onPlacePress: (placeId: string) => void;
}

export function TransportPlacesGrid({ onPlacePress }: TransportPlacesGridProps) {
  return (
    <View style={styles.grid}>
      {TRANSPORT_PLACES.map((place) => (
        <TouchableOpacity
          key={place.id}
          style={styles.cell}
          onPress={() => onPlacePress(place.id)}
          activeOpacity={0.7}
        >
          <View style={styles.iconWrap}>
            <Icon name={place.iconName} size={24} color="primary" />
          </View>
          <Text
            variant="body.smallBold"
            color="primary"
            style={styles.label}
            numberOfLines={2}
          >
            {place.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

/**
 * Helper: id ile place bilgisi getir (TransportPlaceDetailScreen'de kullanilir).
 */
export function getTransportPlaceById(placeId: string): TransportPlace | undefined {
  return TRANSPORT_PLACES.find((p) => p.id === placeId);
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  cell: {
    width: '31.5%', // 3 sutun (gap dahil)
    backgroundColor: semantic.background.brand4, // sanal kart pembe ile uyumlu
    borderRadius: radius.lg,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[2],
    alignItems: 'center',
    gap: spacing[2],
    minHeight: 90,
    justifyContent: 'center',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
    ...require('@pluxee/design-system').typography.body.smallMedium,
    lineHeight: 14,
  },
});
