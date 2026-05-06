/**
 * Button - Pluxee Design System
 *
 * Pluxee'nin imza Button component'i. 10 variant, 3 size desteği.
 * Default variant 'chamfered' — sağ-alt köşe 45° kesik (Pluxee imzası).
 *
 * KULLANIM:
 *   <Button onPress={handleSave}>Kaydet</Button>
 *   <Button variant="secondaryFilled" size="md">İptal</Button>
 *   <Button variant="primaryOutlined" leftIcon={<Icon />}>İndir</Button>
 *   <Button variant="icon" size="md"><HeartIcon /></Button>
 */

import React, { useState } from 'react';
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  type LayoutChangeEvent,
  type GestureResponderEvent,
} from 'react-native';
import { ChamferedShape } from './ChamferedShape';
import { getButtonStyles, type ButtonVariant, type ButtonSize } from './buttonStyles';
import { semantic } from '../../../theme/semantic';

export interface ButtonProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
  isActive?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  // Erişilebilirlik için
  accessibilityLabel?: string;
}

export function Button({
  children,
  variant = 'chamfered',
  size = 'lg',
  disabled = false,
  isLoading = false,
  isActive = false,
  leftIcon,
  rightIcon,
  onPress,
  accessibilityLabel,
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // State'i hesapla — öncelik sırasıyla
  const state = disabled
    ? 'disabled'
    : isLoading
      ? 'loading'
      : isPressed
        ? 'pressed'
        : isActive
          ? 'active'
          : 'default';

  const styles = getButtonStyles({ variant, size, state });
  const isChamfered = variant === 'chamfered';

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setDimensions({ width, height });
  };

  return (
    <Pressable
      onPress={disabled || isLoading ? undefined : onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onLayout={handleLayout}
      disabled={disabled || isLoading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: disabled || isLoading, busy: isLoading }}
      style={styles.container}
    >
      {/* Chamfered variant için arka plan SVG'si */}
      {isChamfered && dimensions.width > 0 && styles.shapeFill && (
        <ChamferedShape
          width={dimensions.width}
          height={dimensions.height}
          fill={styles.shapeFill}
          stroke={styles.shapeStroke}
        />
      )}

      {/* İçerik (icon + text) */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          // chamfered'da SVG'nin üzerinde dursun
          zIndex: 1,
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={styles.text.color || semantic.text.primary} />
        ) : (
          <>
            {leftIcon}
            {children && <Text style={styles.text}>{children}</Text>}
            {rightIcon}
          </>
        )}
      </View>
    </Pressable>
  );
}
