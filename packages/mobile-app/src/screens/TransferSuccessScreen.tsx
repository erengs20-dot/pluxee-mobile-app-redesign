import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Button, Icon, semantic, spacing, radius } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { getBrandById } from '../data/brands';
import { MOCK_CARDS, formatCurrency } from '../data/cards';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'TransferSuccess'>;

export function TransferSuccessScreen({ route, navigation }: Props) {
  const { brandId, amount } = route.params;
  const brand = getBrandById(brandId);
  const giftCard = MOCK_CARDS.find((c) => c.category === 'gift');
  const remainingBalance = (giftCard?.balance ?? 0) - amount;
  const now = new Date();
  const dateStr = now.getDate().toString().padStart(2, '0') + '.' + (now.getMonth() + 1).toString().padStart(2, '0') + '.' + now.getFullYear();
  const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title="Aktarim bilgileri" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.successCard}>
          <Icon name="checkmarkCircle" size={24} color="success" />
          <Text variant="title.mobileMain" color="primary" align="center">
            {brand?.name ?? 'Marka'} bakiyen aktarildi!
          </Text>
        </View>
        <View style={styles.detailList}>
          <View style={styles.detailRow}>
            <Text variant="body.mediumBold" color="primary">Aktarim tutari</Text>
            <Text variant="title.mobileCard" color="warning">{formatCurrency(amount)} TL</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text variant="body.mediumBold" color="primary">Aktarim yeri</Text>
            <Text variant="body.mediumBold" color="primary">{brand?.name}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text variant="body.mediumBold" color="primary">Aktarim zamani</Text>
            <Text variant="body.mediumBold" color="primary">{dateStr} {timeStr}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text variant="body.mediumBold" color="primary">Odeme yontemi</Text>
            <Text variant="body.medium" color="primary">Bakiye Aktarim</Text>
          </View>
        </View>
        <View style={styles.remainingBox}>
          <Text variant="body.mediumBold" color="primary">Kalan bakiye</Text>
          <Text variant="title.mobileCard" color="warning">{formatCurrency(remainingBalance)} TL</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <Button variant="chamfered" size="lg" onPress={() => navigation.popToTop()}>Kartimi Gor</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: semantic.background.primary },
  scrollContent: { paddingBottom: spacing[4] },
  successCard: { backgroundColor: semantic.background.warning, marginHorizontal: spacing[4], marginTop: spacing[5], padding: spacing[6], borderRadius: radius.lg, alignItems: 'center', gap: spacing[3] },
  detailList: { marginHorizontal: spacing[4], marginTop: spacing[5], backgroundColor: '#ffffff', borderRadius: radius.lg, padding: spacing[4] },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing[3] },
  divider: { height: 1, backgroundColor: semantic.background.warning },
  remainingBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: spacing[4], marginTop: spacing[3], backgroundColor: '#ffffff', borderRadius: radius.lg, padding: spacing[4] },
  bottomBar: { paddingHorizontal: spacing[4], paddingTop: spacing[3], paddingBottom: spacing[6], borderTopWidth: 1, borderTopColor: semantic.border.tertiary, backgroundColor: '#ffffff' },
});
