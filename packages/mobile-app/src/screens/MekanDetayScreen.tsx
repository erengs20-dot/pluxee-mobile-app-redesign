import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Text, Icon, IconButton, Button,
  semantic, spacing, radius,
} from '@pluxee/design-system';
import { NEARBY_RESTAURANTS, NEARBY_MARKETS, RestoranMarket } from '../data/placesPoints';

export const MekanDetayScreen: React.FC = () => {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const placeId: string = route.params?.placeId || '';

  const place: RestoranMarket | undefined =
    NEARBY_RESTAURANTS.find((p) => p.id === placeId) || NEARBY_MARKETS.find((p) => p.id === placeId);

  if (!place) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.header}>
          <IconButton iconName="chevronLeft" variant="ghost" size="md" color="inverse" onPress={() => nav.goBack()} accessibilityLabel="Geri" />
          <Text variant="title.mobileCard" color="inverse" align="center" style={styles.title}>Mekan Detayi</Text>
          <View style={styles.headerRight} />
        </View>
        <View style={styles.body}>
          <Text variant="body.medium" color="primary">Mekan bulunamadi.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const [favorite, setFavorite] = React.useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <IconButton iconName="chevronLeft" variant="ghost" size="md" color="inverse" onPress={() => nav.goBack()} accessibilityLabel="Geri" />
        <Text variant="title.mobileCard" color="inverse" align="center" style={styles.title}>Mekan Detayi</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        <View style={styles.infoSection}>
          <View style={styles.nameRow}>
            <Text variant="title.mobileMain" color="primary" numberOfLines={2} style={styles.name}>{place.name}</Text>
            <View style={styles.ratingBox}>
              <Icon name="starFilled" size={16} tint="#F5C842" />
              <Text variant="body.mediumBold" color="primary" style={styles.rating}>{place.rating.toFixed(1)}</Text>
            </View>
          </View>

          <View style={styles.locRow}>
            <Icon name="pinFilled" size={16} color="info" />
            <Text variant="body.mediumBold" color="info" style={styles.distance}>{place.distanceKm.toFixed(2)} km</Text>
            <Text variant="body.medium" color="secondary" style={styles.location}>{place.city} {place.district}</Text>
            {place.plusPuanPercent !== undefined && (
              <View style={styles.plusPuanRow}>
                <Icon name="coinsUp" size={16} color="info" />
                <Text variant="body.smallBold" color="info" style={styles.plusPuan}>%{place.plusPuanPercent} Plus Puan</Text>
              </View>
            )}
          </View>

          <View style={styles.tagsRow}>
            {place.paymentTypes.includes('mobil') && (
              <View style={[styles.tag, styles.tagDefault]}>
                <Icon name="onlinePayment" size={16} color="info" />
                <Text variant="body.smallBold" color="info" style={styles.tagText}>Mobil odeme</Text>
              </View>
            )}
            {place.paymentTypes.includes('kartli') && (
              <View style={[styles.tag, styles.tagDefault]}>
                <Icon name="wallet" size={16} color="info" />
                <Text variant="body.smallBold" color="info" style={styles.tagText}>Kartli odeme</Text>
              </View>
            )}
            {place.hasOnline && (
              <View style={[styles.tag, styles.tagOnline]}>
                <Icon name="receipt" size={16} color="success" />
                <Text variant="body.smallBold" color="success" style={styles.tagText}>Online alisveris</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.actionsRow}>
          <View style={styles.actionBtn}>
            <Button variant="primaryFilled" size="lg" leftIcon={<Icon name="info" size={16} color="primary" />} onPress={() => {}}>
              Yol tarifi al
            </Button>
          </View>
          <View style={styles.actionBtn}>
            <Button variant="primaryOutlined" size="lg" leftIcon={<Icon name={favorite ? 'heart-filled' : 'heart'} size={16} color={favorite ? 'error' : 'primary'} />} onPress={() => setFavorite(!favorite)}>
              {favorite ? 'Favorilerden cikar' : 'Favorilere ekle'}
            </Button>
          </View>
        </View>

        <View style={styles.rateSection}>
          <Text variant="title.mobileSection" color="primary" style={styles.rateTitle}>
            {place.category === 'restoran' ? 'Restorani puanla' : 'Marketi puanla'}
          </Text>
          <View style={styles.rateRow}>
            <View style={styles.starsRow}>
              {[1,2,3,4,5].map((s) => (
                <Icon key={s} name="starFilled" size={24} tint="#E5E7EB" />
              ))}
            </View>
            <Button variant="primaryOutlined" size="md" disabled onPress={() => {}}>
              Gonder
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#1B1D45' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B1D45', paddingHorizontal: spacing[4], paddingBottom: spacing[3], paddingTop: spacing[2] },
  title: { flex: 1 },
  headerRight: { width: 40 },
  body: { flex: 1, backgroundColor: semantic.background.primary },
  bodyContent: { paddingBottom: spacing[8] },
  infoSection: { backgroundColor: semantic.background.primary, padding: spacing[4], gap: spacing[3] },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  name: { flex: 1, marginRight: spacing[3] },
  ratingBox: { flexDirection: 'row', alignItems: 'center', gap: spacing[1] },
  rating: { fontSize: 16 },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[1], flexWrap: 'wrap' },
  distance: { fontSize: 14, marginRight: spacing[2] },
  location: { fontSize: 13 },
  plusPuanRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[1], marginLeft: 'auto' },
  plusPuan: { fontSize: 12 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] },
  tag: { flexDirection: 'row', alignItems: 'center', gap: spacing[1], paddingHorizontal: spacing[2], paddingVertical: 4, borderRadius: radius.sm },
  tagDefault: { backgroundColor: '#EEF0F4' },
  tagOnline: { backgroundColor: '#D6F3DD' },
  tagText: { fontSize: 11 },
  actionsRow: { flexDirection: 'row', backgroundColor: semantic.background.primary, padding: spacing[4], gap: spacing[3] },
  actionBtn: { flex: 1 },
  rateSection: { backgroundColor: semantic.background.primary, padding: spacing[4], marginTop: spacing[3] },
  rateTitle: { marginBottom: spacing[3] },
  rateRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  starsRow: { flexDirection: 'row', gap: spacing[1] },
});

export default MekanDetayScreen;
