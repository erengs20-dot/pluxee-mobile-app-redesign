import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, semantic, spacing, radius } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { getBrandById } from '../data/brands';
import { MOCK_CARDS, formatCurrency } from '../data/cards';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';
import { ConfirmationModal } from '../components/cardDetail/ConfirmationModal';

type Props = NativeStackScreenProps<RootStackParamList, 'BalanceTransferForm'>;

export function BalanceTransferFormScreen({ route, navigation }: Props) {
  const { brandId } = route.params;
  const brand = getBrandById(brandId);
  const giftCard = MOCK_CARDS.find((c) => c.category === 'gift');
  const balance = giftCard?.balance ?? 0;

  const [surname, setSurname] = useState('GOKTAS');
  const [phone, setPhone] = useState('0(507) 698 31 28');
  const [amount, setAmount] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const pointsRate = brand?.pointsRate ?? 1;
  const pointsName = brand?.pointsName ?? 'Puan';

  const numericAmount = parseFloat(amount) || 0;
  const calculatedPoints = useMemo(
    () => (numericAmount * pointsRate).toFixed(2),
    [numericAmount, pointsRate],
  );

  const handleSubmit = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    navigation.navigate('SmsVerification', {
      brandId,
      amount: numericAmount,
      phoneNumber: phone,
      nextScreen: 'TransferSuccess',
    });
  };

  if (!brand) return null;

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader
        title={pointsName + ' aktar'}
        onBack={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <Text variant="body.smallBold" color="warning">Soyad *</Text>
          <View style={styles.inputWrap}>
            <TextInput style={styles.input} value={surname} onChangeText={setSurname} placeholder="Soyad" />
          </View>
          <Text variant="body.smallBold" color="warning">Cep Telefonu Numarasi *</Text>
          <View style={styles.inputWrap}>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="0(5XX) XXX XX XX" keyboardType="phone-pad" />
          </View>
          <Text variant="body.smallBold" color="warning">Aktarilacak tutari gir *</Text>
          <View style={styles.inputWrap}>
            <TextInput style={[styles.input, styles.amountInput]} value={amount} onChangeText={setAmount} placeholder="0,00" keyboardType="numeric" />
            <Text variant="body.largeBold" color="tertiary">TL</Text>
          </View>
          <Text variant="body.smallBold" color="warning">Alinacak {pointsName} gir *</Text>
          <View style={[styles.inputWrap, styles.pointsBox]}>
            <Text variant="title.mobileCard" color="warning">{calculatedPoints}</Text>
            <Text variant="body.mediumBold" color="warning">{pointsName}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text variant="body.smallMedium" color="tertiary">
              Puan aktarimi yaptigin icin Hesabim - Fatura Bilgilerim alaninda yer alan bilgilerine gore tarafina fatura duzenlenecektir.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.8}>
          <Text variant="body.largeBold" color="primary" align="center">{pointsName} Yukle</Text>
        </TouchableOpacity>
      </View>
      <ConfirmationModal
        visible={showConfirm}
        message={'Girdigin tutara karsilik gelen ' + pointsName + ' ' + phone + ' numarasina aktarilacak. Aktarim sonrasinda islem geri alinamaz, iptal edilemez ve iade yapilamaz.'}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: semantic.background.primary },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: spacing[4] },
  form: { paddingHorizontal: spacing[4], paddingTop: spacing[5], gap: spacing[3] },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderWidth: 1, borderColor: semantic.border.tertiary, borderRadius: radius.md, paddingHorizontal: spacing[3], paddingVertical: spacing[3], gap: spacing[2] },
  input: { flex: 1, fontSize: 16, color: semantic.text.primary },
  amountInput: { fontSize: 24, fontWeight: '700', textAlign: 'right' },
  pointsBox: { backgroundColor: semantic.background.warning, borderColor: semantic.background.warning, justifyContent: 'space-between' },
  infoBox: { flexDirection: 'row', gap: spacing[2], paddingVertical: spacing[3] },
  submitBtn: { backgroundColor: '#ffdc37', paddingVertical: spacing[4], borderRadius: radius.md, alignItems: 'center' },
  bottomBar: { paddingHorizontal: spacing[4], paddingTop: spacing[3], paddingBottom: spacing[6], borderTopWidth: 1, borderTopColor: semantic.border.tertiary, backgroundColor: '#ffffff' },
});
