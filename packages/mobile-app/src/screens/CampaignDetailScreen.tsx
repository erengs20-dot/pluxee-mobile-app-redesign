import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Icon, semantic, spacing, radius } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { getBannerById } from '../data/campaigns';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'CampaignDetail'>;

export function CampaignDetailScreen({ route, navigation }: Props) {
  const { bannerId } = route.params;
  const banner = getBannerById(bannerId);
  const [showCode, setShowCode] = useState(false);

  if (!banner) {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <CardDetailHeader title="Kampanya detay" onBack={() => navigation.goBack()} />
        <View style={styles.center}>
          <Text variant="body.medium" color="error">Kampanya bulunamadi</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title="Kampanya detay" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.heroBanner, { backgroundColor: banner.bgColor }]}>
          <View style={styles.heroContent}>
            <Text variant="title.mobileCard" color="inverse" align="center">{banner.badge}</Text>
          </View>
        </View>
        <View style={styles.accentLine} />
        <View style={styles.titleSection}>
          <Text variant="title.mobileMain" color="primary" align="center">
            {banner.detailTitle}
          </Text>
        </View>

        <View style={styles.body}>
          {banner.linkText && (
            <TouchableOpacity activeOpacity={0.6}>
              <Text variant="body.mediumBold" color="link" style={styles.link}>
                {banner.linkText}
              </Text>
            </TouchableOpacity>
          )}

          <Text variant="title.mobileCard" color="primary">Kampanya Detaylari</Text>
          <Text variant="body.medium" color="secondary" style={styles.detailText}>
            {banner.detailText}
          </Text>
        </View>
      </ScrollView>

      {banner.campaignCode && !showCode && (
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.codeBtn} onPress={() => setShowCode(true)} activeOpacity={0.8}>
            <Text variant="title.mobileCard" color="primary" align="center">Kampanya Kodu</Text>
          </TouchableOpacity>
        </View>
      )}

      {banner.campaignCode && showCode && (
        <View style={styles.codeBar}>
          <View style={styles.codeCard}>
            <Text variant="body.smallMedium" color="tertiary">Kampanya Kodu</Text>
            <View style={styles.codeRow}>
              <Text variant="title.mobileMain" color="primary" style={styles.codeText}>
                {banner.campaignCode}
              </Text>
              <TouchableOpacity activeOpacity={0.6}>
                <Icon name="copy" size={16} color="info" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: semantic.background.primary },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: spacing[6] },
  heroBanner: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[6],
  },
  heroContent: {
    width: 120,
    height: 120,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accentLine: {
    height: 4,
    backgroundColor: semantic.brand.secondary,
  },
  titleSection: {
    backgroundColor: semantic.brand.primary,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[5],
  },
  body: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
    gap: spacing[4],
  },
  link: {
    textDecorationLine: 'underline',
  },
  detailText: {
    lineHeight: 24,
  },
  bottomBar: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: spacing[6],
    borderTopWidth: 1,
    borderTopColor: semantic.border.tertiary,
    backgroundColor: '#ffffff',
  },
  codeBtn: {
    backgroundColor: semantic.brand.secondary,
    paddingVertical: spacing[4],
    borderRadius: radius.md,
  },
  codeBar: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: spacing[6],
    borderTopWidth: 1,
    borderTopColor: semantic.border.tertiary,
    backgroundColor: '#ffffff',
  },
  codeCard: {
    backgroundColor: semantic.background.primary,
    borderRadius: radius.md,
    padding: spacing[3],
    gap: spacing[2],
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  codeText: {
    letterSpacing: 2,
  },
});
