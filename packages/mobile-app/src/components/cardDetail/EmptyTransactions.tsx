/**
 * EmptyTransactions
 *
 * Bir kartin transactionu yokken gosterilen empty state.
 * Mockup'larda boyle bir state goremedik (sadece "yuklenemedi" hata bannerı vardi)
 * ama kullanici karari: "ya empty state ya islemler" => sade bir empty UI.
 *
 * Design-system'in EmptyState atom'u zaten icon + title + message + opsiyonel CTA
 * destekliyor; biz onu kullaniyoruz.
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EmptyState, spacing } from '@pluxee/design-system';

export function EmptyTransactions() {
  return (
    <View style={styles.container}>
      <EmptyState
        iconName="receipt"
        title="Henuz islem yok"
        message="Karti kullanmaya basladiginda son islemlerin burada gorunecek."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing[6],
    paddingHorizontal: spacing[4],
  },
});
