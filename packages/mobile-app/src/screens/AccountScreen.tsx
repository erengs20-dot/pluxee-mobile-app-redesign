/**
 * AccountScreen - Hesabim / Profil
 *
 * Pluxee Turkiye mockup'ina sadik:
 * - Background chevron (160px) + avatar yarisini disari tasir
 * - Isim krem zeminde
 * - Tercihler + Diger menu listeleri
 * - Cikis Yap scroll icinde
 */
import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  Icon,
  Background,
  semantic,
  spacing,
  radius,
} from "@pluxee/design-system";
import { TabHeader } from '../components/common/TabHeader';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

interface MenuItem {
  id: string;
  label: string;
  iconName: string;
  route?: keyof RootStackParamList;
}

const PREFERENCES: MenuItem[] = [
  { id: "member", label: "Uyelik Bilgilerim", iconName: "avatar", route: "MemberInfo" },
  { id: "settings", label: "Ayarlar", iconName: "settings", route: "Settings" },
  { id: "password", label: "Sifre Degistir", iconName: "lock", route: "ChangePassword" },
  { id: "invoice", label: "Fatura Bilgilerim", iconName: "receipt", route: "InvoiceInfo" },
];

const OTHERS: MenuItem[] = [
  { id: "notifications", label: "Bildirimlerim", iconName: "notifications", route: "Notifications" },
  { id: "favorites", label: "Favorilerim", iconName: "heartOutline", route: "Favorites" },
  { id: "campaigns", label: "Kampanyalar", iconName: "gift", route: "CampaignsList" },
  { id: "help", label: "Yardim", iconName: "help", route: "HelpCenter" },
];

export function AccountScreen() {
  const navigation = useNavigation<Nav>();

  const handlePress = (item: MenuItem) => {
    if (item.route) {
      navigation.navigate(item.route as any);
    }
  };

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => handlePress(item)}
      activeOpacity={0.7}
    >
      <Icon name={item.iconName} size={24} color="info" />
      <Text variant="body.largeBold" color="link" style={{ flex: 1 }}>
        {item.label}
      </Text>
      <Icon name="chevronRight" size={16} color="secondary" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <TabHeader title="Profil" />

        {/* Avatar + Isim */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text variant="title.mobileMain" color="inverse">EG</Text>
            </View>
            <TouchableOpacity style={styles.cameraBtn} activeOpacity={0.7}>
              <Icon name="camera" size={16} color="inverse" />
            </TouchableOpacity>
          </View>
          <Text variant="title.mobileMain" color="primary" align="center" style={styles.userName}>
            EREN GOKTAS
          </Text>
        </View>

        {/* Tercihler */}
        <View style={styles.section}>
          <Text variant="title.mobileSection" color="secondary" style={styles.sectionTitle}>
            Tercihler
          </Text>
          {PREFERENCES.map(renderMenuItem)}
        </View>

        {/* Diger */}
        <View style={styles.section}>
          {OTHERS.map(renderMenuItem)}
        </View>

        {/* Cikis Yap */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutRow} activeOpacity={0.7}>
            <Icon name="logout" size={24} color="info" />
            <Text variant="body.largeBold" color="link">
              Cikis Yap
            </Text>
          </TouchableOpacity>
          <Text variant="body.smallMedium" color="secondary">
            Versiyon: 1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  avatarWrap: {
    width: 88,
    height: 88,
    marginBottom: 12,
    position: 'relative',
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#1B1D45',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    flex: 1,
    backgroundColor: semantic.background.canvas,
  },
  statusBarSafe: {
    backgroundColor: semantic.brand.primary,
    height: Platform.OS === "ios" ? 50 : RNStatusBar.currentHeight,
  },
  scrollContent: {
    paddingBottom: spacing[8],
  },
  // Header
  headerWrap: {
    alignItems: "center",
    marginBottom: spacing[2],
  },
  chevronContent: {
    paddingTop: spacing[4],
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: -50,
    position: "relative",
  },
  avatarRing: {
    width: 100,
    height: 100,
    borderRadius: radius.full,
    borderWidth: 3,
    borderColor: semantic.brand.secondary,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: semantic.background.primary,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    backgroundColor: semantic.background.disabled,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraBtn: {
    position: "absolute",
    bottom: 0,
    right: -10,
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: semantic.cta.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: semantic.background.primary,
  },
  userName: {
    marginTop: spacing[3],
    letterSpacing: 1,
  },
  // Menu
  section: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
    gap: spacing[1],
  },
  sectionTitle: {
    marginBottom: spacing[2],
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    paddingVertical: spacing[4],
  },
  logoutSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[5],
    marginTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: semantic.border.tertiary,
  },
  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
});
