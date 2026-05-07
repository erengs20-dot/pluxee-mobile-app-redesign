import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { semantic } from '../../../theme/semantic';
import { spacing } from '../../../tokens/spacing';
import { Text } from '../Text';

export interface TabBarItem {
  id: string;
  label: string;
}

export interface TabBarProps {
  items: TabBarItem[];
  activeId: string;
  onChange?: (id: string) => void;
}

export function TabBar({ items, activeId, onChange }: TabBarProps) {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.tab}
            onPress={() => onChange?.(item.id)}
            activeOpacity={0.7}
          >
            <Text
              variant="body.mediumBold"
              color={isActive ? 'primary' : 'tertiary'}
              style={styles.label}
            >
              {item.label}
            </Text>
            {isActive && <View style={styles.indicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: semantic.border.tertiary,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[3],
    position: 'relative',
  },
  label: {
    textAlign: 'center',
  },
  indicator: {
    position: 'absolute',
    bottom: -1,
    left: '20%',
    right: '20%',
    height: 3,
    backgroundColor: semantic.brand.primary,
    borderRadius: 2,
  },
});
