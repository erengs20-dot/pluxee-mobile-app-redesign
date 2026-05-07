import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Icon, Tag, semantic, spacing, radius, shadows } from '@pluxee/design-system';
import {
  CARD_CATEGORY_META,
  formatCurrency,
  type UserCard,
} from '../../data/cards';

interface DefaultCardSectionProps {
  card: UserCard;
  totalCardsCount: number;
  onOtherCardsPress: () => void;
}

export function DefaultCardSection({
  card,
  totalCardsCount,
  onOtherCardsPress,
}: DefaultCardSectionProps) {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const meta = CARD_CATEGORY_META[card.category];
  const otherCount = Math.max(totalCardsCount - 1, 0);

  return (
    <View style={styles.container}>
      {/* SEMSIE BASLIK */}
      <View style={styles.umbrellaHeader}>
        <Icon name="wallet" size={16} color="primary" />
        <Text variant="body.mediumBold" color="primary">
          Kartlarim
        </Text>
      </View>

      <View style={styles.cardWrap}>
        {/* SOL YAN SERIT (kategori rengi) */}
        <View style={[styles.stripe, { backgroundColor: meta.stripeColor }]} />

        {/* IC ICERIK */}
        <View style={styles.cardContent}>
          {/* Tag */}
          <View style={styles.tagWrap}>
            <Tag variant="success" iconName="starFilled">
              SECILI KART
            </Tag>
          </View>

          {/* HERO */}
          <View style={styles.hero}>
            {/* Kategori ikonu - notr (gri) */}
            <View style={styles.categoryIcon}>
              <Icon name={meta.iconName} size={24} color="primary" />
            </View>

            <View style={styles.cardInfo}>
              <Text variant="body.mediumBold" color="primary" numberOfLines={1}>
                {card.name}
              </Text>
              <Text variant="body.smallMedium" color="tertiary" numberOfLines={1}>
                {meta.label.toUpperCase()} {'\u00b7'} {'\u2022\u2022\u2022\u2022 '}
                {card.lastDigits}
              </Text>
            </View>

            <View style={styles.balanceRight}>
              <Text variant="body.largeBold" color="primary" style={styles.balanceText}>
                {balanceVisible
                  ? `\u20ba ${formatCurrency(card.balance)}`
                  : '\u2022\u2022\u2022\u2022\u2022'}
              </Text>
              <TouchableOpacity
                onPress={() => setBalanceVisible((v) => !v)}
                style={styles.eyeBtn}
                hitSlop={8}
              >
                <Icon
                  name={balanceVisible ? 'eyeOpenOutline' : 'eyeCloseOutline'}
                  size={16}
                  color="tertiary"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* DIVIDER */}
          <View style={styles.divider} />

          {/* FOOTER */}
          <TouchableOpacity
            style={styles.footer}
            onPress={onOtherCardsPress}
            activeOpacity={0.7}
          >
            <Text variant="body.smallBold" color="link">
              {otherCount} kart daha gor
            </Text>
            <Icon name="chevronRight" size={16} color="info" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing[4],
  },
  umbrellaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    paddingHorizontal: spacing[1],
    marginBottom: spacing[2],
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
    paddingTop: spacing[4],
    paddingBottom: spacing[2],
  },
  hero: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  categoryIcon: {
    width: 44,
    height: 44,
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
  balanceText: { fontSize: 16 },
  eyeBtn: { padding: spacing[1] },
  divider: {
    height: 1,
    backgroundColor: semantic.border.tertiary,
    marginHorizontal: spacing[4],
  },
  footer: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[1],
  },
});
