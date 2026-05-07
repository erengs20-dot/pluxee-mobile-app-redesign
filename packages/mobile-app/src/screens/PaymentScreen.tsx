import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, semantic, spacing } from '@pluxee/design-system';

export function PaymentScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <Text variant="title.mobilePage" color="primary">
          Odeme
        </Text>
        <Text variant="body.medium" color="secondary" style={styles.subtitle}>
          Yakında — POS ile odeme ve QR okutma burada olacak.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: semantic.background.primary,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[6],
    gap: spacing[3],
  },
  subtitle: {
    textAlign: 'center',
  },
});
