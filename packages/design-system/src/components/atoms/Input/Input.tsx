/**
 * Input - Pluxee Design System
 *
 * Text input wrapper. Label, error message, helper text destekli.
 *
 * KULLANIM:
 *   <Input label="Ad" placeholder="Adınızı girin" />
 *   <Input label="E-posta" value={email} onChangeText={setEmail} />
 *   <Input label="Şifre" secureTextEntry helperText="En az 8 karakter" />
 *   <Input label="E-posta" error="Geçerli bir e-posta girin" />
 *   <Input leftIconName="search" placeholder="Ara..." />
 */

import React, { useState } from 'react';
import {
  TextInput,
  View,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { Text } from '../Text';
import { Icon, type IconName } from '../Icon';
import { semantic } from '../../../theme/semantic';
import { spacing } from '../../../tokens/spacing';
import { radius } from '../../../tokens/radius';
import { typography } from '../../../tokens/typography';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  /** Hata mesajı varsa input kırmızı border + altında error mesajı */
  error?: string;
  /** Hata yoksa input altında gri yardım metni */
  helperText?: string;
  leftIconName?: IconName | string;
  rightIconName?: IconName | string;
  /** Container style override */
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  helperText,
  leftIconName,
  rightIconName,
  placeholder,
  value,
  onFocus,
  onBlur,
  containerStyle,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = Boolean(error);

  const borderColor = hasError
    ? semantic.border.error
    : isFocused
      ? semantic.outline.focus
      : semantic.border.secondary;

  return (
    <View style={containerStyle}>
      {/* Label */}
      {label && (
        <Text
          variant="body.smallBold"
          color="primary"
          style={{ marginBottom: spacing[1] }}
        >
          {label}
        </Text>
      )}

      {/* Input container */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1.5,
          borderColor,
          borderRadius: radius.md,
          backgroundColor: semantic.surface[1],
          paddingHorizontal: spacing[3],
          minHeight: spacing[12], // 48px
          gap: spacing[2],
        }}
      >
        {leftIconName && (
          <Icon name={leftIconName} size={16} color="tertiary" />
        )}

        <TextInput
          {...rest}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={semantic.text.tertiary}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          style={{
            flex: 1,
            ...typography.body.medium,
            color: semantic.text.primary,
            paddingVertical: spacing[3],
          }}
        />

        {rightIconName && (
          <Icon name={rightIconName} size={16} color="tertiary" />
        )}
      </View>

      {/* Error veya helper text */}
      {(error || helperText) && (
        <Text
          variant="body.smallMedium"
          color={hasError ? 'error' : 'secondary'}
          style={{ marginTop: spacing[1] }}
        >
          {error || helperText}
        </Text>
      )}
    </View>
  );
}
