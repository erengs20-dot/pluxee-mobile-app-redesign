import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, semantic, spacing, radius } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { getBrandById } from '../data/brands';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';
import { ConfirmationModal } from '../components/cardDetail/ConfirmationModal';
import { TouchableOpacity } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'WalletTransferForm'>;

export function WalletTransferFormScreen({ route, navigation }: Props) {
  const { brandId } = route.params;
  const brand = getBrandById(brandId);

  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('0(507) 698 31 28');
  const [showConfirm, setShowConfirm] = useState(false);

  const numericAmount = parseFloat(amount) || 0;

  const handleSubmit = () => {
    if (numericAmount <= 0) return;
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
      <CardDetailHeader title="Bilgi Gir" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.brandInfo}>
          <View style={styles.brandLogo}>
            <Text variant="body.mediumBold" color="primary" align="center">{brand.name}</Text>
          </View>
          <Text variant="body.medium" color="secondary" style={styles.reqText}>
            {brand.requirementText ?? brand.about}
          </Text>
        </View>

        <View style={styles.form}>
          <Text variant="body.smallBold" color="warning">Aktarilacak tutari gir *</Text>
          <View style={styles.inputWrap}>
            <TextInput
              style={[styles.input, styles.amountInput]}
              value={amount}
              onChangeText={setAmount}
              placeholder="0,00"
              keyboardType="numeric"
            />
            <Text variant="body.largeBold" color="tertiary">TL</Text>
          </View>

          <Text variant="body.smallBold" color="warning">Cep Telefonu Numarasi *</Text>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="0(5XX) XXX XX XX"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.submitBtn, numericAmount <= 0 && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          activeOpacity={0.8}
          disabled={numericAmount <= 0}
        >
          <Text variant="body.largeBold" color={numericAmount > 0 ? 'primary' : 'disabled'} align="center">
            Pluxee {brand.name} Puan Yukle
          </Text>
        </TouchableOpacity>
      </View>

      <ConfirmationModal
        visible={showConfirm}
        message={'Girdigin tutar ' + phone + ' numarasina Pluxee ' + brand.name + ' Puan bakiyesi olarak aktarilacak.'}
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
  brandInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
    gap: spacing[3],
  },
  brandLogo: {
    width: 80,
    height: 80,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[2],
  },
  reqText: { flex: 1, lineHeight: 20 },
  form: { paddingHorizontal: spacing[4], paddingTop: spacing[5], gap: spacing[3] },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderWidth: 1, borderColor: semantic.border.tertiary, borderRadius: radius.md, paddingHorizontal: spacing[3], paddingVertical: spacing[3], gap: spacing[2] },
  input: { flex: 1, fontSize: 16, color: semantic.text.primary },
  amountInput: { fontSize: 24, fontWeight: '700', textAlign: 'right' },
  bottomBar: { paddingHorizontal: spacing[4], paddingTop: spacing[3], paddingBottom: spacing[6], borderTopWidth: 1, borderTopColor: semantic.border.tertiary, backgroundColor: '#ffffff' },
  submitBtn: { backgroundColor: '#ffdc37', paddingVertical: spacing[4], borderRadius: radius.md, alignItems: 'center' },
  submitBtnDisabled: { backgroundColor: '#e0e0e0' },
});
