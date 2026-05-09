import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, semantic, spacing, radius } from '@pluxee/design-system';
import { MOCK_OFFERS, type OfferCard } from '../../data/campaigns';

interface OffersGridProps {
  onOfferPress?: (offer: OfferCard) => void;
  onSeeAllPress?: () => void;
}

export function OffersGrid({ onOfferPress }: OffersGridProps) {
  return (
    <View style={styles.container}>
      <Text variant="title.mobileSection" color="primary" style={styles.header}>
        Ayin Firsatlari
      </Text>

      <View style={styles.grid}>
        {MOCK_OFFERS.map((offer, index) => (
          <TouchableOpacity
            key={offer.id}
            style={[styles.card, index % 2 === 0 ? styles.cardLeft : styles.cardRight]}
            onPress={() => onOfferPress?.(offer)}
            activeOpacity={0.85}
          >
            <View style={[styles.accentTop, { backgroundColor: offer.bgColor }]}>
              <View style={[styles.badge, { backgroundColor: offer.badgeBgColor }]}>
                <Text variant="body.smallBold" color="primary" style={styles.badgeText}>
                  {offer.badge}
                </Text>
              </View>
            </View>
            <View style={styles.content}>
              <Text variant="body.mediumBold" color="primary" numberOfLines={3} style={styles.title}>
                {offer.title}
              </Text>
              <Text variant="body.smallMedium" color="tertiary" numberOfLines={2}>
                {offer.description}
              </Text>
            </View>
            <View style={styles.accentBottom} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
  },
  header: {
    marginBottom: spacing[1],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
    marginBottom: spacing[1],
  },
  cardLeft: {
    marginRight: '2%',
  },
  cardRight: {
    marginLeft: '2%',
  },
  accentTop: {
    height: 48,
    justifyContent: 'flex-end',
    padding: spacing[2],
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  badgeText: {
    letterSpacing: 0.5,
  },
  content: {
    padding: spacing[3],
    gap: spacing[2],
  },
  title: {
    lineHeight: 18,
  },
  accentBottom: {
    height: 3,
    backgroundColor: semantic.brand.secondary,
  },
});
