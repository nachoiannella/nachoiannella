import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return { name: 'Nacho Iannella', short_name: 'Nacho', start_url: '/', display: 'standalone', background_color: '#0d0d0c', theme_color: '#0d0d0c', icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }] };
}
