/**
 * Tag - Pluxee Design System
 */

import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { Text } from '../Text';
import { Icon, type IconName } from '../Icon';
import { semantic } from '../../../theme/semantic';
import { spacing } from '../../../tokens/spacing';
import { radius } from '../../../tokens/radius';

export type TagVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'highlight';

type TextColorKey = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'link';
type IconColorKey = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'highlight';

interface VariantStyle {
  bg: string;
  text: TextColorKey;
  icon: IconColorKey;
}

const VARIANT_COLORS: Record<TagVariant, VariantStyle> = {
  default: { bg: semantic.tag.defaultEnable, text: 'primary', icon: 'primary' },
  success: { bg: semantic.background.success, text: 'success', icon: 'success' },
  warning: { bg: semantic.background.warning, text: 'warning', icon: 'warning' },
  error: { bg: semantic.tag.errorEnable, text: 'error', icon: 'error' },
  info: { bg: semantic.background.info, text: 'info', icon: 'info' },
  highlight: { bg: semantic.tag.interactive, text: 'link', icon: 'highlight' },
};

export interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
  iconName?: IconName | string;
  style?: ViewStyle;
}

export function Tag({ children, variant = 'default', iconName, style }: TagProps) {
  const config = VARIANT_COLORS[variant];

  return (
    <View
      style={[
        {
          backgroundColor: config.bg,
          paddingHorizontal: spacing[2],
          paddingVertical: spacing[1],
          borderRadius: radius.sm,
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing[1],
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      {iconName && <Icon name={iconName} size={16} color={config.icon} />}
      <Text variant="body.smallBold" color={config.text}>
        {children}
      </Text>
    </View>
  );
}
