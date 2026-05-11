import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Icon, semantic, spacing, radius } from "@pluxee/design-system";
import { useNavigation } from "@react-navigation/native";
import { CardDetailHeader } from "../components/cardDetail/CardDetailHeader";

export function FavoritesScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <CardDetailHeader title="Favorilerim" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.ratingBox}>
            <Text variant="body.largeBold" color="primary">5.0</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text variant="body.largeBold" color="primary">KOFTECI RAMIZ</Text>
            <Text variant="body.medium" color="secondary">ISTANBUL UMRANIYE</Text>
          </View>
          <Text variant="body.mediumBold" color="link">0.41 km</Text>
        </View>
        <View style={styles.paymentBadge}>
          <Icon name="wallet" size={16} color="primary" />
          <Text variant="body.medium" color="primary">Mobil Odeme ve Online Alisveris</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: semantic.background.canvas },
  content: { padding: spacing[4] },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: semantic.background.primary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
    padding: spacing[3],
    gap: spacing[3],
  },
  ratingBox: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: semantic.background.successBanner,
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfo: {
    flex: 1,
    gap: spacing[1],
  },
  paymentBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    backgroundColor: semantic.background.primary,
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    marginTop: -1,
  },
});
