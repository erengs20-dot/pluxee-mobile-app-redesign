import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Icon, semantic, spacing, radius } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { getBrandById } from '../data/brands';
import { MOCK_CARDS, formatCurrency } from '../data/cards';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';
import { ConfirmationModal } from '../components/cardDetail/ConfirmationModal';

type Props = NativeStackScreenProps<RootStackParamList, 'MobileCodePurchase'>;

export function MobileCodePurchaseScreen({ route, navigation }: Props) {
  const { brandId } = route.params;
  const brand = getBrandById(brandId);
  const giftCard = MOCK_CARDS.find((c) => c.category === 'gift');
  const balance = giftCard?.balance ?? 0;
  const amounts = brand?.availableCodeAmounts ?? [500, 250, 100];

  const [counts, setCounts] = useState<Record<number, number>>(
    Object.fromEntries(amounts.map((a) => [a, 0]))
  );
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);

  const updateCount = (amount: number, delta: number) => {
    setCounts((prev) => ({
      ...prev,
      [amount]: Math.max(0, (prev[amount] ?? 0) + delta),
    }));
  };

  const handleCodeRequest = (amount: number) => {
    const count = counts[amount] ?? 0;
    if (count <= 0) return;
    setSelectedAmount(amount);
    setSelectedCount(count);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    navigation.navigate('CodeUsage', { codeId: 'code-new-' + Date.now() });
  };

  if (!brand) return null;

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title="Kod al" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroBanner}>
          <View style={styles.heroLogo}>
            <Text variant="title.mobileCard" color="primary" align="center">{brand.name}</Text>
          </View>
          <Text variant="body.medium" color="secondary" align="center">{brand.about}</Text>
        </View>

        <View style={styles.section}>
          <Text variant="title.mobileCard" color="primary">Alinabilecek Kodlar</Text>

          {amounts.map((amount) => (
            <View key={amount} style={styles.codeRow}>
              <Text variant="title.mobileMain" color="warning" style={styles.amountText}>
                {formatCurrency(amount)} TL
              </Text>

              <View style={styles.counterBlock}>
                <Text variant="body.smallMedium" color="tertiary" align="center">Kod Adedi</Text>
                <View style={styles.counterRow}>
                  <TouchableOpacity
                    style={styles.counterBtn}
                    onPress={() => updateCount(amount, -1)}
                    activeOpacity={0.6}
                  >
                    <Icon name="minus" size={16} color="primary" />
                  </TouchableOpacity>
                  <Text variant="title.mobileCard" color="primary" style={styles.counterValue}>
                    {counts[amount] ?? 0}
                  </Text>
                  <TouchableOpacity
                    style={styles.counterBtn}
                    onPress={() => updateCount(amount, 1)}
                    activeOpacity={0.6}
                  >
                    <Icon name="plus" size={16} color="primary" />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.codeAlLink}
                onPress={() => handleCodeRequest(amount)}
                activeOpacity={0.6}
              >
                <Text variant="body.mediumBold" color="link">Kod al</Text>
                <Icon name="chevronRight" size={16} color="info" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <ConfirmationModal
        visible={showConfirm}
        title="Kod al"
        message={'Toplam tutari ' + formatCurrency(selectedAmount * selectedCount) + ' TL olan ' + selectedCount + ' adet kod bakiyenden dusecek. Bu kodu aldiktan sonra bir daha degistiremeyeceksin. Onayliyor musun?'}
        confirmLabel="Onayla"
        cancelLabel="Vazgec"
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: semantic.background.primary },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: spacing[6] },
  heroBanner: {
    backgroundColor: semantic.background.info,
    paddingVertical: spacing[6],
    paddingHorizontal: spacing[6],
    alignItems: 'center',
    gap: spacing[3],
  },
  heroLogo: {
    width: 80,
    height: 80,
    borderRadius: radius.lg,
    backgroundColor: semantic.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[2],
  },
  section: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
    gap: spacing[3],
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: semantic.background.primary,
    borderRadius: radius.lg,
    padding: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: semantic.border.tertiary,
  },
  amountText: { flex: 1 },
  counterBlock: { alignItems: 'center', gap: spacing[1] },
  counterRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[2] },
  counterBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: semantic.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterValue: { minWidth: 24, textAlign: 'center' },
  codeAlLink: { flexDirection: 'row', alignItems: 'center', gap: spacing[1], marginLeft: spacing[3] },
});
