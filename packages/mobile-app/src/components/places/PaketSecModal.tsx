import React from 'react';
import { Modal, View, ScrollView, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Text, Icon, IconButton, semantic, radius, spacing } from '@pluxee/design-system';
import type { HediyePaket } from '../../data/placesScenarios';

interface PaketSecModalProps {
  visible: boolean;
  brandName: string;
  packages: HediyePaket[];
  onSelect: (packageId: string) => void;
  onClose: () => void;
}

export const PaketSecModal: React.FC<PaketSecModalProps> = ({ visible, brandName, packages, onSelect, onClose }) => {
  const filtered = packages.filter((p) => p.balance > 0);

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <View style={styles.closeRow}>
            <IconButton iconName="xmark" variant="ghost" size="sm" onPress={onClose} accessibilityLabel="Kapat" />
          </View>
          <Text variant="title.mobileCard" color="primary" align="center" style={styles.title}>
            Paket sec
          </Text>
          <Text variant="body.medium" color="primary" align="center" style={styles.subtitle}>
            {brandName} markasi asagidaki paketlerinde mevcut
          </Text>
          <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {filtered.map((pkg) => (
              <TouchableOpacity
                key={pkg.id}
                activeOpacity={0.8}
                style={styles.packageRow}
                onPress={() => onSelect(pkg.id)}
              >
                <View style={styles.pkgIcon}>
                  <Icon name="gift" size={24} color="primary" />
                </View>
                <View style={styles.pkgContent}>
                  <Text variant="body.largeBold" color="primary">{pkg.name}</Text>
                  <View style={styles.pkgDetailRow}>
                    <Text variant="body.smallMedium" color="secondary" style={styles.detailLabel}>
                      Marka detayi
                    </Text>
                    <Icon name="arrowRight" size={16} color="info" />
                  </View>
                </View>
                <Text variant="body.largeBold" color="primary" style={styles.amount}>
                  {pkg.balance.toLocaleString('tr-TR')},00 TL
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[5],
  },
  card: {
    width: '100%',
    maxHeight: '70%',
    backgroundColor: semantic.background.primary,
    borderRadius: radius.lg,
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[5],
  },
  closeRow: {
    alignItems: 'flex-end',
    paddingTop: spacing[3],
  },
  title: {
    marginBottom: spacing[2],
  },
  subtitle: {
    marginBottom: spacing[5],
  },
  scrollContainer: {
    flexGrow: 0,
  },
  scrollContent: {
    gap: spacing[3],
    paddingBottom: spacing[3],
  },
  packageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[3],
    backgroundColor: '#FFF8E1',
    borderRadius: radius.md,
    gap: spacing[3],
  },
  pkgIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pkgContent: {
    flex: 1,
  },
  pkgDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    marginTop: spacing[1],
  },
  detailLabel: {
    fontSize: 12,
  },
  amount: {
    fontSize: 15,
  },
});
