import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, semantic, spacing } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { getBrandById } from '../data/brands';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'BrandDetail'>;

export function BrandDetailScreen({ route, navigation }: Props) {
  const { brandId } = route.params;
  const brand = getBrandById(brandId);

  if (!brand) {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <CardDetailHeader title="Marka" onBack={() => navigation.goBack()} />
        <View style={styles.center}>
          <Text variant="body.medium" color="error">Marka bulunamadi</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title={brand.name} onBack={() => navigation.goBack()} />
      <View style={styles.center}>
        <Text variant="title.mobileMain" color="primary">{brand.name}</Text>
        <Text variant="body.medium" color="secondary" align="center" style={styles.tagline}>
          {brand.tagline}
        </Text>
        <Text variant="body.medium" color="tertiary" align="center" style={styles.about}>
          {brand.about}
        </Text>
        <View style={styles.badge}>
          <Text variant="body.smallBold" color="warning">{brand.badge}</Text>
        </View>
        <Text variant="body.smallMedium" color="tertiary" style={styles.method}>
          Odeme yontemi: {brand.paymentMethod.replace(/_/g, ' ')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: semantic.background.primary,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[6],
    gap: spacing[3],
  },
  tagline: {
    textAlign: 'center',
  },
  about: {
    textAlign: 'center',
  },
  badge: {
    backgroundColor: semantic.background.warning,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: 8,
  },
  method: {
    marginTop: spacing[2],
  },
});
