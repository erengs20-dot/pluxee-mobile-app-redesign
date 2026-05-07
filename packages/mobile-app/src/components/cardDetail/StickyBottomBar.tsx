import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text, Button, semantic, spacing } from '@pluxee/design-system';
import { formatCurrency } from '../../data/cards';

interface StickyBottomBarProps {
  balance: number;
  ctaLabel: string;
  onPress: () => void;
}

export function StickyBottomBar({ balance, ctaLabel, onPress }: StickyBottomBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.balanceBlock}>
        <Text variant="body.smallMedium" color="tertiary">
          Kullanilabilir bakiye
        </Text>
        <Text variant="title.mobileCard" color="primary">
          {formatCurrency(balance)} <Text variant="body.smallMedium" color="primary">TL</Text>
        </Text>
      </View>
      <View style={styles.ctaBlock}>
        <Button variant="chamfered" size="lg" onPress={onPress}>
          {ctaLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: Platform.OS === 'ios' ? spacing[6] : spacing[3],
    borderTopWidth: 1,
    borderTopColor: semantic.border.tertiary,
    gap: spacing[3],
  },
  balanceBlock: {
    flex: 1,
    gap: 2,
  },
  ctaBlock: {
    flexShrink: 0,
  },
});
