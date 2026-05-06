/**
 * @pluxee/design-system - Public API
 *
 * Bu dosya design system paketinin tek giriş noktasıdır (entry point).
 * Tüm token'lar, theme, component'ler ve utility'ler buradan export edilir.
 *
 * KULLANIM:
 *   import { semantic, typography, spacing } from '@pluxee/design-system';
 *   import { Button } from '@pluxee/design-system';
 *   import { createPluxeeButtonPath } from '@pluxee/design-system';
 */

// ===== TOKENS =====
// Ham design token'lar
export { colors } from './tokens/colors';
export type { ColorPalette, CoreColors } from './tokens/colors';

export { typography } from './tokens/typography';
export type {
  Typography,
  TypographyCategory,
  HeroTitleVariant,
  TitleVariant,
  SubtitleVariant,
  BodyVariant,
} from './tokens/typography';

export { spacing, space } from './tokens/spacing';
export type { Spacing, SpaceAlias } from './tokens/spacing';

export { radius } from './tokens/radius';
export type { Radius } from './tokens/radius';

export { shadows } from './tokens/shadows';
export type { Shadow } from './tokens/shadows';

export {
  illustrations,
  getIllustrationUrl,
  ILLUSTRATION_CDN_BASE,
} from './tokens/illustrations';
export type { IllustrationCategory, IllustrationName } from './tokens/illustrations';

// ===== THEME =====
// Semantic token'lar (component'lerin kullanacağı bağlamsal renkler)
export { semantic, getStatusColors } from './theme/semantic';
export type { Semantic, SemanticCategory, StatusType } from './theme/semantic';

// ===== UTILITIES =====
// Yardımcı fonksiyonlar
export {
  createChamferedPath,
  createPluxeeButtonPath,
  createDiamondPath,
} from './utils/chamferedPath';

// ===== CONSTANTS =====
// Sabitler
export const FONT_FAMILY = 'TT Travels';

export const FONT_CDN_BASE =
  'https://visualassets.designsystem.pluxee.app/desy-assets/cdn-assets-prd/fonts';

export const ICON_CDN_BASE =
  'https://visualassets.designsystem.pluxee.app/desy-assets/cdn-assets-prd/icons';

export const ICON_SPRITE_URL = `${ICON_CDN_BASE}/sprite.svg`;

/**
 * Tek bir icon SVG'sinin URL'ini üretir.
 *
 * Pluxee icon sprite'tan tek tek erişim için:
 *   /icons/figma/{name}{size}.svg
 *
 * @example
 *   getIconUrl('home', 24) // => '.../icons/figma/home24.svg'
 */
export function getIconUrl(iconName: string, size: 16 | 24 = 24): string {
  return `${ICON_CDN_BASE}/figma/${iconName}${size}.svg`;
}

// ===== THEME MASTER OBJECT =====
// Pratiklik için tüm token'ları tek bir obje altında topluyoruz.
// (Opsiyonel kullanım — bireysel import'lar tavsiye edilir, daha tree-shaking dostu)
import { colors as _colors } from './tokens/colors';
import { typography as _typography } from './tokens/typography';
import { spacing as _spacing, space as _space } from './tokens/spacing';
import { radius as _radius } from './tokens/radius';
import { shadows as _shadows } from './tokens/shadows';
import { semantic as _semantic } from './theme/semantic';

export const theme = {
  colors: _colors,
  typography: _typography,
  spacing: _spacing,
  space: _space,
  radius: _radius,
  shadows: _shadows,
  semantic: _semantic,
} as const;

export type Theme = typeof theme;
// ===== COMPONENTS =====
export { Button } from './components/atoms/Button';
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  ButtonState,
} from './components/atoms/Button';

// ===== Text Component =====
export { Text } from './components/atoms/Text';
export type { TextProps } from './components/atoms/Text';

// ===== Icon Component =====
export { Icon, iconNames } from './components/atoms/Icon';
export type { IconProps, IconSize, IconName } from './components/atoms/Icon';

// ===== IconButton =====
export { IconButton } from './components/atoms/IconButton';
export type { IconButtonProps, IconButtonVariant, IconButtonSize } from './components/atoms/IconButton';

// ===== Tag =====
export { Tag } from './components/atoms/Tag';
export type { TagProps, TagVariant } from './components/atoms/Tag';

// ===== Avatar =====
export { Avatar } from './components/atoms/Avatar';
export type { AvatarProps, AvatarSize } from './components/atoms/Avatar';

// ===== Input =====
export { Input } from './components/atoms/Input';
export type { InputProps } from './components/atoms/Input';

// ===== Background =====
export { Background } from './components/atoms/Background';
export type { BackgroundProps, BackgroundVariant, BackgroundColorTheme } from './components/atoms/Background';
