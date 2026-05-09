/**
 * SetDefaultCardModal
 *
 * Kullanıcı bir kart seçtiğinde gösterilen onay modalı.
 * "Bu kartı varsayılan yapmak istiyor musun?" sorar.
 */

import React from 'react';
import { Modal, View, StyleSheet, Pressable } from 'react-native';
import {
  Button,
  Text,
  Icon,
  semantic,
  spacing,
  radius,
} from '@pluxee/design-system';
import type { UserCard } from '../data/cards';
import { formatCurrency, CARD_CATEGORY_META } from '../data/cards';

interface SetDefaultCardModalProps {
  card: UserCard | null;
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function SetDefaultCardModal({
  card,
  visible,
  onConfirm,
  onCancel,
}: SetDefaultCardModalProps) {
  if (!card) return null;

  const meta = CARD_CATEGORY_META[card.category];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          {/* İkon */}
          <View style={[styles.iconWrap, { backgroundColor: meta.bgColor }]}>
            <Icon name="starFilled" size={24} color="primary" />
          </View>

          {/* Başlık */}
          <Text
            variant="title.mobileCard"
            color="primary"
            align="center"
            style={styles.title}
          >
            {card.name}'i varsayılan yapmak istiyor musun?
          </Text>

          {/* Açıklama */}
          <Text
            variant="body.medium"
            color="secondary"
            align="center"
            style={styles.description}
          >
            Anasayfada bu kart görünecek ve hızlı işlemler için kullanılacak.
          </Text>

          {/* Kart bilgisi (özet) */}
          <View style={styles.cardSummary}>
            <View>
              <Text variant="body.smallMedium" color="tertiary">
                {meta.label}
              </Text>
              <Text variant="body.mediumBold" color="primary">
                •••• {card.lastDigits}
              </Text>
            </View>
            <Text variant="body.largeBold" color="primary">
              ₺ {formatCurrency(card.balance)}
            </Text>
          </View>

          {/* Aksiyonlar */}
          <View style={styles.actions}>
            <View style={{ flex: 1 }}>
              <Button variant="secondaryOutlined" onPress={onCancel}>
                Hayir
              </Button>
            </View>
            <View style={{ flex: 1 }}>
              <Button variant="primaryFilled" onPress={onConfirm}>
                Evet
              </Button>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(34, 28, 70, 0.6)', // Pluxee navy + opacity
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[5],
  },
  modalContent: {
    width: '100%',
    backgroundColor: semantic.background.primary,
    borderRadius: radius['2xl'],
    padding: spacing[6],
    alignItems: 'center',
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[4],
  },
  title: {
    marginBottom: spacing[2],
  },
  description: {
    marginBottom: spacing[5],
  },
  cardSummary: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: semantic.tag.defaultEnable,
    padding: spacing[4],
    borderRadius: radius.lg,
    marginBottom: spacing[6],
  },
  actions: {
    flexDirection: 'row',
    gap: spacing[3],
    width: '100%',
  },
});
