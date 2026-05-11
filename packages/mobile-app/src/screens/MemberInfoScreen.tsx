import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Icon, Button, semantic, spacing, radius } from "@pluxee/design-system";
import { useNavigation } from "@react-navigation/native";
import { CardDetailHeader } from "../components/cardDetail/CardDetailHeader";

export function MemberInfoScreen() {
  const navigation = useNavigation();
  const [name] = useState("EREN");
  const [surname] = useState("GOKTAS");
  const [phone] = useState("5076983128");
  const [email] = useState("eren.goktas@pluxeegroup.com");

  return (
    <View style={styles.root}>
      <CardDetailHeader title="Uyelik Bilgilerim" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="body.mediumBold" color="primary">Ad</Text>
        <View style={styles.inputWrap}>
          <Icon name="avatar" size={24} color="secondary" />
          <TextInput style={styles.input} value={name} editable={false} />
        </View>

        <Text variant="body.mediumBold" color="primary">Soyad</Text>
        <View style={styles.inputWrap}>
          <Icon name="avatar" size={24} color="secondary" />
          <TextInput style={styles.input} value={surname} editable={false} />
        </View>

        <Text variant="body.mediumBold" color="primary">
          Cep Telefonu Numarasi <Text variant="body.mediumBold" color="error">*</Text>
        </Text>
        <View style={styles.inputWrap}>
          <Icon name="phone" size={24} color="secondary" />
          <TextInput style={styles.input} value={phone} keyboardType="phone-pad" />
        </View>
        <View style={styles.helperRow}>
          <Icon name="info" size={16} color="info" />
          <Text variant="body.smallMedium" color="primary">Bu alani doldurman gerekiyor</Text>
        </View>

        <Text variant="body.mediumBold" color="primary">
          E-posta Adresi <Text variant="body.mediumBold" color="error">*</Text>
        </Text>
        <View style={styles.inputWrap}>
          <Icon name="mail" size={24} color="secondary" />
          <TextInput style={styles.input} value={email} keyboardType="email-address" />
        </View>
        <View style={styles.helperRow}>
          <Icon name="info" size={16} color="info" />
          <Text variant="body.smallMedium" color="primary">Bu alani doldurman gerekiyor</Text>
        </View>

        <View style={{ height: spacing[6] }} />
        <Button variant="primaryFilled" size="lg" disabled>
          Degisiklikleri Kaydet
        </Button>

        <View style={{ height: spacing[6] }} />
        <Text variant="title.mobileSection" color="secondary">Tercihler</Text>
        <TouchableOpacity style={styles.dangerRow}>
          <Icon name="warning" size={24} color="error" />
          <Text variant="body.largeBold" color="error">Hesabi Sil</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: semantic.background.canvas },
  content: { padding: spacing[4], gap: spacing[3] },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    backgroundColor: semantic.background.primary,
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
    borderRadius: radius.lg,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: semantic.text.primary,
  },
  helperRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginTop: -spacing[1],
  },
  dangerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    paddingVertical: spacing[4],
  },
});
