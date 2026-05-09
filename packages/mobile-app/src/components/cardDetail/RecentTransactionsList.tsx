/**
 * RecentTransactionsList
 *
 * Kart detay sayfasinda "Son Islemler" preview'i.
 * Mockup'a gore:
 *   - Ust: "Son Islemler" baslik + sag tarafta "Tumu ->" link
 *   - Liste: son N transaction (default 2) - TransactionListItem ile render
 *   - Bos durumda: EmptyTransactions
 *
 * USAGE:
 *   <RecentTransactionsList
 *     cardId="1"
 *     onSeeAll={() => navigation.navigate('Transactions', { cardId: '1' })}
 *   />
 */
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Icon, semantic, spacing } from '@pluxee/design-system';
import { getRecentTransactions } from '../../data/transactions';
import { TransactionListItem } from './TransactionListItem';
import { EmptyTransactions } from './EmptyTransactions';

interface RecentTransactionsListProps {
  cardId: string;
  limit?: number;
  onSeeAll?: () => void;
}

export function RecentTransactionsList({
  cardId,
  limit = 2,
  onSeeAll,
}: RecentTransactionsListProps) {
  const transactions = getRecentTransactions(cardId, limit);
  const hasTransactions = transactions.length > 0;

  return (
    <View style={styles.container}>
      {/* Baslik ve "Tumu ->" link */}
      <View style={styles.header}>
        <Text variant="title.mobileCard" color="primary">
          Son Islemler
        </Text>

        {hasTransactions && onSeeAll && (
          <TouchableOpacity
            onPress={onSeeAll}
            style={styles.seeAllButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            activeOpacity={0.6}
          >
            <Text variant="body.mediumBold" color="link">
              Tumu
            </Text>
            <Icon name="chevronRight" size={16} color="info" />
          </TouchableOpacity>
        )}
      </View>

      {/* Liste */}
      {hasTransactions ? (
        <View style={styles.list}>
          {transactions.map((tx) => (
            <TransactionListItem key={tx.id} transaction={tx} />
          ))}
        </View>
      ) : (
        <EmptyTransactions />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: semantic.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
    paddingBottom: spacing[3],
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  list: {
    // TransactionListItem'in kendi padding'i var
  },
});
