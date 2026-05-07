import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Text, Icon, semantic, spacing, radius } from '@pluxee/design-system';

export type NavTab = 'home' | 'places' | 'payment' | 'online' | 'account';

interface NavItem {
  id: NavTab;
  iconName: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', iconName: 'house', label: 'Ana Sayfa' },
  { id: 'places', iconName: 'pinFilled', label: 'Mekanlar' },
  { id: 'payment', iconName: 'poS', label: 'Odeme' },
  { id: 'online', iconName: 'onlinePayment', label: 'Online' },
  { id: 'account', iconName: 'person', label: 'Hesabim' },
];

interface BottomNavigationProps {
  activeTab?: NavTab;
  onTabPress?: (tab: NavTab) => void;
}

export function BottomNavigation({
  activeTab = 'home',
  onTabPress,
}: BottomNavigationProps) {
  return (
    <View style={styles.container}>
      {NAV_ITEMS.map((item) => {
        const isActive = item.id === activeTab;

        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.navItem, isActive && styles.navItemActive]}
            onPress={() => onTabPress?.(item.id)}
            activeOpacity={0.7}
          >
            <Icon
              name={item.iconName}
              size={24}
              color="primary"
            />
            <Text
              variant="body.smallMedium"
              color="primary"
              style={[styles.navLabel, isActive && styles.navLabelActive]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    paddingHorizontal: spacing[2],
    paddingTop: spacing[2],
    paddingBottom: Platform.OS === 'ios' ? spacing[6] : spacing[3],
    borderTopWidth: 1,
    borderTopColor: semantic.border.tertiary,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[1],
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[1],
    borderRadius: radius.lg,
  },
  navItemActive: {
    backgroundColor: semantic.background.activeTab,
  },
  navLabel: {

  },
  navLabelActive: {
    fontWeight: '700',
  },
});
