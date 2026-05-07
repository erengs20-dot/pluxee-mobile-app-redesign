/**
 * Text - Pluxee Design System
 *
 * Tip-güvenli typography component'i. Tüm Pluxee typography token'larına
 * variant prop ile erişim sağlar. Renkler de semantic token'lardan gelir.
 *
 * KULLANIM:
 *   <Text>Default body</Text>
 *   <Text variant="title.mobilePage">Sayfa Başlığı</Text>
 *   <Text variant="body.medium" color="secondary">Açıklama metni</Text>
 *   <Text variant="body.smallBold" color="error">Hata mesajı</Text>
 *
 * VARIANT FORMAT: "{kategori}.{varyant}"
 *   örn: "title.mobilePage", "body.largeBold", "subtitle.mobileMain"
 *
 * COLOR PROP: semantic.text içindeki anahtarlar
 *   primary | secondary | tertiary | inverse | disabled |
 *   success | warning | error | info | link | highlight
 */

import React from 'react';
import {
  Text as RNText,
  type TextProps as RNTextProps,
  type TextStyle,
  type StyleProp,
} from 'react-native';
import { typography } from '../../../tokens/typography';
import { semantic } from '../../../theme/semantic';

// Variant string'leri: "title.mobilePage" gibi
type TypographyVariant =
  | `heroTitle.${keyof typeof typography.heroTitle}`
  | `title.${keyof typeof typography.title}`
  | `subtitle.${keyof typeof typography.subtitle}`
  | `body.${keyof typeof typography.body}`;

// Color prop: semantic.text içindeki anahtarlar
type TextColor = keyof typeof semantic.text;

export interface TextProps extends Omit<RNTextProps, 'style'> {
  variant?: TypographyVariant;
  color?: TextColor;
  /** Ek custom style (token sistemini bozmadan ufak override için) */
  style?: StyleProp<TextStyle>;
  /** Hizalama kısayolu */
  align?: 'left' | 'center' | 'right';
}

/**
 * Variant string'inden ilgili typography style objesini çeker.
 * "body.medium" → typography.body.medium
 */
function resolveVariant(variant: TypographyVariant): TextStyle {
  const [category, key] = variant.split('.') as [
    keyof typeof typography,
    string,
  ];
  return (typography[category] as Record<string, TextStyle>)[key];
}

export function Text({
  variant = 'body.medium',
  color = 'primary',
  align,
  style,
  children,
  ...rest
}: TextProps) {
  const variantStyle = resolveVariant(variant);
  const colorValue = semantic.text[color];

  return (
    <RNText
      {...rest}
      style={[
        variantStyle,
        { color: colorValue },
        align ? { textAlign: align } : null,
        style,
      ]}
    >
      {children}
    </RNText>
  );
}
