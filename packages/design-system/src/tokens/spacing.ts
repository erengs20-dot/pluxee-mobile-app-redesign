/**
 * Pluxee Design System - Spacing Tokens
 *
 * Source: https://designsystem.pluxee.app
 * Extracted from: --chakra-space-* CSS variables
 *
 * Pluxee Chakra UI default spacing scale'ini birebir kullanıyor.
 * Bu modern, endüstri-standart 4px-tabanlı bir scale.
 *
 * NOT: Web'de rem cinsinden (1rem = 16px), React Native'de
 * unitless number olarak px değerinde kullanıyoruz.
 *
 * KULLANIM:
 *   <View style={{ padding: spacing[4] }}>     // 16px
 *   <View style={{ marginVertical: spacing[6] }}>  // 24px
 *   gap: spacing[2]  // 8px
 */

export const spacing = {
  px: 1, // 1px
  0: 0, // 0
  0.5: 2, // 2px - hairline
  1: 4, // 4px - minimum
  1.5: 6, // 6px
  2: 8, // 8px - icon/text gap
  2.5: 10, // 10px
  3: 12, // 12px - compact gap
  3.5: 14, // 14px
  4: 16, // 16px - standart padding
  5: 20, // 20px
  6: 24, // 24px - card padding
  7: 28, // 28px
  8: 32, // 32px - section gap
  9: 36, // 36px
  10: 40, // 40px - large gap
  12: 48, // 48px - BUTTON HEIGHT (lg)
  14: 56, // 56px
  16: 64, // 64px - large section
  20: 80, // 80px
  24: 96, // 96px
  28: 112, // 112px
  32: 128, // 128px
  36: 144, // 144px
  40: 160, // 160px
  44: 176, // 176px
  48: 192, // 192px
  52: 208, // 208px
  56: 224, // 224px
  60: 240, // 240px
  64: 256, // 256px
  72: 288, // 288px
  80: 320, // 320px
  96: 384, // 384px
} as const;

/**
 * Semantic spacing aliases — daha okunaklı isimler
 * (opsiyonel, isteğe bağlı kullanın)
 */
export const space = {
  none: spacing[0], // 0
  xxxs: spacing[0.5], // 2px
  xxs: spacing[1], // 4px
  xs: spacing[2], // 8px
  sm: spacing[3], // 12px
  md: spacing[4], // 16px
  lg: spacing[6], // 24px
  xl: spacing[8], // 32px
  xxl: spacing[12], // 48px
  xxxl: spacing[16], // 64px
} as const;

export type Spacing = keyof typeof spacing;
export type SpaceAlias = keyof typeof space;