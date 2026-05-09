import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Icon, Button, semantic, spacing, radius } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { getCodeById } from '../data/codes';
import { formatCurrency } from '../data/cards';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'CodeUsage'>;

export function CodeUsageScreen({ route, navigation }: Props) {
  const { codeId } = route.params;
  const code = getCodeById(codeId);

  if (!code) {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <CardDetailHeader title="Kod kullan" onBack={() => navigation.goBack()} />
        <View style={styles.center}>
          <Text variant="body.medium" color="error">Kod bulunamadi</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title="Kod kullan" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text variant="title.mobileCard" color="primary">Kod bilgileri</Text>

          <View style={styles.brandCard}>
            <View style={styles.brandIcon}>
              <Icon name="gift" size={24} color="warning" />
            </View>
            <Text variant="body.mediumBold" color="primary" style={styles.brandName}>{code.brandName}</Text>
            <Text variant="title.mobileMain" color="warning">{formatCurrency(code.amount)} TL</Text>
          </View>

          <View style={styles.codeBox}>
            <Text variant="body.smallMedium" color="tertiary">Kod</Text>
            <View style={styles.codeRow}>
              <Text variant="title.mobileMain" color="primary" style={styles.codeText}>{code.code}</Text>
              <TouchableOpacity activeOpacity={0.6}>
                <Icon name="copy" size={16} color="info" />
              </TouchableOpacity>
            </View>
          </View>

          <Text variant="body.medium" color="primary">
            <Text variant="body.mediumBold" color="primary">{code.brandName}</Text> odeme kodunu magazada kullanabilmen icin Pluxee tarafindan gonderilen SMS uzerinden QR kodunu olusturabilirsin.
          </Text>
          <Text variant="body.medium" color="primary">
            <Text variant="body.mediumBold" color="primary">{code.brandName} Online</Text> da yapilacak harcamalar icin yukarida yer alan kodu kullanabilirsin.
          </Text>
          <Text variant="body.medium" color="tertiary">
            Kodlarin online da kullanimi sirasinda guvenlik dogrulamasi amaciyla sms ile iletilen QR linkinin son 4 hanesi girilmelidir.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.archiveBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Icon name="menu" size={16} color="primary" />
          <Text variant="body.largeBold" color="primary">Kodu arsivle</Text>
        </TouchableOpacity>
        <Text variant="body.smallMedium" color="tertiary" align="center" style={styles.archiveHint}>
          Marka Kodlarim ekranindaki Arsivlenmis Kodlarim alanindan, arsivledigin kodlara erisebilirsin.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: semantic.background.primary },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: spacing[4] },
  section: { paddingHorizontal: spacing[4], paddingTop: spacing[5], gap: spacing[3] },
  brandCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: semantic.background.warning,
    borderRadius: radius.lg,
    padding: spacing[3],
    gap: spacing[3],
  },
  brandIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: semantic.background.brand3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: { flex: 1 },
  codeBox: {
    backgroundColor: semantic.background.warning,
    borderRadius: radius.md,
    padding: spacing[3],
    gap: spacing[2],
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  codeText: { letterSpacing: 1 },
  bottomBar: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: spacing[6],
    borderTopWidth: 1,
    borderTopColor: semantic.border.tertiary,
    backgroundColor: '#ffffff',
    gap: spacing[2],
  },
  archiveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    borderWidth: 2,
    borderColor: semantic.brand.primary,
    borderRadius: radius.md,
    paddingVertical: spacing[3],
  },
  archiveHint: { marginTop: spacing[1] },
});
