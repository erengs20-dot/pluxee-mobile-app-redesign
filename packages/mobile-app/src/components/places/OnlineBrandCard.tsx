import React from 'react';
import { TouchableOpacity, Image, StyleSheet, ViewStyle } from 'react-native';
import { radius } from '@pluxee/design-system';

interface Props { logo: any; name: string; size?: number; onPress?: () => void; style?: ViewStyle; }

export const OnlineBrandCard: React.FC<Props> = ({ logo, name, size = 110, onPress, style }) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.container, { width: size, height: size }, style]} accessibilityLabel={name}>
    <Image source={logo} style={styles.logo} resizeMode="contain" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFFFFF', borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center', padding: 12 },
  logo: { width: '100%', height: '100%' },
});
