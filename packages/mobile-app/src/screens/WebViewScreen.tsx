/**
 * WebViewScreen
 *
 * Online alisveris markalarinin web sitelerini in-app olarak acar.
 * react-native-webview ile mweb deneyimi.
 *
 * NAVIGATION:
 *   navigation.navigate('WebView', { url: 'https://...', title: 'Brand Name' })
 */
import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, semantic, spacing } from '@pluxee/design-system';

import type { RootStackParamList } from '../navigation/types';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'WebView'>;

export function WebViewScreen({ route, navigation }: Props) {
  const { url, title } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!url) {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <CardDetailHeader title={title} onBack={() => navigation.goBack()} />
        <View style={styles.errorWrap}>
          <Text variant="body.medium" color="error" align="center">
            Web sitesi adresi bulunamadi.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title={title} onBack={() => navigation.goBack()} />

      {hasError ? (
        <View style={styles.errorWrap}>
          <Text variant="body.medium" color="error" align="center">
            Sayfa yuklenirken bir hata olustu.
          </Text>
        </View>
      ) : (
        <>
          <WebView
            source={{ uri: url }}
            style={styles.webview}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            startInLoadingState
            javaScriptEnabled
            domStorageEnabled
          />
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={semantic.brand.primary} />
              <Text variant="body.smallMedium" color="secondary" style={styles.loadingText}>
                Yukleniyor...
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: semantic.background.primary,
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: semantic.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[3],
  },
  loadingText: {
    paddingTop: spacing[2],
  },
  errorWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[6],
  },
});
