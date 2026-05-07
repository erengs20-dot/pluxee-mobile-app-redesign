import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Icon, semantic, spacing, radius } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { MOCK_CARDS, CARD_CATEGORY_META, formatCurrency } from '../data/cards';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'BalanceThresholdLoad'>;

export function BalanceThresholdScreen({ route, navigation }: Props) {
  const { cardId, category } = route.params;
  const cards = MOCK_CARDS.filter((c) => c.category === 'meal' || c.category === 'gift');
  const [selectedCardId, setSelectedCardId] = useState(cardId);
  const [threshold, setThreshold] = useState('500');
  const [amount, setAmount] = useState('5000');
  const [maxLimit, setMaxLimit] = useState('25000');
  const [description, setDescription] = useState('');

  const numAmount = parseFloat(amount) || 0;
  const numThreshold = parseFloat(threshold) || 0;
  const numMaxLimit = parseFloat(maxLimit) || 0;
  const isValid = numAmount > 0 && numThreshold > 0;

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title="Bakiye Altina Dusunce Yukleme" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text variant="body.smallBold" color="primary" style={styles.label}>Yukleme yapilacak kart</Text>
        {cards.map((c) => {
          const meta = CARD_CATEGORY_META[c.category];
          const isSelected = selectedCardId === c.id;
          return (
            <TouchableOpacity key={c.id} style={styles.cardRow} onPress={() => setSelectedCardId(c.id)}>
              <View style={[styles.categoryIcon, { backgroundColor: meta.bgColor }]}>
                <Icon name={meta.iconName} size={20} color="primary" />
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

        <Text variant="body.smallBold" color="primary" style={styles.label}>Bakiye limiti</Text>
        <Text variant="body.smallMedium" color="tertiary">Bakiyeniz bu tutarin altina dustugunde otomatik yukleme yapilir</Text>
        <View style={styles.inputWrap}>
          <TextInput style={styles.input} value={threshold} onChangeText={setThreshold} keyboardType="numeric" />
          <Text variant="body.largeBold" color="tertiary">TL</Text>
        </View>

        <Text variant="body.smallBold" color="primary" style={styles.label}>Yuklenecek tutar</Text>
        <Text variant="body.smallMedium" color="tertiary">Gunluk maksimum yukleme limiti: 2.500 TL</Text>
        <View style={styles.inputWrap}>
          <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" />
          <Text variant="body.largeBold" color="tertiary">TL</Text>
        </View>

        <Text variant="body.smallBold" color="primary" style={styles.label}>Aylik maksimum limit</Text>
        <Text variant="body.smallMedium" color="tertiary">Bu limiti asmamak icin otomatik yukleme durdurulur. Maksimum: 30.000 TL</Text>
        <View style={styles.inputWrap}>
          <TextInput style={styles.input} value={maxLimit} onChangeText={setMaxLimit} keyboardType="numeric" />
          <Text variant="body.largeBold" color="tertiary">TL</Text>
        </View>

        <Text variant="body.smallBold" color="primary" style={styles.label}>Talimat aciklamasi</Text>
        <View style={styles.inputWrap}>
          <TextInput style={[styles.input, { fontWeight: '400' }]} value={description} onChangeText={setDescription} placeholder="Orn: Talya harclik otomatik yukleme" />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.submitBtn, !isValid && styles.submitBtnDisabled]}
          onPress={() => isValid && navigation.navigate('PaymentMethod', { cardId: selectedCardId, amount: numAmount, loadType: 'threshold', threshold: numThreshold, maxLimit: numMaxLimit, description })}
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
  cardRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: radius.lg, padding: spacing[3], gap: spacing[3], borderWidth: 1, borderColor: semantic.border.tertiary, marginBottom: spacing[2] },
  categoryIcon: { width: 40, height: 40, borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center' },
  checkCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  cardInfo: { flex: 1, gap: 2 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: semantic.border.tertiary, borderRadius: radius.md, paddingHorizontal: spacing[3], paddingVertical: spacing[3], gap: spacing[2], backgroundColor: '#ffffff' },
  input: { flex: 1, fontSize: 18, fontWeight: '700', color: semantic.text.primary },
  bottomBar: { paddingHorizontal: spacing[4], paddingTop: spacing[3], paddingBottom: spacing[6], borderTopWidth: 1, borderTopColor: semantic.border.tertiary, backgroundColor: '#ffffff' },
  submitBtn: { backgroundColor: semantic.brand.secondary, paddingVertical: spacing[4], borderRadius: radius.md },
  submitBtnDisabled: { backgroundColor: '#e0e0e0' },
});
