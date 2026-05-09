/**
 * ServiceSelectionScreen
 *
 * Bireysel kart olusturma akisinin 1. adimi.
 * 4 kategori secenegi (Yemek, Hediye, Gida, Ulasim) - Business YOK.
 * Tek secim (radio button pattern).
 * Bilgi bolgesi: "Her servis turunden en fazla 5 bireysel kart"
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
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList, CardCategory } from "../navigation/types";
import { CARD_CATEGORY_META } from "../data/cards";

type Nav = NativeStackNavigationProp<RootStackParamList>;

interface ServiceOption {
  category: CardCategory;
  label: string;
  description: string;
  iconName: string;
  iconBgColor: string;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    category: "meal",
    label: "Yemek",
    description: "Restoran ve yemek siparislerinde kullan",
    iconName: CARD_CATEGORY_META.meal.iconName,
    iconBgColor: CARD_CATEGORY_META.meal.bgColor,
  },
  {
    category: "gift",
    label: "Hediye",
    description: "Alisveris ve hediye harcamalarinda kullan",
    iconName: CARD_CATEGORY_META.gift.iconName,
    iconBgColor: CARD_CATEGORY_META.gift.bgColor,
  },
  {
    category: "food",
    label: "Gida",
    description: "Market ve gida alisverislerinde kullan",
    iconName: CARD_CATEGORY_META.food.iconName,
    iconBgColor: CARD_CATEGORY_META.food.bgColor,
  },
  {
    category: "transport",
    label: "Ulasim",
    description: "Ulasim harcamalarinda kullan",
    iconName: CARD_CATEGORY_META.transport.iconName,
    iconBgColor: CARD_CATEGORY_META.transport.bgColor,
  },
];

export function ServiceSelectionScreen() {
  const navigation = useNavigation<Nav>();
  const [selected, setSelected] = useState<CardCategory>("meal");

  const handleContinue = () => {
    navigation.navigate("CardAgreement", { category: selected });
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
            Servis Secimi
          </Text>
          <Text variant="body.smallMedium" color="secondary">
            Hangi servis icin kart olusturacaksin?
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.popToTop()} hitSlop={12}>
          <Icon name="xmark" size={24} color="primary" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {SERVICE_OPTIONS.map((opt) => {
          const isSelected = selected === opt.category;
          return (
            <TouchableOpacity
              key={opt.category}
              style={[
                styles.optionCard,
                isSelected && styles.optionCardSelected,
              ]}
              activeOpacity={0.7}
              onPress={() => setSelected(opt.category)}
            >
              <View style={[styles.optionIcon, { backgroundColor: opt.iconBgColor }]}>
                <Icon name={opt.iconName} size={24} color="primary" />
              </View>
              <View style={styles.optionText}>
                <Text variant="body.largeBold" color="primary">
                  {opt.label}
                </Text>
                <Text variant="body.smallMedium" color="secondary">
                  {opt.description}
                </Text>
              </View>
              <View
                style={[
                  styles.radio,
                  isSelected && styles.radioSelected,
                ]}
              >
                {isSelected && (
                  <Icon name="checkmark" size={16} color="white" />
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Bilgi bolgesi - 5 kart limiti buraya tasinacak */}
        <View style={styles.infoBox}>
          <Text variant="body.largeBold" color="primary" style={styles.infoTitle}>
            {"\u{1F4A1}"} Bilgi
          </Text>
          <View style={styles.infoBulletRow}>
            <Icon name="info" size={16} color="secondary" />
            <Text variant="body.smallMedium" color="secondary" style={{ flex: 1 }}>
              Her servis turunden en fazla 5 bireysel kart olusturabilirsiniz
            </Text>
          </View>
          <View style={styles.infoBulletRow}>
            <Icon name="info" size={16} color="secondary" />
            <Text variant="body.smallMedium" color="secondary" style={{ flex: 1 }}>
              Bireysel kartlar kisisel kullaniminiz icindir
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Devam Et - Button atom */}
      <View style={styles.bottomBar}>
        <Button
          variant="primaryFilled"
          size="lg"
          onPress={handleContinue}
        >
          Devam Et
        </Button>
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
    gap: 2,
  },
  content: {
    padding: spacing[4],
    gap: spacing[3],
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: semantic.border.tertiary,
    borderRadius: radius.lg,
    padding: spacing[4],
    gap: spacing[3],
  },
  optionCardSelected: {
    borderColor: semantic.brand.primary,
    borderWidth: 2,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    flex: 1,
    gap: 2,
  },
  radio: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#d1d5db",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    backgroundColor: semantic.brand.primary,
    borderColor: semantic.brand.primary,
  },
  infoBox: {
    backgroundColor: semantic.background.canvas,
    borderRadius: radius.lg,
    padding: spacing[4],
    gap: spacing[2],
    marginTop: spacing[1],
  },
  infoTitle: {
    marginBottom: spacing[1],
  },
  infoBulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing[2],
  },
  bottomBar: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    borderTopWidth: 1,
    borderTopColor: semantic.border.tertiary,
  },
});
