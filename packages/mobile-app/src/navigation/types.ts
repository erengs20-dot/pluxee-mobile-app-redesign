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
  PaymentCode: { brandId: string };
  ExtraLoadType: { cardId: string; category: string };
  ExtraLoad: { cardId: string; category: string };
  RecurringLoad: { cardId: string; category: string };
  BalanceThresholdLoad: { cardId: string; category: string };
  PaymentMethod: { cardId: string; amount: number; loadType: 'single' | 'recurring' | 'threshold'; frequency?: string; day?: string; threshold?: number; maxLimit?: number; description?: string };
  LoadSuccess: { cardId: string; amount: number; loadType: 'single' | 'recurring' | 'threshold'; paymentMethod: string; oldBalance: number };
  AutoLoadList: undefined;
  StoryViewer: { initialIndex: number };
  CampaignDetail: { bannerId: string };
  CampaignsList: undefined;
  CodeUsage: { codeId: string };

  // Faz 6.2: Ulasim karti ozel akislari
  /** Pluxee Sanal Kart (Esnek Ulasim) cuzdanina bakiye aktarma formu */
  VirtualCardTransfer: { cardId: string };
  /** Ulasim gecerli noktalar grid'inden bir noktaya basinca acilan genel bilgi sayfasi */
  TransportPlaceDetail: { placeId: string };

  // Faz 7: Mekanlar (Pluxee'li Noktalar)
  /** Hediye veya Online markalarinin tam liste ekrani (3 sutun grid) */
  BrandsList: { category: 'gift' | 'online'; title: string };
  /** Yakindaki restoran veya market liste ekrani */
  NearbyPlacesList: { placeType: 'restaurant' | 'market'; title: string };
  /** Online alisveris markasi web sitesi (in-app webview) */
  WebView: { url: string | undefined; title: string };


  // Faz 8: Kart Ekleme akisi
  AddCardByNumber: undefined;
  ServiceSelection: undefined;
  CardAgreement: { category: CardCategory };
  AgreementDetail: { category: CardCategory };
  AddCardSuccess: { category: CardCategory; cardNumber: string; isPersonal: boolean };

  /** Mekanlar/listeler icin context-based filtre modal'i */
  PlacesFilter: {
    context: 'main' | 'gift' | 'online' | 'restaurants' | 'markets';
    currentFilters?: import('../screens/PlacesFilterScreen').FilterState;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
