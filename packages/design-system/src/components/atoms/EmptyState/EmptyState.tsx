import React from 'react';
import { StyleSheet, View } from 'react-native';
import { semantic } from '../../../theme/semantic';
import { spacing } from '../../../tokens/spacing';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Text } from '../Text';

export interface EmptyStateProps {
  iconName?: string;
  title: string;
  message?: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export function EmptyState({
  iconName,
  title,
  message,
  actionLabel,
  onActionPress,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {iconName && (
        <View style={styles.iconWrap}>
          <Icon name={iconName} size={24} color="primary" />
        </View>
      )}

      <Text variant="title.mobileMain" color="primary" style={styles.title}>
        {title}
      </Text>

      {message && (
        <Text variant="body.largeMedium" color="tertiary" style={styles.message}>
          {message}
        </Text>
      )}

      {actionLabel && onActionPress && (
        <View style={styles.actionWrap}>
          <Button variant="primaryFilled" size="md" onPress={onActionPress}>
            {actionLabel}
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[8],
    paddingHorizontal: spacing[6],
    gap: spacing[3],
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: semantic.background.disabled,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[2],
  },
  title: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    maxWidth: 280,
  },
  actionWrap: {
    marginTop: spacing[4],
  },
});
