/**
 * CardListBottomSheet - Plan B (Reanimated'siz)
 *
 * React Native built-in Modal kullanır.
 * Animasyon basit ama güvenilir.
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

export const CardListBottomSheet = forwardRef<BottomSheetRef, CardListBottomSheetProps>(
  ({ onCardSelect }, ref) => {
    const [visible, setVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(SHEET_HEIGHT)).current;

    useImperativeHandle(ref, () => ({
      expand: () => {
        setVisible(true);
      },
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

    // Kategoriye göre grupla
    const cardsByCategory: Record<CardCategory, UserCard[]> = {
      meal: [],
      gift: [],
      food: [],
      business: [],
      transport: [],
    };
    MOCK_CARDS.forEach((card) => {
      cardsByCategory[card.category].push(card);
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
              {/* Drag handle */}
              <View style={styles.dragHandle} />

              {/* Header */}
              <View style={styles.header}>
                <View>
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

              {/* Scrollable list */}
              <ScrollView
                style={{ maxHeight: SHEET_HEIGHT - 200 }}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
              >
                {(Object.keys(cardsByCategory) as CardCategory[]).map((category) => {
                  const cards = cardsByCategory[category];
                  if (cards.length === 0) return null;
                  const meta = CARD_CATEGORY_META[category];

                  return (
                    <View key={category} style={styles.categorySection}>
                      <View style={styles.categoryHeader}>
                        <View
                          style={[
                            styles.categoryIcon,
                            { backgroundColor: meta.bgColor },
                          ]}
                        >
                          <Icon name={meta.iconName} size={16} color="primary" />
                        </View>
                        <Text variant="body.smallBold" color="tertiary">
                          {meta.label.toUpperCase()}
                        </Text>
                      </View>

                      {cards.map((card) => (
                        <TouchableOpacity
                          key={card.id}
                          style={styles.cardItem}
                          onPress={() => onCardSelect(card)}
                          activeOpacity={0.7}
                        >
                          <View style={styles.cardItemLeft}>
                            <Text variant="body.mediumBold" color="primary">
                              {card.name}
                            </Text>
                            <Text variant="body.smallMedium" color="tertiary">
                              {'\u2022\u2022\u2022\u2022 '}{card.lastDigits}
                            </Text>
                          </View>
                          <View style={styles.cardItemRight}>
                            <Text variant="body.mediumBold" color="primary">
                              {'\u20ba '}{formatCurrency(card.balance)}
                            </Text>
                            {card.isDefault && (
                              <Tag variant="success" iconName="check">
                                Varsayilan
                              </Tag>
                            )}
                          </View>
                        </TouchableOpacity>
                      ))}
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
  },
  closeBtn: {
    padding: spacing[1],
  },
  listContent: {
    paddingBottom: spacing[8],
  },
  categorySection: {
    marginBottom: spacing[6],
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[3],
  },
  categoryIcon: {
    width: 28,
    height: 28,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: semantic.surface[1],
    padding: spacing[4],
    borderRadius: radius.xl,
    marginBottom: spacing[2],
    ...shadows.small,
  },
  cardItemLeft: {
    flex: 1,
  },
  cardItemRight: {
    alignItems: 'flex-end',
    gap: spacing[1],
  },
});