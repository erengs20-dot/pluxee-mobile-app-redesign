import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Icon, Button, semantic, spacing, radius } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { MOCK_CARDS, formatCurrency } from '../data/cards';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'ExtraLoad'>;

const QUICK_AMOUNTS = [500, 1000, 2500];

export function ExtraLoadScreen({ route, navigation }: Props) {
  const { cardId, category } = route.params;
  const card = MOCK_CARDS.find((c) => c.id === cardId);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [agreed, setAgreed] = useState(false);

  const amount = selectedAmount ?? (parseFloat(customAmount) || 0);
  const isValid = amount > 0 && agreed;

  const handleQuickAmount = (a: number) => {
    setSelectedAmount(a);
    setCustomAmount(a.toString());
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title="Extra Yukle" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardInfo}>
          <Icon name="food" size={24} color="primary" />
          <Text variant="title.mobileCard" color="primary" style={styles.cardName}>
            {card?.name ?? category}
          </Text>
          <Text variant="title.mobileMain" color="success">
            {formatCurrency(card?.balance ?? 0)} TL
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <View style={styles.quickRow}>
            {QUICK_AMOUNTS.map((a) => (
              <TouchableOpacity
                key={a}
                style={[styles.quickBtn, selectedAmount === a && styles.quickBtnActive]}
                onPress={() => handleQuickAmount(a)}
                activeOpacity={0.7}
              >
                <Text variant="body.mediumBold" color={selectedAmount === a ? 'inverse' : 'primary'}>
                  {a} TL
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text variant="body.smallBold" color="primary">Yuklenecek tutari gir</Text>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              value={customAmount}
              onChangeText={(t) => { setCustomAmount(t); setSelectedAmount(null); }}
              placeholder="0"
              keyboardType="numeric"
            />
            <Text variant="body.largeBold" color="tertiary">TL</Text>
          </View>
          <Text variant="body.smallMedium" color="tertiary">Gunluk maksimum yukleme limiti: 2.500 TL</Text>
        </View>

        <TouchableOpacity style={styles.checkRow} onPress={() => setAgreed(!agreed)} activeOpacity={0.7}>
          <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
            {agreed && <Icon name="checkmark" size={16} color="inverse" />}
          </View>
          <Text variant="body.smallMedium" color="primary" style={styles.checkText}>
            Pluxee On Bilgilendirme Formu'nu okudum, Pluxee Mesafeli Satis Sozlesmesi'ni onayliyorum.
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button
          variant="primaryFilled"
          size="lg"
          disabled={!isValid}
          onPress={() => {
            if (isValid) {
              navigation.navigate('PaymentMethod', {
                cardId, amount, loadType: 'single',
              });
            }
          }}
        >
          Odeme yontemi sec
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: semantic.background.primary },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: spacing[4] },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    gap: spacing[3],
  },
  cardName: { flex: 1 },
  divider: { height: 1, backgroundColor: semantic.border.tertiary },
  section: { padding: spacing[4], gap: spacing[3] },
  quickRow: { flexDirection: 'row', gap: spacing[3] },
  quickBtn: {
    flex: 1,
    paddingVertical: spacing[3],
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: semantic.brand.primary,
    alignItems: 'center',
  },
  quickBtnActive: {
    backgroundColor: semantic.brand.primary,
    borderColor: semantic.brand.primary,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
    borderRadius: radius.md,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
    gap: spacing[2],
  },
  input: { flex: 1, fontSize: 18, fontWeight: '700', color: semantic.text.primary },
  checkRow: { flexDirection: 'row', paddingHorizontal: spacing[4], gap: spacing[3], alignItems: 'flex-start' },
  checkbox: {
    width: 24, height: 24, borderRadius: 4, borderWidth: 1.5,
    borderColor: semantic.border.tertiary, alignItems: 'center', justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: semantic.brand.primary, borderColor: semantic.brand.primary },
  checkText: { flex: 1, lineHeight: 18 },
  bottomBar: {
    paddingHorizontal: spacing[4], paddingTop: spacing[3], paddingBottom: spacing[6],
    borderTopWidth: 1, borderTopColor: semantic.border.tertiary, backgroundColor: '#ffffff',
  },
  submitBtn: { backgroundColor: semantic.brand.secondary, paddingVertical: spacing[4], borderRadius: radius.md },
  submitBtnDisabled: { backgroundColor: semantic.background.disabled },
});
