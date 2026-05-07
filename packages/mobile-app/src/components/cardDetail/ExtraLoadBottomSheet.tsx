import React from 'react';
import { View, StyleSheet, Modal, Pressable, TouchableOpacity } from 'react-native';
import { Text, Icon, semantic, spacing, radius } from '@pluxee/design-system';

interface ExtraLoadBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSingleLoad: () => void;
  onCreateInstruction: () => void;
  onViewInstructions: () => void;
}

export function ExtraLoadBottomSheet({
  visible,
  onClose,
  onSingleLoad,
  onCreateInstruction,
  onViewInstructions,
}: ExtraLoadBottomSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handle} />
          <View style={styles.headerRow}>
            <Text variant="title.mobileCard" color="primary">Extra Yukle</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Icon name="xmark" size={24} color="primary" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.option} onPress={onSingleLoad} activeOpacity={0.7}>
            <View style={[styles.iconCircle, { backgroundColor: '#f0e6ff' }]}>
              <Icon name="wallet" size={24} color="primary" />
            </View>
            <View style={styles.optionText}>
              <Text variant="body.mediumBold" color="primary">Hemen yukle</Text>
              <Text variant="body.smallMedium" color="tertiary">Her seferinde odeme yap</Text>
            </View>
            <Icon name="chevronRight" size={16} color="tertiary" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.option} onPress={onCreateInstruction} activeOpacity={0.7}>
            <View style={[styles.iconCircle, { backgroundColor: '#f0e6ff' }]}>
              <Icon name="refresh" size={24} color="primary" />
            </View>
            <View style={styles.optionText}>
              <Text variant="body.mediumBold" color="primary">Yukleme talimati olustur</Text>
              <Text variant="body.smallMedium" color="tertiary">Otomatik yukleme talimati olustur</Text>
            </View>
            <Icon name="chevronRight" size={16} color="tertiary" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewLink} onPress={onViewInstructions} activeOpacity={0.6}>
            <Text variant="body.mediumBold" color="link">Mevcut talimatlari gor</Text>
            <Icon name="chevronRight" size={16} color="info" />
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(34, 28, 70, 0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#ffffff', borderTopLeftRadius: radius['2xl'], borderTopRightRadius: radius['2xl'], paddingHorizontal: spacing[4], paddingBottom: spacing[8] },
  handle: { width: 40, height: 4, backgroundColor: '#d4d0c8', borderRadius: 2, alignSelf: 'center', marginTop: spacing[3], marginBottom: spacing[4] },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing[4] },
  closeBtn: { padding: spacing[1] },
  option: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing[3], gap: spacing[3] },
  iconCircle: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  optionText: { flex: 1, gap: 2 },
  divider: { height: 1, backgroundColor: semantic.border.tertiary },
  viewLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing[1], paddingVertical: spacing[4], marginTop: spacing[2] },
});
