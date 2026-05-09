/**
 * CardHero
 *
 * Kart detay sayfasinin ust gorsel kismi. Mockup analizine gore:
 *   - Background atom slope variant + customColors (kategori rengi)
 *   - Sol kenarda: kategori ikonu kutusu (acik renk zemin)
 *   - Yaninda: label (Yemek/Business/Gida) + subtitle (Mobil Kart)
 *   - Sag ust: kopyalama ikon button
 *   - Alt: kart numarasi (buyuk, beyaz monospace) + sahibi (kucuk, gri-beyaz)
 *
 * KATEGORI RENKLERI:
 *   meal      -> yesil slope
 *   business  -> gri slope
 *   food      -> sari slope
 *   gift      -> sari slope (Faz 6.2)
 *   transport -> coral slope (Faz 6.2)
 *
 * USAGE:
 *   <CardHero card={card} onCopyNumber={() => Toast.show('Kopyalandi')} />
 */
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Background, Text, Icon, IconButton, semantic, spacing, radius } from '@pluxee/design-system';
import type { UserCard } from '../../data/cards';
import { CARD_CATEGORY_META } from '../../data/cards';

interface CardHeroProps {
  card: UserCard;
  onCopyNumber?: () => void;
}

export function CardHero({ card, onCopyNumber }: CardHeroProps) {
  const meta = CARD_CATEGORY_META[card.category];

  return (
    <View style={styles.container}>
      <Background
        variant="slopeMd"
        customColors={meta.slopeColors}
        reverse
        height={220}
      >
        <View style={styles.content}>
          {/* Ust satir: icon + label/subtitle + copy button */}
          <View style={styles.topRow}>
            <View style={[styles.iconBox, { backgroundColor: meta.slopeColors.light }]}>
              <Icon name={meta.iconName} size={24} color="primary" />
            </View>

            <View style={styles.labels}>
              <Text variant="title.mobileMain" color="inverse">
                {meta.label}
              </Text>
              <Text variant="body.medium" color="inverse" style={styles.subtitle}>
                {meta.subtitle}
              </Text>
            </View>

            {onCopyNumber && (
              <TouchableOpacity
                onPress={onCopyNumber}
                style={styles.copyButton}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                activeOpacity={0.7}
              >
                <Icon name="copy" size={16} color="inverse" />
              </TouchableOpacity>
            )}
          </View>

          {/* Alt: kart numarasi + sahibi */}
          <View style={styles.bottomBlock}>
            <Text variant="title.mobileSection" color="inverse" style={styles.cardNumber}>
              {card.fullCardNumber}
            </Text>
            <Text variant="body.smallMedium" color="inverse" style={styles.cardOwner}>
              {card.cardOwner}
            </Text>
          </View>
        </View>
      </Background>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
    paddingBottom: spacing[5],
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labels: {
    flex: 1,
    gap: spacing[1],
  },
  subtitle: {
    opacity: 0.85,
  },
  copyButton: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  bottomBlock: {
    gap: spacing[1],
    marginTop: spacing[4],
  },
  cardNumber: {
    letterSpacing: 1.5,
  },
  cardOwner: {
    opacity: 0.75,
    letterSpacing: 1,
  },
});
