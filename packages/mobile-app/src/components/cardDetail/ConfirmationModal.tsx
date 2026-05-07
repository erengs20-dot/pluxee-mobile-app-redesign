import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Pressable } from 'react-native';
import { Text, Button, Icon, semantic, spacing, radius } from '@pluxee/design-system';

interface ConfirmationModalProps {
  visible: boolean;
  title?: string;
  message: string;
  countdownSeconds?: number;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({
  visible,
  title = 'Uyari',
  message,
  countdownSeconds = 10,
  confirmLabel = 'Tamam',
  cancelLabel = 'Vazgec',
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const [countdown, setCountdown] = useState(countdownSeconds);

  useEffect(() => {
    if (!visible) {
      setCountdown(countdownSeconds);
      return;
    }
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [visible, countdown, countdownSeconds]);

  const progress = countdown / countdownSeconds;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <Icon name="warningTriangle" size={24} color="warning" />
          <Text variant="title.mobileMain" color="primary" align="center">
            {title}
          </Text>
          <Text variant="body.medium" color="secondary" align="center" style={styles.message}>
            {message}
          </Text>
          <Text variant="body.mediumBold" color="primary" align="center">
            Devam etmek istiyor musun?
          </Text>
          <View style={styles.countdownRow}>
            <Text variant="body.mediumBold" color="primary">Kalan sure</Text>
            <Text variant="body.mediumBold" color="primary">{countdown} sn</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: ((progress * 100) + '%') as any }]} />
          </View>
          <Button variant="chamfered" size="lg" onPress={onConfirm}>
            {confirmLabel}
          </Button>
          <Button variant="primaryOutlined" size="lg" onPress={onCancel}>
            {cancelLabel}
          </Button>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(34, 28, 70, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    padding: spacing[5],
    width: '100%',
    alignItems: 'center',
    gap: spacing[3],
  },
  message: {
    lineHeight: 22,
  },
  countdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1b51dc',
    borderRadius: 3,
  },
});
