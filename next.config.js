const path = require('path')

const define = () => {
  // TODO: netlify
  if (process.env.VERCEL) {
    console.log('[Nextjs] running on platform vercel')
    // https://vercel.com/docs/concepts/projects/environment-variables
    const env = {
      'process.env.REPO_OWNER': JSON.stringify(process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER),
      'process.env.REPO_NAME': JSON.stringify(process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG),
      'process.env.__DEV__': JSON.stringify(process.env.NODE_ENV === 'development'),
    }
    return env
  }
  return {
    'process.env.REPO_OWNER': JSON.stringify('JiangWeixian'),
    'process.env.REPO_NAME': JSON.stringify('homepage'),
    'process.env.__DEV__': JSON.stringify(process.env.NODE_ENV === 'development'),
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  webpack(config, context) {
    if (process.env.NODE_ENV === 'development') {
      config.resolve.alias.react = path.resolve(__dirname, './node_modules/react')
    }
    config.plugins.push(new context.webpack.DefinePlugin(define()))
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = nextConfig
