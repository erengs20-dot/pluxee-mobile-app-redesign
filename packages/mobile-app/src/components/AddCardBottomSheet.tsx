/**
 * AddCardBottomSheet
 *
 * "Kart Ekle" hizli islem butonuna basildiginda acilir.
 * 2 secenek sunar:
 *   A) Kart numarasi ile ekle (firma karti)
 *   B) Bireysel kart olustur
 * + Bilgi bolgesi (firma vs bireysel farki)
 */
import React, { forwardRef, useImperativeHandle, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import { Text, Icon, Tag, semantic, spacing, radius } from "@pluxee/design-system";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export interface AddCardSheetRef {
  open: () => void;
  close: () => void;
}

interface Props {
  onSelectByNumber: () => void;
  onSelectPersonal: () => void;
}

export const AddCardBottomSheet = forwardRef<AddCardSheetRef, Props>(
  ({ onSelectByNumber, onSelectPersonal }, ref) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setVisible(true),
      close: () => setVisible(false),
    }));

    const handleClose = useCallback(() => setVisible(false), []);

    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={handleClose}
      >
        <Pressable style={styles.overlay} onPress={handleClose}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            {/* Drag handle */}
            <View style={styles.dragHandle} />

            {/* Header */}
            <View style={styles.header}>
              <View style={{ width: 32 }} />
              <Text variant="title.mobileDefault" color="primary">
                Kart Ekle
              </Text>
              <TouchableOpacity onPress={handleClose} hitSlop={12}>
                <Icon name="xmark" size={24} color="primary" />
              </TouchableOpacity>
            </View>

            {/* Secenek 1: Kart numarasi ile */}
            <TouchableOpacity
              style={styles.optionCard}
              activeOpacity={0.7}
              onPress={() => {
                handleClose();
                setTimeout(() => onSelectByNumber(), 350);
              }}
            >
              <View style={[styles.optionIcon, { backgroundColor: semantic.brand.primary }]}>
                <Icon name="wallet" size={24} color="white" />
              </View>
              <View style={styles.optionText}>
                <Text variant="body.largeBold" color="primary">
                  Kart numarasi ile kart ekle
                </Text>
                <Text variant="body.smallMedium" color="secondary">
                  Firma kartini eklemek icin kart numarani gir
                </Text>
              </View>
              <Icon name="chevronRight" size={16} color="secondary" />
            </TouchableOpacity>

            {/* Secenek 2: Bireysel kart */}
            <TouchableOpacity
              style={styles.optionCard}
              activeOpacity={0.7}
              onPress={() => {
                handleClose();
                setTimeout(() => onSelectPersonal(), 350);
              }}
            >
              <View style={[styles.optionIcon, { backgroundColor: semantic.brand.secondary }]}>
                <Icon name="promotions" size={24} color="primary" />
              </View>
              <View style={styles.optionText}>
                <View style={styles.optionTitleRow}>
                  <Text variant="body.largeBold" color="primary">
                    Bireysel kart olustur
                  </Text>
                  <Tag variant="success">YENI</Tag>
                </View>
                <Text variant="body.smallMedium" color="secondary">
                  Kendin icin bireysel kart olustur, bakiye yukleyerek kullan
                </Text>
              </View>
              <Icon name="chevronRight" size={16} color="secondary" />
            </TouchableOpacity>

            {/* Bilgi bolgesi */}
            <View style={styles.infoBox}>
              <Text variant="body.largeBold" color="primary" style={styles.infoTitle}>
                {"\u{1F4A1}"} Bilgi
              </Text>
              <View style={styles.infoBulletRow}>
                <Icon name="info" size={16} color="secondary" />
                <Text variant="body.smallMedium" color="secondary" style={{ flex: 1 }}>
                  Firma kartlari sirketiniz tarafindan olusturulur
                </Text>
              </View>
              <View style={styles.infoBulletRow}>
                <Icon name="info" size={16} color="secondary" />
                <Text variant="body.smallMedium" color="secondary" style={{ flex: 1 }}>
                  Bireysel kartlar kisisel kullaniminiz icindir
                </Text>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
    maxHeight: SCREEN_HEIGHT * 0.85,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#d1d5db",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: spacing[3],
    marginBottom: spacing[2],
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing[3],
    marginBottom: spacing[2],
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
    borderRadius: radius.lg,
    padding: spacing[4],
    marginBottom: spacing[3],
    gap: spacing[3],
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    flex: 1,
    gap: 4,
  },
  optionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  infoBox: {
    backgroundColor: semantic.background.canvas,
    borderRadius: radius.lg,
    padding: spacing[4],
    marginTop: spacing[1],
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
});
