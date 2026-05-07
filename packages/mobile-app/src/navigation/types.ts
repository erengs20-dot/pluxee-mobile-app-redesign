/**
 * Navigation Type Definitions
 *
 * Type-safe navigation params for the entire app.
 * - RootStackParamList: Top-level stack (tabs + card detail + modals)
 * - BottomTabParamList: Bottom tab routes
 * - CardCategory: Pluxee TR'de mevcut 5 kart kategorisi
 *
 * USAGE in screens:
 *   import type { NativeStackScreenProps } from '@react-navigation/native-stack';
 *   import type { RootStackParamList } from '../navigation/types';
 *
 *   type Props = NativeStackScreenProps<RootStackParamList, 'CardDetail'>;
 *   export function CardDetailScreen({ route, navigation }: Props) {
 *     const { cardId, category } = route.params;
 *     ...
 *   }
 */

import type { NavigatorScreenParams } from '@react-navigation/native';

/**
 * 5 Kart Kategorisi - Her birinin kendi UX akisi var:
 *   - meal:      Yemek (Mobil Kart)        - Extra Yukle YES, transactions YES
 *   - business:  Business (Mobil Kart)     - Extra Yukle NO,  transactions YES
 *   - food:      Gida (Mobil Kart)         - Extra Yukle YES, transactions YES
 *   - gift:      Hediye (Mix Paket)        - Extra Yukle YES, brand grid (Faz 6.2)
 *   - transport: Ulasim (Esnek ulasim)     - Extra Yukle YES, virtual card + QR (Faz 6.2)
 */
export type CardCategory = 'meal' | 'business' | 'food' | 'gift' | 'transport';

export type BottomTabParamList = {
  Home: undefined;
  Places: undefined;
  Payment: undefined;
  Online: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  // Main tabs container
  MainTabs: NavigatorScreenParams<BottomTabParamList>;

  // Faz 6.1: Mobil Kart detay ekranlari (Yemek/Business/Gida)
  // Faz 6.2'de Hediye + Ulasim icin ayri ekran path'leri eklenebilir
  CardDetail: { cardId: string; category: CardCategory };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
