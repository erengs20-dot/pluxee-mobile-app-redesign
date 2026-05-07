/**
 * StoriesBar - Anasayfa hikayeler seridi (Romanya tasarim dili)
 *
 * Yatay scroll, her story:
 *   - Yuvarlak avatar (marka rengi + initials)
 *   - Yeni icerik varsa yesil dis halka (ring)
 *   - Altinda marka adi (bold navy)
 */
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Text, semantic, spacing } from '@pluxee/design-system';
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
            style={styles.storyItem}
            onPress={() => onStoryPress?.(story)}
            activeOpacity={0.7}
          >
            <View style={[
              styles.ring,
              story.hasNew ? styles.ringActive : styles.ringInactive,
            ]}>
              <View style={[styles.avatar, { backgroundColor: story.bgColor }]}>
                <Text variant="body.largeBold" color="inverse">
                  {story.initials}
                </Text>
              </View>
            </View>
            <Text
              variant="body.smallBold"
              color="primary"
              align="center"
              numberOfLines={1}
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
  storyItem: {
    alignItems: 'center',
    width: 76,
    gap: spacing[1],
  },
  ring: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
  },
  ringActive: {
    borderColor: semantic.brand.secondary,
  },
  ringInactive: {
    borderColor: '#e0e0e0',
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {

  },
});
