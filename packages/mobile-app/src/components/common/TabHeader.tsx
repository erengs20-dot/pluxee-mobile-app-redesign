import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, spacing } from '@pluxee/design-system';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TabHeaderProps {
  title: string;
}

export function TabHeader({ title }: TabHeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
      <View style={styles.side} />
      <Text variant="title.mobileCard" color="inverse" align="center" style={styles.title}>
        {title}
      </Text>
      <View style={styles.side} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1D45',
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[3],
  },
  side: {
    width: 40,
    height: 40,
  },
  title: {
    flex: 1,
  },
});
