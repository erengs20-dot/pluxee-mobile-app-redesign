/**
 * IconButton - Pluxee Design System
 *
 * Sadece icon içeren tıklanabilir button. Square (kare) şeklinde.
 *
 * KULLANIM:
 *   <IconButton iconName="search" onPress={() => {}} />
 *   <IconButton iconName="xmark" variant="ghost" size="md" onPress={onClose} />
 *   <IconButton iconName="heartFilled" color="error" variant="filled" />
 */

import React from 'react';
import { Pressable, View, type ViewStyle, type GestureResponderEvent } from 'react-native';
import { Icon, type IconName } from '../Icon';
import { semantic } from '../../../theme/semantic';
import { spacing } from '../../../tokens/spacing';
import { radius } from '../../../tokens/radius';

export type IconButtonVariant = 'filled' | 'outlined' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps {
  iconName: IconName | string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** Icon rengi (semantic.icon'dan) */
  color?: 'primary' | 'secondary' | 'inverse' | 'success' | 'warning' | 'error' | 'info';
  disabled?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  accessibilityLabel?: string;
  style?: ViewStyle;
}

const SIZE_MAP = {
  sm: { container: spacing[8], icon: 16 as const }, // 32px
  md: { container: spacing[10], icon: 24 as const }, // 40px
  lg: { container: spacing[12], icon: 24 as const }, // 48px
} as const;

export function IconButton({
  iconName,
  variant = 'ghost',
  size = 'md',
  color = 'primary',
  disabled = false,
  onPress,
  accessibilityLabel,
  style,
}: IconButtonProps) {
  const sizeConfig = SIZE_MAP[size];

  const baseContainer: ViewStyle = {
    width: sizeConfig.container,
    height: sizeConfig.container,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full, // tam yuvarlak
    opacity: disabled ? 0.4 : 1,
  };

  const variantStyles: Record<IconButtonVariant, ViewStyle> = {
    filled: {
      backgroundColor: semantic.brand.primary,
    },
    outlined: {
      borderWidth: 2,
      borderColor: semantic.border.primary,
      backgroundColor: 'transparent',
    },
    ghost: {
      backgroundColor: 'transparent',
    },
  };

  // Filled variant'ta icon beyaz olur (koyu zemin için)
  const iconColor = variant === 'filled' ? 'inverse' : color;

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? `${iconName} button`}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        baseContainer,
        variantStyles[variant],
        pressed && !disabled ? { opacity: 0.7 } : null,
        style,
      ]}
    >
      <View>
        <Icon name={iconName} size={sizeConfig.icon} color={iconColor} />
      </View>
    </Pressable>
  );
}
