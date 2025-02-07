import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // build时生成静态页面，开发时使用 Next.js 内置服务器
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    unoptimized: true,
  },
  compiler: {
    removeConsole: false,
  },
  // 禁用自动路径解析
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
  // 禁用文件名编码
  experimental: {
    disableOptimizedLoading: true,
  },
  // 使用原始路径
  assetPrefix: '',
  // 禁用路径规范化
  reactStrictMode: false,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
}

export default nextConfig
