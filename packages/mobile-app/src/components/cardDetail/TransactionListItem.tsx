/**
 * TransactionListItem
 *
 * Tek bir islem (transaction) satiri. Mockup analizine gore:
 *   - Sol: merchant adi (UPPERCASE, bold), channel (kucuk), tarih
 *   - Sag: tutar (spending = yesil + "-", loading = koyu + "+")
 *
 * 2 RENDER MODU:
 *   - 'spending' (default): beyaz/transparent zemin, yesil tutar
 *   - 'loading': sari/krem zemin, navy tutar - mockup Yuklemeler tab'inda boyle
 *
 * USAGE:
 *   <TransactionListItem transaction={tx} />
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, semantic, spacing } from '@pluxee/design-system';
import type { Transaction } from '../../data/transactions';
import { formatCurrency } from '../../data/cards';

interface TransactionListItemProps {
  transaction: Transaction;
}

// Tarih formatlama: '2026-05-06T14:30:00' -> '6 Mayis 14:30'
const TURKISH_MONTHS = [
  'Ocak', 'Subat', 'Mart', 'Nisan', 'Mayis', 'Haziran',
  'Temmuz', 'Agustos', 'Eylul', 'Ekim', 'Kasim', 'Aralik',
];

function formatDate(isoDate: string): string {
  const d = new Date(isoDate);
  const day = d.getDate();
  const month = TURKISH_MONTHS[d.getMonth()];
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${day} ${month} ${hours}:${minutes}`;
}

export function TransactionListItem({ transaction }: TransactionListItemProps) {
  const isSpending = transaction.type === 'spending';
  const isLoading = transaction.type === 'loading';

  return (
    <View style={[styles.container, isLoading && styles.loadingBg]}>
      <View style={styles.left}>
        {isLoading ? (
          <>
            <Text variant="body.smallMedium" color="warning">
              Islem Tarihi
            </Text>
            <Text variant="body.largeBold" color="warning">
              {formatDate(transaction.date)}
            </Text>
          </>
        ) : (
          <>
            <Text variant="body.largeBold" color="primary">
              {transaction.merchant}
            </Text>
            <Text variant="body.smallMedium" color="secondary">
              {transaction.channel}
            </Text>
            <Text variant="body.smallMedium" color="tertiary" style={styles.dateText}>
              {formatDate(transaction.date)}
            </Text>
          </>
        )}
      </View>

      <View style={styles.right}>
        {isLoading && (
          <Text variant="body.smallMedium" color="warning" style={styles.loadingChannel}>
            {transaction.channel}
          </Text>
        )}
        <Text
          variant="title.mobileCard"
          color={isSpending ? 'success' : 'warning'}
        >
          {isSpending ? '-' : '+'}
          {formatCurrency(transaction.amount)}
          <Text variant="body.smallBold" color={isSpending ? 'success' : 'warning'}>TL</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    backgroundColor: semantic.background.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: semantic.border.tertiary,
  },
  loadingBg: {
    backgroundColor: semantic.background.warning, // sari/krem zemin
    borderBottomWidth: 0,
    marginBottom: spacing[2],
    marginHorizontal: spacing[4],
    paddingHorizontal: spacing[4],
    borderRadius: 8,
  },
  left: {
    flex: 1,
    gap: spacing[1],
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  dateText: {
    marginTop: 2,
  },
  loadingChannel: {
    marginBottom: 2,
  },
});
