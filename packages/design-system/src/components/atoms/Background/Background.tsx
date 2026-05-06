/**
 * Background - Pluxee Design System
 *
 * Pluxee'nin imza chevron / slope / heading desenli SVG arka planlari.
 * 3 variant x 3 colorTheme + reverse parametresi.
 *
 * KULLANIM:
 *   <Background variant="chevron" colorTheme="green">
 *     <Text>Icerik</Text>
 *   </Background>
 *
 *   <Background variant="slopeSm" colorTheme="corail" reverse />
 */

import React from 'react';
import { View, type ViewStyle, type StyleProp, type DimensionValue } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

export type BackgroundVariant = 'chevron' | 'slopeSm' | 'slopeMd' | 'heading';
export type BackgroundColorTheme = 'green' | 'corail' | 'backOffice';

interface ColorTriad {
  dark: string;
  bright: string;
  light: string;
}

const COLOR_THEMES: Record<BackgroundColorTheme, ColorTriad> = {
  green: {
    dark: '#221c46',
    bright: '#00eb5e',
    light: '#dafcdb',
  },
  corail: {
    dark: '#221c46',
    bright: '#ff7375',
    light: '#fcf1f0',
  },
  backOffice: {
    dark: '#221c46',
    bright: '#17ccf9',
    light: '#e8f6fc',
  },
};

export interface BackgroundProps {
  variant: BackgroundVariant;
  colorTheme?: BackgroundColorTheme;
  reverse?: boolean;
  width?: DimensionValue;
  height?: DimensionValue;
  /** Eger verilirse dark katmanin rengini override eder */
  backgroundColor?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
}

/**
 * Chevron deseni - 3 dikey katman, orta + sag chevron sekli yapar
 */
function ChevronSvg({ colors, reverse }: { colors: ColorTriad; reverse: boolean }) {
  // viewBox 100x100 - katmanlar oranli sekilde
  // reverse=true (default Pluxee): koyu solda, parlak orta, acik sagda
  // reverse=false: ayna
  const darkX = reverse ? 0 : 60;
  const brightStart = reverse ? 50 : 25;
  const lightStart = reverse ? 75 : 0;

  if (reverse) {
    return (
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Katman 1: Acik renk (en arka, sag) */}
        <Path d="M 75 0 L 100 0 L 100 100 L 75 100 L 90 50 Z" fill={colors.light} />
        {/* Katman 2: Parlak renk (orta) */}
        <Path d="M 50 0 L 75 0 L 90 50 L 75 100 L 50 100 L 65 50 Z" fill={colors.bright} />
        {/* Katman 3: Koyu navy (sol, en buyuk) */}
        <Path d="M 0 0 L 50 0 L 65 50 L 50 100 L 0 100 Z" fill={colors.dark} />
      </Svg>
    );
  } else {
    return (
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <Path d="M 0 0 L 25 0 L 10 50 L 25 100 L 0 100 Z" fill={colors.light} />
        <Path d="M 25 0 L 50 0 L 35 50 L 50 100 L 25 100 L 10 50 Z" fill={colors.bright} />
        <Path d="M 50 0 L 100 0 L 100 100 L 50 100 L 35 50 Z" fill={colors.dark} />
      </Svg>
    );
  }
}

/**
 * Slope - diagonal kesim
 */
function SlopeSvg({
  colors,
  reverse,
  size,
}: {
  colors: ColorTriad;
  reverse: boolean;
  size: 'sm' | 'md';
}) {
  // sm: hafif diagonal (sag alt kose ucgen)
  // md: daha sert diagonal
  const cutPoint = size === 'sm' ? 65 : 50;

  if (reverse) {
    return (
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <Rect x="0" y="0" width="100" height="100" fill={colors.dark} />
        {/* Sag-alt diagonal acik renk */}
        <Path
          d={`M 100 ${cutPoint} L 100 100 L ${cutPoint} 100 Z`}
          fill={colors.light}
        />
        {/* Daha kucuk parlak ucgen */}
        <Path
          d={`M 100 ${cutPoint + 20} L 100 100 L ${cutPoint + 20} 100 Z`}
          fill={colors.bright}
        />
      </Svg>
    );
  } else {
    return (
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <Rect x="0" y="0" width="100" height="100" fill={colors.dark} />
        <Path
          d={`M 0 ${cutPoint} L 0 100 L ${100 - cutPoint} 100 Z`}
          fill={colors.light}
        />
        <Path
          d={`M 0 ${cutPoint + 20} L 0 100 L ${100 - (cutPoint + 20)} 100 Z`}
          fill={colors.bright}
        />
      </Svg>
    );
  }
}

/**
 * Heading - ustten dikey ok inisi (top chevron)
 */
function HeadingSvg({ colors, reverse }: { colors: ColorTriad; reverse: boolean }) {
  if (reverse) {
    return (
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <Rect x="0" y="0" width="100" height="100" fill={colors.dark} />
        {/* Sag ust kose chevron */}
        <Path d="M 70 0 L 100 0 L 100 30 L 90 15 Z" fill={colors.light} />
        <Path d="M 80 0 L 100 0 L 100 20 Z" fill={colors.bright} />
      </Svg>
    );
  } else {
    return (
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <Rect x="0" y="0" width="100" height="100" fill={colors.dark} />
        <Path d="M 0 0 L 30 0 L 10 15 L 0 30 Z" fill={colors.light} />
        <Path d="M 0 0 L 20 0 L 0 20 Z" fill={colors.bright} />
      </Svg>
    );
  }
}

export function Background({
  variant,
  colorTheme = 'green',
  reverse = true,
  width = '100%',
  height = '100%',
  backgroundColor,
  children,
  style,
  borderRadius,
}: BackgroundProps) {
  const baseColors = COLOR_THEMES[colorTheme];
  const colors: ColorTriad = backgroundColor
    ? { ...baseColors, dark: backgroundColor }
    : baseColors;

  let SvgComponent: React.ReactElement;
  switch (variant) {
    case 'chevron':
      SvgComponent = <ChevronSvg colors={colors} reverse={reverse} />;
      break;
    case 'slopeSm':
      SvgComponent = <SlopeSvg colors={colors} reverse={reverse} size="sm" />;
      break;
    case 'slopeMd':
      SvgComponent = <SlopeSvg colors={colors} reverse={reverse} size="md" />;
      break;
    case 'heading':
      SvgComponent = <HeadingSvg colors={colors} reverse={reverse} />;
      break;
  }

  return (
    <View
      style={[
        {
          width,
          height,
          overflow: 'hidden',
          borderRadius: borderRadius ?? 0,
          position: 'relative',
        },
        style,
      ]}
    >
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        {SvgComponent}
      </View>
      {children && (
        <View style={{ position: 'relative', zIndex: 1, flex: 1 }}>{children}</View>
      )}
    </View>
  );
}
