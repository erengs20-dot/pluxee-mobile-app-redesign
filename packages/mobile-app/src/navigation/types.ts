/**
 * Navigation Type Definitions
 *
 * Type-safe navigation params for the entire app.
 * - RootStackParamList: Top-level stack (tabs + card detail + brand flows)
 * - BottomTabParamList: Bottom tab routes
 * - CardCategory: Pluxee TR'de mevcut 5 kart kategorisi
 */
import type { NavigatorScreenParams } from '@react-navigation/native';

export type CardCategory = 'meal' | 'business' | 'food' | 'gift' | 'transport';

export type BottomTabParamList = {
  Home: undefined;
  Places: undefined;
  Payment: undefined;
  Online: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<BottomTabParamList>;

  // Faz 6.1: Kart detay ekrani (tum 5 kategori)
  CardDetail: { cardId: string; category: CardCategory };

  // Faz 6.2: Hediye karti ozel akislari
  BrandDetail: { brandId: string };
  BrandCodesList: undefined;
  BalanceTransferForm: { brandId: string };
  MobileCodePurchase: { brandId: string };
  WalletTransferForm: { brandId: string };
  SmsVerification: {
    brandId: string;
    amount: number;
    phoneNumber: string;
    nextScreen: 'TransferSuccess' | 'CodePurchaseSuccess';
  };
  TransferSuccess: {
    brandId: string;
    amount: number;
    transferType: 'balance' | 'wallet';
  };
  CodePurchaseSuccess: {
    brandId: string;
    codeId: string;
  };
  CodeUsage: { codeId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
