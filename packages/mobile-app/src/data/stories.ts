/**
 * Story (hikaye) data - Anasayfa ust seridi.
 * Her story bir kampanya banner'i ile eslestirilir (bannerId).
 */

export interface Story {
  id: string;
  brandName: string;
  initials: string;
  bgColor: string;
  hasNew: boolean;
  /** Kampanya banner id - tiklaninca CampaignDetail acilir */
  bannerId: string;
}

export const MOCK_STORIES: Story[] = [
  { id: '1', brandName: 'Trendyol Go', initials: 'TG', bgColor: '#ff6000', hasNew: true, bannerId: '1' },
  { id: '2', brandName: 'Starbucks', initials: 'SB', bgColor: '#006241', hasNew: false, bannerId: '4' },
  { id: '3', brandName: 'Pazarama', initials: 'PZ', bgColor: '#7d3cff', hasNew: true, bannerId: '3' },
  { id: '4', brandName: 'TikTak', initials: 'TT', bgColor: '#1a1a1a', hasNew: false, bannerId: '6' },
  { id: '5', brandName: 'Hayat Su', initials: 'HS', bgColor: '#0099d4', hasNew: false, bannerId: '5' },
  { id: '6', brandName: 'McDonalds', initials: 'MD', bgColor: '#ffc72c', hasNew: false, bannerId: '7' },
];
