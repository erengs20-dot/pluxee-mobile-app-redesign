/**
 * ChamferedShape - Pluxee'nin imza buton şekli
 *
 * Sağ-alt köşesi 45° kesik dikdörtgen, SVG ile çizilir.
 * Button.tsx'in arkasında absolute positioned olarak durur.
 */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { createPluxeeButtonPath } from '../../../utils/chamferedPath';

interface ChamferedShapeProps {
  width: number;
  height: number;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
}

export function ChamferedShape({
  width,
  height,
  fill,
  stroke,
  strokeWidth = 0,
}: ChamferedShapeProps) {
  const path = createPluxeeButtonPath({ width, height });

  return (
    <Svg
      width={width}
      height={height}
      style={{ position: 'absolute', top: 0, left: 0 }}
      pointerEvents="none"
    >
      <Path d={path} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </Svg>
  );
}
