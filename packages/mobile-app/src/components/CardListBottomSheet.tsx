/**
 * CardListBottomSheet - Romanya stili + Servis grupli liste
 */

import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native';
import { useRef, useEffect } from 'react';
import {
  Text,
  Icon,
  Tag,
  semantic,
  spacing,
  radius,
  shadows,
} from '@pluxee/design-system';
import {
  MOCK_CARDS,
  CARD_CATEGORY_META,
  formatCurrency,
  type UserCard,
  type CardCategory,
} from '../data/cards';

interface CardListBottomSheetProps {
  onCardSelect: (card: UserCard) => void;
}

export interface BottomSheetRef {
  expand: () => void;
  close: () => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.85;

const CATEGORY_ORDER: CardCategory[] = ['meal', 'gift', 'food', 'business', 'transport'];

export const CardListBottomSheet = forwardRef<BottomSheetRef, CardListBottomSheetProps>(
  ({ onCardSelect }, ref) => {
    const [visible, setVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(SHEET_HEIGHT)).current;

    useImperativeHandle(ref, () => ({
      expand: () => setVisible(true),
      close: () => {
        Animated.timing(slideAnim, {
          toValue: SHEET_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }).start(() => setVisible(false));
      },
    }));

    useEffect(() => {
      if (visible) {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }, [visible, slideAnim]);

    const handleClose = () => {
      Animated.timing(slideAnim, {
        toValue: SHEET_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    };

    const cardsByCategory: Record<CardCategory, UserCard[]> = {
      meal: [], gift: [], food: [], business: [], transport: [],
    };
    MOCK_CARDS.forEach((card) => {
      cardsByCategory[card.category].push(card);
    });

    Object.keys(cardsByCategory).forEach((cat) => {
      cardsByCategory[cat as CardCategory].sort((a, b) => {
        if (a.isDefault && !b.isDefault) return -1;
        if (!a.isDefault && b.isDefault) return 1;
        return 0;
      });
    });

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <Pressable style={styles.backdrop} onPress={handleClose}>
          <Animated.View
            style={[
              styles.sheet,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Pressable onPress={(e) => e.stopPropagation()}>
              <View style={styles.dragHandle} />

              <View style={styles.header}>
                <View style={{ flex: 1 }}>
                  <Text variant="title.mobileMain" color="primary">
                    Kartlarim
                  </Text>
                  <Text variant="body.smallMedium" color="tertiary">
                    Bir karti varsayilan yapmak icin sec
                  </Text>
                </View>
                <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
                  <Icon name="xmark" size={24} color="primary" />
                </TouchableOpacity>
              </View>

              <ScrollView
                style={{ maxHeight: SHEET_HEIGHT - 200 }}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
              >
                {CATEGORY_ORDER.map((category) => {
                  const cards = cardsByCategory[category];
                  if (cards.length === 0) return null;
                  const meta = CARD_CATEGORY_META[category];

                  return (
                    <View key={category} style={styles.categoryGroup}>
                      <View style={styles.categoryHeader}>
                        <Text variant="body.smallBold" color="tertiary" style={styles.categoryLabel}>
                          {meta.label.toUpperCase()}
                        </Text>
                      </View>

                      <View style={styles.cardsInCategory}>
                        {cards.map((card) => (
                          <TouchableOpacity
                            key={card.id}
                            style={styles.cardWrap}
                            onPress={() => onCardSelect(card)}
                            activeOpacity={0.7}
                          >
                            <View
                              style={[
                                styles.stripe,
                                { backgroundColor: meta.stripeColor },
                              ]}
                            />

                            <View style={styles.cardContent}>
                              {card.isDefault && (
                                <View style={styles.tagWrap}>
                                  <Tag variant="success" iconName="starFilled">
                                    SECILI KART
                                  </Tag>
                                </View>
                              )}

                              <View style={styles.hero}>
                                <View style={styles.categoryIcon}>
                                  <Icon name={meta.iconName} size={24} color="primary" />
                                </View>

                                <View style={styles.cardInfo}>
                                  <Text variant="body.mediumBold" color="primary" numberOfLines={1}>
                                    {card.name}
                                  </Text>
                                  <Text variant="body.smallMedium" color="tertiary" numberOfLines={1}>
                                    {'\u2022\u2022\u2022\u2022 '}{card.lastDigits}
                                  </Text>
                                </View>

                                <View style={styles.balanceRight}>
                                  <Text variant="body.mediumBold" color="primary">
                                    {'\u20ba '}{formatCurrency(card.balance)}
                                  </Text>
                                  <Icon name="chevronRight" size={16} color="tertiary" />
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
    );
  },
);

CardListBottomSheet.displayName = 'CardListBottomSheet';

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(34, 28, 70, 0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    height: SHEET_HEIGHT,
    backgroundColor: semantic.background.primary,
    borderTopLeftRadius: radius['2xl'],
    borderTopRightRadius: radius['2xl'],
    paddingHorizontal: spacing[5],
    paddingTop: spacing[3],
    paddingBottom: spacing[6],
    ...shadows.large,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: semantic.border.primary,
    borderRadius: radius.full,
    alignSelf: 'center',
    marginBottom: spacing[4],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: spacing[5],
    borderBottomWidth: 1,
    borderBottomColor: semantic.border.tertiary,
    marginBottom: spacing[4],
    gap: spacing[3],
  },
  closeBtn: {
    padding: spacing[1],
  },
  listContent: {
    paddingBottom: spacing[8],
  },
  categoryGroup: {
    marginBottom: spacing[5],
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[2],
    paddingHorizontal: spacing[1],
  },
  categoryLabel: {
    letterSpacing: 1,
  },
  cardsInCategory: {
    gap: spacing[2],
  },
  cardWrap: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: radius['2xl'],
    overflow: 'hidden',
    ...shadows.small,
  },
  stripe: {
    width: 6,
  },
  cardContent: {
    flex: 1,
  },
  tagWrap: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: spacing[1],
  },
  hero: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.lg,
    backgroundColor: semantic.background.disabled,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 2,
  },
  balanceRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
});
