import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Icon, semantic, spacing, radius } from "@pluxee/design-system";
import { useNavigation } from "@react-navigation/native";
import { CardDetailHeader } from "../components/cardDetail/CardDetailHeader";

export function NotificationsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <CardDetailHeader title="Bildirimlerim" onBack={() => navigation.goBack()} />
      <View style={styles.emptyCard}>
        <Icon name="notifications" size={24} color="primary" />
        <Text variant="title.mobileCard" color="primary" align="center">
          Henuz bildirimin yok
        </Text>
        <Text variant="body.medium" color="secondary" align="center" style={{ lineHeight: 20 }}>
          {"Pluxee'den gelen bildirimlerin burada listeleniyor olacak"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: semantic.background.canvas },
  emptyCard: {
    margin: spacing[4],
    backgroundColor: semantic.background.primary,
    borderRadius: radius.lg,
    padding: spacing[8],
    alignItems: "center",
    gap: spacing[3],
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
  },
});
