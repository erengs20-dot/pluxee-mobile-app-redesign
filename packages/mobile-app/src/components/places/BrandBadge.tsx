import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@pluxee/design-system';
import { BadgeType } from '../../data/placesPoints';

interface BrandBadgeProps {
  badge: BadgeType;
}

const BADGE_LABELS: Record<BadgeType, string> = {
  'magaza': 'MAGAZA',
  'online': 'ONLINE',
  'magaza-online': 'MAGAZA & ONLINE',
};

export const BrandBadge: React.FC<BrandBadgeProps> = ({ badge }) => {
  return (
    <View style={styles.container}>
      <Text variant="body.smallBold" color="primary" align="center" numberOfLines={1} style={styles.text}>
        {BADGE_LABELS[badge]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5C842',
    paddingVertical: 5,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 22,
  },
  text: {
    fontSize: 9,
    letterSpacing: 0.2,
    lineHeight: 12,
  },
});
