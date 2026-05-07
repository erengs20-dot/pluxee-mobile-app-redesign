/**
 * StoriesBar - Anasayfa hikayeler seridi (Romanya tasarim dili)
 *
 * Yatay scroll, her story:
 *   - Kare kart (beyaz bg, yesil ust accent cizgi, marka rengi ikon alani)
 *   - Marka adi (bold, navy)
 *   - Yeni icerik varsa yesil ust accent cizgi
 */
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Text, semantic, spacing, radius } from '@pluxee/design-system';
import { MOCK_STORIES, type Story } from '../../data/stories';

interface StoriesBarProps {
  onStoryPress?: (story: Story) => void;
}

export function StoriesBar({ onStoryPress }: StoriesBarProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {MOCK_STORIES.map((story) => (
          <TouchableOpacity
            key={story.id}
            style={styles.storyCard}
            onPress={() => onStoryPress?.(story)}
            activeOpacity={0.7}
          >
            {story.hasNew && <View style={styles.newAccent} />}
            <View style={[styles.iconCircle, { backgroundColor: story.bgColor }]}>
              <Text variant="body.mediumBold" color="inverse">
                {story.initials}
              </Text>
            </View>
            <Text
              variant="body.smallBold"
              color="primary"
              align="center"
              numberOfLines={2}
              style={styles.brandName}
            >
              {story.brandName}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing[3],
  },
  scrollContent: {
    paddingHorizontal: spacing[4],
    gap: spacing[3],
  },
  storyCard: {
    width: 88,
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[2],
    alignItems: 'center',
    gap: spacing[2],
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
    overflow: 'hidden',
    position: 'relative',
  },
  newAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: semantic.brand.secondary,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 11,
    lineHeight: 14,
  },
});
