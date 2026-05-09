/**
 * PaymentScreen
 *
 * Odeme tab'ina basildiginda acilir.
 * Secili karta gore 2 farkli akis:
 *   A) Yemek/Gida/Business -> QR + Kod bottom sheet
 *   B) Hediye/Ulasim -> Marka listesi -> BrandDetail
 *
 * Varsayilan kart ile hizli odeme - tek tikla QR al.
 * "Farkli kart sec" ile kart degistirilebilir.
 */
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  Icon,
  Button,
  semantic,
  spacing,
  radius,
} from "@pluxee/design-system";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  MOCK_CARDS,
  CARD_CATEGORY_META,
  formatCurrency,
  type UserCard,
} from "../data/cards";
import { MOCK_BRANDS, type Brand } from "../data/brands";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// QR + Kod uretici
function generateCode(): string {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  return code.slice(0, 3) + " " + code.slice(3);
}

export function PaymentScreen() {
  const navigation = useNavigation<Nav>();
  const defaultCard = MOCK_CARDS.find((c) => c.isDefault) ?? MOCK_CARDS[0];
  const [selectedCard, setSelectedCard] = useState<UserCard>(defaultCard);
  const [cardPickerOpen, setCardPickerOpen] = useState(false);
  const [qrSheetOpen, setQrSheetOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [paymentCode, setPaymentCode] = useState(generateCode());
  const [countdown, setCountdown] = useState(299);
  const [copySuccess, setCopySuccess] = useState(false);

  const meta = CARD_CATEGORY_META[selectedCard.category];
  const isDirectPayment = ["meal", "food", "business"].includes(selectedCard.category);

  // Reset countdown when QR sheet opens
  useEffect(() => {
    if (!qrSheetOpen) return;
    setPaymentCode(generateCode());
    setCountdown(299);
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [qrSheetOpen]);

  // Tab'a her focuslandiginda secili karti resetle
  useFocusEffect(
    useCallback(() => {
      const def = MOCK_CARDS.find((c) => c.isDefault) ?? MOCK_CARDS[0];
      setSelectedCard(def);
      setQrSheetOpen(false);
      setCancelModalOpen(false);
      setCardPickerOpen(false);
    }, [])
  );

  const handlePayment = () => {
    if (isDirectPayment) {
      setQrSheetOpen(true);
    } else {
      // Hediye/Ulasim -> marka listesi
      if (selectedCard.category === "gift") {
        navigation.navigate("BrandsList", {
          category: "gift",
          title: "Hediye Markalari",
        });
      } else {
        // Ulasim - sonra ozellestirilecek
        navigation.navigate("CardDetail", {
          cardId: selectedCard.id,
          category: selectedCard.category,
        });
      }
    }
  };

  const handleCloseQr = () => {
    setCancelModalOpen(true);
  };

  const handleDismissCancel = () => {
    setCancelModalOpen(false);
  };

  const handleConfirmCancel = () => {
    setQrSheetOpen(false);
    setCancelModalOpen(false);
    setCopySuccess(false);
  };

  const handleSelectCard = (card: UserCard) => {
    setSelectedCard(card);
    setCardPickerOpen(false);
  };

  const progress = countdown / 299;

  // QR pattern - sabit, her renderda degismez
  const qrPattern = useMemo(() => {
    const pattern: boolean[] = [];
    for (let i = 0; i < 49; i++) {
      pattern.push(Math.random() > 0.4);
    }
    return pattern;
  }, [paymentCode]);

  // Kopyalama fonksiyonu
  const handleCopy = async () => {
    await Clipboard.setStringAsync(paymentCode.replace(" ", ""));
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Hediye kartlar icin marka listesi
  const giftBrands = MOCK_BRANDS.filter((b) => b.category === "gift");

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="title.mobileDefault" color="primary">
            Odeme
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Secili kart */}
          <View style={styles.selectedCardWrap}>
            <Text
              variant="title.mobileSection"
              color="primary"
              style={styles.sectionLabel}
            >
              SECILI KART
            </Text>
            <View style={styles.selectedCard}>
              <View
                style={[styles.cardStripe, { backgroundColor: meta.stripeColor }]}
              />
              <View style={styles.cardBody}>
                <View
                  style={[styles.cardIcon, { backgroundColor: meta.bgColor }]}
                >
                  <Icon name={meta.iconName} size={24} color="primary" />
                </View>
                <View style={styles.cardInfo}>
                  <Text variant="body.largeBold" color="primary">
                    {selectedCard.name}
                  </Text>
                  <Text variant="body.medium" color="secondary">
                    {selectedCard.fullCardNumber}
                  </Text>
                </View>
                <View style={styles.balanceBlock}>
                  <Text variant="title.mobileCard" color="primary">
                    {formatCurrency(selectedCard.balance)}
                  </Text>
                  <Text variant="body.smallMedium" color="secondary">
                    TL
                  </Text>
                </View>
              </View>
            </View>

            {/* Farkli kart sec */}
            <TouchableOpacity
              style={styles.changCardBtn}
              onPress={() => setCardPickerOpen(true)}
              activeOpacity={0.7}
            >
              <Icon name="chevronDown" size={16} color="info" />
              <Text variant="body.mediumBold" color="link">
                Farkli bir kart sec
              </Text>
            </TouchableOpacity>
          </View>

          {/* Hediye/Ulasim icin bilgi notu */}
          {!isDirectPayment && (
            <View style={styles.infoBox}>
              <Icon name="info" size={16} color="secondary" />
              <Text
                variant="body.medium"
                color="secondary"
                style={{ flex: 1, lineHeight: 20 }}
              >
                {selectedCard.category === "gift"
                  ? "Hediye kartinizla odeme yapmak icin once harcama yapacaginiz markayi secin."
                  : "Ulasim kartinizla odeme yapmak icin once harcama yapacaginiz markayi secin."}
              </Text>
            </View>
          )}

          {/* Hediye/Ulasim icin marka listesi - 3 sutun grid */}
          {!isDirectPayment && selectedCard.category === "gift" && (
            <View style={styles.brandsSection}>
              <Text variant="title.mobileSection" color="primary">
                MARKALAR
              </Text>
              <View style={styles.brandsGrid}>
                {giftBrands.slice(0, 9).map((brand) => (
                  <TouchableOpacity
                    key={brand.id}
                    style={styles.brandTile}
                    onPress={() =>
                      navigation.navigate("BrandDetail", { brandId: brand.id })
                    }
                    activeOpacity={0.7}
                  >
                    <View style={styles.brandTileInner}>
                      <Text
                        variant="body.smallBold"
                        color="primary"
                        align="center"
                        numberOfLines={2}
                      >
                        {brand.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              {giftBrands.length > 9 && (
                <TouchableOpacity
                  style={styles.seeAllLink}
                  onPress={() =>
                    navigation.navigate("BrandsList", {
                      category: "gift",
                      title: "Hediye Markalari",
                    })
                  }
                >
                  <Text variant="body.mediumBold" color="link">
                    Tum markalari gor (+{giftBrands.length - 9})
                  </Text>
                  <Icon name="chevronRight" size={16} color="info" />
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>

        {/* CTA - sadece direkt odeme icin */}
        {isDirectPayment && (
          <View style={styles.bottomBar}>
            <Button variant="primaryFilled" size="lg" onPress={handlePayment}>
              Odeme Yap
            </Button>
          </View>
        )}
      </View>

      {/* ========== KART SECIM MODAL ========== */}
      <Modal
        visible={cardPickerOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setCardPickerOpen(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setCardPickerOpen(false)}
        >
          <Pressable style={styles.pickerSheet} onPress={() => {}}>
            <View style={styles.dragHandle} />
            <View style={styles.pickerHeader}>
              <View style={{ width: 32 }} />
              <Text variant="title.mobileDefault" color="primary">
                Kart Sec
              </Text>
              <TouchableOpacity
                onPress={() => setCardPickerOpen(false)}
                hitSlop={12}
              >
                <Icon name="xmark" size={24} color="primary" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.pickerList}>
              {MOCK_CARDS.map((card) => {
                const m = CARD_CATEGORY_META[card.category];
                const isSel = card.id === selectedCard.id;
                return (
                  <TouchableOpacity
                    key={card.id}
                    style={[
                      styles.pickerCard,
                      isSel && styles.pickerCardSelected,
                    ]}
                    onPress={() => handleSelectCard(card)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.pickerStripe,
                        { backgroundColor: m.stripeColor },
                      ]}
                    />
                    <View
                      style={[
                        styles.pickerIcon,
                        { backgroundColor: m.bgColor },
                      ]}
                    >
                      <Icon name={m.iconName} size={24} color="primary" />
                    </View>
                    <View style={styles.pickerInfo}>
                      <Text variant="body.mediumBold" color="primary">
                        {card.name}
                      </Text>
                      <Text variant="body.medium" color="secondary">
                        {formatCurrency(card.balance)} TL
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.pickerRadio,
                        isSel && {
                          backgroundColor: m.stripeColor,
                          borderColor: m.stripeColor,
                        },
                      ]}
                    >
                      {isSel && (
                        <Icon name="checkmark" size={16} color="primary" />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ========== QR + KOD BOTTOM SHEET ========== */}
      <Modal
        visible={qrSheetOpen}
        transparent
        animationType="slide"
        onRequestClose={handleCloseQr}
      >
        <Pressable style={styles.overlay} onPress={handleCloseQr}>
          <Pressable style={styles.qrSheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.dragHandle} />
            {/* Header */}
            <View style={styles.qrHeader}>
              <Text variant="title.mobileDefault" color="primary">
                Odeme Yap
              </Text>
              <TouchableOpacity onPress={handleCloseQr} hitSlop={12}>
                <Icon name="xmark" size={24} color="primary" />
              </TouchableOpacity>
            </View>

            {/* Icerik karti */}
            <View style={styles.qrCard}>
              <Text
                variant="body.medium"
                color="secondary"
                align="center"
                style={{ lineHeight: 20 }}
              >
                Odeme yapmak icin kare kodu kasiyere goster ya da uzerindeki
                mobil kodu soyle.
              </Text>

              {/* Kod */}
              <View style={styles.codeRow}>
                <Text variant="title.mobilePage" color="primary">
                  {paymentCode}
                </Text>
                <TouchableOpacity hitSlop={12} onPress={handleCopy}>
                  {copySuccess ? (
                    <Icon name="checkmark" size={24} color="success" />
                  ) : (
                    <Icon name="copy" size={24} color="secondary" />
                  )}
                </TouchableOpacity>
              </View>
              {copySuccess && (
                <Text variant="body.smallBold" color="success">
                  Kod kopyalandi!
                </Text>
              )}

              {/* QR placeholder - sabit pattern */}
              <View style={styles.qrPlaceholder}>
                <View style={styles.qrGrid}>
                  {qrPattern.map((filled, i) => (
                    <View
                      key={i}
                      style={[
                        styles.qrBlock,
                        {
                          backgroundColor: filled
                            ? semantic.brand.primary
                            : "transparent",
                        },
                      ]}
                    />
                  ))}
                </View>
              </View>

              {/* Countdown */}
              <View style={styles.countdownRow}>
                <Text variant="body.mediumBold" color="primary">
                  Kalan sure
                </Text>
                <Text variant="body.mediumBold" color="primary">
                  {countdown} sn
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progress * 100}%` },
                  ]}
                />
              </View>
            </View>

            {/* IPTAL ONAY - QR sheet icinde */}
            {cancelModalOpen && (
              <View style={styles.cancelInSheet}>
                <View style={styles.cancelCard}>
                  <TouchableOpacity
                    style={styles.cancelClose}
                    onPress={handleDismissCancel}
                    hitSlop={12}
                  >
                    <Icon name="xmark" size={24} color="primary" />
                  </TouchableOpacity>

                  <View style={styles.cancelIcon}>
                    <Icon name="info" size={24} color="primary" />
                  </View>

                  <Text
                    variant="title.mobileDefault"
                    color="primary"
                    align="center"
                  >
                    Bilgilendirme
                  </Text>
                  <Text
                    variant="body.medium"
                    color="secondary"
                    align="center"
                    style={{ lineHeight: 20 }}
                  >
                    Mevcut sayfadan cikman durumunda kodun iptal edilecektir.
                    Onayliyor musun?
                  </Text>

                  <Button
                    variant="primaryFilled"
                    size="lg"
                    onPress={handleConfirmCancel}
                  >
                    Onayliyorum, kodu iptal et
                  </Button>
                </View>
              </View>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: semantic.background.canvas,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: semantic.border.tertiary,
    backgroundColor: semantic.background.primary,
  },
  content: {
    padding: spacing[4],
    gap: spacing[4],
    paddingBottom: spacing[20],
  },
  sectionLabel: {
    letterSpacing: 1,
    marginBottom: spacing[2],
  },
  selectedCardWrap: {
    gap: spacing[1],
  },
  selectedCard: {
    flexDirection: "row",
    backgroundColor: semantic.background.primary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
    overflow: "hidden",
  },
  cardStripe: {
    width: 6,
  },
  cardBody: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: spacing[4],
    gap: spacing[3],
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfo: {
    flex: 1,
    gap: spacing[1],
  },
  balanceBlock: {
    alignItems: "flex-end",
  },
  changCardBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[2],
    alignSelf: "stretch",
    paddingVertical: spacing[3],
    marginTop: spacing[1],
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing[2],
    backgroundColor: semantic.background.canvas,
    borderRadius: radius.lg,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
  },
  brandsSection: {
    gap: spacing[3],
  },
  brandsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[2],
  },
  brandTile: {
    width: "31%",
    aspectRatio: 1,
    borderWidth: 1.5,
    borderColor: semantic.background.brand3,
    borderRadius: radius.lg,
    backgroundColor: semantic.background.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing[2],
  },
  brandTileInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[1],
  },
  seeAllLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[1],
    paddingVertical: spacing[2],
  },
  bottomBar: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    borderTopWidth: 1,
    borderTopColor: semantic.border.tertiary,
    backgroundColor: semantic.background.primary,
  },
  // Overlay / Sheets
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: semantic.border.tertiary,
    borderRadius: radius.xs,
    alignSelf: "center",
    marginTop: spacing[3],
    marginBottom: spacing[2],
  },
  // Kart Picker
  pickerSheet: {
    backgroundColor: semantic.background.primary,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
    maxHeight: SCREEN_HEIGHT * 0.7,
  },
  pickerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing[3],
    marginBottom: spacing[2],
  },
  pickerList: {
    maxHeight: SCREEN_HEIGHT * 0.5,
  },
  pickerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: semantic.background.primary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
    overflow: "hidden",
    marginBottom: spacing[2],
  },
  pickerCardSelected: {
    borderColor: semantic.brand.primary,
    borderWidth: 2,
  },
  pickerStripe: {
    width: 5,
    alignSelf: "stretch",
  },
  pickerIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: spacing[3],
  },
  pickerInfo: {
    flex: 1,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[3],
    gap: spacing[1],
  },
  pickerRadio: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: semantic.border.tertiary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing[3],
  },
  // QR Sheet
  qrSheet: {
    backgroundColor: semantic.background.primary,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
    maxHeight: SCREEN_HEIGHT * 0.85,
  },
  qrHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing[3],
    marginBottom: spacing[2],
  },
  qrCard: {
    backgroundColor: semantic.background.primary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
    padding: spacing[4],
    gap: spacing[4],
    alignItems: "center",
  },
  codeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    backgroundColor: semantic.background.canvas,
    borderRadius: radius.lg,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[5],
    width: "100%",
    justifyContent: "center",
  },
  qrPlaceholder: {
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing[2],
  },
  qrGrid: {
    width: 168,
    height: 168,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  qrBlock: {
    width: 24,
    height: 24,
  },
  countdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  progressBar: {
    height: 6,
    backgroundColor: semantic.background.disabled,
    borderRadius: radius.xs,
    overflow: "hidden",
    width: "100%",
  },
  progressFill: {
    height: "100%",
    backgroundColor: semantic.cta.secondary,
    borderRadius: radius.xs,
  },
  // Cancel - QR sheet icinde
  cancelInSheet: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(34, 28, 70, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing[4],
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    zIndex: 10,
  },
  cancelCard: {
    backgroundColor: semantic.background.primary,
    borderRadius: radius.lg,
    padding: spacing[5],
    width: "100%",
    alignItems: "center",
    gap: spacing[3],
  },
  cancelClose: {
    alignSelf: "flex-end",
  },
  cancelIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: semantic.brand.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
