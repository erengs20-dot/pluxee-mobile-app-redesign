import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Button, semantic, spacing, radius } from '@pluxee/design-system';
import type { RootStackParamList } from '../navigation/types';
import { CardDetailHeader } from '../components/cardDetail/CardDetailHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'SmsVerification'>;

export function SmsVerificationScreen({ route, navigation }: Props) {
  const { brandId, amount, phoneNumber, nextScreen } = route.params;
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const maskedPhone = '* **** *** ' + phoneNumber.slice(-4);
  const isComplete = code.every((d) => d.length === 1);

  const handleDigit = (digit: string, index: number) => {
    if (digit.length > 1) return;
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = () => {
    if (nextScreen === 'TransferSuccess') {
      navigation.replace('TransferSuccess', {
        brandId,
        amount,
        transferType: 'balance',
      });
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <CardDetailHeader title="Islem Onayi" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <Text variant="title.mobileMain" color="primary" align="center">
          6 haneli kod
        </Text>
        <Text variant="body.medium" color="secondary" align="center">
          Isleme devam edebilmek icin {maskedPhone} ile biten telefonuna SMS ile gonderilen 6 haneli kodu gir.
        </Text>

        <View style={styles.codeRow}>
          {code.map((digit, i) => (
            <TextInput
              key={i}
              ref={(ref) => { inputRefs.current[i] = ref; }}
              style={styles.codeBox}
              value={digit}
              onChangeText={(d) => handleDigit(d, i)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        <View style={styles.countdownRow}>
          <Text variant="body.mediumBold" color="primary">Kalan sure</Text>
          <Text variant="body.mediumBold" color="primary">{countdown} sn</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(countdown / 60) * 100}%` }]} />
        </View>

        <Button
          variant="chamfered"
          size="lg"
          onPress={handleSubmit}
        >
          Devam et
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: semantic.background.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[8],
    gap: spacing[4],
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing[2],
    marginVertical: spacing[4],
  },
  codeBox: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: semantic.border.tertiary,
    borderRadius: radius.md,
    fontSize: 24,
    fontWeight: '700',
    color: semantic.text.primary,
    backgroundColor: '#ffffff',
  },
  countdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1b51dc',
    borderRadius: 3,
  },
});
