import React from 'react';
import { Modal, View, StyleSheet, Pressable } from 'react-native';
import { Text, Button, Icon, semantic, radius, spacing } from '@pluxee/design-system';

interface InfoModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ visible, message, onClose }) => {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <View style={styles.iconCircle}>
            <Icon name="info" size={24} color="primary" />
          </View>
          <Text variant="title.mobileCard" color="primary" align="center" style={styles.title}>
            Bilgilendirme
          </Text>
          <Text variant="body.medium" color="primary" align="center" style={styles.message}>
            {message}
          </Text>
          <Button variant="primaryFilled" size="lg" onPress={onClose}>
            Tamam
          </Button>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

interface AktarimModalProps {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const AktarimModal: React.FC<AktarimModalProps> = ({ visible, message, onConfirm, onCancel }) => {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <View style={styles.iconCircle}>
            <Icon name="info" size={24} color="primary" />
          </View>
          <Text variant="title.mobileCard" color="primary" align="center" style={styles.title}>
            Bilgilendirme
          </Text>
          <Text variant="body.medium" color="primary" align="center" style={styles.message}>
            {message}
          </Text>
          <View style={styles.btnStack}>
            <Button variant="primaryFilled" size="lg" onPress={onConfirm}>
              Hemen aktar
            </Button>
            <Button variant="primaryOutlined" size="lg" onPress={onCancel}>
              Vazgec
            </Button>
          </View>
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
    backgroundColor: semantic.background.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing[6],
    paddingHorizontal: spacing[5],
    alignItems: 'center',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[3],
  },
  title: {
    marginBottom: spacing[3],
  },
  message: {
    marginBottom: spacing[5],
    lineHeight: 20,
  },
  btnStack: {
    width: '100%',
    gap: spacing[3],
  },
});
