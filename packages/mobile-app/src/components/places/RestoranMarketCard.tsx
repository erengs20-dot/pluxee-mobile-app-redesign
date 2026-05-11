import React from 'react';
import { TouchableOpacity, View, StyleSheet, ViewStyle } from 'react-native';
import { Text, Icon, semantic, radius, spacing } from '@pluxee/design-system';

interface RestoranMarketCardProps {
  name: string;
  distanceKm: number;
  iconName?: string;
  category: 'restoran' | 'market';
  onPress?: () => void;
  width?: number;
  style?: ViewStyle;
}

export const RestoranMarketCard: React.FC<RestoranMarketCardProps> = ({
  name, distanceKm, iconName, category, onPress, width = 130, style,
}) => {
  const icon = iconName || (category === 'restoran' ? 'cutlery' : 'store');
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.container, { width }, style]} accessibilityLabel={name}>
      <View style={styles.iconWrap}>
        <Icon name={icon} size={16} color="success" />
      </View>
      <Text variant="body.mediumBold" color="primary" numberOfLines={2} style={styles.name}>{name}</Text>
      <View style={styles.distanceRow}>
        <Icon name="pinFilled" size={16} color="info" />
        <Text variant="body.smallBold" color="info" style={styles.distance}>{distanceKm.toFixed(2)} km</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFFFFF', borderRadius: radius.lg, padding: spacing[3], minHeight: 110, justifyContent: 'space-between' },
  iconWrap: { width: 28, height: 28, backgroundColor: '#D6F3DD', borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center', marginBottom: spacing[2] },
  name: { fontSize: 13, marginBottom: spacing[2] },
  distanceRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[1] },
  distance: { fontSize: 12 },
});
