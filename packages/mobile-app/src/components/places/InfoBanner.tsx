import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon, semantic, radius, spacing } from '@pluxee/design-system';

interface InfoBannerProps {
  text: string;
  linkTexts?: { label: string; targetBrand: 'yemek' | 'gida' }[];
  onLinkPress?: (targetBrand: 'yemek' | 'gida') => void;
}

export const InfoBanner: React.FC<InfoBannerProps> = ({ text, linkTexts = [], onLinkPress }) => {
  const parts: { text: string; link?: { label: string; targetBrand: 'yemek' | 'gida' } }[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    const match = remaining.match(/\[LINK(\d+)\]/);
    if (!match) {
      parts.push({ text: remaining });
      break;
    }
    const idx = parseInt(match[1], 10);
    const before = remaining.slice(0, match.index);
    if (before) parts.push({ text: before });
    if (linkTexts[idx]) {
      parts.push({ text: linkTexts[idx].label, link: linkTexts[idx] });
    }
    remaining = remaining.slice(match.index + match[0].length);
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Icon name="arrowExportRight" size={24} color="inverse" />
      </View>
      <Text variant="body.medium" color="primary" style={styles.text}>
        {parts.map((part, i) =>
          part.link ? (
            <Text
              key={i}
              variant="body.mediumBold"
              color="primary"
              onPress={() => onLinkPress && onLinkPress(part.link.targetBrand)}
              style={styles.link}
            >
              {part.text}
            </Text>
          ) : (
            <Text key={i} variant="body.medium" color="primary">
              {part.text}
            </Text>
          )
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: semantic.background.primary,
    borderRadius: radius.lg,
    padding: spacing[3],
    marginVertical: spacing[3],
    gap: spacing[3],
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: '#0E7C3A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  link: {
    textDecorationLine: 'underline',
  },
});
