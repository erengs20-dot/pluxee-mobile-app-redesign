import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text, Icon, semantic, radius, spacing } from '@pluxee/design-system';
import type { RestoranMarket } from '../../data/placesPoints';

interface RestoranMarketListCardProps {
  place: RestoranMarket;
  onPress?: () => void;
}

export const RestoranMarketListCard: React.FC<RestoranMarketListCardProps> = ({ place, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}
      accessibilityLabel={place.name}
    >
      <View style={styles.topRow}>
        <Text variant="title.mobileSection" color="primary" numberOfLines={2} style={styles.name}>
          {place.name}
        </Text>
        <View style={styles.rightCol}>
          <View style={styles.ratingRow}>
            <Icon name="starFilled" size={16} tint="#F5C842" />
            <Text variant="body.mediumBold" color="primary" style={styles.rating}>
              {place.rating.toFixed(1)}
            </Text>
          </View>
          {place.plusPuanPercent !== undefined && (
            <View style={styles.plusPuanRow}>
              <Icon name="coinsUp" size={16} color="info" />
              <Text variant="body.smallBold" color="info" style={styles.plusPuan}>
                %{place.plusPuanPercent} Plus Puan
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.locRow}>
        <Icon name="pinFilled" size={16} color="info" />
        <Text variant="body.mediumBold" color="info" style={styles.distance}>
          {place.distanceKm.toFixed(2)} km
        </Text>
        <Text variant="body.medium" color="secondary" style={styles.location}>
          {place.city} {place.district}
        </Text>
      </View>

      <View style={styles.tagsRow}>
        {place.paymentTypes.includes('mobil') && (
          <View style={[styles.tag, styles.tagDefault]}>
            <Icon name="onlinePayment" size={16} color="info" />
            <Text variant="body.smallBold" color="info" style={styles.tagText}>Mobil ödeme</Text>
          </View>
        )}
        {place.paymentTypes.includes('kartli') && (
          <View style={[styles.tag, styles.tagDefault]}>
            <Icon name="wallet" size={16} color="info" />
            <Text variant="body.smallBold" color="info" style={styles.tagText}>Kartlı ödeme</Text>
          </View>
        )}
        {place.hasOnline && (
          <View style={[styles.tag, styles.tagOnline]}>
            <Icon name="receipt" size={16} color="success" />
            <Text variant="body.smallBold" color="success" style={styles.tagText}>Online alışveriş</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: semantic.background.primary,
    borderRadius: radius.lg,
    padding: spacing[4],
    marginBottom: spacing[3],
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[2],
  },
  name: {
    flex: 1,
    marginRight: spacing[3],
  },
  rightCol: {
    alignItems: 'flex-end',
    gap: spacing[2],
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  rating: {
    fontSize: 14,
  },
  plusPuanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  plusPuan: {
    fontSize: 11,
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    marginBottom: spacing[3],
  },
  distance: {
    fontSize: 13,
    marginRight: spacing[2],
  },
  location: {
    fontSize: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    paddingHorizontal: spacing[2],
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  tagDefault: {
    backgroundColor: '#EEF0F4',
  },
  tagOnline: {
    backgroundColor: '#D6F3DD',
  },
  tagText: {
    fontSize: 11,
  },
});
