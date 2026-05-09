/**
 * BalanceCard
 *
 * Kart detay sayfasinda Hero'nun UZERINE TASAN beyaz balance card'i.
 * Mockup analizine gore:
 *   - Sol: bakiye etiketi + refresh icon + buyuk tutar + bekleyen yukleme
 *   - Sag: Plus Puan etiketi + tutar
 *   - Alt: Extra Yukle outlined button (hasExtraLoad true ise)
 *
 * NEGATIVE MARGIN PATTERN:
 *   marginTop: -40 ile Hero'nun alt 40px'inin uzerine biner.
 *
 * USAGE:
 *   <BalanceCard
 *     balance={17325}
 *     pendingLoad={0}
 *     plusPoints={0}
 *     balanceLabel="Guncel Bakiye"
 *     showExtraLoad
 *     onExtraLoad={() => ...}
 *     onRefresh={() => ...}
 *   />
 */
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Icon, Button, semantic, spacing, radius } from '@pluxee/design-system';
import { formatCurrency } from '../../data/cards';

interface BalanceCardProps {
  balance: number;
  pendingLoad?: number;
  plusPoints?: number;
  balanceLabel: string;       // 'Guncel Bakiye' | 'Kullanilabilir bakiye'
  showExtraLoad: boolean;
  showPlusPoints: boolean;    // Sadece Yemek kategorisinde true
  onExtraLoad?: () => void;
  onRefresh?: () => void;
}

export function BalanceCard({
  balance,
  pendingLoad = 0,
  plusPoints = 0,
  balanceLabel,
  showExtraLoad,
  showPlusPoints,
  onExtraLoad,
  onRefresh,
}: BalanceCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Ust satir: bakiye etiketleri */}
        <View style={styles.headerRow}>
          {/* Sol: Bakiye + refresh */}
          <View style={styles.leftBlock}>
            <View style={styles.labelRow}>
              <Text variant="body.smallMedium" color="tertiary">
                {balanceLabel}
              </Text>
              {onRefresh && (
                <TouchableOpacity
                  onPress={onRefresh}
                  style={styles.refreshButton}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  activeOpacity={0.6}
                >
                  <Icon name="refresh" size={16} color="success" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Sag: Plus Puan (sadece Yemek kartinda) */}
          {showPlusPoints && (
            <View style={styles.rightBlock}>
              <View style={styles.plusRow}>
                <Icon name="coinsUp" size={16} color="primary" />
                <Text variant="body.smallMedium" color="tertiary">
                  Plus Puan
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Buyuk tutarlar */}
        <View style={styles.amountsRow}>
          <Text variant="title.mobileMain" color="primary">
            {formatCurrency(balance)} <Text variant="body.largeMedium" color="primary">TL</Text>
          </Text>
          {showPlusPoints && (
            <Text variant="body.largeBold" color="primary">
              {formatCurrency(plusPoints)} TL
            </Text>
          )}
        </View>

        {/* Bekleyen yukleme */}
        <Text variant="body.smallMedium" color="tertiary" style={styles.pendingText}>
          Bekleyen yukleme{' '}
          <Text variant="body.smallBold" color={pendingLoad > 0 ? 'success' : 'tertiary'}>
            {formatCurrency(pendingLoad)} TL
          </Text>
        </Text>

        {/* Extra Yukle button (Business'ta gizli) */}
        {showExtraLoad && (
          <View style={styles.buttonWrap}>
            <Button
              variant="primaryOutlined"
              size="md"
              leftIcon={<Icon name="wallet" size={16} color="primary" />}
              onPress={onExtraLoad}

            >
              Extra Yukle
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    marginTop: -40, // Hero uzerine tasiyor
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    padding: spacing[4],
    // Soft shadow (iOS + Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[2],
  },
  leftBlock: {
    flex: 1,
  },
  rightBlock: {
    alignItems: 'flex-end',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  plusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  refreshButton: {
    width: 24,
    height: 24,
    borderRadius: radius.full,
    backgroundColor: semantic.background.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing[2],
  },
  pendingText: {
    marginBottom: spacing[4],
  },
  buttonWrap: {
    marginTop: spacing[2],
    alignItems: 'stretch',
  },
});
