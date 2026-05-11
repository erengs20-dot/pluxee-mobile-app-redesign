/**
 * NearbyPlacesListScreen
 *
 * Yakindaki restoranlar (Mockup 8 - Plus Noktalari) ve
 * Yakindaki marketler (Mockup 9-10) icin ortak liste ekrani.
 * Route param ile placeType secilir.
 *
 * Restoran -> "Plus Noktalari" basligi (varsayilan)
 * Market -> "Yakindaki Marketler" basligi
 *
 * Her kart:
 *   - Mekan adi + puan (yildiz)
 *   - Mesafe + sehir/ilce
 *   - %X Plus Puan badge (varsa)
 *   - Odeme yontemi chip'leri
 *
 * Ust banner: bakiye aktarma yonlendirme metni
 *
 * NAVIGATION:
 *   navigation.navigate('NearbyPlacesList', { placeType: 'restaurant', title: 'Plus Noktalari' })
 */
import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
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
  getPlacesByType,
  PAYMENT_METHOD_LABELS,
  type Place,
  type PaymentMethod,
} from '../data/places';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'NearbyPlacesList'>;

export function NearbyPlacesListScreen({ route, navigation }: Props) {
  const { placeType, title } = route.params;

  const [searchQuery, setSearchQuery] = useState('');

  const allPlaces = useMemo(() => getPlacesByType(placeType), [placeType]);

  const displayedPlaces = useMemo(() => {
    if (!searchQuery.trim()) return allPlaces;
    const q = searchQuery.toLowerCase().trim();
    return allPlaces.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [allPlaces, searchQuery]);

  // Bilgi banner metni placeType'a gore
  const bannerText =
    placeType === 'restaurant'
      ? "Hediye bakiyenizden Pluxee Yemek kartina bakiye aktararak Pluxee'li restoranlarda kullanabilirsiniz."
      : 'Hediye bakiyeni, Yemek veya Gida kartlarina bakiye aktararak asagidaki noktalarda harcayabilirsin.';

  const handlePlacePress = (place: Place) => {
    // TODO: Faz 7.x - PlaceDetail ekrani
    console.log('Place press:', place.name);
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
        <View style={styles.toolbarRow}>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => navigation.navigate('PlacesFilter', {
              context: placeType === 'restaurant' ? 'restaurants' : 'markets',
            })}
            activeOpacity={0.7}
          >
            <Icon name="filter" size={16} color="primary" />
            <Text variant="body.smallBold" color="primary">
              Filtrele
            </Text>
          </TouchableOpacity>
          <Text variant="body.smallMedium" color="secondary">
            {displayedPlaces.length} sonuc
          </Text>
        </View>
      </View>

      <FlatList
        data={displayedPlaces}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.banner}>
            <View style={styles.bannerIconWrap}>
              <Icon name="arrowExportRight" size={24} color="primary" />
            </View>
            <Text variant="body.smallMedium" color="primary" style={styles.bannerText}>
              {bannerText}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <PlaceListCard place={item} onPress={() => handlePlacePress(item)} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text variant="body.medium" color="secondary" align="center">
              Sonuc bulunamadi
            </Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

// ============================================================
// SUB-COMPONENT: PlaceListCard
// ============================================================

interface PlaceListCardProps {
  place: Place;
  onPress: () => void;
}

function PlaceListCard({ place, onPress }: PlaceListCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {/* HEADER: ad + puan */}
      <View style={styles.cardHeader}>
        <Text
          variant="title.mobileCard"
          color="primary"
          numberOfLines={1}
          style={styles.cardName}
        >
          {place.name}
        </Text>
        <View style={styles.ratingWrap}>
          <Icon name="starFilled" size={16} color="warning" />
          <Text variant="body.smallBold" color="primary">
            {place.rating.toFixed(1)}
          </Text>
        </View>
      </View>

      {/* META: mesafe + sehir + plus puan */}
      <View style={styles.metaRow}>
        <View style={styles.metaLeft}>
          <Icon name="location" size={16} color="info" />
          <Text variant="body.mediumBold" color="link">
            {place.distanceKm.toFixed(2)} km
          </Text>
          <Text variant="body.smallMedium" color="tertiary" style={styles.cityText}>
            {place.city} {place.district}
          </Text>
        </View>
        {place.plusPointsPercent > 0 && (
          <View style={styles.plusPointsWrap}>
            <Icon name="cardCredit" size={16} color="info" />
            <Text variant="body.mediumBold" color="link">
              %{place.plusPointsPercent} Plus Puan
            </Text>
          </View>
        )}
      </View>

      {/* CHIPS: odeme yontemleri */}
      <View style={styles.chipsRow}>
        {place.paymentMethods.map((method) => (
          <PaymentMethodChip key={method} method={method} />
        ))}
      </View>
    </TouchableOpacity>
  );
}

interface PaymentMethodChipProps {
  method: PaymentMethod;
}

function PaymentMethodChip({ method }: PaymentMethodChipProps) {
  // Online -> yesil chip (success), digerleri default
  const isOnline = method === 'online';
  const iconName =
    method === 'mobile' ? 'qrcode' : method === 'card' ? 'cardCredit' : 'shoppingBag';

  return (
    <View style={[styles.chip, isOnline && styles.chipOnline]}>
      <Icon name={iconName} size={16} color="primary" />
      <Text variant="body.smallMedium" color="primary">
        {PAYMENT_METHOD_LABELS[method]}
      </Text>
    </View>
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
  listContent: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    backgroundColor: '#ffffff',
    borderRadius: radius.md,
    padding: spacing[3],
    marginBottom: spacing[4],
    ...shadows.small,
  },
  bannerIconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: semantic.brand.secondary, // yesil
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    flex: 1,
    flexShrink: 1,
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: radius.md,
    padding: spacing[4],
    gap: spacing[3],
    ...shadows.small,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing[2],
  },
  cardName: { flex: 1 },
  ratingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing[2],
    flexWrap: 'wrap',
  },
  metaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    flexShrink: 1,
  },
  cityText: { paddingLeft: spacing[1] },
  plusPointsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: radius.md,
    backgroundColor: semantic.tag.defaultEnable,
  },
  chipOnline: {
    backgroundColor: semantic.background.success, // acik yesil
  },
  separator: {
    height: spacing[3],
  },
  emptyWrap: {
    padding: spacing[8],
  },
});
