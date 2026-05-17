/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  allowedDevOrigins: ['http://192.168.8.77:3000', 'http://192.168.137.115', 'local-origin.dev', '*.local-origin.dev'],

}

export default nextConfig
