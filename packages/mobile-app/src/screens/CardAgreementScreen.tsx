/**
 * CardAgreementScreen
 *
 * Bireysel kart sozlesmesi.
 * Design system atom'lari: Button, Icon, Text
 */
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Icon, Button, semantic, spacing, radius } from "@pluxee/design-system";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../navigation/types";
import { CARD_CATEGORY_META } from "../data/cards";

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, "CardAgreement">;

const WHAT_IS = [
  "Kisisel kullaniminiz icin ozel olarak olusturulan dijital bir karttir",
  "Kredi kartinizdan bakiye yukleyerek kullanabilirsiniz",
  "Firma kartlarindan bagimsiz calisir",
  "Dilediginiz zaman baska Pluxee kullanicilarina extra paylasabilirsiniz",
];

const CONDITIONS = [
  "Her servis turunden en fazla 5 bireysel kart olusturabilirsiniz",
  "Kart numarasi sistem tarafindan otomatik atanir ve degistirilemez",
  "Bakiye yukleme islemleri Masterpass ile guvenli sekilde yapilir",
  "Minimum yukleme tutari 50 TL, maksimum 2.500 TL\u2019dir",
  "Bireysel kartlarinizi silebilirsiniz ancak karti silebilmeniz icin bakiyenizin tamaminiin harcanmis olmasi gerekmektedir.",
  "Detayli kullanim kosullari icin lutfen sozlesme metnini okuyun",
];

export function CardAgreementScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { category } = route.params;
  const meta = CARD_CATEGORY_META[category];
  const [accepted, setAccepted] = useState(false);

  const handleCreate = () => {
    if (!accepted) return;
    const rand4 = () => String(Math.floor(1000 + Math.random() * 9000));
    const cardNum = `${rand4()} ${rand4()} ${rand4()} ${rand4()}`;
    navigation.navigate("AddCardSuccess", {
      category,
      cardNumber: cardNum,
      isPersonal: true,
    });
  };

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <Icon name="chevronLeft" size={24} color="primary" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text variant="title.mobileDefault" color="primary">
            Bireysel Kart Sozlesmesi
          </Text>
          <Text variant="body.smallMedium" color="secondary">
            {meta.label}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.popToTop()} hitSlop={12}>
          <Icon name="xmark" size={24} color="primary" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Bireysel Kart Nedir? */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Icon name="wallet" size={24} color="primary" />
            <Text variant="body.largeBold" color="primary">
              Bireysel Kart Nedir?
            </Text>
          </View>
          {WHAT_IS.map((item, i) => (
            <View key={i} style={styles.checkRow}>
              <View style={styles.checkCircle}>
                <Icon name="checkmark" size={16} color="inverse" />
              </View>
              <Text variant="body.smallMedium" color="secondary" style={{ flex: 1, lineHeight: 20 }}>
                {item}
              </Text>
            </View>
          ))}
        </View>

        {/* Kullanim Kosullari */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Icon name="warning" size={24} color="warning" />
            <Text variant="body.largeBold" color="primary">
              Kullanim Kosullari
            </Text>
          </View>
          {CONDITIONS.map((item, i) => (
            <View key={i} style={styles.conditionRow}>
              <Icon name="info" size={16} color="secondary" />
              <Text variant="body.smallMedium" color="secondary" style={{ flex: 1, lineHeight: 20 }}>
                {item}
              </Text>
            </View>
          ))}
        </View>

        {/* Checkbox */}
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setAccepted(!accepted)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
            {accepted && <Icon name="checkmark" size={16} color="inverse" />}
          </View>
          <Text variant="body.smallMedium" color="primary" style={{ flex: 1 }}>
            Bireysel kart kullanim sozlesmesini okudum ve kabul ediyorum
          </Text>
        </TouchableOpacity>

        {/* Sozlesme linki */}
        <TouchableOpacity
          onPress={() => navigation.navigate("AgreementDetail", { category })}
          style={styles.linkRow}
        >
          <Text
            variant="body.smallMedium"
            color="primary"
            style={styles.linkText}
          >
            Sozlesme metnini goruntule
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* CTA - Button atom */}
      <View style={styles.bottomBar}>
        <Button
          variant="primaryFilled"
          size="lg"
          onPress={handleCreate}
          disabled={!accepted}
        >
          Bireysel Kart Olustur
        </Button>
        {!accepted && (
          <Text variant="body.smallMedium" color="secondary" align="center" style={{ marginTop: spacing[2] }}>
            Devam etmek icin sozlesmeyi onaylamalisiniz
          </Text>
        )}
      </View>
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
  },
  sectionCard: {
    backgroundColor: semantic.background.canvas,
    borderRadius: radius.lg,
    padding: spacing[4],
    gap: spacing[3],
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginBottom: spacing[1],
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing[2],
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: radius.full,
    backgroundColor: semantic.background.success,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  conditionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing[2],
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    paddingVertical: spacing[2],
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: semantic.border.tertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: semantic.brand.primary,
    borderColor: semantic.brand.primary,
  },
  linkRow: {
    alignItems: "center",
    paddingVertical: spacing[1],
  },
  linkText: {
    textDecorationLine: "underline",
  },
  bottomBar: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    borderTopWidth: 1,
    borderTopColor: semantic.border.tertiary,
  },
});
