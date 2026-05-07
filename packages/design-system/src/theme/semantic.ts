/**
 * Pluxee Design System - Semantic Tokens
 *
 * Source: https://designsystem.pluxee.app
 * Extracted from: --chakra-colors-semantic-* CSS variables
 *
 * 🎯 SEMANTIC TOKEN'LAR NEDİR?
 *
 * Core token'lar = ham renkler (örn: core.confidentlyCoral.7 = '#e9003f')
 * Semantic token'lar = bağlamsal isimler (örn: cta.primary = yeşil)
 *
 * Component'ler ASLA core renk kullanmaz, HER ZAMAN semantic kullanır.
 * Bu sayede ileride tema değişse bile tüm app otomatik güncellenir.
 *
 * 🔥 KRİTİK KEŞİF: Pluxee'nin primary CTA rengi YEŞİL'dir, kırmızı değil!
 *   cta.primary = #00eb5e (ultraGreen.4)
 *
 * KULLANIM:
 *   <Button color={semantic.cta.primary} />
 *   <Text color={semantic.text.primary}>Merhaba</Text>
 */

export const semantic = {
  // ===== CTA (Call To Action) =====
  // Action button'lar için en kritik renkler
  cta: {
    primary: '#00eb5e', // Yeşil — birincil aksiyon (Devam et, Onayla, vb.)
    primaryHover: '#c7fcca',
    primaryPressed: '#00330e',
    secondary: '#1b51dc', // Mavi — ikincil aksiyon
    secondaryHover: '#def3fb',
    secondaryHoverInverse: '#0f266d',
    secondaryHoverStrong: '#526cf8',
    secondaryHoverStrongPressed: '#0f266d',
    secondaryPressed: '#0f266d',
  },

  // ===== BRAND =====
  // Marka kimlik renkleri (logo, header, hero)
  brand: {
    primary: '#221c46', // Pluxee navy — ana marka rengi
    secondary: '#00eb5e', // Yeşil
    secondaryDark: '#01ad43',
    secondaryDimmed: '#85fd96',
    secondaryLight: '#c7fcca',
    tertiary: '#17ccf9', // Cyan
    tertiaryDark: '#0a83a1',
    tertiaryDimmed: '#88ddfb',
    tertiaryLight: '#def3fb',
    quaternary: '#ffdc37', // Sarı
    quaternaryDark: '#8a7501',
    quaternaryDimmed: '#fdeec1',
    quaternaryLight: '#fdf3d6',
    quinary: '#ff7375', // Coral
    quinaryDark: '#b2002e',
    quinaryDimmed: '#ff9895',
    quinaryLight: '#fcc1be',
  },

  // ===== TEXT =====
  // Tüm metin renkleri — bağlam-bazlı
  text: {
    primary: '#221c46',
    debit: '#ec0080',         // Magenta - harcama tutarlari // Ana metinler
    secondary: '#463f5f',
    tertiary: '#5a5469',
    quaternary: '#716e7c',
    inverse: '#ffffff', // Koyu arka plan üzerinde
    disabled: '#b5b2bc',
    hover: '#526cf8',
    pressed: '#0f266d',
    link: '#1b51dc', // Hyperlink rengi
    highlight: '#cc1480', // Vurgu (pembe)
    success: '#008861',
    warning: '#874810',
    error: '#b30000',
    info: '#0a83a1',
  },

  // ===== ICON =====
  // Icon renkleri (text ile aynı paleti kullanır ama ayrı tokens)
  icon: {
    primary: '#221c46',
    secondary: '#463f5f',
    tertiary: '#5a5469',
    inverse: '#ffffff',
    disabled: '#b5b2bc',
    pressed: '#0f266d',
    highlight: '#cc1480',
    success: '#008861',
    warning: '#874810',
    error: '#b30000',
    info: '#0a83a1',
  },

  // ===== FOREGROUND =====
  // Arka plan üzerindeki ön plan elementleri (button text, badge text)
  foreground: {
    primary: '#221c46',
    secondary: '#221c46',
    tertiary: '#221c46',
    quaternary: '#221c46',
    quinary: '#e3e2fa',
    success: '#ffffff',
    warning: '#ffffff',
    error: '#ffffff',
    info: '#ffffff',
  },

  // ===== BACKGROUND =====
  // Surface arka plan renkleri
  background: {
    primary: '#faf8ff', // Ana app background
    canvas: '#fbf6f0',  // Pluxee anasayfa krem zemini
    disabled: '#efefef',
    brand1: '#00eb5e', // Yeşil bg (success-y vibe)
    brand2: '#17ccf9', // Cyan bg
    brand3: '#ffdc37', // Sarı bg
    brand4: '#ff7375', // Coral bg
    success: '#dafcdb',
    warning: '#fdf3d6',
    error: '#fcf1f0',
    info: '#e8f6fc',
    debit: '#ec0080',         // Magenta - harcama tutarlari
    successBanner: '#dafcdb', // Acik yesil banner bg
    activeTab: '#dafcdb',     // Bottom nav aktif tab arka plani
    processing: '#fdf3d6',
    failed: '#ea0101',
  },

  // ===== BORDER =====
  // Çerçeve, ayrıştırıcı çizgiler
  border: {
    primary: '#908c99',
    secondary: '#d1cfd7',
    tertiary: '#f0eef5',
    inverse: '#ffffff',
    disabled: '#b5b2bc',
    error: '#b30000',
    // Process state border'ları (timeline, stepper için)
    created: '#b5b2bc',
    inprogress: '#1b51dc',
    processing: '#d2b301',
    shipped: '#008861',
    delay: '#b30000',
  },

  // ===== SURFACE =====
  // Card, modal, sheet arka planları
  // Hepsi #ffffff ama elevation (shadow) ile farklılaşır
  surface: {
    '1': '#ffffff',
    '2': '#ffffff',
    '3': '#ffffff',
    '4': '#ffffff',
    '5': '#ffffff',
    '1Hover': '#221c461a', // Subtle hover overlay
    overlay: '#221c46e5', // Modal overlay (deepBlue, %90)
    readOnly: '#faf8ff',
    skeleton: '#e5e3ea', // Skeleton loader background
    skeletonLoading: '#faf8ff', // Skeleton shimmer
  },

  // ===== INTERACTIVE =====
  // Aktif/etkileşime giren elementler
  interactive: {
    primary: '#1b51dc', // Mavi
    secondary: '#efeefb1a', // Subtle blue-purple wash
  },

  // ===== OUTLINE =====
  // Focus ring (keyboard navigation)
  outline: {
    focus: '#1b51dc', // Mavi focus ring
    inverse: '#ffffff', // Koyu arka planda
  },

  // ===== TAG =====
  // Tag/Chip component'leri
  tag: {
    defaultEnable: '#efeefb',
    defaultHover: '#e3e2fa',
    errorEnable: '#fcf1f0',
    errorHover: '#fcecea',
    validationEnable: '#dafcdb',
    validationHover: '#c7fcca',
    interactive: '#def3fb',
    pressed: '#cfccfa',
    disabled: '#efefef',
  },

  // ===== ILLUSTRATION =====
  // SVG illustration'ların dinamik renklendirilmesi için
  // (illustration'lar currentColor kullanıyorsa)
  illustration: {
    background: {
      1: '#221c46', // navy
      2: '#00eb5e', // yeşil
      3: '#17ccf9', // cyan
      4: '#ffdc37', // sarı
      5: '#ff7375', // coral
      6: '#cc1480', // pembe
      7: '#faf8ff', // beyaz-lavender
      8: '#0f266d', // koyu mavi
      9: '#008861', // koyu yeşil
      10: '#874810', // kahverengi
      success: '#dafcdb',
      warning: '#fdf3d6',
      error: '#fcf1f0',
      info: '#e8f6fc',
    debit: '#ec0080',         // Magenta - harcama tutarlari
    successBanner: '#dafcdb', // Acik yesil banner bg
    activeTab: '#dafcdb',     // Bottom nav aktif tab arka plani
    },
    foreground: {
      1: '#ffffff',
      2: '#221c46',
      3: '#221c46',
      4: '#221c46',
      5: '#ffffff',
      6: '#ffffff',
      success: '#008861',
      warning: '#874810',
      error: '#b30000',
      info: '#0a83a1',
    },
  },
} as const;

// ===== Yardımcı: Status renklerini topluca al =====
/**
 * Bir status (success/warning/error/info) için tüm ilgili renkleri döner.
 *
 * @example
 *   const c = getStatusColors('success');
 *   c.text       // '#008861'
 *   c.background // '#dafcdb'
 *   c.icon       // '#008861'
 */
export function getStatusColors(status: 'success' | 'warning' | 'error' | 'info') {
  return {
    text: semantic.text[status],
    icon: semantic.icon[status],
    background: semantic.background[status],
    foreground: semantic.foreground[status],
  };
}

// ===== TypeScript yardımcı tipler =====
export type Semantic = typeof semantic;
export type SemanticCategory = keyof Semantic;
export type StatusType = 'success' | 'warning' | 'error' | 'info';