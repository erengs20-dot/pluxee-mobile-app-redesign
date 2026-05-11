/**
 * BrandGrid
 *
 * 3 sutunlu marka grid'i. Hediye kart detayinda "Tum markalar" bolumunde.
 * Her hucre: sarı border + logo (Image) veya text fallback + badge.
 *
 * DAVRANIS:
 *   - initialCount: ilk gosterilen marka sayisi (default 12)
 *   - expanded: tum markalar gosterilir
 *   - "Devamini gor (+N)" / "Gizle" toggle link
 *   - Marka tiklaninca onBrandPress callback cagirilir
 */
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, semantic, spacing, radius } from '@pluxee/design-system';
import type { Brand } from '../../data/brands';

interface BrandGridProps {
  brands: Brand[];
  initialCount?: number;
  onBrandPress: (brand: Brand) => void;
}

function BrandTile({ brand, onPress }: { brand: Brand; onPress: () => void }) {
  return (
    <TouchableOpacity
      style={styles.tile}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {brand.logo ? (
        <Image
          source={brand.logo}
          style={styles.logo}
          resizeMode="contain"
        />
      ) : brand.logoUrl ? (
        <Image
          source={{ uri: brand.logoUrl }}
          style={styles.logo}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.textFallback}>
          <Text variant="body.mediumBold" color="primary" align="center" numberOfLines={2}>
            {brand.name}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export function BrandGrid({
  brands,
  initialCount = 12,
  onBrandPress,
}: BrandGridProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleBrands = expanded ? brands : brands.slice(0, initialCount);
  const hiddenCount = brands.length - initialCount;
  const showToggle = brands.length > initialCount;

  return (
    <View style={styles.container}>
      <Text variant="title.mobileCard" color="primary" style={styles.heading}>
        Tum markalar
      </Text>

      <View style={styles.grid}>
        {visibleBrands.map((brand) => (
          <BrandTile
            key={brand.id}
            brand={brand}
            onPress={() => onBrandPress(brand)}
          />
        ))}
      </View>

      {showToggle && (
        <TouchableOpacity
          style={styles.toggleLink}
          onPress={() => setExpanded((v) => !v)}
          activeOpacity={0.6}
        >
          <Text variant="body.mediumBold" color="link" align="center">
            {expanded ? 'Gizle' : `Devamini gor (+${hiddenCount})`}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
  },
  heading: {
    marginBottom: spacing[3],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  tile: {
    width: '31%',
    aspectRatio: 1,
    borderWidth: 1.5,
    borderColor: semantic.background.brand3,
    borderRadius: radius.lg,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[2],
  },
  logo: {
    width: '80%',
    height: '60%',
  },
  textFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[1],
  },
  toggleLink: {
    paddingVertical: spacing[3],
  },
});
