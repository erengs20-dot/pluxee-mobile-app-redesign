import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ViewStyle } from 'react-native';
import { radius } from '@pluxee/design-system';
import { BadgeType } from '../../data/placesPoints';
import { BrandBadge } from './BrandBadge';

interface BrandCardProps {
  logo: any;
  name: string;
  badge?: BadgeType;
  size?: number;
  onPress?: () => void;
  style?: ViewStyle;
}

export const BrandCard: React.FC<BrandCardProps> = ({ logo, name, badge, size = 110, onPress, style }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.outer, { width: size }, style]} accessibilityLabel={name}>
      <View style={[styles.logoBox, { height: size }]}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>
      {badge && <BrandBadge badge={badge} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outer: { borderRadius: radius.lg, overflow: 'hidden', backgroundColor: '#FFFFFF' },
  logoBox: { backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', padding: 12 },
  logo: { width: '100%', height: '100%' },
});
