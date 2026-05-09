/**
 * TransportPlaceDetailScreen
 *
 * Ulasim karti gecerli noktalar grid'inden bir noktaya basildiginda acilir.
 * placeId'ye gore icerik dinamik (Toplu Tasima, Taksi, Arac Kiralama vb.).
 *
 * NAVIGATION:
 *   navigation.navigate('TransportPlaceDetail', { placeId: 'public_transport' })
 */
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Icon, semantic, spacing, radius } from '@pluxee/design-system';

import type { RootStackParamList } from '../navigation/types';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';
import { getTransportPlaceById } from '../components/cardDetail/TransportPlacesGrid';

type Props = NativeStackScreenProps<RootStackParamList, 'TransportPlaceDetail'>;

// Toplu tasima icin placeholder marka listesi (mockup'taki gibi 12 marka)
// NOT: Faz 6.x'de gercek marka detayi (logo + acilir) eklenebilir.
const PUBLIC_TRANSPORT_BRANDS = [
  'IETT', 'IDO', 'TCDD',
  'ISTANBUL ULASIM', 'METRO ISTANBUL', 'SEHIR HATLARI',
  'ESHOT IZMIR', 'BURULAS', 'AntRay',
  'AntalyaKart', 'Diger 1', 'Diger 2',
];

export function TransportPlaceDetailScreen({ route, navigation }: Props) {
  const { placeId } = route.params;
  const place = getTransportPlaceById(placeId);

  if (!place) {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <CardDetailHeader title="Bulunamadi" onBack={() => navigation.goBack()} />
        <View style={styles.errorWrap}>
          <Text variant="title.mobileMain" color="error">
            Nokta bulunamadi
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title={place.label.replace('\n', ' ')} onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* MARKA LOGOLARI GRID (placeholder) */}
        <View style={styles.brandsGrid}>
          {PUBLIC_TRANSPORT_BRANDS.map((brand, idx) => (
            <View key={idx} style={styles.brandCircle}>
              <Text variant="body.smallBold" color="primary" align="center" style={styles.brandLabel} numberOfLines={2}>
                {brand}
              </Text>
            </View>
          ))}

          {/* ORTA - SECILI NOKTA TAG */}
          <View style={styles.centerTag}>
            <View style={styles.centerTagInner}>
              <Icon name={place.iconName} size={24} color="primary" />
              <Text variant="body.smallBold" color="primary" align="center" style={styles.centerTagLabel}>
                {place.label}
              </Text>
            </View>
          </View>
        </View>

        {/* ACIKLAMA BANDI */}
        <View style={styles.descBand}>
          <Text variant="body.largeBold" color="primary" align="center">
            {place.description}
          </Text>
        </View>

        {/* NERELERDE GECERLI */}
        <View style={styles.section}>
          <Text variant="title.mobileSection" color="primary">
            Nerelerde gecerli?
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body.medium" color="primary">
              {'\u2022'} Demiryolu yolcu tasimaciligi (tren, banliyo, metro, hizli tren)
            </Text>
            <Text variant="body.medium" color="primary">
              {'\u2022'} Otobus hatlari (sehir ici ve sehirler arasi)
            </Text>
            <Text variant="body.medium" color="primary">
              {'\u2022'} Toplu ulasim isletmeleri (biletli / tarifeli yolcu tasimaciligi)
            </Text>
          </View>

          <Text variant="body.medium" color="primary" style={styles.linkText}>
            Odeme yapabilecegin tum noktalari{' '}
            <Text variant="body.mediumBold" color="link" style={styles.underline}>
              buradan
            </Text>
            {' '}goruntuleyebilirsin.
          </Text>
        </View>

        {/* KAMPANYALAR (placeholder) */}
        <View style={styles.section}>
          <Text variant="title.mobileSection" color="primary">
            {place.label.replace('\n', ' ')} kampanyalari
          </Text>
          <View style={styles.campaignsRow}>
            <View style={styles.campaignCard}>
              <View style={styles.campaignImage}>
                <Icon name={place.iconName} size={24} color="primary" />
              </View>
              <View style={styles.campaignContent}>
                <Text variant="body.mediumBold" color="primary" numberOfLines={2}>
                  Pluxee'lilere ekstra indirim
                </Text>
                <Text variant="body.smallMedium" color="secondary" numberOfLines={3}>
                  Pluxee ile ekstra %10 indirim firsatini hemen yakala...
                </Text>
              </View>
            </View>
            <View style={styles.campaignCard}>
              <View style={styles.campaignImage}>
                <Icon name={place.iconName} size={24} color="primary" />
              </View>
              <View style={styles.campaignContent}>
                <Text variant="body.mediumBold" color="primary" numberOfLines={2}>
                  Pluxee'ye ozel firsatlar
                </Text>
                <Text variant="body.smallMedium" color="secondary" numberOfLines={3}>
                  Sana ozel bircok firsattan yararlanabilirsin...
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* SANAL KART HAKKINDA */}
        <View style={styles.section}>
          <Text variant="title.mobileSection" color="primary">
            Pluxee Sanal Kart hakkinda
          </Text>
          <Text variant="body.medium" color="primary" style={styles.aboutText}>
            Zengin ulasim agina sahip Pluxee Sanal Kart ile gecerli bircok marka/uyede
            ulasim odemelerini rahatlikla gerceklestirebilirsin.
          </Text>
          <Text variant="body.medium" color="primary" style={styles.aboutText}>
            Ayrica, yapacagin odemelerde avantajlardan faydalanabilirsin.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: semantic.background.primary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[8],
  },
  errorWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[6],
  },
  brandsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
    paddingBottom: spacing[2],
    justifyContent: 'space-between',
    position: 'relative',
  },
  brandCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[1],
  },
  brandLabel: {
    fontSize: 8,
    lineHeight: 10,
  },
  centerTag: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -45 }, { translateY: -45 }],
    width: 90,
    height: 90,
    backgroundColor: semantic.background.brand4,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[2],
  },
  centerTagInner: {
    alignItems: 'center',
    gap: 4,
  },
  centerTagLabel: {
    fontSize: 10,
    lineHeight: 12,
  },
  descBand: {
    backgroundColor: semantic.background.brand4,
    paddingVertical: spacing[5],
    paddingHorizontal: spacing[4],
    marginBottom: spacing[2],
  },
  section: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
    gap: spacing[3],
  },
  bulletList: {
    gap: spacing[2],
    paddingLeft: spacing[2],
  },
  linkText: {
    paddingTop: spacing[2],
  },
  underline: {
    textDecorationLine: 'underline',
  },
  campaignsRow: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  campaignCard: {
    flex: 1,
    borderRadius: radius.lg,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
    overflow: 'hidden',
  },
  campaignImage: {
    height: 100,
    backgroundColor: semantic.background.disabled,
    alignItems: 'center',
    justifyContent: 'center',
  },
  campaignContent: {
    padding: spacing[3],
    gap: spacing[1],
  },
  aboutText: {
    lineHeight: 22,
  },
});
