import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Dimensions, Animated, PanResponder } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Icon, semantic, spacing, radius } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { MOCK_STORIES } from '../data/stories';
import { getBannerById } from '../data/campaigns';

type Props = NativeStackScreenProps<RootStackParamList, 'StoryViewer'>;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const STORY_DURATION = 5000;

export function StoryViewerScreen({ route, navigation }: Props) {
  const { initialIndex } = route.params;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const story = MOCK_STORIES[currentIndex];
  const banner = story ? getBannerById(story.bannerId) : undefined;
  const totalStories = MOCK_STORIES.length;

  const goNext = useCallback(() => {
    if (currentIndex < totalStories - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      navigation.goBack();
    }
  }, [currentIndex, totalStories, navigation]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    progressAnim.setValue(0);
    const anim = Animated.timing(progressAnim, {
      toValue: 1,
      duration: STORY_DURATION,
      useNativeDriver: false,
    });
    anim.start(({ finished }) => {
      if (finished) goNext();
    });
    return () => anim.stop();
  }, [currentIndex, progressAnim, goNext]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) => Math.abs(gs.dy) > 10,
      onPanResponderMove: (_, gs) => {
        if (gs.dy > 0) translateY.setValue(gs.dy);
      },
      onPanResponderRelease: (_, gs) => {
        if (gs.dy > 100) {
          navigation.goBack();
        } else {
          Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  const handleTap = (x: number) => {
    if (x < SCREEN_WIDTH * 0.35) {
      goPrev();
    } else {
      goNext();
    }
  };

  const handleDetailPress = () => {
    if (story) {
      navigation.replace('CampaignDetail', { bannerId: story.bannerId });
    }
  };

  if (!story || !banner) return null;

  return (
    <Animated.View style={[styles.root, { transform: [{ translateY }] }]} {...panResponder.panHandlers}>
      <StatusBar style="light" />
      <View style={[styles.background, { backgroundColor: banner.bgColor }]}>

        {/* Progress bars */}
        <View style={styles.progressRow}>
          {MOCK_STORIES.map((_, i) => (
            <View key={i} style={styles.progressTrack}>
              <Animated.View
                style={[
                  styles.progressFill,
                  i < currentIndex
                    ? { width: '100%' as any }
                    : i === currentIndex
                      ? { width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) as any }
                      : { width: '0%' as any },
                ]}
              />
            </View>
          ))}
        </View>

        {/* Header: brand info + close */}
        <View style={styles.header}>
          <View style={[styles.avatarSmall, { backgroundColor: story.bgColor }]}>
            <Text variant="body.smallBold" color="inverse">{story.initials}</Text>
          </View>
          <Text variant="body.mediumBold" color="inverse" style={styles.brandNameText}>
            {story.brandName}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn} activeOpacity={0.7}>
            <Icon name="xmark" size={24} color="inverse" />
          </TouchableOpacity>
        </View>

        {/* Tap zones */}
        <TouchableWithoutFeedback onPress={(e) => handleTap(e.nativeEvent.locationX)}>
          <View style={styles.tapZone}>
            {/* Story content */}
            <View style={styles.contentCenter}>
              <Text variant="title.mobileMain" color="inverse" align="center">
                {banner.badge}
              </Text>
              <Text variant="title.mobileCard" color="inverse" align="center" style={styles.storyTitle}>
                {banner.title}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        {/* Bottom: Detay Gor CTA */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.detailBtn} onPress={handleDetailPress} activeOpacity={0.8}>
            <Text variant="body.largeBold" color="primary" align="center">Detay Gor</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },
  background: {
    flex: 1,
    paddingTop: spacing[8],
  },
  progressRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing[3],
    gap: spacing[1],
    marginTop: spacing[4],
  },
  progressTrack: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: semantic.background.primary,
    borderRadius: radius.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
    gap: spacing[2],
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandNameText: {
    flex: 1,
  },
  closeBtn: {
    padding: spacing[1],
  },
  tapZone: {
    flex: 1,
    justifyContent: 'center',
  },
  contentCenter: {
    paddingHorizontal: spacing[6],
    gap: spacing[3],
  },
  storyTitle: {
    lineHeight: 28,
  },
  bottomBar: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
  },
  detailBtn: {
    backgroundColor: semantic.background.primary,
    paddingVertical: spacing[3],
    borderRadius: radius.md,
  },
});
