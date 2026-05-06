/**
 * Button - Style Matrix
 *
 * 10 variant × 3 size × 6 state kombinasyonunun saf style fonksiyonları.
 * Bu dosya component'ten ayrı tutuluyor — saf logic, kolay test edilebilir.
 *
 * VARIANTS:
 *   chamfered (default)         → Pluxee imza, sağ-alt köşe kesik
 *   primaryFilled               → Yeşil dolgulu
 *   secondaryFilled             → Mavi dolgulu
 *   primaryOutlined             → Yeşil çerçeve
 *   secondaryOutlined           → Mavi çerçeve
 *   primaryOutlinedWhite        → Beyaz çerçeve (koyu zemin için)
 *   secondaryOutlinedWhite      → Mavi-beyaz çerçeve
 *   primaryTextOnly             → Sadece metin
 *   secondaryTextOnly           → Sadece metin (mavi)
 *   icon                        → Sadece icon
 */

import type { TextStyle, ViewStyle } from 'react-native';
import { semantic } from '../../../theme/semantic';
import { spacing } from '../../../tokens/spacing';
import { typography } from '../../../tokens/typography';

export type ButtonVariant =
  | 'chamfered'
  | 'primaryFilled'
  | 'secondaryFilled'
  | 'primaryOutlined'
  | 'secondaryOutlined'
  | 'primaryOutlinedWhite'
  | 'secondaryOutlinedWhite'
  | 'primaryTextOnly'
  | 'secondaryTextOnly'
  | 'icon';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonState = 'default' | 'hover' | 'pressed' | 'disabled' | 'loading' | 'active';

interface ButtonStyleResult {
  container: ViewStyle;
  text: TextStyle;
  // Chamfered variant için Pressable'ın altında kalan SVG'nin rengi
  shapeFill?: string;
  shapeStroke?: string;
}

// ===== Size Map =====
// Her size için yükseklik, padding, font değerleri
const SIZE_MAP = {
  sm: {
    height: spacing[8], // 32px
    paddingHorizontal: spacing[3], // 12px
    text: typography.body.smallBold,
    iconSize: 16,
  },
  md: {
    height: spacing[10], // 40px
    paddingHorizontal: spacing[4], // 16px
    text: typography.body.mediumBold,
    iconSize: 20,
  },
  lg: {
    height: spacing[12], // 48px - DEFAULT, Pluxee'nin standart button yüksekliği
    paddingHorizontal: spacing[5], // 20px
    text: typography.body.largeBold,
    iconSize: 24,
  },
} as const;

/**
 * Button stilini hesaplar.
 *
 * @example
 *   const styles = getButtonStyles({ variant: 'chamfered', size: 'lg', state: 'default' });
 *   <Pressable style={styles.container}>...
 */
export function getButtonStyles({
  variant,
  size,
  state,
}: {
  variant: ButtonVariant;
  size: ButtonSize;
  state: ButtonState;
}): ButtonStyleResult {
  const sizeConfig = SIZE_MAP[size];
  const isDisabled = state === 'disabled';
  const isPressed = state === 'pressed';

  // ===== Container base =====
  const baseContainer: ViewStyle = {
    height: sizeConfig.height,
    paddingHorizontal: sizeConfig.paddingHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
  };

  const baseText: TextStyle = {
    ...sizeConfig.text,
  };

  // ===== Variant-specific stilleri =====
  switch (variant) {
    case 'chamfered':
      return {
        container: { ...baseContainer, backgroundColor: 'transparent' },
        text: {
          ...baseText,
          color: isDisabled ? semantic.text.disabled : semantic.text.inverse,
        },
        shapeFill: isDisabled
          ? semantic.background.disabled
          : isPressed
            ? semantic.cta.primaryPressed
            : semantic.brand.primary,
      };

    case 'primaryFilled':
      return {
        container: {
          ...baseContainer,
          backgroundColor: isDisabled
            ? semantic.background.disabled
            : isPressed
              ? semantic.cta.primaryPressed
              : semantic.cta.primary,
        },
        text: {
          ...baseText,
          color: isDisabled ? semantic.text.disabled : semantic.text.primary,
        },
      };

    case 'secondaryFilled':
      return {
        container: {
          ...baseContainer,
          backgroundColor: isDisabled
            ? semantic.background.disabled
            : isPressed
              ? semantic.cta.secondaryPressed
              : semantic.cta.secondary,
        },
        text: {
          ...baseText,
          color: isDisabled ? semantic.text.disabled : semantic.text.inverse,
        },
      };

    case 'primaryOutlined':
      return {
        container: {
          ...baseContainer,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: isDisabled ? semantic.border.disabled : semantic.cta.primary,
        },
        text: {
          ...baseText,
          color: isDisabled ? semantic.text.disabled : semantic.text.primary,
        },
      };

    case 'secondaryOutlined':
      return {
        container: {
          ...baseContainer,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: isDisabled ? semantic.border.disabled : semantic.cta.secondary,
        },
        text: {
          ...baseText,
          color: isDisabled ? semantic.text.disabled : semantic.cta.secondary,
        },
      };

    case 'primaryOutlinedWhite':
      return {
        container: {
          ...baseContainer,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: semantic.border.inverse,
        },
        text: {
          ...baseText,
          color: semantic.text.inverse,
        },
      };

    case 'secondaryOutlinedWhite':
      return {
        container: {
          ...baseContainer,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: semantic.border.inverse,
        },
        text: {
          ...baseText,
          color: semantic.text.inverse,
        },
      };

    case 'primaryTextOnly':
      return {
        container: { ...baseContainer, backgroundColor: 'transparent' },
        text: {
          ...baseText,
          color: isDisabled ? semantic.text.disabled : semantic.text.primary,
        },
      };

    case 'secondaryTextOnly':
      return {
        container: { ...baseContainer, backgroundColor: 'transparent' },
        text: {
          ...baseText,
          color: isDisabled ? semantic.text.disabled : semantic.cta.secondary,
        },
      };

    case 'icon':
      return {
        container: {
          ...baseContainer,
          width: sizeConfig.height, // square
          paddingHorizontal: 0,
        },
        text: {
          ...baseText,
          color: isDisabled ? semantic.text.disabled : semantic.icon.primary,
        },
      };

    default:
      return { container: baseContainer, text: baseText };
  }
}

export { SIZE_MAP };
