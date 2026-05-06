import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Icon, semantic, spacing, radius, shadows } from '@pluxee/design-system';
import { MOCK_OFFERS, type OfferCard } from '../../data/campaigns';

interface OffersGridProps {
  onOfferPress?: (offer: OfferCard) => void;
  onSeeAllPress?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_GAP = spacing[3];
const CONTAINER_PADDING = spacing[4];
const CARD_WIDTH = (SCREEN_WIDTH - CONTAINER_PADDING * 2 - GRID_GAP) / 2;

export function OffersGrid({ onOfferPress, onSeeAllPress }: OffersGridProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="title.mobileSection" color="primary">
          Ayin Firsatlari
        </Text>
        <TouchableOpacity onPress={onSeeAllPress} style={styles.seeAllBtn}>
          <Text variant="body.smallBold" color="link">
            Tumu
          </Text>
          <Icon name="chevronRight" size={16} color="info" />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {MOCK_OFFERS.map((offer) => (
          <TouchableOpacity
            key={offer.id}
            style={styles.cardWrap}
            onPress={() => onOfferPress?.(offer)}
            activeOpacity={0.85}
          >
            <View style={[styles.cardTop, { backgroundColor: offer.bgColor }]}>
              <View style={[styles.badge, { backgroundColor: offer.badgeBgColor }]}>
                <Text variant="body.smallBold" color="primary" style={styles.badgeText}>
                  {offer.badge}
                </Text>
              </View>
              <Text
                variant="body.mediumBold"
                style={[styles.cardTitle, { color: offer.textColor }]}
                numberOfLines={3}
              >
                {offer.title}
              </Text>
            </View>

            <View style={styles.cardBottom}>
              <Text
                variant="body.smallMedium"
                color="secondary"
                numberOfLines={2}
                style={styles.cardDescription}
              >
                {offer.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing[4],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[4],
    paddingHorizontal: spacing[1],
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
  cardWrap: {
    width: CARD_WIDTH,
    borderRadius: radius.xl,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    ...shadows.small,
  },
  cardTop: {
    padding: spacing[3],
    minHeight: 140,
    justifyContent: 'space-between',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing[2],
    paddingVertical: 4,
    borderRadius: radius.full,
    marginBottom: spacing[3],
  },
  badgeText: {
    fontSize: 9,
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  cardBottom: {
    padding: spacing[3],
    minHeight: 60,
  },
  cardDescription: {
    fontSize: 11,
    lineHeight: 15,
  },
});
