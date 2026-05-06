/**
 * StoriesBar - Anasayfa hikayeler seridi
 *
 * Yatay scroll, her story:
 *   - Yuvarlak avatar (initials, marka rengi)
 *   - Yeni icerik varsa yesil dot
 *   - Altinda marka adi
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
            <View style={styles.avatarWrap}>
              <View style={[styles.avatar, { backgroundColor: story.bgColor }]}>
                <Text variant="body.largeBold" color="inverse">
                  {story.initials}
                </Text>
              </View>
              {story.hasNew && <View style={styles.newDot} />}
            </View>
            <Text
              variant="body.smallMedium"
              color="primary"
              align="center"
              style={styles.brandName}
            >
              {story.brandName.length > 9
                ? story.brandName.substring(0, 8) + '...'
                : story.brandName}
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
    paddingHorizontal: spacing[1],
    gap: spacing[3],
  },
  storyItem: {
    alignItems: 'center',
    width: 72,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: spacing[1],
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  newDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: semantic.brand.secondary, // Yesil
    borderWidth: 2.5,
    borderColor: '#ffffff',
  },
  brandName: {
    fontSize: 12,
  },
});
