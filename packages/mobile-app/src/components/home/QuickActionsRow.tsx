/**
 * QuickActionsRow - Anasayfa hizli islemler
 *
 * 4 beyaz square shortcut: Kart Ekle / Plus Puanlarim / Pluxee Plus / Chatbot
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Icon, semantic, spacing, radius } from '@pluxee/design-system';

interface QuickAction {
  id: string;
  iconName: string;
  label: string;
  bgColor?: string;
  iconBgColor?: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  { id: '1', iconName: 'walletPlus', label: 'Kart Ekle', iconBgColor: semantic.background.success },
  { id: '2', iconName: 'cashback', label: 'Plus Puanlarim', iconBgColor: semantic.background.warning },
  { id: '3', iconName: 'medal', label: 'Pluxee Plus', iconBgColor: semantic.background.info },
  { id: '4', iconName: 'chat', label: 'Chatbot', iconBgColor: semantic.background.error },
];

interface QuickActionsRowProps {
  onActionPress?: (action: QuickAction) => void;
}

export function QuickActionsRow({ onActionPress }: QuickActionsRowProps) {
  return (
    <View style={styles.container}>
      <Text variant="title.mobileSection" color="primary" style={styles.title}>
        Hizli Islemler
      </Text>

      <View style={styles.row}>
        {QUICK_ACTIONS.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.actionItem}
            onPress={() => onActionPress?.(action)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconBox,
                action.iconBgColor && { backgroundColor: action.iconBgColor },
              ]}
            >
              <Icon name={action.iconName} size={24} color="primary" />
            </View>
            <Text
              variant="body.smallMedium"
              color="primary"
              align="center"
              style={styles.label}
            >
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing[2],
  },
  title: {

    letterSpacing: 1,
    marginBottom: spacing[1],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    alignItems: 'center',
    width: 64,
    gap: spacing[2],
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: radius.xl,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {

  },
});
