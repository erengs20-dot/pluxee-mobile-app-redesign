/**
 * Icon - Pluxee Design System
 *
 * Pluxee CDN'inden SVG ikonları yükleyip render eder.
 * react-native-svg'nin SvgUri component'ini kullanır.
 *
 * KULLANIM:
 *   <Icon name="home" />
 *   <Icon name="card" size={16} color="primary" />
 *   <Icon name="check" size={24} color="success" />
 *
 * NOT: İlk yüklemede icon network'ten gelir, sonra cache'lenir.
 * Offline'da çalışmaz! Production'da local sprite/asset kullanmak daha iyi.
 * (Şimdilik prototype amaçlı CDN kullanıyoruz.)
 */

import React from 'react';
import { View, ActivityIndicator, type ViewStyle } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { semantic } from '../../../theme/semantic';
import { ICON_CDN_BASE } from '../../../index';
import type { IconName } from './iconNames';

// Pluxee'nin standart icon boyutları
export type IconSize = 16 | 24;

// semantic.icon altındaki anahtarlar
type IconColor = keyof typeof semantic.icon;

export interface IconProps {
  name: IconName | string; // string fallback (custom icon ismi vermek için)
  size?: IconSize;
  /**
   * Icon rengi - semantic.icon'dan bir anahtar.
   * NOT: Bu renk SVG'nin currentColor'ını override eder.
   * Eğer SVG fill="currentColor" kullanmıyorsa renk değişmez.
   */
  color?: IconColor;
  /** Custom hex color (semantic dışında bir renk için) */
  tint?: string;
  style?: ViewStyle;
}

export function Icon({
  name,
  size = 24,
  color = 'primary',
  tint,
  style,
}: IconProps) {
  const url = `${ICON_CDN_BASE}/figma/${name}${size}.svg`;
  const colorValue = tint ?? semantic.icon[color];

  return (
    <View style={[{ width: size, height: size }, style]}>
      <SvgUri
        uri={url}
        width={size}
        height={size}
        color={colorValue}
        // Loading state için minimal placeholder
        // Eğer icon yüklenemezse bu görünmez (sessiz fail)
        onError={() => {
          if (__DEV__) {
            console.warn(`[Icon] Failed to load: ${name}${size} from ${url}`);
          }
        }}
      />
    </View>
  );
}
