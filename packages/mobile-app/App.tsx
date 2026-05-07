/**
 * App Entry Point
 *
 * Tum app'i RootNavigator sarar. NavigationContainer ic erisinde
 * bottom tabs + stack hierarchy calisir.
 *
 * SafeAreaProvider, react-navigation'un dogru insets hesaplamasi icin
 * gerekli. Her screen kendi <SafeAreaView edges={['top']}> ile baslangic
 * yapacak (bottom tab bar zaten alti kapatiyor).
 */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <RootNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
