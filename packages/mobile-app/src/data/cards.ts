/**
 * Mock kart verileri.
 */

import { semantic } from '@pluxee/design-system';

export type CardCategory = 'meal' | 'gift' | 'food' | 'business' | 'transport';

export interface UserCard {
  id: string;
  category: CardCategory;
  name: string;
  lastDigits: string;
  balance: number;
  isDefault: boolean;
}

interface CategoryMeta {
  label: string;
  iconName: string;
  bgColor: string;
}

export const CARD_CATEGORY_META: Record<CardCategory, CategoryMeta> = {
  meal: { label: 'Yemek', iconName: 'meal', bgColor: semantic.brand.secondary },
  gift: { label: 'Hediye', iconName: 'gift', bgColor: semantic.brand.quinary },
  food: { label: 'Gida', iconName: 'shoppingBag', bgColor: semantic.brand.quaternary },
  business: { label: 'Business', iconName: 'workBriefcase', bgColor: semantic.brand.tertiary },
  transport: { label: 'Ulasim', iconName: 'car', bgColor: semantic.brand.tertiary },
};

export const MOCK_CARDS: UserCard[] = [
  { id: '1', category: 'meal', name: 'Yemek Kart 1', lastDigits: '1234', balance: 15000.0, isDefault: true },
  { id: '2', category: 'meal', name: 'Yemek Kart 2', lastDigits: '5678', balance: 2325.0, isDefault: false },
  { id: '3', category: 'gift', name: 'Mix Paket', lastDigits: '7890', balance: 16000.0, isDefault: false },
  { id: '4', category: 'food', name: 'Gida Kart', lastDigits: '0123', balance: 500.0, isDefault: false },
  { id: '5', category: 'business', name: 'Business', lastDigits: '4567', balance: 14000.0, isDefault: false },
  { id: '6', category: 'transport', name: 'Ulasim Kart', lastDigits: '2345', balance: 4800.0, isDefault: false },
];

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}