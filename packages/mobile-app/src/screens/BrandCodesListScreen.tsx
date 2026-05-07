import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, semantic, spacing, radius } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { getActiveCodes, getArchivedCodes } from '../data/codes';
import { formatCurrency } from '../data/cards';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';
import { BrandCodeCard } from '../components/cardDetail/BrandCodeCard';

type Props = NativeStackScreenProps<RootStackParamList, 'BrandCodesList'>;

export function BrandCodesListScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');
  const activeCodes = getActiveCodes();
  const archivedCodes = getArchivedCodes();
  const codes = activeTab === 'active' ? activeCodes : archivedCodes;

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title="Marka Kodlarim" onBack={() => navigation.goBack()} />

      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.tabActive]}
          onPress={() => setActiveTab('active')}
          activeOpacity={0.7}
        >
          <Text variant="body.mediumBold" color={activeTab === 'active' ? 'primary' : 'tertiary'}>
            Kodlarim
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'archived' && styles.tabActive]}
          onPress={() => setActiveTab('archived')}
          activeOpacity={0.7}
        >
          <Text variant="body.mediumBold" color={activeTab === 'archived' ? 'primary' : 'tertiary'}>
            Arsivlenmis kodlarim
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {codes.length > 0 ? (
          <View style={styles.list}>
            {codes.map((code) => (
              <BrandCodeCard
                key={code.id}
                code={code}
                onPress={() => navigation.navigate('CodeUsage', { codeId: code.id })}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyWrap}>
            <View style={styles.emptyCard}>
              <Text variant="body.medium" color="secondary" align="center">
                {activeTab === 'active'
                  ? 'Henuz kodunuz bulunmamaktadir.'
                  : 'Arsivlenmis kodunuz bulunmamaktadir.'}
              </Text>
              <TouchableOpacity onPress={() => setActiveTab(activeTab === 'active' ? 'archived' : 'active')}>
                <Text variant="body.mediumBold" color="link" align="center">
                  {activeTab === 'active' ? 'Arsivlenmis kodlarimi gor' : 'Kodlarimi gor'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: semantic.background.primary },
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: semantic.border.tertiary,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing[3],
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#ffdc37',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: spacing[6] },
  list: { padding: spacing[4], gap: spacing[3] },
  emptyWrap: { padding: spacing[4] },
  emptyCard: {
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    padding: spacing[5],
    gap: spacing[3],
  },
});
