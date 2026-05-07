import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, semantic, spacing, radius } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'ExtraLoadType'>;

export function ExtraLoadTypeScreen({ route, navigation }: Props) {
  const { cardId, category } = route.params;

  const options = [
    {
      key: 'single',
      title: 'Extra Yukle',
      description: 'Tek seferlik bakiye yukleme',
      example: 'Ornek: 2.500 TL aninda yukle',
      screen: 'ExtraLoad' as const,
    },
    {
      key: 'recurring',
      title: 'Duzenli yukleme talimati',
      description: 'Belirlediginiz gun/hafta/ay periyodunda otomatik yukleme',
      example: 'Ornek: Her ayin 1. gunu 1.000 TL otomatik yukleme',
      screen: 'RecurringLoad' as const,
    },
    {
      key: 'threshold',
      title: 'Bakiye altina dusunce yukleme',
      description: 'Kart bakiyesi belirli tutarin altina dusunce otomatik yukleme',
      example: 'Ornek: Bakiye 500 TL altina dusunce 1.000 TL yukle',
      screen: 'BalanceThresholdLoad' as const,
    },
  ];

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title="Talimat Tipi Secin" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt.key}
            style={styles.card}
            onPress={() => navigation.navigate(opt.screen, { cardId, category })}
            activeOpacity={0.85}
          >
            <Text variant="title.mobileCard" color="primary">{opt.title}</Text>
            <Text variant="body.medium" color="secondary">{opt.description}</Text>
            <View style={styles.exampleBox}>
              <Text variant="body.smallMedium" color="success">{opt.example}</Text>
            </View>
            <View style={styles.accentLine} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: semantic.background.primary },
  scroll: { flex: 1 },
  scrollContent: { padding: spacing[4], gap: spacing[4] },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    padding: spacing[4],
    gap: spacing[2],
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
    overflow: 'hidden',
  },
  exampleBox: {
    backgroundColor: '#f0faf0',
    padding: spacing[2],
    borderRadius: radius.md,
    marginTop: spacing[1],
  },
  accentLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: semantic.brand.primary,
  },
});
