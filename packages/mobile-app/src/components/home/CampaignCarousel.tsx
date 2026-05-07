/**
 * CampaignCarousel - Romanya tasarim dili
 *
 * Yatay scroll kartlar:
 *   - Beyaz kart + sol gorsel alani + sag baslik/aciklama
 *   - Alt yesil accent border
 *   - Son kart: "Tum Kampanyalari Gor" (navy bg)
 *   - Pagination dots
 */
import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import { Text, Icon, semantic, spacing, radius } from '@pluxee/design-system';
import { MOCK_BANNERS, type Banner } from '../../data/campaigns';

interface CampaignCarouselProps {
  onBannerPress?: (banner: Banner) => void;
  onSeeAllPress?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_GAP = spacing[3];
const CARD_WIDTH = SCREEN_WIDTH - spacing[4] * 2 - spacing[8];
const CARD_HEIGHT = 160;
const PAGE_OFFSET = CARD_WIDTH + CARD_GAP;

export function CampaignCarousel({
  onBannerPress,
  onSeeAllPress,
}: CampaignCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const totalSlots = MOCK_BANNERS.length + 1;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / PAGE_OFFSET);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={PAGE_OFFSET}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {MOCK_BANNERS.map((banner) => (
          <TouchableOpacity
            key={banner.id}
            style={styles.card}
            onPress={() => onBannerPress?.(banner)}
            activeOpacity={0.85}
          >
            <View style={styles.cardInner}>
              <View style={[styles.imageArea, { backgroundColor: banner.bgColor }]}>
                <Text variant="body.largeBold" color="inverse" align="center">
                  {banner.badge.slice(0, 2)}
                </Text>
              </View>
              <View style={styles.textArea}>
                <View style={[styles.badgePill, { backgroundColor: banner.badgeBgColor }]}>
                  <Text variant="body.smallBold" color="primary" style={styles.badgeText}>
                    {banner.badge}
                  </Text>
                </View>
                <Text variant="body.mediumBold" color="primary" numberOfLines={3} style={styles.cardTitle}>
                  {banner.title}
                </Text>
              </View>
            </View>
            <View style={styles.accentBorder} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.seeAllCard}
          onPress={onSeeAllPress}
          activeOpacity={0.85}
        >
          <View style={styles.seeAllInner}>
            <View style={styles.seeAllArrow}>
              <Icon name="arrowRight" size={24} color="inverse" />
            </View>
            <Text variant="title.mobileCard" color="inverse" align="center">
              Tum Kampanyalari Gor
            </Text>
            <Text variant="body.smallMedium" color="inverse" align="center" style={styles.seeAllSub}>
              {MOCK_BANNERS.length}+ kampanya seni bekliyor
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.dotsContainer}>
        {Array.from({ length: totalSlots }).map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === activeIndex ? styles.dotActive : null]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing[3],
  },

  scrollContent: {
    paddingHorizontal: spacing[4],
    gap: CARD_GAP,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
  },
  cardInner: {
    flex: 1,
    flexDirection: 'row',
  },
  imageArea: {
    width: CARD_WIDTH * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textArea: {
    flex: 1,
    padding: spacing[3],
    justifyContent: 'center',
    gap: spacing[2],
  },
  badgePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  badgeText: {
    letterSpacing: 0.5,
  },
  cardTitle: {
    lineHeight: 20,
  },
  accentBorder: {
    height: 3,
    backgroundColor: semantic.brand.secondary,
  },
  seeAllCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: semantic.brand.primary,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  seeAllInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    padding: spacing[4],
  },
  seeAllArrow: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: semantic.brand.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[2],
  },
  seeAllSub: {
    opacity: 0.7,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing[1],
    marginTop: spacing[3],
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#d4d0c8',
  },
  dotActive: {
    backgroundColor: semantic.brand.primary,
    width: 24,
  },
});
