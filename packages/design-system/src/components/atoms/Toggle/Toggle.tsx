import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { semantic } from '../../../theme/semantic';
import { Icon } from '../Icon';

export interface ToggleProps {
  value: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
}

const TRACK_WIDTH = 52;
const TRACK_HEIGHT = 30;
const THUMB_SIZE = 24;
const THUMB_PADDING = 3;

export function Toggle({ value, onChange, disabled = false }: ToggleProps) {
  const offset = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(offset, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, offset]);

  const handlePress = () => {
    if (disabled) return;
    onChange?.(!value);
  };

  const thumbTranslate = offset.interpolate({
    inputRange: [0, 1],
    outputRange: [0, TRACK_WIDTH - THUMB_SIZE - THUMB_PADDING * 2],
  });

  const trackBackground = offset.interpolate({
    inputRange: [0, 1],
    outputRange: [semantic.background.disabled, '#127f30'],
  });

  return (
    <TouchableWithoutFeedback onPress={handlePress} disabled={disabled}>
      <Animated.View
        style={[
          styles.track,
          { backgroundColor: trackBackground },
          disabled && styles.disabled,
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            { transform: [{ translateX: thumbTranslate }] },
          ]}
        >
          {value && (
            <View style={styles.checkWrap}>
              <Icon name="check" size={16} color="primary" />
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    padding: THUMB_PADDING,
    justifyContent: 'center',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
