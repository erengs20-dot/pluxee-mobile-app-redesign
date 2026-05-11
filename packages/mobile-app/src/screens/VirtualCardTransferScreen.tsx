/**
 * VirtualCardTransferScreen
 *
 * Ulasim kartindan Pluxee Sanal Kart (Esnek Ulasim cuzdani) bakiyesine aktarim ekrani.
 * Mockup 5 + 6: Form + 10sn timer'li onay modalI.
 *
 * AKIS:
 *   1. Kullanici miktar girer
 *   2. "Bakiye yukle" -> Uyari modal acilir (10sn count down)
 *   3. Tamam -> SmsVerification ekranina gider
 *
 * NAVIGATION:
 *   navigation.navigate('VirtualCardTransfer', { cardId: '6' })
 */
import React, { useState, useEffect, useMemo } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Icon, Button, semantic, spacing, radius } from '@pluxee/design-system';

import type { RootStackParamList } from '../navigation/types';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';
import { getCardById, formatCurrency, CARD_CATEGORY_META } from '../data/cards';

type Props = NativeStackScreenProps<RootStackParamList, 'VirtualCardTransfer'>;

// Mock telefon numarasi - production'da kullanici profilinden gelir
const MOCK_PHONE = '0 535 666 77 88';

export function VirtualCardTransferScreen({ route, navigation }: Props) {
  const { cardId } = route.params;
  const card = useMemo(() => getCardById(cardId), [cardId]);
  const meta = useMemo(() => card ? CARD_CATEGORY_META[card.category] : null, [card]);

  const [amount, setAmount] = useState('10000');
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(10);

  // Modal acildiginda 10sn geri sayim
  useEffect(() => {
    if (!confirmModalVisible) {
      setSecondsLeft(10);
      return;
    }
    const interval = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [confirmModalVisible]);

  if (!card || !meta) {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <CardDetailHeader title="Hata" onBack={() => navigation.goBack()} />
        <View style={styles.errorWrap}>
          <Text variant="title.mobileMain" color="error">Kart bulunamadi</Text>
        </View>
      </View>
    );
  }

  const numericAmount = parseFloat(amount.replace(/[^0-9]/g, '')) || 0;
  const canSubmit = numericAmount > 0 && numericAmount <= card.balance;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setConfirmModalVisible(true);
  };

  const handleConfirm = () => {
    setConfirmModalVisible(false);
    // SMS dogrulamaya git - Hediye akisindaki SmsVerification ekrani reuse
    // brandId 'virtual_card' placeholder olarak gonderilir; TransferSuccess'te
    // brand bulunamazsa generic mesaj gosterir (sonradan TransferSuccess'e
    // virtual_card icin ozel handling eklenebilir).
    navigation.navigate('SmsVerification', {
      brandId: 'virtual_card',
      amount: numericAmount,
      phoneNumber: MOCK_PHONE,
      nextScreen: 'TransferSuccess',
    });
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader
        title="Pluxee Sanal Kartina Bakiye Aktar"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER ROW: ikon + aciklama */}
        <View style={styles.headerRow}>
          <View style={styles.iconBox}>
            <Icon name={meta.iconName} size={24} color="primary" />
          </View>
          <View style={styles.headerTextWrap}>
            <Text variant="body.medium" color="primary">
              Pluxee Sanal Kart /{' '}
              <Text variant="body.mediumBold" color="primary" style={styles.underline}>
                Esnek Ulasim
              </Text>
              {' '}cuzdanina bakiye aktarmak istedigin bakiyeyi gir.
            </Text>
          </View>
        </View>

        {/* AKTARILACAK MIKTAR */}
        <View style={styles.fieldGroup}>
          <Text variant="body.smallBold" color="primary">
            Aktarilacak miktar
          </Text>
          <View style={styles.amountInputWrap}>
            <Icon name="cash" size={24} color="tertiary" />
            <TextInput
              style={styles.amountInput}
              value={amount ? `${formatCurrency(numericAmount)}` : ''}
              onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ''))}
              keyboardType="number-pad"
              placeholder="0,00"
              placeholderTextColor={semantic.text.tertiary}
            />
            <Text variant="body.largeBold" color="primary">{'\u20ba'}</Text>
          </View>
          {numericAmount > card.balance && (
            <Text variant="body.smallMedium" color="error">
              Yetersiz bakiye. Mevcut: {formatCurrency(card.balance)} {'\u20ba'}
            </Text>
          )}
        </View>

        {/* TELEFON NUMARASI - DISABLED */}
        <View style={styles.fieldGroup}>
          <Text variant="body.smallBold" color="primary">
            Pluxee Sanal karta bagli telefon numarasi
          </Text>
          <View style={[styles.amountInputWrap, styles.disabledField]}>
            <Icon name="phone" size={24} color="tertiary" />
            <Text variant="body.medium" color="tertiary" style={styles.phoneText}>
              {MOCK_PHONE}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* STICKY FOOTER: BAKIYE YUKLE */}
      <View style={styles.footer}>
        <Button
          variant="primaryFilled"
          size="lg"
          onPress={handleSubmit}
          disabled={!canSubmit}
        >
          Bakiye yukle
        </Button>
      </View>

      {/* UYARI MODAL */}
      <Modal
        visible={confirmModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            {/* Uyari ikonu */}
            <View style={styles.modalIconWrap}>
              <Icon name="warning" size={24} color="primary" />
            </View>

            <Text variant="title.mobileMain" color="primary" align="center">
              Uyari
            </Text>

            <Text variant="body.medium" color="primary" align="center" style={styles.modalMessage}>
              Bakiyeni Pluxee Sanal Kart /{' '}
              <Text variant="body.mediumBold" color="primary" style={styles.underline}>
                Esnek Ulasim
              </Text>
              {' '}cuzdanina aktarmak istiyor musun?{'\n\n'}
              Aktarilan bakiye geri alinamaz.
            </Text>

            {/* Geri sayim */}
            <View style={styles.timerSection}>
              <View style={styles.timerHeader}>
                <Text variant="body.smallMedium" color="secondary">Kalan sure</Text>
                <Text variant="body.smallBold" color="primary">{secondsLeft} sn</Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${(secondsLeft / 10) * 100}%` }]}
                />
              </View>
            </View>

            {/* Butonlar */}
            <View style={styles.modalBtn}>
              <Button
                variant="primaryFilled"
                size="lg"
                onPress={handleConfirm}
                disabled={secondsLeft > 0}
              >
                Tamam
              </Button>
            </View>
            <View style={styles.modalBtn}>
              <Button
                variant="primaryOutlined"
                size="lg"
                onPress={() => setConfirmModalVisible(false)}
              >
                Vazgec
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: semantic.background.primary,
  },
  scroll: { flex: 1 },
  scrollContent: {
    padding: spacing[4],
    gap: spacing[5],
    paddingBottom: spacing[8],
  },
  errorWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing[6] },
  headerRow: {
    flexDirection: 'row',
    gap: spacing[3],
    alignItems: 'flex-start',
    paddingTop: spacing[2],
  },
  iconBox: {
    width: 80,
    height: 80,
    backgroundColor: semantic.background.brand4, // coral
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextWrap: { flex: 1, paddingTop: spacing[1] },
  underline: { textDecorationLine: 'underline' },
  fieldGroup: { gap: spacing[2] },
  amountInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
    borderRadius: radius.md,
    backgroundColor: '#ffffff',
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: semantic.text.primary,
    padding: 0,
  },
  disabledField: { backgroundColor: semantic.background.disabled },
  phoneText: { flex: 1, letterSpacing: 1 },
  footer: {
    padding: spacing[4],
    backgroundColor: semantic.background.primary,
    borderTopWidth: 1,
    borderTopColor: semantic.border.tertiary,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(34, 28, 70, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[5],
  },
  modalBox: {
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    padding: spacing[5],
    gap: spacing[3],
    width: '100%',
    maxWidth: 360,
  },
  modalIconWrap: { alignItems: 'center', paddingTop: spacing[2] },
  modalMessage: { paddingVertical: spacing[2], lineHeight: 22 },
  timerSection: { gap: spacing[2], paddingVertical: spacing[2] },
  timerHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  progressBar: {
    height: 4,
    backgroundColor: semantic.background.disabled,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: semantic.brand.tertiary, // mavi
  },
  modalBtn: { width: '100%' },
});
