/**
 * Pluxee Design System - Shadow Tokens
 *
 * Source: https://designsystem.pluxee.app
 * Extracted from: --chakra-shadows-* CSS variables (custom Pluxee shadows)
 *
 * 🎨 PLUXEE'NİN İMZA SHADOW SİSTEMİ
 *
 * Pluxee 5 custom shadow tanımlamış (Chakra default'larını override etmiş):
 *   small, medium, large → blur'suz, OFFSET shadow (flat/brutalist)
 *   bottom, side         → soft blur shadow
 *
 * 🔥 ÖZELLİK: small/medium/large blur=0 yani sharp shadows!
 * Bu Pluxee'nin imza tasarımı — modern flat aesthetic.
 *
 * Renk: #221c46 (brand navy / deepBlue.12) — siyah değil!
 * Opacity:
 *   33 hex = ~20% (small/medium/large için)
 *   12 hex = ~7%  (bottom/side için)
 *
 * KULLANIM (React Native):
 *   <View style={shadows.small}>...</View>
 *
 * NOT: React Native shadow API platform-bağımlı:
 *   - iOS: shadowColor, shadowOffset, shadowOpacity, shadowRadius
 *   - Android: elevation (otomatik calculate edilen)
 *
 * Bu yüzden her shadow token'ı hem iOS hem Android için optimize edilmiş.
 */

import type { ViewStyle } from 'react-native';

const PLUXEE_SHADOW_COLOR = '#221c46';

export const shadows = {
  /**
   * Small — 1px offset, 0px blur, 20% opacity
   * Web: 1px 1px 0px 0px #221c4633
   * Kullanım: Küçük card'lar, tag'ler, hafif elevation
   */
  small: {
    shadowColor: PLUXEE_SHADOW_COLOR,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 1, // Android
  } satisfies ViewStyle,

  /**
   * Medium — 2px offset, 0px blur, 20% opacity
   * Web: 2px 2px 0px 0px #221c4633
   * Kullanım: Standart card, button hover state
   */
  medium: {
    shadowColor: PLUXEE_SHADOW_COLOR,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 2,
  } satisfies ViewStyle,

  /**
   * Large — 4px offset, 0px blur, 20% opacity
   * Web: 4px 4px 0px 0px #221c4633
   * Kullanım: Featured card, prominent CTA
   */
  large: {
    shadowColor: PLUXEE_SHADOW_COLOR,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 4,
  } satisfies ViewStyle,

  /**
   * Bottom — Soft shadow, sadece alt tarafta blur
   * Web: 0px -1px 8px 0px #221c4612
   * Kullanım: Sticky header'lar, bottom sheet üst kenarı
   */
  bottom: {
    shadowColor: PLUXEE_SHADOW_COLOR,
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  } satisfies ViewStyle,

  /**
   * Side — Soft shadow, sadece sağ tarafta blur
   * Web: 1px 0px 8px 0px #221c4612
   * Kullanım: Drawer, sidebar elevation
   */
  side: {
    shadowColor: PLUXEE_SHADOW_COLOR,
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  } satisfies ViewStyle,
} as const;

export type Shadow = keyof typeof shadows;