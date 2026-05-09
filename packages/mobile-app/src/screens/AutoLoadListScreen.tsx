import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Icon, semantic, spacing, radius } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { formatCurrency } from '../data/cards';
import { MOCK_AUTO_LOADS } from '../data/masterpass';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'AutoLoadList'>;

export function AutoLoadListScreen({ navigation }: Props) {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title="Otomatik talimatlarim" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {MOCK_AUTO_LOADS.map((load) => (
          <View key={load.id} style={styles.card}>
            <View style={styles.typeBadge}>
              <Text variant="body.smallBold" color="primary">
                {load.type === 'recurring' ? 'Duzenli yukleme talimati' : 'Bakiye altina dusunce yukleme'}
              </Text>
            </View>

            <View style={styles.cardHeader}>
              <Icon name="food" size={24} color="primary" />
              <View style={styles.cardInfo}>
                <Text variant="body.mediumBold" color="primary">{load.cardCategory}</Text>
                <Text variant="body.smallMedium" color="tertiary">{load.cardNumber}</Text>
              </View>
            </View>
            <View style={styles.divider} />

            {load.type === 'recurring' ? (
              <View style={styles.row}>
                <Text variant="body.mediumBold" color="success" style={styles.rowLeft}>Her {load.frequency === 'Haftalik' ? 'hafta ' + load.day : 'ayin ' + load.day + '.'} gunu kartinizdan yuklenecek tutar</Text>
                <Text variant="title.mobileCard" color="success" style={styles.rowRight}>{formatCurrency(load.amount)} TL</Text>
              </View>
            ) : (
              <>
                <View style={styles.row}>
                  <Text variant="body.mediumBold" color="success" style={styles.rowLeft}>Bakiye {load.threshold} TL altina indiginde kartinizdan yuklenecek tutar</Text>
                  <Text variant="title.mobileCard" color="success" style={styles.rowRight}>{formatCurrency(load.amount)} TL</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.row}>
                  <Text variant="body.mediumBold" color="primary">Alt bakiye limiti</Text>
                  <Text variant="body.medium" color="primary">{formatCurrency(load.threshold ?? 0)} TL</Text>
                </View>
              </>
            )}
            <View style={styles.divider} />

            <View style={styles.row}>
              <Text variant="body.mediumBold" color="primary">Odeme yontemi</Text>
              <Text variant="body.medium" color="primary">{load.paymentMethod}</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.row}>
              <Text variant="body.mediumBold" color="primary">Talimat baslangici</Text>
              <Text variant="body.medium" color="primary">{load.createdAt}</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.editBtn} activeOpacity={0.8}>
                <Text variant="body.mediumBold" color="inverse" align="center">Duzenle</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.8}>
                <Text variant="body.mediumBold" color="primary" align="center">Iptal et</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: semantic.background.primary },
  scroll: { flex: 1 },
  scrollContent: { padding: spacing[4], gap: spacing[4] },
  card: { backgroundColor: semantic.background.primary, borderRadius: radius.lg, padding: spacing[4], borderWidth: 1, borderColor: semantic.border.tertiary, gap: spacing[2] },
  typeBadge: { backgroundColor: semantic.background.successBanner, paddingHorizontal: spacing[3], paddingVertical: spacing[2], borderRadius: radius.full, alignSelf: 'flex-start' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing[3], paddingVertical: spacing[2] },
  cardInfo: { flex: 1, gap: spacing[1] },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingVertical: spacing[2], gap: spacing[3] },
  rowLeft: { flex: 1 },
  rowRight: { flexShrink: 0 },
  divider: { height: 1, backgroundColor: semantic.brand.secondary },
  actions: { flexDirection: 'row', gap: spacing[3], marginTop: spacing[3] },
  editBtn: { flex: 1, backgroundColor: semantic.brand.secondary, paddingVertical: spacing[3], borderRadius: radius.md },
  cancelBtn: { flex: 1, backgroundColor: semantic.background.primary, paddingVertical: spacing[3], borderRadius: radius.md, borderWidth: 1.5, borderColor: semantic.brand.primary },
});
