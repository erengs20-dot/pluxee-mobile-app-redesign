import React from 'react';
import { Image, View, StyleSheet, ImageStyle, ViewStyle } from 'react-native';
import { Text, semantic, radius } from '@pluxee/design-system';

interface BrandLogoProps {
  source: any;
  name: string;
  size?: number;
  containerStyle?: ViewStyle;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ source, name, size = 64, containerStyle }) => {
  if (source) {
    return (
      <View style={[styles.container, { width: size, height: size }, containerStyle]}>
        <Image
          source={source}
          style={styles.image}
          resizeMode="contain"
          accessibilityLabel={name}
        />
      </View>
    );
  }
  return (
    <View style={[styles.container, styles.fallback, { width: size, height: size }, containerStyle]}>
      <Text variant="body.smallBold" color="secondary" align="center">
        {name.slice(0, 12)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: semantic.background.primary,
    borderRadius: radius.lg,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    padding: 4,
  },
});
