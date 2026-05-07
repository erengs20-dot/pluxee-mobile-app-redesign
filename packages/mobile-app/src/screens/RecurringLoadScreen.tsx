import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Icon, semantic, spacing, radius } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { MOCK_CARDS } from '../data/cards';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'RecurringLoad'>;

const FREQUENCIES = ['Haftalik', 'Aylik'];
const DAYS_WEEKLY = ['Pazartesi', 'Sali', 'Carsamba', 'Persembe', 'Cuma'];
const DAYS_MONTHLY = ['1', '15'];
const QUICK_AMOUNTS = [500, 750, 1000];

export function RecurringLoadScreen({ route, navigation }: Props) {
  const { cardId, category } = route.params;
  const cards = MOCK_CARDS.filter((c) => c.category === 'meal' || c.category === 'gift');
  const [selectedCardId, setSelectedCardId] = useState(cardId);
  const [frequency, setFrequency] = useState('Haftalik');
  const [day, setDay] = useState('Pazartesi');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState('1000');
  const [agreed, setAgreed] = useState(false);

  const amount = selectedAmount ?? (parseFloat(customAmount) || 0);
  const isValid = amount > 0 && agreed;
  const dayOptions = frequency === 'Haftalik' ? DAYS_WEEKLY : DAYS_MONTHLY;

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title="Duzenli Yukleme Talimati" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text variant="body.smallBold" color="primary" style={styles.label}>Yukleme sikligi</Text>
        <View style={styles.selectBox}>
          {FREQUENCIES.map((f) => (
            <TouchableOpacity key={f} style={[styles.selectOption, frequency === f && styles.selectActive]} onPress={() => { setFrequency(f); setDay(f === 'Haftalik' ? 'Pazartesi' : '1'); }}>
              <Text variant="body.medium" color={frequency === f ? 'inverse' : 'primary'}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text variant="body.smallBold" color="primary" style={styles.label}>Yukleme gunu</Text>
        <View style={styles.selectBox}>
          {dayOptions.map((d) => (
            <TouchableOpacity key={d} style={[styles.selectOption, day === d && styles.selectActive]} onPress={() => setDay(d)}>
              <Text variant="body.medium" color={day === d ? 'inverse' : 'primary'}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text variant="body.smallBold" color="primary" style={styles.label}>Yukleme yapilacak kart</Text>
        {cards.map((c) => (
          <TouchableOpacity key={c.id} style={styles.cardRow} onPress={() => setSelectedCardId(c.id)}>
            <Icon name={c.category === 'meal' ? 'food' : 'gift'} size={24} color="primary" />
            <View style={styles.cardInfo}>
              <Text variant="body.mediumBold" color="primary">{c.name}</Text>
              <Text variant="body.smallMedium" color="tertiary">{c.lastDigits}</Text>
            </View>
            {selectedCardId === c.id && <Icon name="checkmark" size={24} color="success" />}
          </TouchableOpacity>
        ))}

        <Text variant="body.smallBold" color="primary" style={styles.label}>Yuklenecek tutari gir</Text>
        <View style={styles.quickRow}>
          {QUICK_AMOUNTS.map((a) => (
            <TouchableOpacity key={a} style={[styles.quickBtn, selectedAmount === a && styles.quickBtnActive]} onPress={() => { setSelectedAmount(a); setCustomAmount(a.toString()); }}>
              <Text variant="body.mediumBold" color={selectedAmount === a ? 'inverse' : 'primary'}>{a} TL</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.inputWrap}>
          <TextInput style={styles.input} value={customAmount} onChangeText={(t) => { setCustomAmount(t); setSelectedAmount(null); }} placeholder="0" keyboardType="numeric" />
          <Text variant="body.largeBold" color="tertiary">TL</Text>
        </View>

        <TouchableOpacity style={styles.checkRow} onPress={() => setAgreed(!agreed)}>
          <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
            {agreed && <Icon name="checkmark" size={16} color="inverse" />}
          </View>
          <Text variant="body.smallMedium" color="primary" style={styles.checkText}>
            Pluxee On Bilgilendirme Formu'nu okudum, Pluxee Mesafeli Satis Sozlesmesi'ni onayliyorum.
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.submitBtn, !isValid && styles.submitBtnDisabled]}
          onPress={() => isValid && navigation.navigate('PaymentMethod', { cardId: selectedCardId, amount, loadType: 'recurring', frequency, day })}
          disabled={!isValid}
        >
          <Text variant="body.largeBold" color={isValid ? 'primary' : 'disabled'} align="center">Odeme yontemi sec</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: semantic.background.primary },
  scroll: { flex: 1 },
  scrollContent: { padding: spacing[4], paddingBottom: spacing[6], gap: spacing[2] },
  label: { marginTop: spacing[3] },
  selectBox: { flexDirection: 'row', gap: spacing[2], marginBottom: spacing[2] },
  selectOption: { flex: 1, paddingVertical: spacing[3], borderRadius: radius.md, borderWidth: 1, borderColor: semantic.border.tertiary, alignItems: 'center' },
  selectActive: { backgroundColor: semantic.brand.primary, borderColor: semantic.brand.primary },
  cardRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: radius.lg, padding: spacing[3], gap: spacing[3], borderWidth: 1, borderColor: semantic.border.tertiary, marginBottom: spacing[2] },
  cardInfo: { flex: 1, gap: 2 },
  quickRow: { flexDirection: 'row', gap: spacing[3], marginTop: spacing[2] },
  quickBtn: { flex: 1, paddingVertical: spacing[3], borderRadius: radius.md, borderWidth: 1.5, borderColor: semantic.brand.primary, alignItems: 'center' },
  quickBtnActive: { backgroundColor: semantic.brand.primary },
  inputWrap: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: semantic.border.tertiary, borderRadius: radius.md, paddingHorizontal: spacing[3], paddingVertical: spacing[3], gap: spacing[2] },
  input: { flex: 1, fontSize: 18, fontWeight: '700', color: semantic.text.primary },
  checkRow: { flexDirection: 'row', gap: spacing[3], alignItems: 'flex-start', marginTop: spacing[3] },
  checkbox: { width: 24, height: 24, borderRadius: 4, borderWidth: 1.5, borderColor: semantic.border.tertiary, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: semantic.brand.primary, borderColor: semantic.brand.primary },
  checkText: { flex: 1, lineHeight: 18 },
  bottomBar: { paddingHorizontal: spacing[4], paddingTop: spacing[3], paddingBottom: spacing[6], borderTopWidth: 1, borderTopColor: semantic.border.tertiary, backgroundColor: '#ffffff' },
  submitBtn: { backgroundColor: semantic.brand.secondary, paddingVertical: spacing[4], borderRadius: radius.md },
  submitBtnDisabled: { backgroundColor: '#e0e0e0' },
});
