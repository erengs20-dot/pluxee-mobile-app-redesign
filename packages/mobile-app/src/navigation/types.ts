/**
 * Navigation Type Definitions
 *
 * Type-safe navigation params for the entire app.
 * - RootStackParamList: Top-level stack (tabs + modal screens)
 * - BottomTabParamList: Bottom tab routes
 */

import type { NavigatorScreenParams } from '@react-navigation/native';

export type BottomTabParamList = {
  Home: undefined;
  Places: undefined;
  Payment: undefined;
  Online: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<BottomTabParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
