import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Icon, semantic, spacing, radius } from '@pluxee/design-system';

interface HeaderBarProps {
  userName: string;
  hasNotification?: boolean;
  onNotificationPress?: () => void;
}

export function HeaderBar({
  userName,
  hasNotification = true,
  onNotificationPress,
}: HeaderBarProps) {
  const firstName = userName.split(' ')[0];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Sol: X logo + Welcome metin */}
        <View style={styles.left}>
          <View style={styles.logoBox}>
            <Text style={styles.logoX}>X</Text>
          </View>
          <View style={styles.welcomeText}>
            <Text variant="body.smallMedium" style={styles.welcomeBack}>
              Merhaba,
            </Text>
            <Text variant="title.mobileMain" style={styles.userName}>
              {firstName}
            </Text>
          </View>
        </View>

        {/* Sag: Bildirim */}
        <TouchableOpacity
          style={styles.notificationBtn}
          onPress={onNotificationPress}
          activeOpacity={0.7}
        >
          <Icon name="notifications" size={24} color="primary" />
          {hasNotification && <View style={styles.notificationDot} />}
        </TouchableOpacity>
      </View>

      {/* Yesil ince ayirici cizgi */}
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: semantic.brand.primary, // Pluxee navy
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    flex: 1,
  },
  logoBox: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: semantic.brand.secondary, // Pluxee yesili
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoX: {
    fontSize: 28,
    fontWeight: '900',
    color: semantic.brand.primary, // Navy
    lineHeight: 32,
  },
  welcomeText: {
    flex: 1,
  },
  welcomeBack: {
    color: '#ffffff',
    opacity: 0.85,
    fontSize: 14,
  },
  userName: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 2,
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
  separator: {
    height: 2,
    backgroundColor: semantic.brand.secondary, // Yesil ince cizgi
  },
});
