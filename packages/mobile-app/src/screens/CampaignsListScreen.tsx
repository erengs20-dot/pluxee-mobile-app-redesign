import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, semantic, spacing, radius } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { MOCK_BANNERS } from '../data/campaigns';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'CampaignsList'>;

export function CampaignsListScreen({ navigation }: Props) {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title="Kampanyalar" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {MOCK_BANNERS.map((banner) => (
          <TouchableOpacity
            key={banner.id}
            style={styles.card}
            onPress={() => navigation.navigate('CampaignDetail', { bannerId: banner.id })}
            activeOpacity={0.85}
          >
            <View style={[styles.cardImage, { backgroundColor: banner.bgColor }]}>
              <Text variant="body.largeBold" color="inverse" align="center">{banner.badge.slice(0, 2)}</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={[styles.badge, { backgroundColor: banner.badgeBgColor }]}>
                <Text variant="body.xsmallBold" color="primary">{banner.badge}</Text>
              </View>
              <Text variant="body.mediumBold" color="primary" numberOfLines={2}>{banner.title}</Text>
            </View>
            <View style={styles.cardAccent} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: semantic.background.primary },
  scroll: { flex: 1 },
  scrollContent: { padding: spacing[4], gap: spacing[3] },
  card: {
    backgroundColor: semantic.background.primary,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
  },
  cardImage: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    padding: spacing[3],
    gap: spacing[2],
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  cardAccent: {
    height: 3,
    backgroundColor: semantic.brand.secondary,
  },
});
