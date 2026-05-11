/**
 * AddCardSuccessScreen
 *
 * Shared success ekrani - hem firma karti hem bireysel kart icin.
 * - Buyuk success checkmark ikonu
 * - Kart bilgi karti (sol serit + ikon + numara)
 * - "Karti Goruntule" -> yeni karti MOCK_CARDS'a ekleyip CardDetail'e git
 * - "Anasayfaya Don" -> MainTabs/Home'a don
 */
import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Icon, Button, semantic, spacing, radius } from "@pluxee/design-system";
import { useNavigation, useRoute, CommonActions } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../navigation/types";
import { CARD_CATEGORY_META, MOCK_CARDS, type UserCard } from "../data/cards";

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, "AddCardSuccess">;

export function AddCardSuccessScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { category, cardNumber, isPersonal } = route.params;
  const meta = CARD_CATEGORY_META[category];

  // Yeni karti MOCK_CARDS'a ekle (bir kere)
  const newCardId = useRef(`card-${Date.now()}`);
  useEffect(() => {
    const digits = cardNumber.replace(/\s/g, "");
    const lastDigits = digits.slice(-4);
    const newCard: UserCard = {
      id: newCardId.current,
      category,
      name: isPersonal ? `${meta.label} (Bireysel)` : `${meta.label} Kart`,
      lastDigits,
      fullCardNumber: cardNumber,
      cardOwner: isPersonal ? "EREN GOKTAS" : "PLUXEE TEKNOLOJI A.S.",
      balance: 0,
      pendingLoad: 0,
      plusPoints: 0,
      isDefault: false,
    };
    // Mock: MOCK_CARDS array'ine push et (runtime'da)
    const exists = MOCK_CARDS.find(c => c.id === newCardId.current);
    if (!exists) {
      MOCK_CARDS.push(newCard);
    }
  }, []);

  const handleViewCard = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: "MainTabs" },
          { name: "CardDetail", params: { cardId: newCardId.current, category } },
        ],
      })
    );
  };

  const handleGoHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      })
    );
  };

  return (
    <SafeAreaView style={styles.root} edges={["top", "bottom"]}>
      <View style={styles.container}>
        {/* Success icon - buyuk yesil daire + checkmark */}
        <View style={styles.successOuter}>
          <View style={[styles.successCircle, { backgroundColor: semantic.background.successBanner }]}>
            <View style={[styles.successInner, { backgroundColor: semantic.brand.secondary }]}>
              <Icon name="checkmark" size={24} color="primary" />
            </View>
          </View>
        </View>

        {/* Baslik */}
        <Text variant="title.mobileCard" color="primary" align="center">
          {isPersonal
            ? "Bireysel kartiniz olusturuldu!"
            : "Kartiniz basariyla eklendi!"}
        </Text>

        {/* Kart bilgi karti */}
        <View style={styles.cardInfo}>
          <View style={[styles.cardStripe, { backgroundColor: meta.stripeColor }]} />
          <View style={styles.cardContent}>
            <View style={[styles.iconBox, { backgroundColor: meta.bgColor }]}>
              <Icon name={meta.iconName} size={24} color="primary" />
            </View>
            <View style={styles.cardText}>
              <Text variant="body.largeBold" color="primary">
                {isPersonal ? `${meta.label} (Bireysel)` : meta.label}
              </Text>
              <Text variant="body.smallMedium" color="secondary">
                {cardNumber}
              </Text>
              <Text variant="body.smallMedium" color="secondary">
                Bakiye: 0,00 TL
              </Text>
            </View>
          </View>
        </View>

        {/* Aciklama */}
        <Text variant="body.smallMedium" color="secondary" align="center" style={{ lineHeight: 20 }}>
          {isPersonal
            ? "Kartiniz aktif ve kullanima hazir. Bakiye yukleyerek harcamaya baslayabilirsiniz."
            : "Kartiniz hesabiniza eklendi. Artik tum islemlerinizi mobil uygulamadan yapabilirsiniz."}
        </Text>
      </View>

      {/* Butonlar - Button atom */}
      <View style={styles.bottomBar}>
        <Button
          variant="primaryFilled"
          size="lg"
          onPress={handleViewCard}
        >
          Karti Goruntule
        </Button>
        <View style={{ height: spacing[3] }} />
        <Button
          variant="primaryOutlined"
          size="lg"
          onPress={handleGoHome}
        >
          Anasayfaya Don
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing[6],
    gap: spacing[5],
  },
  successOuter: {
    alignItems: "center",
  },
  successCircle: {
    width: 96,
    height: 96,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  successInner: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfo: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
    borderRadius: radius.lg,
    overflow: "hidden",
    width: "100%",
  },
  cardStripe: {
    width: 6,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: spacing[4],
    gap: spacing[3],
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    flex: 1,
    gap: spacing[1],
  },
  bottomBar: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    borderTopWidth: 1,
    borderTopColor: semantic.border.tertiary,
  },
});
