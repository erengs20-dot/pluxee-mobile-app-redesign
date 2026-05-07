/**
 * CardDetailScreen
 *
 * Tum kart kategorileri icin tek detay ekrani. Kategoriye gore davranisi:
 *   - meal/business/food (Mobil Kart): tam layout (CardHero + BalanceCard + RecentTransactions)
 *   - gift/transport: Faz 6.2'de ozel layout - simdilik 'Yakinda' placeholder
 *
 * Stack screen olarak push edilir; bottom tab bar bu ekranda gizlenir.
 *
 * NAVIGATION:
 *   navigation.navigate('CardDetail', { cardId: '1', category: 'meal' })
 */
import React, { useMemo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, semantic, spacing } from '@pluxee/design-system';

import type { RootStackParamList } from '../navigation/types';
import { getCardById } from '../data/cards';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';
import { CardHero } from '../components/cardDetail/CardHero';
import { BalanceCard } from '../components/cardDetail/BalanceCard';
import { RecentTransactionsList } from '../components/cardDetail/RecentTransactionsList';
import { CARD_CATEGORY_META } from '../data/cards';

type Props = NativeStackScreenProps<RootStackParamList, 'CardDetail'>;

export function CardDetailScreen({ route, navigation }: Props) {
  const { cardId, category } = route.params;

  // route.params degisirse card ve meta yeniden hesaplansin
  // (Stack screen instance cache'inden bagimsiz olarak)
  const card = useMemo(() => getCardById(cardId), [cardId]);
  const meta = useMemo(() => CARD_CATEGORY_META[category], [category]);

  // Faz 6.2 placeholder: gift ve transport icin ozel layout var, simdilik basit mesaj
  const isFaz62Pending = category === 'gift' || category === 'transport';

  // Kart bulunamadi (mock data senkronizasyon hatasi - normalde olmamali)
  if (!card) {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <CardDetailHeader title="Kart Bulunamadi" onBack={() => navigation.goBack()} />
        <View style={styles.errorWrap}>
          <Text variant="title.mobileMain" color="error">
            Kart bulunamadi
          </Text>
          <Text variant="body.medium" color="secondary" style={styles.errorMessage}>
            cardId: {cardId} mock veride mevcut degil.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      {/* Header (back + title) */}
      <CardDetailHeader title={meta.label} onBack={() => navigation.goBack()} />

      {/* Scrollable content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero - kart gorseli + numara + sahibi */}
        <CardHero
          card={card}
          onCopyNumber={() => {
            // TODO: Toast goster - kart numarasi kopyalandi
          }}
        />

        {/* Balance card - hero uzerine tasiyor */}
        <BalanceCard
          balance={card.balance}
          pendingLoad={card.pendingLoad ?? 0}
          plusPoints={card.plusPoints ?? 0}
          balanceLabel={meta.balanceLabel}
          showExtraLoad={meta.hasExtraLoad}
          showPlusPoints={meta.hasPlusPoints}
          onExtraLoad={() => {
            // TODO: Faz 6.x - Extra Yukle akisi
          }}
          onRefresh={() => {
            // TODO: API call - bakiye yenile
          }}
        />

        {/* Faz 6.2 placeholder veya gercek transactions */}
        {isFaz62Pending ? (
          <View style={styles.placeholderWrap}>
            <Text variant="title.mobileCard" color="primary" align="center">
              {meta.label} ekranina ozel icerik yakinda
            </Text>
            <Text variant="body.medium" color="secondary" align="center" style={styles.placeholderMessage}>
              {category === 'gift'
                ? 'Markalarim grid ve tek seferlik kullanim akislari Faz 6.2\'de eklenecek.'
                : 'Sanal kart, QR ile odeme ve gecerli noktalar Faz 6.2\'de eklenecek.'}
            </Text>
          </View>
        ) : (
          <RecentTransactionsList
            cardId={cardId}
            limit={2}
            onSeeAll={() => {
              // TODO: Faz 6.x - Transactions screen
            }}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: semantic.background.primary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[6],
  },
  errorWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[6],
    gap: spacing[3],
  },
  errorMessage: {
    textAlign: 'center',
  },
  placeholderWrap: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[8],
    gap: spacing[3],
  },
  placeholderMessage: {
    textAlign: 'center',
  },
});
