/* eslint-disable react/no-unknown-property */
import Head from 'next/head'

const intro = `
Hi, I'am JiangWeixian, a front-end developer, on the road to be a full-time opensource developer.
`

// refs: https://github.com/joshbuchea/HEAD#recommended-minimum
const meta = {
  url: 'https://jwx.ink',
  title: "JiangWeixian's blog",
  image: 'https://jwx.ink/hacking-room.png',
  // A text description of the image conveying the essential nature of an image to users who are visually impaired. Maximum 420 characters.
  alt: "Display 80's hacking room, contains loved Macintosh, Arcade etc...Everything is artwork, I hope I can create tools with love like that.",
  description: intro,
  twitter: '@JiangWeixian',
}

type SEOProps = Partial<typeof meta>

export const SEO = (props: SEOProps = meta) => {
  const p = { ...meta, ...props }
  return (
    <Head>
      <title>{props.title}</title>
      {/* fackbook */}
      <meta property="og:url" content={p.url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={p.title} />
      <meta property="og:image" content={p.image} />
      <meta property="og:image:alt" content={p.alt} />
      <meta property="og:description" content={p.description} />
      {/* twitter */}
      <meta name="twitter:card" content={p.description} />
      <meta name="twitter:creator" content={p.twitter} />
      <meta name="twitter:url" content={p.url} />
      <meta name="twitter:title" content={p.title} />
      <meta name="twitter:description" content={p.description} />
      <meta name="twitter:image" content={p.image} />
      <meta name="twitter:image:alt" content={p.description} />
      {/* @ts-ignore */}
      <meta name="pinterest" content="nopin" description={p.description} />
      {/* wechat */}
      <meta itemProp="name" content={p.title} />
      <meta itemProp="image" content={p.image} />
      <meta name="description" itemProp="description" content={p.description} />
    </Head>
  )
}
