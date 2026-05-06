/**
 * HomeScreen v3 - Pluxee Anasayfa
 *
 * Mockup'a sadik tam sayfa.
 * - HeaderBar
 * - StoriesBar
 * - CampaignCarousel
 * - QuickActionsRow
 * - DefaultCardSection (varsayilan kart + diger kartlarim CTA)
 * - OffersGrid (yapilacak)
 * - BottomNavigation (yapilacak)
 */

import React, { useState, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import { semantic, spacing, Text } from '@pluxee/design-system';
import { HeaderBar } from '../components/home/HeaderBar';
import { StoriesBar } from '../components/home/StoriesBar';
import { CampaignCarousel } from '../components/home/CampaignCarousel';
import { QuickActionsRow } from '../components/home/QuickActionsRow';
import { DefaultCardSection } from '../components/home/DefaultCardSection';
import { OffersGrid } from '../components/home/OffersGrid';
import { BottomNavigation } from '../components/home/BottomNavigation';
import {
  CardListBottomSheet,
  type BottomSheetRef,
} from '../components/CardListBottomSheet';
import { SetDefaultCardModal } from '../components/SetDefaultCardModal';
import { MOCK_CARDS, type UserCard } from '../data/cards';

export function HomeScreen() {
  const [defaultCardId, setDefaultCardId] = useState<string>(
    MOCK_CARDS.find((c) => c.isDefault)?.id ?? MOCK_CARDS[0].id,
  );
  const [pendingCard, setPendingCard] = useState<UserCard | null>(null);
  const sheetRef = useRef<BottomSheetRef>(null);

  const defaultCard = MOCK_CARDS.find((c) => c.id === defaultCardId)!;

  const handleOpenCardList = () => {
    sheetRef.current?.expand();
  };

  const handleCardSelect = (card: UserCard) => {
    if (card.id === defaultCardId) {
      sheetRef.current?.close();
      return;
    }
    setPendingCard(card);
  };

  const handleConfirmDefault = () => {
    if (pendingCard) {
      setDefaultCardId(pendingCard.id);
      setPendingCard(null);
      sheetRef.current?.close();
    }
  };

  const handleCancelDefault = () => {
    setPendingCard(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <HeaderBar />
        <StoriesBar />
        <CampaignCarousel />
        <QuickActionsRow />
        <DefaultCardSection
          card={defaultCard}
          totalCardsCount={MOCK_CARDS.length}
          onOtherCardsPress={handleOpenCardList}
        />

        <OffersGrid />

        <View style={{ height: spacing[20] }} />
      </ScrollView>

      <CardListBottomSheet
        ref={sheetRef}
        onCardSelect={handleCardSelect}
      />

      <SetDefaultCardModal
        card={pendingCard}
        visible={pendingCard !== null}
        onConfirm={handleConfirmDefault}
        onCancel={handleCancelDefault}
      />

      <BottomNavigation activeTab="home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: semantic.background.canvas,
  },
  content: {
    paddingHorizontal: spacing[4],
  },
  placeholder: {
    backgroundColor: '#ffffff',
    padding: spacing[6],
    borderRadius: 16,
    marginVertical: spacing[2],
    alignItems: 'center',
  },
});
