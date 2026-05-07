import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Icon, semantic, spacing, radius } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { MOCK_CARDS, formatCurrency } from '../data/cards';
import { MOCK_MASTERPASS_CARDS } from '../data/masterpass';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentMethod'>;

export function PaymentMethodScreen({ route, navigation }: Props) {
  const { cardId, amount, loadType, frequency, day, threshold, maxLimit, description } = route.params;
  const card = MOCK_CARDS.find((c) => c.id === cardId);
  const [selectedMpId, setSelectedMpId] = useState(MOCK_MASTERPASS_CARDS[0]?.id);

  const ctaLabel = loadType === 'single' ? 'Extra Yukle' : 'Yeni talimat olustur';
  const summaryLabel = loadType === 'single'
    ? 'Yuklenecek tutar'
    : loadType === 'recurring'
      ? 'Her ' + (frequency === 'Haftalik' ? 'hafta ' + day : 'ayin ' + day + '.') + ' gunu kartinizdan yuklenecek tutar'
      : 'Bakiye ' + (threshold ?? 0) + ' TL altina indiginde yuklenecek tutar';

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title={loadType === 'single' ? 'Extra Yukle' : 'Odeme Yontemi'} onBack={() => navigation.goBack()} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardInfo}>
          <Icon name="food" size={24} color="primary" />
          <Text variant="title.mobileCard" color="primary" style={styles.cardName}>{card?.name ?? 'Kart'}</Text>
          <Text variant="title.mobileMain" color="success">{formatCurrency(card?.balance ?? 0)} TL</Text>
        </View>

        <View style={styles.mpSection}>
          <Text variant="title.mobileCard" color="primary">Masterpass'e Kayitli Kartlariniz</Text>
          {MOCK_MASTERPASS_CARDS.map((mp) => (
            <TouchableOpacity key={mp.id} style={[styles.mpCard, selectedMpId === mp.id && styles.mpCardActive]} onPress={() => setSelectedMpId(mp.id)}>
              <Icon name="wallet" size={24} color="primary" />
              <View style={styles.mpInfo}>
                <Text variant="body.mediumBold" color={selectedMpId === mp.id ? 'success' : 'primary'}>{mp.name}</Text>
                <Text variant="body.smallMedium" color="tertiary">{mp.number}</Text>
              </View>
              {selectedMpId === mp.id && <Icon name="checkmark" size={24} color="success" />}
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addCard}>
            <Icon name="plus" size={24} color="info" />
            <Text variant="body.mediumBold" color="link">Yeni kart ekle</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Text variant="body.smallMedium" color="tertiary">Kart bilgileriniz Mastercard'in dijital odeme altyapisi olan Masterpass'te guvenle saklanmaktadir.</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.summaryRow}>
          <Text variant="body.smallMedium" color="primary" style={styles.summaryLabel}>{summaryLabel}</Text>
          <Text variant="title.mobileMain" color="primary">{formatCurrency(amount)} TL</Text>
        </View>
        <TouchableOpacity style={styles.submitBtn} onPress={() => {
          const mp = MOCK_MASTERPASS_CARDS.find((m) => m.id === selectedMpId);
          navigation.navigate('LoadSuccess', { cardId, amount, loadType, paymentMethod: mp?.name ?? 'Kart', oldBalance: card?.balance ?? 0 });
        }} activeOpacity={0.8}>
          <Text variant="body.largeBold" color="primary" align="center">{ctaLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: semantic.background.primary },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: spacing[4] },
  cardInfo: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing[4], paddingVertical: spacing[4], gap: spacing[3] },
  cardName: { flex: 1 },
  mpSection: { paddingHorizontal: spacing[4], paddingTop: spacing[4], gap: spacing[3], backgroundColor: '#f0faf0', paddingBottom: spacing[4] },
  mpCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: radius.lg, padding: spacing[3], gap: spacing[3], borderWidth: 1, borderColor: semantic.border.tertiary },
  mpCardActive: { backgroundColor: '#e6f7e6', borderColor: semantic.brand.secondary },
  mpInfo: { flex: 1, gap: 2 },
  addCard: { flexDirection: 'row', alignItems: 'center', gap: spacing[2], paddingVertical: spacing[2] },
  infoBox: { paddingHorizontal: spacing[4], paddingVertical: spacing[4] },
  bottomBar: { paddingHorizontal: spacing[4], paddingTop: spacing[3], paddingBottom: spacing[6], borderTopWidth: 1, borderTopColor: semantic.border.tertiary, backgroundColor: '#ffffff', gap: spacing[3] },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { flex: 1 },
  submitBtn: { backgroundColor: semantic.brand.secondary, paddingVertical: spacing[4], borderRadius: radius.md },
});
