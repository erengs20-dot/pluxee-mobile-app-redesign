/**
 * CampaignCarousel - Anasayfa kampanya banner carousel'i
 * Yatay scroll, snap-to-page. Son slot "Tumunu Gor" CTA.
 * Altinda pagination dots.
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
import { Text, Icon, Background, semantic, spacing, radius } from '@pluxee/design-system';
import { MOCK_BANNERS, type Banner } from '../../data/campaigns';

interface CampaignCarouselProps {
  onBannerPress?: (banner: Banner) => void;
  onSeeAllPress?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// Banner gen: ekran - kenar padding - peek (sonraki banner gozuksun)
const CONTAINER_PADDING = spacing[4];
const PEEK_WIDTH = spacing[12]; // sagda sonraki banner'in gozukecek miktari
const CARD_GAP = spacing[3];
const CARD_WIDTH = SCREEN_WIDTH - CONTAINER_PADDING * 2 - PEEK_WIDTH;
const CARD_HEIGHT = 180;
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
            style={[styles.bannerCard, { backgroundColor: banner.bgColor }]}
            onPress={() => onBannerPress?.(banner)}
            activeOpacity={0.85}
          >
            <View style={[styles.badge, { backgroundColor: banner.badgeBgColor }]}>
              <Text variant="body.smallBold" color="primary" style={styles.badgeText}>
                {banner.badge}
              </Text>
            </View>
            <Text
              variant="title.mobileCard"
              style={[styles.bannerTitle, { color: banner.textColor }]}
            >
              {banner.title}
            </Text>
            <View style={styles.ctaWrap}>
              <View style={styles.ctaBtn}>
                <Text variant="body.smallBold" color="inverse">
                  Kesfet
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.bannerCard}
          onPress={onSeeAllPress}
          activeOpacity={0.85}
        >
          <Background
            variant="chevron"
            colorTheme="green"
            reverse
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            borderRadius={radius['2xl']}
          >
            <View style={styles.seeAllContent}>
              <View style={styles.seeAllIconWrap}>
                <View style={styles.seeAllArrowBtn}>
                  <Icon name="arrowRight" size={24} color="primary" />
                </View>
              </View>
              <Text
                variant="title.mobileCard"
                color="inverse"
                align="center"
                style={styles.seeAllTitle}
              >
                Tum Kampanyalari Gor
              </Text>
              <Text
                variant="body.smallMedium"
                color="inverse"
                align="center"
                style={styles.seeAllSubtitle}
              >
                8+ kampanya seni bekliyor
              </Text>
            </View>
          </Background>
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
  container: { paddingVertical: spacing[2] },
  scrollContent: { paddingHorizontal: spacing[1], gap: spacing[3] },
  bannerCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: radius['2xl'],
    padding: spacing[4],
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: radius.full,
  },
  badgeText: { fontSize: 10, letterSpacing: 0.5 },
  bannerTitle: { fontSize: 16, fontWeight: '700', lineHeight: 22 },
  ctaWrap: { alignSelf: 'flex-start' },
  ctaBtn: {
    backgroundColor: '#221c46',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: radius.full,
  },
  seeAllContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[4],
  },
  seeAllIconWrap: { marginBottom: spacing[3] },
  seeAllArrowBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: semantic.brand.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeAllTitle: { fontSize: 16, marginBottom: spacing[1] },
  seeAllSubtitle: { opacity: 0.8 },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing[1],
    marginTop: spacing[3],
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#d4d0c8' },
  dotActive: { backgroundColor: '#221c46', width: 24 },
});
