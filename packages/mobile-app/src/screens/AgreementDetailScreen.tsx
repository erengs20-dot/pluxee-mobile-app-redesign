/**
 * AgreementDetailScreen
 *
 * Tam sozlesme metni (scrollable, sadece okuma).
 * Ornektir - gercek uygulamada backend'den gelir.
 */
import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Icon, semantic, spacing, radius } from "@pluxee/design-system";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../navigation/types";
import { CARD_CATEGORY_META } from "../data/cards";

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, "AgreementDetail">;

const SECTIONS = [
  {
    title: "1. TARAFLAR VE KONU",
    content:
      "Bu Bireysel Kart Kullanim Sozlesmesi, Pluxee Odeme Hizmetleri ve Elektronik Para A.S. (bundan boyle \"Pluxee\" olarak anilacaktir) ile Pluxee 3C Bireysel Kart basvurusunda bulunan gercek kisi kullanici (bundan boyle \"Kart Sahibi\" olarak anilacaktir) arasinda akdedilmistir.\n\nBu Sozlesme; Pluxee 3C Bireysel Kart\u2019in kullanimina iliskin kosullari, taraflarin hak ve yukumlululerini belirlemek amaciyla duzenlenmistir.",
  },
  {
    title: "2. TANIMLAR",
    content:
      "Pluxee 3C Bireysel Kart: Kart Sahibinin kisisel harcamalarinda kullanmak uzere olusturdugu, Pluxee altyapisi uzerinde calisan prepaid (on odemeli) dijital odeme kartidir.\n\nBakiye: Kart Sahibinin karta yukledigi ve henuz harcanmamis olan TL tutaridir.\n\nMasterpass: Mastercard\u2019in dijital cuzdan ve odeme altyapisi hizmetidir.\n\nPluxee\u2019li Nokta: Pluxee odeme altyapisini kabul eden restoran, market, hediye magazasi ve ulasim hizmeti saglayicilaridir.",
  },
  {
    title: "3. KART OLUSTURMA VE AKTIVASYON",
    content:
      "3.1 Kart Sahibi, Pluxee mobil uygulamasi uzerinden Pluxee 3C Bireysel Kart basvurusunda bulunabilir.\n\n3.2 Her kullanici; Yemek, Hediye, Gida ve Ulasim servis turlerinin her birinden en fazla 5 adet bireysel kart olusturabilir.\n\n3.3 Kart numarasi sistem tarafindan otomatik olarak atanir ve Kart Sahibi tarafindan degistirilemez.\n\n3.4 Kart, basvurunun onaylanmasinin ardindan aninda aktif edilir ve kullanima hazir hale gelir.",
  },
  {
    title: "4. BAKIYE YUKLEME VE HARCAMA",
    content:
      "4.1 Kart Sahibi, kartina Masterpass altyapisi uzerinden guvenli sekilde bakiye yukleyebilir.\n\n4.2 Tek seferde minimum yukleme tutari 50 TL, maksimum yukleme tutari 2.500 TL\u2019dir.\n\n4.3 Yuklenen bakiye, ilgili servis turune ait Pluxee\u2019li Noktalarda harcanabilir.\n\n4.4 Bakiye iadesi veya nakde cevirme islemi yapilamaz.",
  },
  {
    title: "5. KART SILME VE IPTAL",
    content:
      "5.1 Kart Sahibi, bireysel kartini Pluxee mobil uygulamasi uzerinden silebilir.\n\n5.2 Kart silme islemi icin kartda kalan bakiyenin tamamen harcanmis olmasi gerekmektedir.\n\n5.3 Bakiye kalan kartin silinmesi talep edildiginde, once bakiyenin harcanmasi veya baska bir Pluxee kullanicisina aktarilmasi gerekir.",
  },
];

export function AgreementDetailScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { category } = route.params;
  const meta = CARD_CATEGORY_META[category];

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <Icon name="chevronLeft" size={24} color="primary" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text variant="title.mobileCard" color="primary">
            Sozlesme Metni
          </Text>
          <Text variant="body.medium" color="secondary">
            {meta.label}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.popToTop()} hitSlop={12}>
          <Icon name="xmark" size={24} color="primary" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Baslik karti */}
        <View style={styles.titleCard}>
          <Text variant="title.mobileCard" color="primary">
            Pluxee 3C Bireysel Kart Kullanim Sozlesmesi
          </Text>
          <Text variant="body.medium" color="secondary">
            {meta.label} {" \u00B7 "} Surum 1.0 {" \u00B7 "} Mayis 2026
          </Text>
        </View>

        {/* Bolumler */}
        {SECTIONS.map((section, idx) => (
          <View key={idx}>
            <Text variant="body.largeBold" color="primary" style={styles.sectionTitle}>
              {section.title}
            </Text>
            <View style={styles.sectionCard}>
              <Text variant="body.medium" color="secondary" style={styles.sectionText}>
                {section.content}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: semantic.border.tertiary,
  },
  headerCenter: {
    alignItems: "center",
    gap: spacing[1],
  },
  content: {
    padding: spacing[4],
    gap: spacing[4],
    paddingBottom: spacing[12],
  },
  titleCard: {
    backgroundColor: semantic.background.canvas,
    borderRadius: radius.lg,
    padding: spacing[4],
    gap: spacing[2],
  },
  sectionTitle: {
    color: semantic.brand.primary,
    marginBottom: spacing[2],
  },
  sectionCard: {
    backgroundColor: semantic.background.canvas,
    borderRadius: radius.lg,
    padding: spacing[4],
  },
  sectionText: {
    lineHeight: 22,
  },
});
