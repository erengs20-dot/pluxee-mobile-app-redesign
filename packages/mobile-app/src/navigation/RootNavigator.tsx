/**
 * RootNavigator
 *
 * App'in en ust navigator'i. NavigationContainer + Native Stack icerir.
 *
 * HIYERARSI:
 *   NavigationContainer
 *     RootStack (NativeStack)
 *       MainTabs (BottomTabNavigator)
 *         Home / Places / Payment / Online / Account
 *
 * Faz 6'da CardDetail, CardPin, CardTransactions gibi sayfalar bu Stack'a
 * eklenecek. Boylece tab'lerin uzerine push edilirler ve tab bar gorunmez.
 *
 * KARAR: Bottom sheet'ler (CardListBottomSheet, SetDefaultCardModal) hala
 * state-based pattern ile calisir; Stack'a eklenmezler.
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import { CardDetailScreen } from '../screens/CardDetailScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Header'i her ekran kendi yonetir
          animation: 'slide_from_right', // iOS native, Android'de manuel
        }}
      >
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen name="CardDetail" component={CardDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
