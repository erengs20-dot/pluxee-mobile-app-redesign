import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { semantic } from '../../../theme/semantic';
import { spacing } from '../../../tokens/spacing';
import { radius } from '../../../tokens/radius';
import { Icon } from '../Icon';

export interface SearchInputProps
  extends Omit<TextInputProps, 'placeholderTextColor' | 'style'> {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export function SearchInput({
  value,
  onChangeText,
  placeholder = 'Search',
  onClear,
  ...rest
}: SearchInputProps) {
  const handleClear = () => {
    onChangeText('');
    onClear?.();
  };

  return (
    <View style={styles.container}>
      <Icon name="search" size={24} color="tertiary" />

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={semantic.text.tertiary}
        autoCapitalize="none"
        autoCorrect={false}
        {...rest}
      />

      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} hitSlop={8}>
          <Icon name="xmark" size={16} color="tertiary" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: semantic.text.primary,
    padding: 0,
  },
});
