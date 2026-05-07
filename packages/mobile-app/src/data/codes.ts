/**
 * Marka kodlari mock data.
 *
 * Kullanici "Kod al" akisi ile mobile_code tipindeki markalardan kod alir.
 *   - active:   "Kodlarim" tabinda gosterilir
 *   - archived: "Arsivlenmis kodlarim" tabinda gosterilir
 */

export type CodeStatus = 'active' | 'archived';

export interface BrandCode {
  id: string;
  brandId: string;
  brandName: string;
  amount: number;
  code: string;
  expiryDate: string;
  createdAt: string;
  status: CodeStatus;
}

export const MOCK_CODES: BrandCode[] = [
  {
    id: 'code-1',
    brandId: 'boyner',
    brandName: 'Boyner',
    amount: 500.0,
    code: '1742585694227393',
    expiryDate: '20.02.2028',
    createdAt: '2026-04-15T10:30:00',
    status: 'active',
  },
];

export function getActiveCodes(): BrandCode[] {
  return MOCK_CODES.filter((c) => c.status === 'active');
}

export function getArchivedCodes(): BrandCode[] {
  return MOCK_CODES.filter((c) => c.status === 'archived');
}

export function getCodesByBrand(brandId: string): BrandCode[] {
  return MOCK_CODES.filter((c) => c.brandId === brandId && c.status === 'active');
}

export function getCodeById(codeId: string): BrandCode | undefined {
  return MOCK_CODES.find((c) => c.id === codeId);
}

export function getActiveCodeCount(): number {
  return MOCK_CODES.filter((c) => c.status === 'active').length;
}
