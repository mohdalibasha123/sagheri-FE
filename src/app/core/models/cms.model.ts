export interface CmsPage {
  id: string;
  key: string;
  titleAr: string;
  titleEn: string;
  sections: CmsSection[];
  seoMetaAr?: SeoMeta;
  seoMetaEn?: SeoMeta;
  updatedAt: string;
}

export interface CmsSection {
  id: string;
  key: string;
  type: string;
  contentAr: Record<string, unknown>;
  contentEn: Record<string, unknown>;
  order: number;
  isVisible: boolean;
}

export interface SeoMeta {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

export interface SiteSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: SocialLinks;
  defaultCurrency: string;
  defaultLanguage: string;
  logoUrl?: string;
}

export interface SocialLinks {
  twitter?: string;
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
}

export interface MediaAsset {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  createdAt: string;
}

export interface PageMeta {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}
