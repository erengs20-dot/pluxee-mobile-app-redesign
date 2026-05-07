/**
 * BottomTabNavigator
 *
 * 5 ana tab'i yoneten navigator:
 *   Home / Places / Payment / Online / Account
 *
 * Tasarim mevcut BottomNavigation component'inden gelir; React Navigation
 * yalnizca state'i yonetir. Bu sayede Pluxee tasarim diline tamamen sadik
 * kaliriz (yesil aktif tab kutusu, navy ikonlar, vs.).
 *
 * ADAPTER PATTERN:
 *   React Navigation -> {state, descriptors, navigation}
 *   BottomNavigation -> {activeTab, onTabPress}
 *
 * Route ismi <-> NavTab id eslemesi:
 *   'Home'    <-> 'home'
 *   'Places'  <-> 'places'
 *   'Payment' <-> 'payment'
 *   'Online'  <-> 'online'
 *   'Account' <-> 'account'
 */
import React from 'react';
import { createBottomTabNavigator, type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomNavigation, type NavTab } from '../components/home/BottomNavigation';
import { HomeScreen } from '../screens/HomeScreen';
import { PlacesScreen } from '../screens/PlacesScreen';
import { PaymentScreen } from '../screens/PaymentScreen';
import { OnlineScreen } from '../screens/OnlineScreen';
import { AccountScreen } from '../screens/AccountScreen';
import type { BottomTabParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

// Route ismi (PascalCase) -> NavTab id (lowercase) donusturucu
const ROUTE_TO_TAB: Record<keyof BottomTabParamList, NavTab> = {
  Home: 'home',
  Places: 'places',
  Payment: 'payment',
  Online: 'online',
  Account: 'account',
};

const TAB_TO_ROUTE: Record<NavTab, keyof BottomTabParamList> = {
  home: 'Home',
  places: 'Places',
  payment: 'Payment',
  online: 'Online',
  account: 'Account',
};

/**
 * Adapter: React Navigation tabBar API'si <-> mevcut BottomNavigation API'si
 */
function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const currentRouteName = state.routes[state.index].name as keyof BottomTabParamList;
  const activeTab = ROUTE_TO_TAB[currentRouteName];

  const handleTabPress = (tab: NavTab) => {
    const targetRoute = TAB_TO_ROUTE[tab];
    const isFocused = currentRouteName === targetRoute;

    // React Navigation pattern: emit event, then navigate
    const event = navigation.emit({
      type: 'tabPress',
      target: state.routes.find((r) => r.name === targetRoute)?.key ?? '',
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(targetRoute);
    }
  };

  return <BottomNavigation activeTab={activeTab} onTabPress={handleTabPress} />;
}

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false, // Header'i her ekran kendi yonetir (HeaderBar component)
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Places" component={PlacesScreen} />
      <Tab.Screen name="Payment" component={PaymentScreen} />
      <Tab.Screen name="Online" component={OnlineScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
