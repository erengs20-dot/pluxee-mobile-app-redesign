import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet, ViewStyle } from 'react-native';
import { Text, Icon, radius, spacing } from '@pluxee/design-system';

interface Props {
  logo?: any;
  name: string;
  iconName?: string;
  isCategory?: boolean;
  size?: number;
  onPress?: () => void;
  style?: ViewStyle;
}

export const UlasimBrandCard: React.FC<Props> = ({ logo, name, iconName, isCategory, size = 110, onPress, style }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={[styles.container, { width: size, height: size }, isCategory ? styles.categoryContainer : styles.brandContainer, style]}
    accessibilityLabel={name}
  >
    {isCategory ? (
      <View style={styles.categoryContent}>
        {iconName && <Icon name={iconName} size={24} color="primary" />}
        <Text variant="body.smallBold" color="primary" align="center" style={styles.categoryLabel}>{name}</Text>
      </View>
    ) : (
      logo && <Image source={logo} style={styles.logo} resizeMode="contain" />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center', padding: 12 },
  brandContainer: { backgroundColor: '#FFFFFF' },
  categoryContainer: { backgroundColor: '#FBE4E0' },
  categoryContent: { alignItems: 'center', justifyContent: 'center', gap: spacing[2] },
  categoryLabel: { fontSize: 12, marginTop: spacing[1] },
  logo: { width: '100%', height: '100%' },
});
