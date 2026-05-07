import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Icon, semantic, spacing, radius } from '@pluxee/design-system';
import type { BrandCode } from '../../data/codes';
import { formatCurrency } from '../../data/cards';

interface BrandCodeCardProps {
  code: BrandCode;
  onPress: () => void;
}

export function BrandCodeCard({ code, onPress }: BrandCodeCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconBox}>
        <Icon name="gift" size={24} color="warning" />
      </View>
      <View style={styles.info}>
        <Text variant="body.mediumBold" color="primary">
          {code.brandName}
        </Text>
        <Text variant="body.largeBold" color="primary">
          {formatCurrency(code.amount)} TL
        </Text>
        <Text variant="body.smallMedium" color="tertiary">
          Son kullanma tarihi: {code.expiryDate}
        </Text>
      </View>
      <View style={styles.cta}>
        <Text variant="body.smallBold" color="link">
          Kodu gor / kullan
        </Text>
        <Icon name="chevronRight" size={16} color="info" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    padding: spacing[3],
    gap: spacing[3],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: semantic.background.warning,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});
