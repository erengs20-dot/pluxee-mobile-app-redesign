/**
 * Pluxee Design System - Typography Tokens
 *
 * Source: https://designsystem.pluxee.app
 * Token format: {category}.{variant}
 *
 * 4 kategori, toplam 35 typography token:
 *   - heroTitle (2)  → Landing page hero başlıkları
 *   - title (10)     → Sayfa/ana/kart/section başlıkları (mobile + desktop)
 *   - subtitle (4)   → Alt başlıklar
 *   - body (19)      → Metin içeriği
 *
 * Font Family: TT Travels (custom Pluxee font)
 *
 * KULLANIM:
 *   <Text style={typography.title.mobilePage}>Başlık</Text>
 *   <Text style={typography.body.medium}>Metin</Text>
 */

import type { TextStyle } from 'react-native';

export const typography = {
  // ===== HERO TITLE =====
  // Landing page'in en büyük başlıkları için
  heroTitle: {
    desktopMediumBlack: {
      fontSize: 60,
      fontWeight: '900',
      lineHeight: 66,
      letterSpacing: -1.9,
    },
    mobileMediumBlack: {
      fontSize: 42,
      fontWeight: '900',
      lineHeight: 57,
      letterSpacing: -1.5,
    },
  },

  // ===== TITLE =====
  // Sayfa, ana içerik, kart ve section başlıkları
  title: {
    // Desktop varyantları
    desktopPage: {
      fontSize: 42,
      fontWeight: '900',
      lineHeight: 57,
      letterSpacing: -1.5,
    },
    desktopMain: {
      fontSize: 32,
      fontWeight: '800',
      lineHeight: 40,
      letterSpacing: -1.5,
    },
    desktopCard: {
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 30,
      letterSpacing: -1.2,
    },
    desktopSection: {
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 30,
      letterSpacing: -1.2,
    },
    desktopBigSection: {
      fontSize: 42,
      fontWeight: '700',
      lineHeight: 18,
      letterSpacing: -1.9,
    },

    // Mobile varyantları (uygulamada bunları daha çok kullanacağız)
    mobilePage: {
      fontSize: 32,
      fontWeight: '800',
      lineHeight: 40,
      letterSpacing: -1.5,
    },
    mobileMain: {
      fontSize: 24,
      fontWeight: '800',
      lineHeight: 32,
      letterSpacing: -1.2,
    },
    mobileCard: {
      fontSize: 20,
      fontWeight: '700',
      lineHeight: 32,
      letterSpacing: -1,
    },
    mobileSection: {
      fontSize: 18,
      fontWeight: '700',
      lineHeight: 22,
      letterSpacing: -0.9,
    },
    mobileBigSection: {
      fontSize: 22,
      fontWeight: '700',
      lineHeight: 24,
      letterSpacing: -1,
    },
  },

  // ===== SUBTITLE =====
  // Alt başlıklar — başlık altı açıklayıcı metinler
  subtitle: {
    desktopMain: {
      fontSize: 20,
      fontWeight: '500',
      lineHeight: 26,
      letterSpacing: -1,
    },
    mobileMain: {
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 24,
      letterSpacing: -0.9,
    },
    card: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
      letterSpacing: -0.8,
    },
    section: {
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 24,
      letterSpacing: -0.8,
    },
  },

  // ===== BODY =====
  body: {
    // Large (16px)
    largeXbold: {
      fontSize: 16,
      fontWeight: '800',
      lineHeight: 24,
      letterSpacing: -0.8,
    },
    largeBold: {
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 24,
      letterSpacing: -0.8,
    },
    largeDemibold: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
      letterSpacing: -0.8,
    },
    largeMedium: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
      letterSpacing: -0.8,
    },
    largeMediumLink: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
      letterSpacing: -0.8,
      textDecorationLine: 'underline' as const,
    },

    // Medium (14px) — uygulamada en çok kullanılan body boyutu
    mediumXbold: {
      fontSize: 14,
      fontWeight: '800',
      lineHeight: 20,
      letterSpacing: -0.8,
    },
    mediumBold: {
      fontSize: 14,
      fontWeight: '700',
      lineHeight: 20,
      letterSpacing: -0.8,
    },
    mediumDemibold: {
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 20,
      letterSpacing: -0.8,
    },
    medium: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
      letterSpacing: -0.8,
    },
    mediumLink: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
      letterSpacing: -0.8,
      textDecorationLine: 'underline' as const,
    },

    // Small (12px) — caption, helper text, badge text
    smallXbold: {
      fontSize: 12,
      fontWeight: '800',
      lineHeight: 18,
      letterSpacing: -0.5,
    },
    smallBold: {
      fontSize: 12,
      fontWeight: '700',
      lineHeight: 18,
      letterSpacing: -0.5,
    },
    smallDemibold: {
      fontSize: 12,
      fontWeight: '600',
      lineHeight: 18,
      letterSpacing: -0.5,
    },
    smallMedium: {
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 18,
      letterSpacing: -0.5,
    },
    smallMediumLink: {
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 12,
      letterSpacing: -0.5,
      textDecorationLine: 'underline' as const,
    },
    smallMediumItalic: {
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 18,
      letterSpacing: -0.5,
      fontStyle: 'italic' as const,
    },

    // XSmall (10px) — micro copy, fine print
    xsmallBold: {
      fontSize: 10,
      fontWeight: '700',
      lineHeight: 16,
      letterSpacing: -0.5,
    },
    xsmallMedium: {
      fontSize: 10,
      fontWeight: '500',
      lineHeight: 16,
      letterSpacing: -0.5,
    },
    xsmallMediumItalic: {
      fontSize: 10,
      fontWeight: '500',
      lineHeight: 16,
      letterSpacing: -0.5,
      fontStyle: 'italic' as const,
    },

    // Number — sayısal değerler için (örn. bakiye, tutarlar)
    number: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
      letterSpacing: -0.5,
    },
  },
} as const satisfies Record<string, Record<string, TextStyle>>;

// ===== TypeScript yardımcı tipler =====
export type Typography = typeof typography;
export type TypographyCategory = keyof Typography;

// Her kategori için variant key'leri
export type HeroTitleVariant = keyof Typography['heroTitle'];
export type TitleVariant = keyof Typography['title'];
export type SubtitleVariant = keyof Typography['subtitle'];
export type BodyVariant = keyof Typography['body'];