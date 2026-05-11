import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text, Icon, Button, semantic, spacing, radius } from "@pluxee/design-system";
import { useNavigation } from "@react-navigation/native";
import { CardDetailHeader } from "../components/cardDetail/CardDetailHeader";

export function ChangePasswordScreen() {
  const navigation = useNavigation();
  const [current, setCurrent] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isValid = current.length >= 8 && newPw.length >= 8 && newPw === confirm;

  return (
    <View style={styles.root}>
      <CardDetailHeader title="Sifre Degisikligi" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="body.mediumBold" color="primary">
          Mevcut Sifre <Text variant="body.mediumBold" color="error">*</Text>
        </Text>
        <View style={styles.inputWrap}>
          <Icon name="lock" size={24} color="secondary" />
          <TextInput
            style={styles.input}
            value={current}
            onChangeText={setCurrent}
            secureTextEntry={!showCurrent}
            placeholder="********"
          />
          <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
            <Icon name="eyeOpenOutline" size={24} color="info" />
          </TouchableOpacity>
        </View>
        <View style={styles.helperRow}>
          <Icon name="info" size={16} color="info" />
          <Text variant="body.smallMedium" color="primary">Sifren en az 8 karakter, buyuk ve kucuk harf ve rakam icermeli.</Text>
        </View>

        <Text variant="body.mediumBold" color="primary">
          Yeni Sifre <Text variant="body.mediumBold" color="error">*</Text>
        </Text>
        <View style={styles.inputWrap}>
          <Icon name="lock" size={24} color="secondary" />
          <TextInput
            style={styles.input}
            value={newPw}
            onChangeText={setNewPw}
            secureTextEntry={!showNew}
            placeholder="********"
          />
          <TouchableOpacity onPress={() => setShowNew(!showNew)}>
            <Icon name="eyeOpenOutline" size={24} color="info" />
          </TouchableOpacity>
        </View>
        <View style={styles.helperRow}>
          <Icon name="info" size={16} color="info" />
          <Text variant="body.smallMedium" color="primary">Sifren en az 8 karakter, buyuk ve kucuk harf ve rakam icermeli.</Text>
        </View>

        <Text variant="body.mediumBold" color="primary">
          Yeni Sifre Tekrar <Text variant="body.mediumBold" color="error">*</Text>
        </Text>
        <View style={styles.inputWrap}>
          <Icon name="lock" size={24} color="secondary" />
          <TextInput
            style={styles.input}
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry={!showConfirm}
            placeholder="********"
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            <Icon name="eyeOpenOutline" size={24} color="info" />
          </TouchableOpacity>
        </View>
        <View style={styles.helperRow}>
          <Icon name="info" size={16} color="info" />
          <Text variant="body.smallMedium" color="primary">Sifren en az 8 karakter, buyuk ve kucuk harf ve rakam icermeli.</Text>
        </View>

        <View style={{ height: spacing[4] }} />
        <Button variant="primaryFilled" size="lg" disabled={!isValid}>
          Guncelle
        </Button>
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
  helperRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing[2],
    marginTop: -spacing[1],
  },
});
