import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, semantic, spacing, radius } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { getBrandById } from '../data/brands';
import { MOCK_CARDS } from '../data/cards';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';
import { StickyBottomBar } from '../components/cardDetail/StickyBottomBar';

type Props = NativeStackScreenProps<RootStackParamList, 'BrandDetail'>;

export function BrandDetailScreen({ route, navigation }: Props) {
  const { brandId } = route.params;
  const brand = getBrandById(brandId);
  const giftCard = MOCK_CARDS.find((c) => c.category === 'gift');
  const balance = giftCard?.balance ?? 0;

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

  const handleCta = () => {
    switch (brand.paymentMethod) {
      case 'balance_transfer':
        navigation.navigate('BalanceTransferForm', { brandId: brand.id });
        break;
      case 'mobile_code':
        navigation.navigate('MobileCodePurchase', { brandId: brand.id });
        break;
      case 'wallet_transfer':
        navigation.navigate('WalletTransferForm', { brandId: brand.id });
        break;
    }
  };

  const ctaLabel =
    brand.paymentMethod === 'balance_transfer'
      ? 'Bakiye Aktar'
      : brand.paymentMethod === 'mobile_code'
        ? 'Kod al'
        : 'Puan Yukle';

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title={brand.name} onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero gorsel alani (placeholder mor gradient) */}
        <View style={styles.heroBanner}>
          <View style={styles.heroLogoWrap}>
            <Text variant="title.mobileMain" color="primary" align="center">
              {brand.name}
            </Text>
          </View>
          <Text variant="body.mediumBold" color="warning" align="center" style={styles.tagline}>
            {brand.tagline}
          </Text>
        </View>

        {/* Hakkinda */}
        <View style={styles.aboutSection}>
          <Text variant="title.mobileCard" color="primary">
            {brand.name} Hakkinda
          </Text>
          <Text variant="body.medium" color="secondary" style={styles.aboutText}>
            {brand.about}
          </Text>

          {brand.paymentMethod === 'balance_transfer' && brand.pointsName && (
            <Text variant="title.mobileCard" color="primary" style={styles.usageTitle}>
              {brand.name} web sitesi ve mobil uygulamasinda diledigince harca!
            </Text>
          )}

          {brand.requirementText && (
            <View style={styles.requirementBox}>
              <Text variant="body.medium" color="secondary">
                {brand.requirementText}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <StickyBottomBar
        balance={balance}
        ctaLabel={ctaLabel}
        onPress={handleCta}
      />
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[4],
  },
  heroBanner: {
    backgroundColor: '#f0e6ff',
    paddingVertical: spacing[8],
    paddingHorizontal: spacing[6],
    alignItems: 'center',
    gap: spacing[3],
  },
  heroLogoWrap: {
    width: 100,
    height: 100,
    borderRadius: radius.lg,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[2],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  tagline: {
    marginTop: spacing[2],
  },
  aboutSection: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
    gap: spacing[3],
  },
  aboutText: {
    lineHeight: 22,
  },
  usageTitle: {
    marginTop: spacing[4],
  },
  requirementBox: {
    backgroundColor: semantic.background.warning,
    padding: spacing[3],
    borderRadius: radius.md,
    marginTop: spacing[2],
  },
});
