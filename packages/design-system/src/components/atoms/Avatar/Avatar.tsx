/**
 * Avatar - Pluxee Design System
 *
 * Yuvarlak profil avatarı. Image varsa onu, yoksa initials gösterir.
 *
 * KULLANIM:
 *   <Avatar name="Eren Goktas" />
 *   <Avatar name="Ali Veli" size="lg" />
 *   <Avatar imageUrl="https://..." name="Profil" />
 *   <Avatar iconName="person" />
 */

import React from 'react';
import { View, Image, type ViewStyle } from 'react-native';
import { Text } from '../Text';
import { Icon, type IconName } from '../Icon';
import { semantic } from '../../../theme/semantic';
import { radius } from '../../../tokens/radius';
import { spacing } from '../../../tokens/spacing';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  /** Avatar resmi URL'i. Verilirse Image gösterilir. */
  imageUrl?: string;
  /** İsim - initials oluşturmak için ("Eren Goktas" → "EG") */
  name?: string;
  /** Resim ve isim yoksa fallback icon (default: 'person') */
  iconName?: IconName | string;
  size?: AvatarSize;
  /** Background rengi (initials/icon variant için) */
  backgroundColor?: string;
  style?: ViewStyle;
}

const SIZE_MAP: Record<AvatarSize, { container: number; iconSize: 16 | 24; textVariant: 'body.smallBold' | 'body.mediumBold' | 'body.largeBold' | 'title.mobileMain' }> = {
  sm: { container: spacing[8], iconSize: 16, textVariant: 'body.smallBold' }, // 32px
  md: { container: spacing[10], iconSize: 24, textVariant: 'body.mediumBold' }, // 40px
  lg: { container: spacing[12], iconSize: 24, textVariant: 'body.largeBold' }, // 48px
  xl: { container: spacing[16], iconSize: 24, textVariant: 'title.mobileMain' }, // 64px
};

/**
 * "Eren Goktas" → "EG"
 * "Ahmet" → "A"
 * "ali veli yıldız" → "AY" (ilk + son)
 */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  const first = parts[0][0];
  const last = parts[parts.length - 1][0];
  return `${first}${last}`.toUpperCase();
}

export function Avatar({
  imageUrl,
  name,
  iconName = 'person',
  size = 'md',
  backgroundColor,
  style,
}: AvatarProps) {
  const sizeConfig = SIZE_MAP[size];

  const containerStyle: ViewStyle = {
    width: sizeConfig.container,
    height: sizeConfig.container,
    borderRadius: radius.full,
    backgroundColor: backgroundColor ?? semantic.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  };

  // 1. Önce image dene
  if (imageUrl) {
    return (
      <View style={[containerStyle, style]}>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
    );
  }

  // 2. Image yoksa initials
  if (name) {
    return (
      <View style={[containerStyle, style]}>
        <Text variant={sizeConfig.textVariant} color="inverse">
          {getInitials(name)}
        </Text>
      </View>
    );
  }

  // 3. Hiçbiri yoksa icon
  return (
    <View style={[containerStyle, style]}>
      <Icon name={iconName} size={sizeConfig.iconSize} color="inverse" />
    </View>
  );
}
