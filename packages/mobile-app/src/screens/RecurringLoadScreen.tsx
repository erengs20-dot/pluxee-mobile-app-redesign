import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Icon, Button, semantic, spacing, radius } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { MOCK_CARDS, CARD_CATEGORY_META, formatCurrency } from '../data/cards';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'RecurringLoad'>;

const FREQUENCIES = ['Haftalik', 'Aylik'];
const DAYS_WEEKLY = ['Pazartesi', 'Sali', 'Carsamba', 'Persembe', 'Cuma', 'Cumartesi', 'Pazar'];
const DAYS_MONTHLY = Array.from({ length: 31 }, (_, i) => String(i + 1));
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
  const [dayPickerOpen, setDayPickerOpen] = useState(false);

  const amount = selectedAmount ?? (parseFloat(customAmount) || 0);
  const isValid = amount > 0 && agreed;
  const dayOptions = frequency === 'Haftalik' ? DAYS_WEEKLY : DAYS_MONTHLY;
  const dayLabel = frequency === 'Aylik' ? `Ayin ${day}. gunu` : day;

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
        <TouchableOpacity style={styles.dropdown} onPress={() => setDayPickerOpen(true)}>
          <Text variant="body.medium" color="primary">{dayLabel}</Text>
          <Icon name="chevronDown" size={16} color="primary" />
        </TouchableOpacity>

        <Text variant="body.smallBold" color="primary" style={styles.label}>Yukleme yapilacak kart</Text>
        {cards.map((c) => {
          const meta = CARD_CATEGORY_META[c.category];
          const isSelected = selectedCardId === c.id;
          return (
            <TouchableOpacity key={c.id} style={styles.cardRow} onPress={() => setSelectedCardId(c.id)}>
              <View style={[styles.categoryIcon, { backgroundColor: meta.bgColor }]}>
                <Icon name={meta.iconName} size={24} color="primary" />
              </View>
              <View style={styles.cardInfo}>
                <Text variant="body.mediumBold" color="primary" numberOfLines={1}>{c.name}</Text>
                <Text variant="body.smallMedium" color="tertiary">{c.fullCardNumber}</Text>
                <Text variant="body.smallBold" color="primary" style={{ marginTop: 2 }}>{'\u20ba '}{formatCurrency(c.balance)}</Text>
              </View>
              <View style={[styles.checkCircle, { borderColor: meta.bgColor }, isSelected && { backgroundColor: meta.bgColor }]}>
                {isSelected && <Icon name="checkmark" size={16} color="primary" />}
              </View>
            </TouchableOpacity>
          );
        })}

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
        <Button
          variant="primaryFilled"
          size="lg"
          disabled={!isValid}
          onPress={() => isValid && navigation.navigate('PaymentMethod', { cardId: selectedCardId, amount, loadType: 'recurring', frequency, day })}
        >
          Odeme yontemi sec
        </Button>
      </View>

      {/* Gun secici Modal */}
      <Modal visible={dayPickerOpen} transparent animationType="slide" onRequestClose={() => setDayPickerOpen(false)}>
        <Pressable style={styles.pickerOverlay} onPress={() => setDayPickerOpen(false)}>
          <Pressable style={styles.pickerSheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.pickerHandle} />
            <View style={styles.pickerHeader}>
              <Text variant="title.mobileCard" color="primary">
                {frequency === 'Haftalik' ? 'Haftanin gununu sec' : 'Ayin gununu sec'}
              </Text>
              <TouchableOpacity onPress={() => setDayPickerOpen(false)} style={styles.pickerCloseBtn}>
                <Icon name="xmark" size={24} color="primary" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.pickerList}>
              {dayOptions.map((d) => {
                const isSelected = day === d;
                const itemLabel = frequency === 'Aylik' ? `Ayin ${d}. gunu` : d;
                return (
                  <TouchableOpacity
                    key={d}
                    style={[styles.pickerItem, isSelected && styles.pickerItemActive]}
                    onPress={() => {
                      setDay(d);
                      setDayPickerOpen(false);
                    }}
                  >
                    <Text variant="body.medium" color="primary">{itemLabel}</Text>
                    {isSelected && <Icon name="checkmark" size={24} color="success" />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
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
  dropdown: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing[3], paddingHorizontal: spacing[4], borderRadius: radius.md, borderWidth: 1, borderColor: semantic.border.tertiary, marginBottom: spacing[2], backgroundColor: '#ffffff' },
  cardRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: radius.lg, padding: spacing[3], gap: spacing[3], borderWidth: 1, borderColor: semantic.border.tertiary, marginBottom: spacing[2] },
  categoryIcon: { width: 40, height: 40, borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center' },
  checkCircle: { width: 24, height: 24, borderRadius: radius.full, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  cardInfo: { flex: 1, gap: 2 },
  quickRow: { flexDirection: 'row', gap: spacing[3], marginTop: spacing[2] },
  quickBtn: { flex: 1, paddingVertical: spacing[3], borderRadius: radius.md, borderWidth: 1.5, borderColor: semantic.brand.primary, alignItems: 'center' },
  quickBtnActive: { backgroundColor: semantic.brand.primary },
  inputWrap: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: semantic.border.tertiary, borderRadius: radius.md, paddingHorizontal: spacing[3], paddingVertical: spacing[3], gap: spacing[2] },
  input: { flex: 1, fontSize: 18, fontWeight: '700', color: semantic.text.primary },
  checkRow: { flexDirection: 'row', gap: spacing[3], alignItems: 'flex-start', marginTop: spacing[3] },
  checkbox: { width: 24, height: 24, borderRadius: radius.sm, borderWidth: 1.5, borderColor: semantic.border.tertiary, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: semantic.brand.primary, borderColor: semantic.brand.primary },
  checkText: { flex: 1, lineHeight: 18 },
  bottomBar: { paddingHorizontal: spacing[4], paddingTop: spacing[3], paddingBottom: spacing[6], borderTopWidth: 1, borderTopColor: semantic.border.tertiary, backgroundColor: '#ffffff' },
  submitBtn: { backgroundColor: semantic.brand.secondary, paddingVertical: spacing[4], borderRadius: radius.md },
  submitBtnDisabled: { backgroundColor: semantic.background.disabled },
  pickerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  pickerSheet: { backgroundColor: '#ffffff', borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, paddingTop: spacing[3], paddingBottom: spacing[6], maxHeight: '70%' },
  pickerHandle: { width: 40, height: 4, backgroundColor: semantic.border.tertiary, borderRadius: 2, alignSelf: 'center', marginBottom: spacing[3] },
  pickerHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing[4], paddingBottom: spacing[3], borderBottomWidth: 1, borderBottomColor: semantic.border.tertiary },
  pickerCloseBtn: { padding: spacing[1] },
  pickerList: { paddingVertical: spacing[2] },
  pickerItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing[3], paddingHorizontal: spacing[4], borderBottomWidth: 1, borderBottomColor: semantic.border.tertiary },
  pickerItemActive: { backgroundColor: semantic.background.disabled },
});
