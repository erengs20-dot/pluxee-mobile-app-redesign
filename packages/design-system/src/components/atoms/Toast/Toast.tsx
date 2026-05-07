import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { semantic } from '../../../theme/semantic';
import { spacing } from '../../../tokens/spacing';
import { radius } from '../../../tokens/radius';
import { Icon } from '../Icon';
import { Text } from '../Text';

export type ToastVariant = 'success' | 'info' | 'warning' | 'error';

export interface ToastProps {
  variant?: ToastVariant;
  title: string;
  message?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
}

interface VariantStyle {
  background: string;
  iconCircle: string;
  iconName: string;
}

const VARIANT_STYLES: Record<ToastVariant, VariantStyle> = {
  success: {
    background: semantic.background.successBanner,
    iconCircle: '#127f30',
    iconName: 'check',
  },
  info: {
    background: semantic.background.info,
    iconCircle: '#0066cc',
    iconName: 'info',
  },
  warning: {
    background: semantic.background.warning,
    iconCircle: '#cc8800',
    iconName: 'warning',
  },
  error: {
    background: semantic.background.error,
    iconCircle: '#cc0000',
    iconName: 'xmark',
  },
};

export function Toast({
  variant = 'success',
  title,
  message,
  onClose,
  showCloseButton = true,
}: ToastProps) {
  const variantStyle = VARIANT_STYLES[variant];

  return (
    <View style={[styles.container, { backgroundColor: variantStyle.background }]}>
      <View style={[styles.iconCircle, { backgroundColor: variantStyle.iconCircle }]}>
        <Icon name={variantStyle.iconName} size={16} color="primary" />
      </View>

      <View style={styles.textWrap}>
        <Text variant="body.mediumBold" color="primary" numberOfLines={1}>
          {title}
        </Text>
        {message && (
          <Text variant="body.smallMedium" color="primary" style={styles.message}>
            {message}
          </Text>
        )}
      </View>

      {showCloseButton && (
        <TouchableOpacity onPress={onClose} hitSlop={8} style={styles.closeBtn}>
          <Icon name="xmark" size={16} color="primary" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing[4],
    borderRadius: radius.lg,
    gap: spacing[3],
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
  message: {
    opacity: 0.85,
  },
  closeBtn: {
    padding: spacing[1],
    marginTop: -spacing[1],
    marginRight: -spacing[1],
  },
});
