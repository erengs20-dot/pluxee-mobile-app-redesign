/**
 * AddCardByNumberScreen
 *
 * Firma kartini 16 haneli kart numarasi ile ekleme.
 * - 16 hane mask (4-4-4-4 gruplu dots)
 * - 0/16 rakam sayaci
 * - Bilgi bolgesi
 * - Devam Et butonu (Button atom, 16 hane dolmadan disabled)
 * - Hatali numara -> kirmizi hata mesaji
 * - Dogru numara -> AddCardSuccess ekranina yonlendir
 */
import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Icon, Button, semantic, spacing, radius } from "@pluxee/design-system";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { MOCK_CARDS } from "../data/cards";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function AddCardByNumberScreen() {
  const navigation = useNavigation<Nav>();
  const [cardNumber, setCardNumber] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<TextInput>(null);

  const rawDigits = cardNumber.replace(/\s/g, "");
  const digitCount = rawDigits.length;
  const isComplete = digitCount === 16;

  const formatCardNumber = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "").slice(0, 16);
    const groups = [];
    for (let i = 0; i < digits.length; i += 4) {
      groups.push(digits.slice(i, i + 4));
    }
    return groups.join(" ");
  };

  const handleChange = (text: string) => {
    setError("");
    setCardNumber(formatCardNumber(text));
  };

  const handleSubmit = () => {
    if (!isComplete) return;

    // Mock dogrulama: mevcut kartlarda ayni numara var mi kontrol et
    const formatted = formatCardNumber(rawDigits);
    const existingCard = MOCK_CARDS.find(c => c.fullCardNumber === formatted);

    if (existingCard) {
      setError("Bu kart zaten hesabiniza ekli.");
      return;
    }

    // Mock: 16 hane girilmisse kabul et (gercek uygulamada backend dogrular)
    // Kategoriyi ilk 4 haneye gore belirle (mock)
    const prefix = rawDigits.slice(0, 4);
    let category: "meal" | "gift" | "food" | "business" | "transport" = "meal";
    if (prefix === "5789") category = "gift";
    else if (prefix === "2345") category = "transport";

    navigation.navigate("AddCardSuccess", {
      category,
      cardNumber: formatted,
      isPersonal: false,
    });
  };

  // Masked dots gosterimi
  const renderMaskedDisplay = () => {
    const dots = [];
    for (let i = 0; i < 16; i++) {
      if (i > 0 && i % 4 === 0) {
        dots.push(
          <View key={`space-${i}`} style={{ width: spacing[3] }} />
        );
      }
      dots.push(
        <View
          key={`dot-${i}`}
          style={[
            styles.dot,
            i < digitCount
              ? { backgroundColor: semantic.brand.primary }
              : { backgroundColor: semantic.border.tertiary },
          ]}
        />
      );
    }
    return dots;
  };

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
            <Icon name="chevronLeft" size={24} color="primary" />
          </TouchableOpacity>
          <Text variant="title.mobileDefault" color="primary">
            Kart Numarasi ile Ekle
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
            <Icon name="xmark" size={24} color="primary" />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Kart numarasi input alani */}
          <View style={styles.inputCard}>
            <Text variant="body.smallMedium" color="secondary" style={styles.inputLabel}>
              KART NUMARASI
            </Text>
            <TouchableOpacity
              style={styles.dotsRow}
              onPress={() => inputRef.current?.focus()}
              activeOpacity={1}
            >
              {renderMaskedDisplay()}
            </TouchableOpacity>
            <View style={[styles.underline, error ? { backgroundColor: semantic.text.error } : {}]} />
            <Text
              variant="body.smallMedium"
              color={error ? "error" : "secondary"}
              style={styles.counter}
            >
              {error || `${digitCount}/16 rakam`}
            </Text>
            {/* Gizli TextInput */}
            <TextInput
              ref={inputRef}
              style={styles.hiddenInput}
              value={cardNumber}
              onChangeText={handleChange}
              keyboardType="number-pad"
              maxLength={19}
              autoFocus
            />
          </View>

          {/* Bilgi bolgesi */}
          <View style={styles.infoBox}>
            <Text variant="body.largeBold" color="primary" style={styles.infoTitle}>
              {"\u{1F4A1}"} Bilgi
            </Text>
            <View style={styles.infoBulletRow}>
              <Icon name="info" size={16} color="secondary" />
              <Text variant="body.smallMedium" color="secondary" style={{ flex: 1 }}>
                Kart numarasi kartinizin on yuzunde bulunur
              </Text>
            </View>
            <View style={styles.infoBulletRow}>
              <Icon name="info" size={16} color="secondary" />
              <Text variant="body.smallMedium" color="secondary" style={{ flex: 1 }}>
                16 haneli numarayi girerek kartinizi ekleyin
              </Text>
            </View>
            <View style={styles.infoBulletRow}>
              <Icon name="info" size={16} color="secondary" />
              <Text variant="body.smallMedium" color="secondary" style={{ flex: 1 }}>
                Ekleme islemi aninda gerceklesir
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Devam Et butonu - Button atom */}
        <View style={styles.bottomBar}>
          <Button
            variant="primaryFilled"
            size="lg"
            onPress={handleSubmit}
            disabled={!isComplete}
          >
            Devam Et
          </Button>
        </View>
      </KeyboardAvoidingView>
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
  content: {
    padding: spacing[4],
    gap: spacing[4],
  },
  inputCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
    borderRadius: radius.lg,
    padding: spacing[4],
  },
  inputLabel: {
    letterSpacing: 1,
    marginBottom: spacing[3],
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: spacing[1],
    paddingVertical: spacing[2],
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  underline: {
    height: 2,
    backgroundColor: semantic.brand.secondary,
    marginTop: spacing[2],
    borderRadius: 1,
  },
  counter: {
    marginTop: spacing[2],
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    height: 0,
    width: 0,
  },
  infoBox: {
    backgroundColor: semantic.background.canvas,
    borderRadius: radius.lg,
    padding: spacing[4],
    gap: spacing[2],
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
