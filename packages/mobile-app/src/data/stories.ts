/**
 * Story (hikaye) data — Anasayfa ust seridi.
 * Pluxee'nin partner markaları, gercek uygulamada backend'den gelir.
 */

export interface Story {
  id: string;
  brandName: string;
  initials: string;       // Avatar fallback icin (TR, SB vb.)
  bgColor: string;        // Avatar arkaplan rengi
  hasNew: boolean;        // Yeni icerik var mi (yesil dot)
}

export const MOCK_STORIES: Story[] = [
  { id: '1', brandName: 'Trendyol Go', initials: 'TG', bgColor: '#ff6000', hasNew: true },
  { id: '2', brandName: 'Starbucks', initials: 'SB', bgColor: '#006241', hasNew: false },
  { id: '3', brandName: 'Pazarama', initials: 'PZ', bgColor: '#7d3cff', hasNew: true },
  { id: '4', brandName: 'TikTak', initials: 'TT', bgColor: '#1a1a1a', hasNew: false },
  { id: '5', brandName: 'Hayat Su', initials: 'HS', bgColor: '#0099d4', hasNew: false },
  { id: '6', brandName: 'McDonalds', initials: 'MD', bgColor: '#ffc72c', hasNew: false },
];
