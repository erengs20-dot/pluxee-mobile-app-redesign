/**
 * Pluxee Design System - Border Radius Tokens
 *
 * Source: https://designsystem.pluxee.app
 * Extracted from: --chakra-radii-* CSS variables
 *
 * Pluxee Chakra UI default radius scale'ini birebir kullanıyor.
 *
 * ⚠️ ÖNEMLİ NOT: Pluxee'nin Button component'i border-radius kullanmaz!
 * Bunun yerine clip-path ile chamfered corner (45° kesik köşe) yapılır.
 * Bu Pluxee'nin imza tasarım kararı. Button için ayrı bir mekanizma var
 * (bkz: utils/chamferedPath.ts).
 *
 * Bu radius token'ları diğer komponentler (Card, Input, Modal vb.) için.
 *
 * KULLANIM:
 *   <View style={{ borderRadius: radius.md }}>      // 6px
 *   <View style={{ borderRadius: radius.full }}>    // tam yuvarlak (Avatar, pill Tag)
 */

export const radius = {
  none: 0,
  sm: 2, // 0.125rem - çok küçük
  base: 4, // 0.25rem - default
  md: 6, // 0.375rem - input, küçük element
  lg: 8, // 0.5rem
  xl: 12, // 0.75rem - card
  '2xl': 16, // 1rem - large card
  '3xl': 24, // 1.5rem - modal, bottomSheet
  full: 9999, // pill / avatar / circle
} as const;

export type Radius = keyof typeof radius;