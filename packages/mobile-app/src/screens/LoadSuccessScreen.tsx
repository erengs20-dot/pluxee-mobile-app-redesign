import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Icon, Button, semantic, spacing, radius } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { formatCurrency } from '../data/cards';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'LoadSuccess'>;

export function LoadSuccessScreen({ route, navigation }: Props) {
  const { amount, loadType, paymentMethod, oldBalance } = route.params;
  const newBalance = oldBalance + amount;
  const now = new Date();
  const dateStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0') + ' - ' + now.getDate().toString().padStart(2, '0') + '.' + (now.getMonth() + 1).toString().padStart(2, '0') + '.' + now.getFullYear();

  const isInstruction = loadType !== 'single';
  const title = isInstruction ? 'Odeme bilgileri' : 'Bakiye yuklendi!';
  const subtitle = isInstruction ? 'Talimat olusturuldu!' : 'Yukleme bilgileri';

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title={title} onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {isInstruction && (
          <View style={styles.successCard}>
            <Icon name="checkmarkCircle" size={24} color="success" />
            <Text variant="title.mobileMain" color="success" align="center">Talimat olusturuldu!</Text>
          </View>
        )}

        <View style={styles.detailCard}>
          <Text variant="title.mobileCard" color="primary" style={styles.sectionTitle}>{subtitle}</Text>

          <View style={styles.row}>
            <Text variant="body.mediumBold" color="primary">Yukleme zamani</Text>
            <Text variant="body.medium" color="primary">{dateStr}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text variant="body.mediumBold" color="primary">Odeme yontemi</Text>
            <Text variant="body.medium" color="primary">{paymentMethod}</Text>
          </View>
          <View style={styles.divider} />

          {!isInstruction && (
            <>
              <View style={styles.row}>
                <Text variant="body.mediumBold" color="primary">Eski bakiye</Text>
                <Text variant="body.medium" color="primary">{formatCurrency(oldBalance)} TL</Text>
              </View>
              <View style={styles.divider} />
            </>
          )}

          <View style={styles.row}>
            <Text variant="body.mediumBold" color="primary">Yuklenen tutar</Text>
            <Text variant="body.medium" color="primary">{formatCurrency(amount)} TL</Text>
          </View>
          <View style={styles.divider} />

          {!isInstruction && (
            <View style={styles.row}>
              <Text variant="body.mediumBold" color="primary">Yeni bakiye</Text>
              <Text variant="title.mobileCard" color="success">{formatCurrency(newBalance)} TL</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button
          variant="primaryFilled"
          size="lg"
          onPress={() => navigation.popToTop()}
        >
          {isInstruction ? 'Mevcut talimatlarini gor' : 'Tamam'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: semantic.background.primary },
  scrollContent: { padding: spacing[4], paddingBottom: spacing[6] },
  successCard: { backgroundColor: semantic.background.successBanner, borderRadius: radius.lg, padding: spacing[6], alignItems: 'center', gap: spacing[3], marginBottom: spacing[4] },
  detailCard: { backgroundColor: semantic.background.successBanner, borderRadius: radius.lg, padding: spacing[4] },
  sectionTitle: { marginBottom: spacing[3] },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing[3] },
  divider: { height: 1, backgroundColor: semantic.brand.primary, marginVertical: spacing[1] },
  bottomBar: { paddingHorizontal: spacing[4], paddingTop: spacing[3], paddingBottom: spacing[6], borderTopWidth: 1, borderTopColor: semantic.border.tertiary, backgroundColor: '#ffffff' },
  submitBtn: { backgroundColor: semantic.brand.secondary, paddingVertical: spacing[4], borderRadius: radius.md },
});
