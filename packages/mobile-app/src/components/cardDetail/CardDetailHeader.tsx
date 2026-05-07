/**
 * CardDetailHeader
 *
 * Kart detay sayfalarinin ust header'i. Mockup'larda:
 *   - Sol: geri okun (back navigation)
 *   - Center: kategori basligi (Yemek / Business / Gida ...)
 *   - Status bar: light icerigi (saat beyaz)
 *   - Zemin: navy (semantic.brand.primary)
 *
 * Bu header navigation Stack'in default header'i ile DEGIL,
 * her ekranin kendi icinde manuel olarak render edilir.
 * (RootNavigator'da headerShown: false ayari var.)
 *
 * USAGE:
 *   <CardDetailHeader title="Yemek" onBack={() => navigation.goBack()} />
 */
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Text, semantic, spacing } from '@pluxee/design-system';

interface CardDetailHeaderProps {
  title: string;
  onBack: () => void;
}

// iOS status bar yuksekligi (dinamik degil, sabit)
// Android'de StatusBar.currentHeight kullanilir
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight ?? 24;

export function CardDetailHeader({ title, onBack }: CardDetailHeaderProps) {
  return (
    <View style={styles.container}>
      {/* Status bar safe alani - navy zemin uzanir */}
      <View style={styles.statusBarSafe} />

      {/* Header icerigi: back button + title */}
      <View style={styles.row}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          activeOpacity={0.6}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24">
            <Path
              d="M15 18l-6-6 6-6"
              stroke="#ffffff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </TouchableOpacity>

        <View style={styles.titleWrap}>
          <Text variant="title.mobileMain" color="inverse" align="center">
            {title}
          </Text>
        </View>

        {/* Sag tarafta back button kadar bos alan - title centerli kalsin */}
        <View style={styles.backButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: semantic.brand.primary, // navy
  },
  statusBarSafe: {
    height: STATUS_BAR_HEIGHT,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    minHeight: 48,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: {
    flex: 1,
  },
});
