const path = require('node:path')
// servalize date from prisma
const { withSuperjson } = require('next-superjson')
// mayumi depend on @radix-ui/* elements, not provide valid esm exports in package.json
// issue: https://github.com/radix-ui/primitives/issues/1848
const withTM = require('next-transpile-modules')(['mayumi'])

if (process.env.NODE_ENV === 'development') {
  console.log('info  - lanUrl:', `http://${require('address').ip()}:3000`)
}

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
const nextConfig = withTM(withSuperjson()({
  swcMinify: false,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // realme-ten.vercel.app is website provide svg images build with svg foreignObject
    domains: [
      'github.com',
      'images.unsplash.com',
      'user-images.githubusercontent.com',
      'realme-ten.vercel.app',
      'neo-docs.netlify.app',
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: 'default-src \'self\'; script-src \'none\'; sandbox;',
  },
  webpack(config, context) {
    config.resolve.symlinks = true
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
}))

module.exports = nextConfig
