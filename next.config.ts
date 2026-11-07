 import type { NextConfig } from 'next'
 import path from 'path'
 
 const nextConfig: NextConfig = {
   reactStrictMode: true,
   experimental: {
     optimizePackageImports: ['@react-three/fiber', '@react-three/drei', 'lucide-react', 'gsap'],
   },
   webpack: (config) => {
     config.resolve.alias = {
       ...config.resolve.alias,
       '@': path.resolve(__dirname, 'src'),
       '@/components': path.resolve(__dirname, 'src/components'),
       '@/lib': path.resolve(__dirname, 'src/lib'),
       '@/hooks': path.resolve(__dirname, 'src/hooks'),
       '@/styles': path.resolve(__dirname, 'src/styles'),
       '@/app': path.resolve(__dirname, 'src/app'),
     }
     config.resolve.fallback = {
       ...config.resolve.fallback,
       fs: false,
       path: false,
       crypto: false,
     }
     return config
   },
   images: {
     formats: ['image/avif', 'image/webp'],
     remotePatterns: [
       {
         protocol: 'https',
         hostname: '**',
       },
     ],
   },
   headers: async () => [
     {
       source: '/:path*',
       headers: [
         { key: 'X-DNS-Prefetch-Control', value: 'on' },
         { key: 'X-Content-Type-Options', value: 'nosniff' },
         { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
       ],
     },
   ],
 }
 
 export default nextConfig
