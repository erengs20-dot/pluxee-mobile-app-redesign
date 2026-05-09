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
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { semantic, spacing, Text , radius } from '@pluxee/design-system';
import { HeaderBar } from '../components/home/HeaderBar';
import { StoriesBar } from '../components/home/StoriesBar';
import { CampaignCarousel } from '../components/home/CampaignCarousel';
import { QuickActionsRow } from '../components/home/QuickActionsRow';
import { DefaultCardSection } from '../components/home/DefaultCardSection';
import { OffersGrid } from '../components/home/OffersGrid';
import {
  CardListBottomSheet,
  type BottomSheetRef,
} from '../components/CardListBottomSheet';
import { SetDefaultCardModal } from '../components/SetDefaultCardModal';
import { AddCardBottomSheet, type AddCardSheetRef } from '../components/AddCardBottomSheet';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MOCK_CARDS, type UserCard } from '../data/cards';
import type { RootStackParamList } from '../navigation/types';

type NavigationType = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const navigation = useNavigation<NavigationType>();
  const [defaultCardId, setDefaultCardId] = useState<string>(
    MOCK_CARDS.find((c) => c.isDefault)?.id ?? MOCK_CARDS[0].id,
  );
  const [pendingCard, setPendingCard] = useState<UserCard | null>(null);
  const sheetRef = useRef<BottomSheetRef>(null);
  const addCardRef = useRef<AddCardSheetRef>(null);

  const defaultCard = MOCK_CARDS.find((c) => c.id === defaultCardId)!;

  const handleOpenCardList = () => {
    sheetRef.current?.expand();
  };

  // Kart listesi (bottom sheet) - 3 cizgi tiklanirsa: varsayilan yap modalı
  // Default karta tiklarsa: sessizce ignore (button zaten gizli olabilir)
  // Default olmayan karta: once sheet kapanir, sonra modal acilir (z-index sorunu)
  const handleMakeDefault = (card: UserCard) => {
    if (card.id === defaultCardId) {
      // Zaten varsayilan - bir sey yapmaya gerek yok
      return;
    }
    // Sheet'i kapat, animasyon bittikten sonra modal'i ac
    sheetRef.current?.close();
    setTimeout(() => {
      setPendingCard(card);
    }, 350); // Sheet animasyonu ~250-300ms, biraz tampon ekleyelim
  };

  // Kart listesi (bottom sheet) - kart govdesi tiklanirsa: detaya git
  const handleCardListItemPress = (card: UserCard) => {
    sheetRef.current?.close();
    navigation.navigate('CardDetail', {
      cardId: card.id,
      category: card.category,
    });
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

  const handleDefaultCardPress = () => {
    navigation.navigate('CardDetail', {
      cardId: defaultCard.id,
      category: defaultCard.category,
    });
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <View style={styles.statusBarSafe} />
      <View style={styles.container}>
      <HeaderBar userName="Eren Goktas" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <StoriesBar onStoryPress={(story) => { const idx = require('../data/stories').MOCK_STORIES.findIndex((s: any) => s.id === story.id); navigation.navigate('StoryViewer', { initialIndex: idx >= 0 ? idx : 0 }); }} />
        <CampaignCarousel
            onBannerPress={(banner) => navigation.navigate('CampaignDetail', { bannerId: banner.id })}
            onSeeAllPress={() => navigation.navigate('CampaignsList')}
          />
        <QuickActionsRow
            onActionPress={(action) => {
              if (action.id === '1') {
                addCardRef.current?.open();
              }
            }}
          />
        <DefaultCardSection
          card={defaultCard}
          totalCardsCount={MOCK_CARDS.length}
          onOtherCardsPress={handleOpenCardList}
          onCardPress={handleDefaultCardPress}
        />

        <OffersGrid
            onOfferPress={(offer) => navigation.navigate('CampaignDetail', { bannerId: offer.bannerId })}
            onSeeAllPress={() => navigation.navigate('CampaignsList')}
          />

        <View style={{ height: spacing[20] }} />
      </ScrollView>

      <CardListBottomSheet
        ref={sheetRef}
        defaultCardId={defaultCardId}
        onCardPress={handleCardListItemPress}
        onMakeDefault={handleMakeDefault}
      />

      <AddCardBottomSheet
        ref={addCardRef}
        onSelectByNumber={() => navigation.navigate('AddCardByNumber')}
        onSelectPersonal={() => navigation.navigate('ServiceSelection')}
      />

      <SetDefaultCardModal
        card={pendingCard}
        visible={pendingCard !== null}
        onConfirm={handleConfirmDefault}
        onCancel={handleCancelDefault}
      />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: semantic.background.canvas,
  },
  statusBarSafe: {
    backgroundColor: semantic.brand.primary,
    height: Platform.OS === 'ios' ? 50 : RNStatusBar.currentHeight,
  },
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
    borderRadius: radius.lg,
    marginVertical: spacing[2],
    alignItems: 'center',
  },
});
