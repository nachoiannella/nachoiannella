import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { cases } from '@/lib/cases';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...cases.map((c) => ({ url: `${SITE_URL}/work/${c.slug}/`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })),
  ];
}
