/**
 * VirtualCardSection
 *
 * Ulasim karti detayinda gosterilen "Pluxee Sanal Kart / Esnek Ulasim cuzdani" bolumu.
 * Mockup'taki alt bolge (akaryakit markalari altinda):
 *   - Baslik + "Bakiye aktar" butonu
 *   - Sanal kart gorseli (Param/Troy stili)
 *   - "QR ile ode" + "Bakiye goruntule" butonlari (disabled)
 *   - Gecerli noktalar grid (Toplu Tasima, Taksi, Arac Kiralama vb.)
 */
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Icon, semantic, spacing, radius } from '@pluxee/design-system';
import type { VirtualCardInfo } from '../../data/cards';
import { TransportPlacesGrid } from './TransportPlacesGrid';

interface VirtualCardSectionProps {
  virtualCard: VirtualCardInfo;
  onTransferPress: () => void;
  onPlacePress: (placeId: string) => void;
}

export function VirtualCardSection({
  virtualCard,
  onTransferPress,
  onPlacePress,
}: VirtualCardSectionProps) {
  return (
    <View style={styles.container}>
      {/* BASLIK + BAKIYE AKTAR */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Icon name="cardCredit" size={16} color="primary" />
          <Text variant="body.smallMedium" color="primary" style={styles.headerText}>
            Pluxee Sanal Kart /{'\n'}
            <Text variant="body.smallBold" color="primary" style={styles.headerHighlight}>
              Esnek Ulasim
            </Text>
            {' '}cuzdani
          </Text>
        </View>

        <TouchableOpacity
          style={styles.transferBtn}
          onPress={onTransferPress}
          activeOpacity={0.7}
        >
          <Icon name="arrowExportRight" size={16} color="primary" />
          <Text variant="body.smallBold" color="primary">
            Bakiye aktar
          </Text>
          <Icon name="arrowRight" size={16} color="primary" />
        </TouchableOpacity>
      </View>

      {/* SANAL KART GORSELI */}
      <View style={styles.cardVisual}>
        <View style={styles.cardTopRow}>
          <Text variant="title.mobileMain" color="primary" style={styles.cardLogo}>
            Pluxee
          </Text>
          <Text variant="body.largeBold" color="primary" style={styles.cardBrand}>
            {virtualCard.brandName}
          </Text>
        </View>

        <View style={styles.cardNumberRow}>
          <Text variant="body.largeBold" color="primary" style={styles.cardNumber}>
            {virtualCard.maskedNumber}
          </Text>
        </View>

        <View style={styles.cardBottomRow}>
          <View>
            <Text variant="body.smallMedium" color="tertiary">
              Son kullanma tarihi
            </Text>
            <Text variant="body.smallBold" color="primary">
              {virtualCard.maskedExpiry}
            </Text>
          </View>
          <View style={styles.troyLogo}>
            <Text variant="body.smallBold" color="primary">
              troy
            </Text>
          </View>
        </View>
      </View>

      {/* QR + BAKIYE GORUNTULE - DISABLED */}
      <View style={styles.actionsRow}>
        <View style={[styles.actionBtn, styles.actionBtnDisabled]}>
          <Icon name="qrcode" size={24} color="tertiary" />
          <Text variant="body.smallBold" color="tertiary">
            QR ile ode
          </Text>
        </View>
        <View style={[styles.actionBtn, styles.actionBtnDisabled]}>
          <Icon name="eyeOpenOutline" size={24} color="tertiary" />
          <Text variant="body.smallBold" color="tertiary">
            Bakiye goruntule
          </Text>
        </View>
      </View>

      {/* GECERLI NOKTALAR */}
      <View style={styles.placesSection}>
        <Text variant="title.mobileSection" color="primary" style={styles.placesTitle}>
          Gecerli noktalar
        </Text>
        <TransportPlacesGrid onPlacePress={onPlacePress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
    gap: spacing[4],
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing[3],
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    flex: 1,
  },
  headerText: {
    flex: 1,
    flexShrink: 1,
  },
  headerHighlight: {
    textDecorationLine: 'underline',
  },
  transferBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderWidth: 1.5,
    borderColor: semantic.brand.primary,
    borderRadius: radius.md,
  },
  cardVisual: {
    backgroundColor: semantic.background.brand4,
    borderRadius: radius.lg,
    padding: spacing[5],
    gap: spacing[5],
    minHeight: 180,
    justifyContent: 'space-between',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLogo: {
    fontSize: 22,
    fontWeight: '700',
  },
  cardBrand: {
    letterSpacing: 2,
  },
  cardNumberRow: {
    paddingVertical: spacing[2],
  },
  cardNumber: {
    fontFamily: 'monospace',
    letterSpacing: 2,
    fontSize: 18,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  troyLogo: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    paddingVertical: spacing[3],
    borderWidth: 1.5,
    borderColor: semantic.brand.primary,
    borderRadius: radius.md,
  },
  actionBtnDisabled: {
    opacity: 0.4,
    borderColor: semantic.background.disabled,
  },
  placesSection: {
    paddingTop: spacing[3],
    gap: spacing[3],
  },
  placesTitle: {
    paddingHorizontal: spacing[1],
  },
});
