import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, Icon, SearchInput, Button, semantic, spacing, radius } from "@pluxee/design-system";
import { useNavigation } from "@react-navigation/native";
import { CardDetailHeader } from "../components/cardDetail/CardDetailHeader";

const FAQ_SECTIONS = [
  {
    title: "Hesabim/Profilim",
    items: [
      "Cekimin kayitli oldugu gsm numaram degisti ne yapmaliyim?",
    ],
  },
  {
    title: "Pazaryeri Bakiyesi ile Alinan Cekler",
    items: [
      "Ayni markaya ait 2 farkli cekim var, birlestirebilir miyim?",
      "Cek alma islemlerinde belirlenen marka cek tutarlari haricinde bir tutar belirleyebilir miyim?",
      "Hesabimda bulunan ceklerin kullanim suresi nedir?",
      "Pluxee Hediye uzerinden aldigim Pluxee Gida cekimi iptal edebiliyor muyum?",
      "Pluxee Hediye uzerinden Pluxee Gida cek aldim, tarafima fatura ulasti ne yapmaliyim?",
      "Odeme sonrasi kalan cek bakiyemi nasil goruntulerim?",
    ],
  },
];

export function HelpCenterScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <View style={styles.root}>
      <CardDetailHeader title="Yardim" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Yardim Arayin"
        />

        {FAQ_SECTIONS.map((section, si) => (
          <View key={si} style={styles.section}>
            <Text variant="title.mobileSection" color="secondary">{section.title}</Text>
            {section.items.map((item, ii) => {
              const globalIdx = si * 100 + ii;
              const isOpen = expandedIdx === globalIdx;
              return (
                <TouchableOpacity
                  key={ii}
                  style={styles.faqItem}
                  onPress={() => setExpandedIdx(isOpen ? null : globalIdx)}
                  activeOpacity={0.7}
                >
                  <Text variant="body.medium" color="primary" style={{ flex: 1, lineHeight: 22 }}>
                    {item}
                  </Text>
                  <Icon
                    name={isOpen ? "chevronDown" : "chevronDown"}
                    size={24}
                    color="secondary"
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={{ flex: 1 }}>
          <Button variant="primaryFilled" size="lg">
            444 7277
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button variant="primaryOutlined" size="lg">
            Canli Destek
          </Button>
        </View>
      </View>
      <Text variant="body.smallMedium" color="secondary" align="center" style={styles.footerNote}>
        Hafta Ici ve Cumartesi 08:00 - 20:00 arasi hizmet verilmektedir.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: semantic.background.canvas },
  content: { padding: spacing[4], gap: spacing[4], paddingBottom: spacing[8] },
  section: { gap: spacing[2] },
  faqItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: semantic.background.primary,
    borderRadius: radius.lg,
    padding: spacing[4],
    gap: spacing[3],
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
  },
  footer: {
    flexDirection: "row",
    gap: spacing[3],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderTopWidth: 1,
    borderTopColor: semantic.border.tertiary,
    backgroundColor: semantic.background.primary,
  },
  footerNote: {
    paddingBottom: spacing[4],
    backgroundColor: semantic.background.primary,
  },
});
