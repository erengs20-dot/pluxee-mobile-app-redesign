/**
 * HeaderBar - Anasayfa ust kismi
 * Sol: Pluxee logo
 * Sag: Bildirim ikonu
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Icon, semantic, spacing, radius } from '@pluxee/design-system';

interface HeaderBarProps {
  hasNotification?: boolean;
  onNotificationPress?: () => void;
}

export function HeaderBar({ hasNotification = true, onNotificationPress }: HeaderBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <Text variant="title.mobileMain" color="primary" style={styles.logoText}>
          pluxee
        </Text>
        <View style={styles.logoDot} />
      </View>

      <TouchableOpacity
        style={styles.notificationBtn}
        onPress={onNotificationPress}
        activeOpacity={0.7}
      >
        <Icon name="notifications" size={24} color="primary" />
        {hasNotification && <View style={styles.notificationDot} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[1],
  },
  logoWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing[1],
  },
  logoText: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -1,
  },
  logoDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: semantic.brand.secondary,
    marginBottom: spacing[2],
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.lg,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff3b30',
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
});
