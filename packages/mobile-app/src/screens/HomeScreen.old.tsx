/**
 * HomeScreen - Pluxee Anasayfa (v2)
 *
 * Reanimated kullanmaz - Plan B versiyonu.
 */

import React, { useState, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Icon,
  IconButton,
  Avatar,
  Button,
  semantic,
  spacing,
  radius,
  shadows,
} from '@pluxee/design-system';
import {
  CardListBottomSheet,
  type BottomSheetRef,
} from '../components/CardListBottomSheet';
import { SetDefaultCardModal } from '../components/SetDefaultCardModal';
import {
  MOCK_CARDS,
  CARD_CATEGORY_META,
  formatCurrency,
  type UserCard,
} from '../data/cards';

const USER_NAME = 'Eren Goktas';

export function HomeScreen() {
  const [defaultCardId, setDefaultCardId] = useState<string>(
    MOCK_CARDS.find((c) => c.isDefault)?.id ?? MOCK_CARDS[0].id,
  );
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [pendingCard, setPendingCard] = useState<UserCard | null>(null);
  const sheetRef = useRef<BottomSheetRef>(null);

  const defaultCard = MOCK_CARDS.find((c) => c.id === defaultCardId)!;
  const defaultMeta = CARD_CATEGORY_META[defaultCard.category];

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
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Avatar
              name={USER_NAME}
              size="md"
              backgroundColor={semantic.brand.secondary}
            />
            <View>
              <Text variant="body.smallMedium" color="tertiary">
                Merhaba,
              </Text>
              <Text variant="body.largeBold" color="primary">
                {USER_NAME.split(' ')[0]}
              </Text>
            </View>
          </View>
          <IconButton iconName="notifications" variant="ghost" />
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceCardHeader}>
            <View style={styles.balanceCardType}>
              <Icon name={defaultMeta.iconName} size={24} color="inverse" />
              <View>
                <Text variant="body.largeBold" color="inverse">
                  {defaultCard.name}
                </Text>
                <Text
                  variant="body.smallMedium"
                  color="inverse"
                  style={{ opacity: 0.7 }}
                >
                  {'\u2022\u2022\u2022\u2022 '}{defaultCard.lastDigits}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setBalanceVisible((v) => !v)}>
              <Icon
                name={balanceVisible ? 'eyeOpenOutline' : 'eyeCloseOutline'}
                size={24}
                color="inverse"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.balanceAmount}>
            <Text variant="body.medium" color="inverse" style={{ opacity: 0.8 }}>
              Mevcut Bakiye
            </Text>
            <Text
              variant="heroTitle.mobileMediumBlack"
              color="inverse"
              style={{ marginTop: spacing[1] }}
            >
              {balanceVisible
                ? `\u20ba ${formatCurrency(defaultCard.balance)}`
                : '\u2022\u2022\u2022\u2022\u2022\u2022'}
            </Text>
          </View>

          <View style={styles.heroActions}>
            <View style={{ flex: 1 }}>
              <Button
                variant="primaryFilled"
                size="md"
                leftIcon={<Icon name="qrCard" size={16} color="primary" />}
              >
                Kullan
              </Button>
            </View>
            <View style={{ flex: 1 }}>
              <Button
                variant="secondaryOutlined"
                size="md"
                leftIcon={<Icon name="plus" size={16} color="inverse" />}
              >
                Yukle
              </Button>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.otherCardsButton}
          onPress={handleOpenCardList}
        >
          <View style={styles.otherCardsLeft}>
            <Icon name="wallet" size={24} color="primary" />
            <View>
              <Text variant="body.mediumBold" color="primary">
                Diger Kartlarim
              </Text>
              <Text variant="body.smallMedium" color="tertiary">
                {MOCK_CARDS.length - 1} kart daha var
              </Text>
            </View>
          </View>
          <Icon name="chevronRight" size={24} color="tertiary" />
        </TouchableOpacity>

        <View style={styles.section}>
          <Text
            variant="title.mobileSection"
            color="primary"
            style={styles.sectionTitle}
          >
            Hizli Islemler
          </Text>
          <View style={styles.quickActionsGrid}>
            {[
              { icon: 'qrCard', label: 'QR Tara', bg: semantic.brand.secondary },
              { icon: 'plus', label: 'Bakiye Yukle', bg: semantic.brand.tertiary },
              { icon: 'stats', label: 'Gecmis', bg: semantic.brand.quaternary },
              { icon: 'help', label: 'Yardim', bg: semantic.brand.quinary },
            ].map((a) => (
              <TouchableOpacity key={a.icon} style={styles.quickActionItem}>
                <View style={[styles.quickActionIcon, { backgroundColor: a.bg }]}>
                  <Icon name={a.icon} size={24} color="primary" />
                </View>
                <Text variant="body.smallMedium" color="primary" align="center">
                  {a.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: spacing[8] }} />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: semantic.background.primary },
  content: { padding: spacing[5] },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[6],
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  balanceCard: {
    backgroundColor: semantic.brand.primary,
    borderRadius: radius['2xl'],
    padding: spacing[6],
    marginBottom: spacing[4],
    ...shadows.large,
  },
  balanceCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing[6],
  },
  balanceCardType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  balanceAmount: { marginBottom: spacing[6] },
  heroActions: { flexDirection: 'row', gap: spacing[3] },
  otherCardsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: semantic.surface[1],
    padding: spacing[4],
    borderRadius: radius.xl,
    marginBottom: spacing[6],
    ...shadows.small,
  },
  otherCardsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  section: { marginBottom: spacing[6] },
  sectionTitle: { marginBottom: spacing[4] },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    alignItems: 'center',
    flex: 1,
    gap: spacing[2],
  },
  quickActionIcon: {
    width: 64,
    height: 64,
    borderRadius: radius['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
});