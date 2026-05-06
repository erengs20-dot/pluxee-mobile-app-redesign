/**
 * Pluxee Design System - Core Color Tokens
 *
 * Source: https://designsystem.pluxee.app
 * Token format: core.{colorName}.{number}
 *
 * Bu dosya design system'deki tüm renk token'larını React Native uyumlu
 * olarak typed bir obje halinde sunar. Renkleri kullanırken token isimleriyle
 * referans verin (örn: colors.core.blue[7]) — hex'leri doğrudan kullanmayın.
 */

export const colors = {
  core: {
    // Mutlak siyah
    black: '#000000',

    // Blue — Lavender → Navy spectrum (12 ton)
    blue: {
      1: '#f3f3fc',
      2: '#efeefb',
      3: '#e3e2fa',
      4: '#cfccfa',
      5: '#b1b0fb',
      6: '#878dfa',
      7: '#526cf8',
      8: '#1b51dc',
      9: '#123ba7',
      10: '#0f2d83',
      11: '#0f266d',
      12: '#0f2365',
    },

    // BoldyBlue — Pastel mavi → Petrol spectrum (12 ton)
    boldyBlue: {
      1: '#e8f6fc',
      2: '#def3fb',
      3: '#c3ebfb',
      4: '#88ddfb',
      5: '#17ccf9',
      6: '#0fa4c9',
      7: '#0a83a1',
      8: '#06637a',
      9: '#034a5d',
      10: '#043948',
      11: '#06303c',
      12: '#062c37',
    },

    // ConfidentlyCoral — Pluxee'nin marka rengi: pembe → bordo (12 ton)
    confidentlyCoral: {
      1: '#fcf1f0',
      2: '#fcecea',
      3: '#fbddda',
      4: '#fcc1be',
      5: '#ff9895',
      6: '#ff7375',
      7: '#e9003f',
      8: '#b2002e',
      9: '#890021',
      10: '#6b0318',
      11: '#5a0514',
      12: '#530512',
    },

    // DarkGreen — Mint → Koyu yeşil (12 ton)
    darkGreen: {
      1: '#d7fcea',
      2: '#c3fce1',
      3: '#78fcc7',
      4: '#31ecae',
      5: '#00cf96',
      6: '#01ab7b',
      7: '#008861',
      8: '#006245',
      9: '#004e36',
      10: '#023c29',
      11: '#043222',
      12: '#042e20',
    },

    // DarkRed — Şeftali → Bordo (12 ton)
    darkRed: {
      1: '#fcf1ee',
      2: '#fcece7',
      3: '#fbddd4',
      4: '#fcc2b1',
      5: '#ff9a7e',
      6: '#ff5d3b',
      7: '#ea0101',
      8: '#b30000',
      9: '#870a00',
      10: '#661101',
      11: '#5a0514',
      12: '#4c1304',
    },

    // DeepBlue — Açık lavanta → Koyu mor-mavi (12 ton)
    deepBlue: {
      1: '#faf8ff',
      2: '#f0eef5',
      3: '#e5e3ea',
      4: '#d1cfd7',
      5: '#b5b2bc',
      6: '#908c99',
      7: '#716e7c',
      8: '#5a5469',
      9: '#463f5f',
      10: '#362f54',
      11: '#2d264e',
      12: '#221c46',
    },

    // Fushia — Sadece 2 ton (vurgu rengi)
    fushia: {
      1: '#cc1480',
      2: '#fe83cb',
    },

    // Orange — Krem → Koyu kahve (12 ton)
    orange: {
      1: '#fbf2ec',
      2: '#faede3',
      3: '#f9dfcd',
      4: '#f8c5a0',
      5: '#f8a05b',
      6: '#d47420',
      7: '#b26019',
      8: '#874810',
      9: '#67360b',
      10: '#4f2a0a',
      11: '#41230a',
      12: '#3c210a',
    },

    // SlateGray — Beyaz → Siyaha yakın gri (12 ton)
    slateGray: {
      1: '#f3f3f4',
      2: '#efefef',
      3: '#e4e4e4',
      4: '#d0d0d1',
      5: '#b6b6b7',
      6: '#969698',
      7: '#777779',
      8: '#5a595c',
      9: '#444345',
      10: '#343335',
      11: '#2b2b2d',
      12: '#131117',
    },

    // Theme — Pluxee marka kimliği (sadece 9 ton)
    // Header, brand alanlar, hero section'lar için
    theme: {
      1: '#1a342c',
      2: '#48231a',
      3: '#3d2c1d',
      4: '#24203c',
      5: '#18182e',
      6: '#1e1e35',
      7: '#0f0f17',
      8: '#202648',
      9: '#1c1c34',
    },

    // UltraGreen — Mint → Koyu yeşil (canlı yeşiller, 12 ton)
    ultraGreen: {
      1: '#dafcdb',
      2: '#c7fcca',
      3: '#85fd96',
      4: '#00eb5e',
      5: '#01d253',
      6: '#01ad43',
      7: '#008a34',
      8: '#006825',
      9: '#004f1a',
      10: '#003d13',
      11: '#00330e',
      12: '#012f0d',
    },

    // VeryYellow — Krem → Koyu hardal (12 ton)
    veryYellow: {
      1: '#fdf3d6',
      2: '#fdeec1',
      3: '#ffdc37',
      4: '#f0cd01',
      5: '#d2b301',
      6: '#ad9400',
      7: '#8a7501',
      8: '#685800',
      9: '#4f4200',
      10: '#3d3300',
      11: '#332a00',
      12: '#2f2700',
    },

    // Mutlak beyaz
    white: '#ffffff',
  },
} as const;

/**
 * TypeScript yardımcı tipler
 * Kullanım:
 *   const myColor: ColorToken = 'core.confidentlyCoral.7';
 */
export type ColorPalette = typeof colors;
export type CoreColors = ColorPalette['core'];