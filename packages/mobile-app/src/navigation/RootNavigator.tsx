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
import { BrandDetailScreen } from '../screens/BrandDetailScreen';
import { BalanceTransferFormScreen } from '../screens/BalanceTransferFormScreen';
import { SmsVerificationScreen } from '../screens/SmsVerificationScreen';
import { TransferSuccessScreen } from '../screens/TransferSuccessScreen';
import { MobileCodePurchaseScreen } from '../screens/MobileCodePurchaseScreen';
import { WalletTransferFormScreen } from '../screens/WalletTransferFormScreen';
import { CodeUsageScreen } from '../screens/CodeUsageScreen';
import { PaymentCodeScreen } from '../screens/PaymentCodeScreen';
import { BrandCodesListScreen } from '../screens/BrandCodesListScreen';
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
        <Stack.Screen name="BrandDetail" component={BrandDetailScreen} />
        <Stack.Screen name="BalanceTransferForm" component={BalanceTransferFormScreen} />
        <Stack.Screen name="SmsVerification" component={SmsVerificationScreen} />
        <Stack.Screen name="TransferSuccess" component={TransferSuccessScreen} />
        <Stack.Screen name="MobileCodePurchase" component={MobileCodePurchaseScreen} />
        <Stack.Screen name="WalletTransferForm" component={WalletTransferFormScreen} />
        <Stack.Screen name="PaymentCode" component={PaymentCodeScreen} />
        <Stack.Screen name="CodeUsage" component={CodeUsageScreen} />
        <Stack.Screen name="BrandCodesList" component={BrandCodesListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
