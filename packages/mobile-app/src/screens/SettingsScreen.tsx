import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Icon, Toggle, semantic, spacing } from "@pluxee/design-system";
import { useNavigation } from "@react-navigation/native";
import { CardDetailHeader } from "../components/cardDetail/CardDetailHeader";

export function SettingsScreen() {
  const navigation = useNavigation();
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [callEnabled, setCallEnabled] = useState(true);
  const [campaignNotif, setCampaignNotif] = useState(true);

  return (
    <View style={styles.root}>
      <CardDetailHeader title="Ayarlar" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="title.mobileSection" color="secondary">Iletisim Izinleri</Text>
        <Text variant="body.medium" color="secondary">Iletisim yontemi sec</Text>

        <View style={styles.toggleRow}>
          <View style={{ flex: 1 }}>
            <Text variant="body.largeBold" color="link">E-Posta</Text>
            <Text variant="body.medium" color="secondary">Kampanyalarla ilgili e-posta almak istiyorum.</Text>
          </View>
          <Toggle value={emailEnabled} onChange={setEmailEnabled} />
        </View>

        <View style={styles.toggleRow}>
          <View style={{ flex: 1 }}>
            <Text variant="body.largeBold" color="link">SMS</Text>
            <Text variant="body.medium" color="secondary">Kampanyalarla ilgili SMS almak istiyorum.</Text>
          </View>
          <Toggle value={smsEnabled} onChange={setSmsEnabled} />
        </View>

        <View style={styles.toggleRow}>
          <View style={{ flex: 1 }}>
            <Text variant="body.largeBold" color="link">Arama</Text>
            <Text variant="body.medium" color="secondary">Kampanyalarla ilgili aranmak almak istiyorum.</Text>
          </View>
          <Toggle value={callEnabled} onChange={setCallEnabled} />
        </View>

        <Text variant="body.mediumBold" color="link" style={styles.link}>Aydinlatma Metni</Text>

        <View style={{ height: spacing[4] }} />
        <Text variant="title.mobileSection" color="secondary">Bildirimler</Text>
        <Text variant="body.medium" color="secondary">Bildirim seceneklerini belirle</Text>

        <View style={styles.toggleRow}>
          <View style={{ flex: 1 }}>
            <Text variant="body.largeBold" color="link">Kampanya Bildirimleri</Text>
            <Text variant="body.medium" color="secondary">Kampanyalar hakkinda bildirim almak istiyorum.</Text>
          </View>
          <Toggle value={campaignNotif} onChange={setCampaignNotif} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: semantic.background.canvas },
  content: { padding: spacing[4], gap: spacing[3] },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    paddingVertical: spacing[2],
  },
  link: {
    textDecorationLine: "underline",
    alignSelf: "center",
    paddingVertical: spacing[3],
  },
});
