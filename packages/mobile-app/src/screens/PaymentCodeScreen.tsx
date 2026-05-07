import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Icon, semantic, spacing, radius } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { getBrandById } from '../data/brands';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';
import { ConfirmationModal } from '../components/cardDetail/ConfirmationModal';

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentCode'>;

function generateCode(): string {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  return code.slice(0, 3) + ' ' + code.slice(3);
}

export function PaymentCodeScreen({ route, navigation }: Props) {
  const { brandId } = route.params;
  const brand = getBrandById(brandId);
  const [code] = useState(generateCode);
  const [countdown, setCountdown] = useState(299);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const progress = countdown / 299;

  const handleBack = () => {
    setShowCancelModal(true);
  };

  const handleCancelCode = () => {
    setShowCancelModal(false);
    navigation.goBack();
  };

  if (!brand) return null;

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title="Odeme yap" onBack={handleBack} />

      <View style={styles.content}>
        <View style={styles.brandInfo}>
          <View style={styles.brandLogo}>
            <Text variant="body.mediumBold" color="primary" align="center">{brand.name}</Text>
          </View>
          <Text variant="body.medium" color="secondary" style={styles.brandDesc}>
            {brand.name} magazalarinda ve online markette mobil odeme kodun ile odeme yapabilirsin.
          </Text>
        </View>

        <View style={styles.codeCard}>
          <Text variant="title.mobilePage" color="link" align="center" style={styles.codeText}>
            {code}
          </Text>
          <TouchableOpacity style={styles.copyBtn} activeOpacity={0.6}>
            <Icon name="copy" size={24} color="info" />
          </TouchableOpacity>
        </View>

        <View style={styles.countdownRow}>
          <Text variant="body.mediumBold" color="primary">Kalan sure</Text>
          <Text variant="body.mediumBold" color="primary">{countdown} sn</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: ((progress * 100) + '%') as any }]} />
        </View>
      </View>

      <ConfirmationModal
        visible={showCancelModal}
        title="Bilgilendirme"
        message="Mobil odeme kodun iptal edilecektir. Onayliyor musun?"
        confirmLabel="Kodu iptal et"
        cancelLabel="Vazgec"
        countdownSeconds={0}
        onConfirm={handleCancelCode}
        onCancel={() => setShowCancelModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: semantic.background.primary },
  content: { flex: 1, paddingHorizontal: spacing[4], paddingTop: spacing[5], gap: spacing[4] },
  brandInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    padding: spacing[3],
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
  brandDesc: { flex: 1, lineHeight: 20 },
  codeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    paddingVertical: spacing[5],
    paddingHorizontal: spacing[4],
    gap: spacing[3],
  },
  codeText: { letterSpacing: 4 },
  copyBtn: { padding: spacing[2] },
  countdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1b51dc',
    borderRadius: 3,
  },
});
