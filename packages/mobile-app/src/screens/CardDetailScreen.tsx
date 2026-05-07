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
import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Icon, semantic, spacing } from '@pluxee/design-system';

import type { RootStackParamList } from '../navigation/types';
import { getCardById } from '../data/cards';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';
import { CardHero } from '../components/cardDetail/CardHero';
import { BalanceCard } from '../components/cardDetail/BalanceCard';
import { RecentTransactionsList } from '../components/cardDetail/RecentTransactionsList';
import { CARD_CATEGORY_META } from '../data/cards';
import { getGiftBrands, getFuelBrands } from '../data/brands';
import { getActiveCodes, getActiveCodeCount } from '../data/codes';
import { BrandGrid } from '../components/cardDetail/BrandGrid';
import { VirtualCardSection } from '../components/cardDetail/VirtualCardSection';
import { BrandCodeCard } from '../components/cardDetail/BrandCodeCard';
import { ExtraLoadBottomSheet } from '../components/cardDetail/ExtraLoadBottomSheet';

type Props = NativeStackScreenProps<RootStackParamList, 'CardDetail'>;

export function CardDetailScreen({ route, navigation }: Props) {
  const { cardId, category } = route.params;

  // route.params degisirse card ve meta yeniden hesaplansin
  // (Stack screen instance cache'inden bagimsiz olarak)
  const [showExtraLoadSheet, setShowExtraLoadSheet] = useState(false);
  const card = useMemo(() => getCardById(cardId), [cardId]);
  const meta = useMemo(() => CARD_CATEGORY_META[category], [category]);


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
            setShowExtraLoadSheet(true);
          }}
          onRefresh={() => {
            // TODO: API call - bakiye yenile
          }}
        />

        {/* Gift: Markalar + Kodlarim / Diger: Transactions */}
        {category === 'gift' ? (
          <>
            <BrandGrid
              brands={getGiftBrands()}
              initialCount={12}
              onBrandPress={(brand) => {
                navigation.navigate('BrandDetail', { brandId: brand.id });
              }}
            />

            {getActiveCodeCount() > 0 && (
              <View style={styles.codesSection}>
                <View style={styles.codesSectionHeader}>
                  <Text variant="title.mobileCard" color="primary">
                    Marka Kodlarim ({getActiveCodeCount()} adet)
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('BrandCodesList')}
                    activeOpacity={0.6}
                  >
                    <Text variant="body.mediumBold" color="link">
                      Tumunu gor
                    </Text>
                  </TouchableOpacity>
                </View>
                {getActiveCodes().slice(0, 2).map((code) => (
                  <BrandCodeCard
                    key={code.id}
                    code={code}
                    onPress={() => navigation.navigate('CodeUsage', { codeId: code.id })}
                  />
                ))}
              </View>
            )}
          </>
        ) : category === 'transport' ? (
          <>
            {/* USTBOLGE: Bilgi metni + Akaryakit markalari */}
            <View style={styles.transportInfoBand}>
              <Icon name="arrowExportRight" size={24} color="primary" />
              <Text variant="body.medium" color="primary" style={styles.transportInfoText}>
                Bakiye, ilgili uygulamaya aktarilir veya kod ile kullanilir.
              </Text>
            </View>

            <BrandGrid
              brands={getFuelBrands()}
              initialCount={6}
              onBrandPress={(brand) => {
                navigation.navigate('BrandDetail', { brandId: brand.id });
              }}
            />

            {/* ALT BOLGE: Sanal Kart bolumu */}
            {card.virtualCard && (
              <VirtualCardSection
                virtualCard={card.virtualCard}
                onTransferPress={() => {
                  navigation.navigate('VirtualCardTransfer', { cardId });
                }}
                onPlacePress={(placeId: string) => {
                  navigation.navigate('TransportPlaceDetail', { placeId });
                }}
              />
            )}
          </>
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

      <ExtraLoadBottomSheet
        visible={showExtraLoadSheet}
        onClose={() => setShowExtraLoadSheet(false)}
        onSingleLoad={() => {
          setShowExtraLoadSheet(false);
          navigation.navigate('ExtraLoad', { cardId, category });
        }}
        onCreateInstruction={() => {
          setShowExtraLoadSheet(false);
          navigation.navigate('ExtraLoadType', { cardId, category });
        }}
        onViewInstructions={() => {
          setShowExtraLoadSheet(false);
          navigation.navigate('AutoLoadList');
        }}
      />
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
  codesSection: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
    gap: spacing[3],
  },
  codesSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transportInfoBand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
    paddingBottom: spacing[2],
  },
  transportInfoText: {
    flex: 1,
    flexShrink: 1,
  },
});
