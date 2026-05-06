/**
 * Pluxee Mobile App - 7 Atom Showcase
 * Button, Text, Icon, IconButton, Tag, Avatar, Input
 */

import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Text,
  Icon,
  IconButton,
  Tag,
  Avatar,
  Input,
  semantic,
  spacing,
} from '@pluxee/design-system';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />

      <Text variant="heroTitle.mobileMediumBlack" color="primary">
        Pluxee
      </Text>
      <Text variant="subtitle.mobileMain" color="secondary" style={styles.heroSubtitle}>
        7 Atom Component Showcase
      </Text>

      {/* === AVATAR === */}
      <Section title="Avatar">
        <View style={styles.iconRow}>
          <Avatar name="Eren Goktas" size="sm" />
          <Avatar name="Eren Goktas" size="md" />
          <Avatar name="Eren Goktas" size="lg" />
          <Avatar name="Eren Goktas" size="xl" />
        </View>
        <View style={[styles.iconRow, { marginTop: spacing[3] }]}>
          <Avatar name="Ali Veli" backgroundColor={semantic.brand.secondary} />
          <Avatar name="Ahmet" backgroundColor={semantic.brand.tertiary} />
          <Avatar name="Mehmet Yılmaz" backgroundColor={semantic.brand.quaternary} />
          <Avatar iconName="person" backgroundColor={semantic.brand.quinary} />
        </View>
      </Section>

      {/* === TAG === */}
      <Section title="Tag">
        <View style={styles.tagRow}>
          <Tag>Yeni</Tag>
          <Tag variant="success">Aktif</Tag>
          <Tag variant="warning">Beklemede</Tag>
          <Tag variant="error">İptal</Tag>
          <Tag variant="info">Bilgi</Tag>
          <Tag variant="highlight">Öne Çıkan</Tag>
        </View>
        <View style={[styles.tagRow, { marginTop: spacing[2] }]}>
          <Tag variant="success" iconName="check">Onaylandı</Tag>
          <Tag variant="warning" iconName="warning">Dikkat</Tag>
          <Tag variant="error" iconName="alert">Hata</Tag>
        </View>
      </Section>

      {/* === ICONBUTTON === */}
      <Section title="IconButton">
        <View style={styles.iconRow}>
          <IconButton iconName="search" variant="ghost" />
          <IconButton iconName="heartFilled" variant="ghost" color="error" />
          <IconButton iconName="settings" variant="outlined" />
          <IconButton iconName="xmark" variant="filled" />
        </View>
        <View style={[styles.iconRow, { marginTop: spacing[3] }]}>
          <IconButton iconName="search" size="sm" variant="filled" />
          <IconButton iconName="search" size="md" variant="filled" />
          <IconButton iconName="search" size="lg" variant="filled" />
        </View>
      </Section>

      {/* === INPUT === */}
      <Section title="Input">
        <Input
          label="Arama"
          placeholder="Ne arıyorsunuz?"
          leftIconName="search"
          value={searchValue}
          onChangeText={setSearchValue}
        />
        <Input
          label="E-posta"
          placeholder="ornek@email.com"
          leftIconName="mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={emailValue}
          onChangeText={setEmailValue}
        />
        <Input
          label="Şifre"
          placeholder="Şifrenizi girin"
          leftIconName="lock"
          secureTextEntry
          helperText="En az 8 karakter olmalı"
          value={passwordValue}
          onChangeText={setPasswordValue}
        />
        <Input
          label="Hatalı Input"
          placeholder="Geçersiz değer"
          leftIconName="warning"
          error="Bu alan zorunlu"
        />
      </Section>

      {/* === BUTTONS === */}
      <Section title="Buttons">
        <Button onPress={() => {}}>Devam Et</Button>
        <Button variant="primaryFilled" leftIcon={<Icon name="check" size={16} color="primary" />}>
          Onayla
        </Button>
        <Button variant="secondaryOutlined" leftIcon={<Icon name="download" size={16} color="info" />}>
          İndir
        </Button>
      </Section>

      {/* === GENEL ICONS === */}
      <Section title="Pluxee Icons">
        <View style={styles.iconRow}>
          <Icon name="house" size={24} color="primary" />
          <Icon name="wallet" size={24} color="primary" />
          <Icon name="meal" size={24} color="primary" />
          <Icon name="qrCode" size={24} color="primary" />
          <Icon name="cashback" size={24} color="success" />
        </View>
      </Section>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="title.mobileSection" color="primary" style={styles.sectionTitle}>
        {title}
      </Text>
      <View style={styles.contentGroup}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: semantic.background.primary,
  },
  content: {
    padding: spacing[6],
    paddingTop: spacing[16],
  },
  heroSubtitle: {
    marginBottom: spacing[8],
  },
  section: {
    marginBottom: spacing[8],
  },
  sectionTitle: {
    marginBottom: spacing[4],
  },
  contentGroup: {
    gap: spacing[3],
    alignItems: 'flex-start',
  },
  iconRow: {
    flexDirection: 'row',
    gap: spacing[4],
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tagRow: {
    flexDirection: 'row',
    gap: spacing[2],
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
