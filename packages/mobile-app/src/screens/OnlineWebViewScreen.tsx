import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Clipboard from 'expo-clipboard';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Icon } from '@pluxee/design-system';
import { spacing, radius } from '@pluxee/design-system';
import { RootStackParamList } from '../navigation/types';
import { ONLINE_BRANDS } from '../data/placesPoints';

type Nav = any;
type RouteT = RouteProp<RootStackParamList, 'OnlineWebView'>;

const getUrlForBrand = (brandName: string): string => {
  const urlMap: Record<string, string> = {
    'Sarıyer': 'https://www.sariyermarket.com',
    'Mopaş': 'https://www.mopas.com.tr',
    "Domino's Pizza": 'https://www.dominos.com.tr',
    "McDonald's": 'https://www.mcdonalds.com.tr',
    'Hurma': 'https://www.hurma.com',
    'Pazarama': 'https://www.pazarama.com',
    'Demtaş Kapında': 'https://www.demtaskapinda.com',
    'İdeal Hipermarketleri': 'https://www.idealmarket.com.tr',
    'Haribo': 'https://www.haribo.com.tr',
    'Marketis': 'https://www.marketis.com.tr',
    'Tazemasa': 'https://www.tazemasa.com',
  };
  if (urlMap[brandName]) return urlMap[brandName];
  const slug = brandName
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g')
    .replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '');
  return `https://www.${slug}.com.tr`;
};

const formatTime = (s: number) => {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
};

const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export function OnlineWebViewScreen() {
  const nav = useNavigation<Nav>();
  const route = useRoute<RouteT>();
  const insets = useSafeAreaInsets();
  const { brandId, brandName } = route.params;
  const url = getUrlForBrand(brandName);

  const [codeRevealed, setCodeRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(300);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (codeRevealed && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            // Sure bitti -> butona geri don
            setTimeout(() => {
              setCodeRevealed(false);
              setTimeLeft(300);
            }, 500);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [codeRevealed]);

  const handleGetCode = () => {
    setCode(generateCode());
    setTimeLeft(300);
    setCodeRevealed(true);
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const progress = (timeLeft / 300) * 100;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => nav.goBack()} style={styles.iconBtn} accessibilityLabel="Kapat">
          <Text style={{ color: '#FFFFFF', fontSize: 28, lineHeight: 28, fontWeight: '300' }}>×</Text>
        </TouchableOpacity>
        <Text variant="title.mobileCard" color="inverse" align="center" style={styles.title} numberOfLines={1}>
          {brandName.toLocaleUpperCase('tr-TR')}
        </Text>
        <View style={styles.iconBtn} />
      </View>

      {/* WebView */}
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        startInLoadingState
      />

      {/* Sticky bottom: buton veya kod */}
      <View style={[styles.stickyBottom, { paddingBottom: insets.bottom + 12 }]}>
        {!codeRevealed ? (
          <TouchableOpacity onPress={handleGetCode} style={styles.codeBtn} activeOpacity={0.85}>
            <Text variant="body.mediumBold" color="inverse" align="center">Mobil ödeme kodu al</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.codeRevealed}>
            <Text variant="body.small" style={styles.codeLabel}>Mobil ödeme kodu</Text>
            <View style={styles.codeRow}>
              <Text style={styles.codeText} numberOfLines={1} adjustsFontSizeToFit>{code}</Text>
              <TouchableOpacity onPress={handleCopy} style={styles.copyBtn} accessibilityLabel="Kopyala" disabled={copied}>
                {copied ? (
                  <View style={styles.copiedBadge}>
                    <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>✓</Text>
                  </View>
                ) : (
                  <View style={styles.copyIconBox}>
                    <Text style={{ fontSize: 18, color: '#1B1D45' }}>⧉</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            {copied && (
              <Text variant="body.small" style={styles.copiedText}>Kopyalandı!</Text>
            )}
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <View style={styles.timeRow}>
              <Text variant="body.small" style={styles.timeLabel}>Kalan süre</Text>
              <Text variant="body.small" style={styles.timeValue}>{formatTime(timeLeft)} sn</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1D45',
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[3],
  },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1 },
  webview: { flex: 1 },
  stickyBottom: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  codeBtn: {
    backgroundColor: '#26D07C',
    paddingVertical: spacing[4],
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  codeRevealed: {
    paddingVertical: spacing[2],
  },
  codeLabel: {
    color: '#666',
    marginBottom: spacing[1],
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[3],
    gap: spacing[2],
  },
  codeText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B1D45',
    letterSpacing: 1,
    flex: 1,
  },
  copiedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#26D07C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copiedText: {
    color: '#26D07C',
    fontWeight: '600',
    marginTop: -spacing[2],
    marginBottom: spacing[2],
  },
  copyBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#1B1D45',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E5E5',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: spacing[2],
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#26D07C',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeLabel: {
    color: '#666',
  },
  timeValue: {
    color: '#666',
    fontWeight: '600',
  },
});
