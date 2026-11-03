export interface Country {
  code: string;
  nameAr: string;
  nameEn: string;
  phoneCode: string;
  flag: string;
}

export const MIDDLE_EAST_COUNTRIES: Country[] = [
  { code: 'JO', nameAr: 'الأردن', nameEn: 'Jordan', phoneCode: '+962', flag: '🇯🇴' },
  { code: 'QA', nameAr: 'قطر', nameEn: 'Qatar', phoneCode: '+974', flag: '🇶🇦' },
  { code: 'SA', nameAr: 'المملكة العربية السعودية', nameEn: 'Saudi Arabia', phoneCode: '+966', flag: '🇸🇦' },
  { code: 'AE', nameAr: 'الإمارات العربية المتحدة', nameEn: 'UAE', phoneCode: '+971', flag: '🇦🇪' },
  { code: 'KW', nameAr: 'الكويت', nameEn: 'Kuwait', phoneCode: '+965', flag: '🇰🇼' },
  { code: 'BH', nameAr: 'البحرين', nameEn: 'Bahrain', phoneCode: '+973', flag: '🇧🇭' },
  { code: 'OM', nameAr: 'عُمان', nameEn: 'Oman', phoneCode: '+968', flag: '🇴🇲' },
  { code: 'PS', nameAr: 'فلسطين', nameEn: 'Palestine', phoneCode: '+970', flag: '🇵🇸' },
  { code: 'LB', nameAr: 'لبنان', nameEn: 'Lebanon', phoneCode: '+961', flag: '🇱🇧' },
  { code: 'EG', nameAr: 'مصر', nameEn: 'Egypt', phoneCode: '+20', flag: '🇪🇬' },
  { code: 'IQ', nameAr: 'العراق', nameEn: 'Iraq', phoneCode: '+964', flag: '🇮🇶' },
  { code: 'SY', nameAr: 'سوريا', nameEn: 'Syria', phoneCode: '+963', flag: '🇸🇾' },
  { code: 'YE', nameAr: 'اليمن', nameEn: 'Yemen', phoneCode: '+967', flag: '🇾🇪' },
  { code: 'LY', nameAr: 'ليبيا', nameEn: 'Libya', phoneCode: '+218', flag: '🇱🇾' },
  { code: 'TN', nameAr: 'تونس', nameEn: 'Tunisia', phoneCode: '+216', flag: '🇹🇳' },
  { code: 'MA', nameAr: 'المغرب', nameEn: 'Morocco', phoneCode: '+212', flag: '🇲🇦' },
  { code: 'DZ', nameAr: 'الجزائر', nameEn: 'Algeria', phoneCode: '+213', flag: '🇩🇿' },
];

export const ALL_COUNTRIES: Country[] = [
  ...MIDDLE_EAST_COUNTRIES,
  { code: 'GB', nameAr: 'المملكة المتحدة', nameEn: 'United Kingdom', phoneCode: '+44', flag: '🇬🇧' },
  { code: 'US', nameAr: 'الولايات المتحدة', nameEn: 'United States', phoneCode: '+1', flag: '🇺🇸' },
  { code: 'DE', nameAr: 'ألمانيا', nameEn: 'Germany', phoneCode: '+49', flag: '🇩🇪' },
  { code: 'FR', nameAr: 'فرنسا', nameEn: 'France', phoneCode: '+33', flag: '🇫🇷' },
  { code: 'CA', nameAr: 'كندا', nameEn: 'Canada', phoneCode: '+1', flag: '🇨🇦' },
  { code: 'AU', nameAr: 'أستراليا', nameEn: 'Australia', phoneCode: '+61', flag: '🇦🇺' },
];
