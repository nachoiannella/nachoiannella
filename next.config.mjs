import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Everything (including the "Ask my portfolio" chat) runs client-side,
  // so the site can be exported as plain static files to /out.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  poweredByHeader: false,
};

const withMDX = createMDX({});
export default withMDX(nextConfig);
