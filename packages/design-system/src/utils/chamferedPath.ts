/**
 * Pluxee Design System - Chamfered Corner SVG Path Utilities
 *
 * 🎨 PLUXEE'NİN İMZA TASARIM ÖZELLİĞİ
 *
 * Pluxee'nin Button component'i normal border-radius kullanmaz!
 * Bunun yerine sağ-alt köşede 45° kesik (chamfered corner) bulunur.
 * Bu Pluxee'nin görsel kimliğinin ayrılmaz bir parçası.
 *
 * Web'de bu efekt CSS clip-path ile yapılır:
 *   clip-path: polygon(0 0, 100% 0, 100% calc(100% - X), calc(100% - X) 100%, 0 100%)
 *
 * React Native'de clip-path yok. Bu yüzden react-native-svg ile
 * <Path d={...}> kullanarak chamfered shape'i çiziyoruz.
 *
 * KULLANIM:
 *   import { Svg, Path } from 'react-native-svg';
 *   import { createPluxeeButtonPath } from '@pluxee/design-system';
 *
 *   const path = createPluxeeButtonPath({ width: 200, height: 48 });
 *
 *   <Svg width={200} height={48}>
 *     <Path d={path} fill="#221c46" />
 *   </Svg>
 */

interface ChamferedPathOptions {
  width: number;
  height: number;
  cornerOffset?: number; // Chamfer'ın boyutu (piksel)
}

/**
 * Sağ-alt köşesi 45° kesik dikdörtgen path'i üretir.
 *
 * @example
 *   createChamferedPath({ width: 200, height: 48, cornerOffset: 24 })
 *   // => "M 0 0 L 200 0 L 200 24 L 176 48 L 0 48 Z"
 */
export function createChamferedPath({
  width,
  height,
  cornerOffset,
}: Required<ChamferedPathOptions>): string {
  return [
    `M 0 0`, // Sol-üst başlangıç
    `L ${width} 0`, // Sağ-üst köşe
    `L ${width} ${height - cornerOffset}`, // Sağ kenardan aşağı
    `L ${width - cornerOffset} ${height}`, // 45° kesik (chamfer)
    `L 0 ${height}`, // Sol-alt köşe
    `Z`, // Path'i kapat
  ].join(' ');
}

/**
 * Pluxee Button için optimize edilmiş chamfered path.
 *
 * Default cornerOffset = height / 2 (Pluxee'nin web'de kullandığı oran).
 * Bu sayede chamfer'ın boyutu Button yüksekliğiyle orantılı kalır.
 *
 * @example
 *   // Standart lg button (48px height)
 *   createPluxeeButtonPath({ width: 200, height: 48 })
 *   // chamfer = 24px (height/2)
 */
export function createPluxeeButtonPath({
  width,
  height,
  cornerOffset,
}: ChamferedPathOptions): string {
  const offset = cornerOffset ?? height / 2;
  return createChamferedPath({ width, height, cornerOffset: offset });
}

/**
 * Tam diamond/baklava şekli (4 köşesi de kesik).
 *
 * Şu an Button'da kullanılmıyor ama design system'de
 * dekoratif element olarak kullanılabilir (badge, accent, vb.).
 */
export function createDiamondPath({
  width,
  height,
  cornerOffset = Math.min(width, height) / 4,
}: ChamferedPathOptions): string {
  return [
    `M ${cornerOffset} 0`,
    `L ${width - cornerOffset} 0`,
    `L ${width} ${cornerOffset}`,
    `L ${width} ${height - cornerOffset}`,
    `L ${width - cornerOffset} ${height}`,
    `L ${cornerOffset} ${height}`,
    `L 0 ${height - cornerOffset}`,
    `L 0 ${cornerOffset}`,
    `Z`,
  ].join(' ');
}