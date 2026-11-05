import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return { name: 'Nacho Iannella', short_name: 'Nacho', start_url: '/', display: 'standalone', background_color: '#1b1a18', theme_color: '#1b1a18', icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }] };
}
