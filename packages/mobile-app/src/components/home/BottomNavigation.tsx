import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Text, Icon, semantic, spacing, radius, shadows } from '@pluxee/design-system';

export type NavTab = 'home' | 'places' | 'payment' | 'online' | 'account';

interface NavItem {
  id: NavTab;
  iconName: string;
  label: string;
  isFab?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', iconName: 'house', label: 'Ana Sayfa' },
  { id: 'places', iconName: 'pinFilled', label: 'Mekanlar' },
  { id: 'payment', iconName: 'poS', label: 'Odeme', isFab: true },
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

        if (item.isFab) {
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.fabWrap}
              onPress={() => onTabPress?.(item.id)}
              activeOpacity={0.8}
            >
              <View style={styles.fab}>
                <Icon name={item.iconName} size={24} color="primary" />
              </View>
              <Text variant="body.smallBold" color="primary" style={styles.fabLabel}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => onTabPress?.(item.id)}
            activeOpacity={0.7}
          >
            <Icon
              name={item.iconName}
              size={24}
              color={isActive ? 'primary' : 'tertiary'}
            />
            <Text
              variant="body.smallMedium"
              color={isActive ? 'primary' : 'tertiary'}
              style={[styles.navLabel, isActive && styles.navLabelActive]}
            >
              {item.label}
            </Text>
            {isActive && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingTop: spacing[3],
    paddingBottom: Platform.OS === 'ios' ? spacing[6] : spacing[3],
    paddingHorizontal: spacing[2],
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    ...shadows.large,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: spacing[1],
    paddingTop: spacing[2],
  },
  navLabel: {
    fontSize: 11,
  },
  navLabelActive: {
    fontWeight: '700',
  },
  activeIndicator: {
    width: 24,
    height: 3,
    backgroundColor: semantic.brand.primary,
    borderRadius: 2,
    marginTop: 2,
  },

  // FAB
  fabWrap: {
    flex: 1,
    alignItems: 'center',
    gap: spacing[1],
    marginTop: -spacing[6],
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: semantic.brand.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
    ...shadows.medium,
  },
  fabLabel: {
    fontSize: 11,
    marginTop: spacing[1],
  },
});
