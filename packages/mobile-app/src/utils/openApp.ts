/**
 * openApp.ts
 *
 * Yemek platformu (Trendyol Yemek, Yemeksepeti, Getir Yemek, Migros)
 * gibi markalar icin uygulama acilis helper'i.
 *
 * Akis:
 *   1. Deep link denenir
 *   2. Linking.canOpenURL ile destekleniyor mu kontrol
 *   3. Destekleniyorsa app acilir
 *   4. Aksi halde platform-specific store URL'sine yonlendirilir
 */
import { Linking, Platform, Alert } from 'react-native';

interface OpenAppOptions {
  deepLink?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  brandName: string;
}

export async function openFoodPlatformApp({
  deepLink,
  appStoreUrl,
  playStoreUrl,
  brandName,
}: OpenAppOptions): Promise<void> {
  // 1. Deep link dene
  if (deepLink) {
    try {
      const canOpen = await Linking.canOpenURL(deepLink);
      if (canOpen) {
        await Linking.openURL(deepLink);
        return;
      }
    } catch (err) {
      console.warn('[openApp] Deep link basarisiz:', deepLink, err);
    }
  }

  // 2. Store URL fallback
  const storeUrl = Platform.OS === 'ios' ? appStoreUrl : playStoreUrl;

  if (storeUrl) {
    try {
      await Linking.openURL(storeUrl);
      return;
    } catch (err) {
      console.warn('[openApp] Store acilamadi:', storeUrl, err);
    }
  }

  // 3. Hicbir sey calismazsa: kullaniciya bilgi ver
  Alert.alert(
    brandName + ' Acilamadi',
    brandName + ' uygulamasi cihazinizda yuklu degil. Lutfen App Store veya Google Play den indirin.',
    [{ text: 'Tamam', style: 'default' }]
  );
}
