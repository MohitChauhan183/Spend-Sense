/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
      ignoreDuringBuilds: true,
    },
    images: {
      domains: ['metaschool.so'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'metaschool.so',
          pathname: '/**',
        },
      ],
  },
  }
  
  export default nextConfig;