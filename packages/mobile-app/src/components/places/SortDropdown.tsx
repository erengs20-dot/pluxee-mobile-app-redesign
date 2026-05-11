import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Text, Icon, semantic, radius, spacing, shadows } from '@pluxee/design-system';

export type SortOption = 'default' | 'alphabetical';

interface SortDropdownProps {
  visible: boolean;
  selected: SortOption;
  onSelect: (opt: SortOption) => void;
  onClose: () => void;
  anchor?: { top: number; right: number };
}

const OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'default', label: 'Varsayilan' },
  { id: 'alphabetical', label: 'Alfabetik' },
];

export const SortDropdown: React.FC<SortDropdownProps> = ({ visible, selected, onSelect, onClose, anchor }) => {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View
          style={[
            styles.dropdown,
            anchor
              ? { position: 'absolute', top: anchor.top, right: anchor.right }
              : { marginTop: 60, alignSelf: 'flex-end', marginRight: spacing[5] },
          ]}
        >
          {OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={styles.option}
              onPress={() => {
                onSelect(opt.id);
                onClose();
              }}
              activeOpacity={0.7}
            >
              <Text variant="body.largeMedium" color="primary" style={styles.optionText}>
                {opt.label}
              </Text>
              {selected === opt.id && <Icon name="checkmark" size={16} color="info" />}
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  dropdown: {
    backgroundColor: semantic.background.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing[2],
    minWidth: 160,
    ...shadows.small,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    gap: spacing[3],
  },
  optionText: {
    flex: 1,
  },
});
