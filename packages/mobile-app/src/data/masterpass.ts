/**
 * Mock Masterpass kayitli kartlar.
 * Gercek uygulamada Masterpass SDK entegrasyonu gerekir.
 */

export interface MasterpassCard {
  id: string;
  name: string;
  number: string;
  isSelected: boolean;
}

export const MOCK_MASTERPASS_CARDS: MasterpassCard[] = [
  { id: 'mp-1', name: 'CRYSTAL', number: '4048 09** **** **80', isSelected: true },
  { id: 'mp-2', name: 'Getir Kredi Karti', number: '5362 02** **** **11', isSelected: false },
  { id: 'mp-3', name: 'Getir Sanal Hesap Karti', number: '5378 89** **** **82', isSelected: false },
  { id: 'mp-4', name: 'GARANTI BONUS', number: '5407 09** **** **22', isSelected: false },
];

export interface AutoLoadInstruction {
  id: string;
  type: 'recurring' | 'threshold';
  cardCategory: string;
  cardNumber: string;
  amount: number;
  paymentMethod: string;
  createdAt: string;
  frequency?: string;
  day?: string;
  threshold?: number;
  maxLimit?: number;
  description?: string;
}

export const MOCK_AUTO_LOADS: AutoLoadInstruction[] = [
  {
    id: 'al-1',
    type: 'recurring',
    cardCategory: 'Yemek',
    cardNumber: '1234 1234 1234 1234',
    amount: 1000,
    paymentMethod: 'Is Bankasi kredi karti',
    createdAt: '25.01.2026 12:40',
    frequency: 'Haftalik',
    day: 'Pazartesi',
  },
  {
    id: 'al-2',
    type: 'threshold',
    cardCategory: 'Yemek',
    cardNumber: '1234 1234 1234 1234',
    amount: 5000,
    paymentMethod: 'Is Bankasi kredi karti',
    createdAt: '25.01.2026 12:40',
    threshold: 500,
    maxLimit: 25000,
  },
];
