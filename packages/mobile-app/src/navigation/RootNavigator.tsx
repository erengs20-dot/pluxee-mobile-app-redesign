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
import { CampaignDetailScreen } from '../screens/CampaignDetailScreen';
import { StoryViewerScreen } from '../screens/StoryViewerScreen';
import { ExtraLoadTypeScreen } from '../screens/ExtraLoadTypeScreen';
import { ExtraLoadScreen } from '../screens/ExtraLoadScreen';
import { RecurringLoadScreen } from '../screens/RecurringLoadScreen';
import { BalanceThresholdScreen } from '../screens/BalanceThresholdScreen';
import { PaymentMethodScreen } from '../screens/PaymentMethodScreen';
import { LoadSuccessScreen } from '../screens/LoadSuccessScreen';
import { AutoLoadListScreen } from '../screens/AutoLoadListScreen';
import { CampaignsListScreen } from '../screens/CampaignsListScreen';
import { VirtualCardTransferScreen } from '../screens/VirtualCardTransferScreen';
import { TransportPlaceDetailScreen } from '../screens/TransportPlaceDetailScreen';
import { WebViewScreen } from '../screens/WebViewScreen';
import { OnlineWebViewScreen } from '../screens/OnlineWebViewScreen';
import { PlacesFilterScreen } from '../screens/PlacesFilterScreen';
import { AddCardByNumberScreen } from '../screens/AddCardByNumberScreen';
import { ServiceSelectionScreen } from '../screens/ServiceSelectionScreen';
import { CardAgreementScreen } from '../screens/CardAgreementScreen';
import { AgreementDetailScreen } from '../screens/AgreementDetailScreen';
import { AddCardSuccessScreen } from '../screens/AddCardSuccessScreen';
import { MemberInfoScreen } from '../screens/MemberInfoScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ChangePasswordScreen } from '../screens/ChangePasswordScreen';
import { InvoiceInfoScreen } from '../screens/InvoiceInfoScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { HelpCenterScreen } from '../screens/HelpCenterScreen';
import type { RootStackParamList } from './types';
import HediyeMarkalariScreen from '../screens/HediyeMarkalariScreen';
import OnlineAlisverisMarkalariScreen from '../screens/OnlineAlisverisMarkalariScreen';
import YakindakiRestoranlarScreen from '../screens/YakindakiRestoranlarScreen';
import YakindakiMarketlerScreen from '../screens/YakindakiMarketlerScreen';
import UlasimMarkalariScreen from '../screens/UlasimMarkalariScreen';
import MekanDetayScreen from '../screens/MekanDetayScreen';

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
        <Stack.Screen name="ExtraLoadType" component={ExtraLoadTypeScreen} />
        <Stack.Screen name="ExtraLoad" component={ExtraLoadScreen} />
        <Stack.Screen name="RecurringLoad" component={RecurringLoadScreen} />
        <Stack.Screen name="BalanceThresholdLoad" component={BalanceThresholdScreen} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
        <Stack.Screen name="LoadSuccess" component={LoadSuccessScreen} />
        <Stack.Screen name="AutoLoadList" component={AutoLoadListScreen} />
        <Stack.Screen name="StoryViewer" component={StoryViewerScreen} options={{ animation: 'fade' }} />
        <Stack.Screen name="CampaignDetail" component={CampaignDetailScreen} />
        <Stack.Screen name="CampaignsList" component={CampaignsListScreen} />
        <Stack.Screen name="VirtualCardTransfer" component={VirtualCardTransferScreen} />
        <Stack.Screen name="TransportPlaceDetail" component={TransportPlaceDetailScreen} />
        <Stack.Screen name="WebView" component={WebViewScreen} />
        <Stack.Screen name="OnlineWebView" component={OnlineWebViewScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MemberInfo" component={MemberInfoScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="InvoiceInfo" component={InvoiceInfoScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
        <Stack.Screen name="AddCardByNumber" component={AddCardByNumberScreen} />
        <Stack.Screen name="ServiceSelection" component={ServiceSelectionScreen} />
        <Stack.Screen name="CardAgreement" component={CardAgreementScreen} />
        <Stack.Screen name="AgreementDetail" component={AgreementDetailScreen} />
        <Stack.Screen name="AddCardSuccess" component={AddCardSuccessScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="HediyeMarkalari" component={HediyeMarkalariScreen} />
        <Stack.Screen name="OnlineAlisverisMarkalari" component={OnlineAlisverisMarkalariScreen} />
        <Stack.Screen name="YakindakiRestoranlar" component={YakindakiRestoranlarScreen} />
        <Stack.Screen name="YakindakiMarketler" component={YakindakiMarketlerScreen} />
        <Stack.Screen name="UlasimMarkalari" component={UlasimMarkalariScreen} />
        <Stack.Screen name="MekanDetay" component={MekanDetayScreen} />

        <Stack.Screen name="PlacesFilter" component={PlacesFilterScreen} options={{ animation: 'slide_from_bottom' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
