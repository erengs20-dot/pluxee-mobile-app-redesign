/**
 * Mock transaction (islem hareketi) verileri.
 *
 * Pluxee TR detay sayfalarinda 2 ana liste tipi var:
 *   - spending  -> Harcamalar (POS, mobil odeme, online)
 *   - loading   -> Yuklemeler (bireysel, kurumsal)
 */

export type TransactionType = 'spending' | 'loading';

export type TransactionChannel =
  | 'TRENDYOLYEMEK'
  | 'Satis'
  | 'Mobil Odeme'
  | 'Online'
  | 'Bireysel Yukleme'
  | 'Kurumsal Yukleme';

export interface Transaction {
  id: string;
  cardId: string;
  type: TransactionType;
  merchant: string;
  channel: TransactionChannel;
  amount: number;
  date: string;
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', cardId: '1', type: 'spending', merchant: 'HATAY SOSLU DONER EVI', channel: 'TRENDYOLYEMEK', amount: 295.70, date: '2026-05-06T14:30:00' },
  { id: 't2', cardId: '1', type: 'spending', merchant: 'CARREFOUR MINI', channel: 'Satis', amount: 378.00, date: '2026-05-06T10:19:00' },
  { id: 't3', cardId: '1', type: 'spending', merchant: 'KAYSERI MUTFAGI', channel: 'Satis', amount: 409.50, date: '2026-05-05T12:32:00' },
  { id: 't4', cardId: '1', type: 'loading', merchant: 'Bireysel Yukleme', channel: 'Bireysel Yukleme', amount: 500.00, date: '2026-05-05T14:37:00' },
  { id: 't5', cardId: '1', type: 'loading', merchant: 'Kurumsal Yukleme', channel: 'Kurumsal Yukleme', amount: 9750.00, date: '2026-05-01T00:28:00' },
  { id: 't6', cardId: '4', type: 'spending', merchant: 'A101', channel: 'Satis', amount: 87.50, date: '2026-05-06T16:00:00' },
  { id: 't7', cardId: '2', type: 'spending', merchant: 'STARBUCKS', channel: 'Mobil Odeme', amount: 145.00, date: '2026-05-06T09:15:00' },
  { id: 't8', cardId: '2', type: 'spending', merchant: 'BURGER KING', channel: 'Mobil Odeme', amount: 89.00, date: '2026-05-05T18:45:00' },
];

export function getRecentTransactions(cardId: string, limit = 2): Transaction[] {
  return MOCK_TRANSACTIONS
    .filter((t) => t.cardId === cardId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getTransactionsByType(cardId: string, type: TransactionType): Transaction[] {
  return MOCK_TRANSACTIONS
    .filter((t) => t.cardId === cardId && t.type === type)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getMonthlySummary(cardId: string): { spending: number; plusPoints: number } {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const spending = MOCK_TRANSACTIONS
    .filter((t) => t.cardId === cardId && t.type === 'spending')
    .filter((t) => new Date(t.date) >= thirtyDaysAgo)
    .reduce((sum, t) => sum + t.amount, 0);
  return { spending, plusPoints: 0 };
}
