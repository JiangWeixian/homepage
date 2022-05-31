const define = () => {
  // TODO: netlify
  if (process.env.VERCEL) {
    console.log('[Nextjs] running on platform vercel')
    // https://vercel.com/docs/concepts/projects/environment-variables
    const env = {
      'process.env.REPO_OWNER': JSON.stringify(process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER),
      'process.env.REPO_NAME': JSON.stringify(process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG),
    }
    return env
  }
  return {
    'process.env.REPO_OWNER': JSON.stringify('JiangWeixian'),
    'process.env.REPO_NAME': JSON.stringify('homepage'),
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
    config.plugins.push(new context.webpack.DefinePlugin(define()))
    return config
  },
}

module.exports = nextConfig
