import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TextInput } from "react-native";
import { Text, Icon, Button, semantic, spacing, radius } from "@pluxee/design-system";
import { useNavigation } from "@react-navigation/native";
import { CardDetailHeader } from "../components/cardDetail/CardDetailHeader";

export function InvoiceInfoScreen() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("Eren");
  const [lastName, setLastName] = useState("Goktas");
  const [address, setAddress] = useState("Cekmekoy, Mehmet akif mahallesi ezgi sokak Cekmekoy Park sitesi b5 blok daire 12 istanbul");

  return (
    <View style={styles.root}>
      <CardDetailHeader title="Fatura bilgilerim" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="body.medium" color="primary" style={{ lineHeight: 20 }}>
          Bakiye yuklemelerine dair faturan asagidaki bilgiler ile duzenlenir
        </Text>

        <Text variant="body.mediumBold" color="primary">
          Isim <Text variant="body.mediumBold" color="error">*</Text>
        </Text>
        <View style={styles.inputWrap}>
          <Icon name="user" size={24} color="secondary" />
          <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
        </View>

        <Text variant="body.mediumBold" color="primary">
          Soyisim <Text variant="body.mediumBold" color="error">*</Text>
        </Text>
        <View style={styles.inputWrap}>
          <Icon name="user" size={24} color="secondary" />
          <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
        </View>

        <Text variant="body.mediumBold" color="primary">
          Adres <Text variant="body.mediumBold" color="error">*</Text>
        </Text>
        <TextInput
          style={styles.textArea}
          value={address}
          onChangeText={setAddress}
          multiline
          numberOfLines={4}
          maxLength={150}
        />
        <Text variant="body.smallMedium" color="secondary" align="right">
          {address.length}/150
        </Text>

        <View style={styles.btnRow}>
          <View style={{ flex: 1 }}>
            <Button variant="primaryOutlined" size="lg" onPress={() => navigation.goBack()}>
              Vazgec
            </Button>
          </View>
          <View style={{ flex: 1 }}>
            <Button variant="primaryFilled" size="lg" disabled>
              Kaydet
            </Button>
          </View>
        </View>
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
  input: { flex: 1, fontSize: 16, color: semantic.text.primary },
  textArea: {
    backgroundColor: semantic.background.primary,
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
    borderRadius: radius.lg,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    fontSize: 16,
    color: semantic.text.primary,
    minHeight: 120,
    textAlignVertical: "top",
  },
  btnRow: {
    flexDirection: "row",
    gap: spacing[3],
    marginTop: spacing[3],
  },
});
