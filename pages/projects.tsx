import {
  a,
  config,
  to as interpolate,
  useSpring,
  useSprings,
} from '@react-spring/web'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import Babel from '~/components/Icons/Babel.svg'
import Node from '~/components/Icons/Node.svg'
import Rollup from '~/components/Icons/Rollup.svg'
import Typescript from '~/components/Icons/Typescript.svg'
import Vite from '~/components/Icons/Vite.svg'
import VSCode from '~/components/Icons/VSCode.svg'
import Webpack from '~/components/Icons/Webpack.svg'
import { Image, ImageContainer } from '~/components/ImageContainer'
import {
  Footer,
  Layout,
  Nav,
} from '~/components/Layout'
import { SEO } from '~/components/SEO'
import { SponsorLink } from '~/components/Sponsor'
import { Card } from '~/components/ui/card'
import { Typography } from '~/components/ui/typography'

import type { NextPage } from 'next'

const BoxCard = a(Card)

interface Item {
  name: string
  type: 'major' | 'tiny'
  url: string
  image?: string
  icon?: string
  description: string
  pin?: boolean
}

const icons = {
  vite: Vite,
  webpack: Webpack,
  node: Node,
  rollup: Rollup,
  typescript: Typescript,
  babel: Babel,
  vscode: VSCode,
}

export const getStaticProps = async () => {
  const projects = (await import('~/assets/projects.json').then(res => res.default)) as Record<
    string,
    Item[]
  >
  const pins = Object.values(projects).reduce((acc, cur) => {
    return acc.concat(cur.filter(v => v.pin))
  }, [])
  return {
    props: {
      projects,
      pins,
    },
  }
}

// component pins based on https://codesandbox.io/s/to6uf?file=/src/App.tsx:906-919
const to = (i: number) => ({
  x: `${10 + i * 60}%`,
  y: 50 + i * 4,
  scale: 1,
  rot: (5 + Math.random() * 10) * (i % 2 === 0 ? -1 : 1),
  delay: i * 100,
  opacity: 1,
})
const from = (i: number) => {
  const initials = [
    // from top
    { x: `${10 + i * 40}%`, rot: 0, scale: 1.5, y: -1000, opacity: 0 },
    // from left
    { x: '-100%', rot: 0, scale: 1.5, y: 0, opacity: 0 },
    // from bottom
    { x: `${10 + i * 40}%`, rot: 0, scale: 1.5, y: 1000, opacity: 0 },
  ]
  return initials[i % initials.length]
}
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

const ProjectCard = ({ item }: { item: Item }) => {
  const [isHover, hover] = useState(false)
  const { ty } = useSpring({
    ty: isHover ? '0%' : '100%',
  })
  return (
    <div className="aspect-square bg-slate-900" onMouseEnter={() => hover(true)} onMouseLeave={() => hover(false)}>
      <Image alt={item.name} src={item.image!} style={{ aspectRatio: '1/1' }} />
      <BoxCard
        style={{ transform: ty.to(v => `translateY(${v})`) }}
        className="absolute bottom-0 left-0 w-full rounded-none border-0 bg-black/40 backdrop-blur-sm"
      >
        <Typography variant="p" className="line-clamp-2 text-xs font-bold text-secondary">
          {item.description}
        </Typography>
      </BoxCard>
    </div>
  )
}

const Pins = ({ items }: { items: Item[] }) => {
  const [pins] = useSprings(items.length, i => ({
    ...to(i),
    from: from(i),
  }))
  return (
    // TODO: w, h for debug
    <div className="flex h-40 w-full items-center justify-center px-4 md:mt-12 md:h-80">
      <div className="container relative mx-auto h-full rounded-lg shadow">
        {pins.map(({ x, y, rot, scale, opacity }, i) => (
          <a.div
            className="absolute flex w-[100px] items-center justify-center will-change-transform md:w-[200px]"
            key={i}
            style={{ x, y, opacity }}
          >
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <a.div
              className="relative h-full w-full cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl"
              style={{
                transform: interpolate([rot, scale], trans),
              }}
              onClick={() => window.open(items[i].url)}
            >
              <ProjectCard item={items[i]} />
            </a.div>
          </a.div>
        ))}
      </div>
    </div>
  )
}

interface SectionProps {
  year: number | string
  items: Item[]
}

const Section = ({ year, items }: SectionProps) => {
  const { ref, inView } = useInView()
  const [styles, api] = useSpring(() => ({ opacity: 0, top: 48, config: config.slow }))
  useEffect(() => {
    if (inView) {
      api.start({ opacity: 1, top: 0, delay: 200 })
    }
  }, [inView, year, api])
  return (
    <a.div
      style={styles}
      className="relative flex flex-col justify-between md:grid md:grid-cols-12"
      ref={ref}
    >
      <Typography className="font-eb text-lg text-secondary md:col-start-1 md:col-end-3" variant="h2">
        {year}
      </Typography>
      <div className="flex flex-col gap-4 md:col-start-6 md:col-end-13">
        {items
          .filter(v => v.type === 'major')
          .map((v) => {
            return (
              <div key={v.name}>
                <Typography variant="p" className="my-3 font-medium text-gray-900 dark:text-gray-100">
                  <Typography
                    as="span"
                    className="inline-block cursor-pointer font-semibold uppercase text-muted-foreground"
                    onClick={() => window.open(v.url)}
                  >
                    {v.name}&nbsp;&nbsp; - &nbsp;&nbsp;
                  </Typography>
                  {v.description}
                </Typography>
                {v.image && (
                  <ImageContainer className="w-full overflow-hidden rounded-md shadow">
                    <Image alt={v.name} src={v.image} />
                  </ImageContainer>
                )}
              </div>
            )
          })}
        {items.filter(v => v.type === 'tiny').length !== 0 && (
          <Typography variant="h3" className="text-sm font-semibold text-muted-foreground">
            Tiny Projects
          </Typography>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items
            .filter(v => v.type === 'tiny')
            .map((v) => {
              return (
                <div
                  key={v.name}
                  className="inline-flex cursor-pointer items-center gap-8 rounded p-2 opacity-60 hover:opacity-90"
                  onClick={() => window.open(v.url)}
                >
                  {v.icon && (
                    <div className="flex-0 h-8 w-8 cursor-pointer text-muted-foreground">
                      {icons[v.icon as keyof typeof icons]()}
                    </div>
                  )}
                  <div className="w-0 flex-1 basis-0">
                    <Typography variant="p" className="font-semibold text-muted-foreground">
                      {v.name}
                    </Typography>
                    <Typography
                      variant="p"
                      className="my-3 line-clamp-2 w-full font-medium text-gray-900 dark:text-gray-100"
                    >
                      {v.description}
                    </Typography>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </a.div>
  )
}

interface Props {
  projects: Record<string, Item[]>
  pins: Item[]
}

const Page: NextPage<Props> = (props: Props) => {
  return (
    <Layout>
      <SEO title="JiangWeixian's Projects" />
      <Nav />
      <Pins items={props.pins} />
      <div className="my-6 w-full px-8 md:container md:my-12">
        <SponsorLink />
      </div>
      <div className="relative flex w-full flex-col gap-4 px-8 md:container">
        {Object.entries(props.projects).map(([year, items]) => {
          return <Section key={year} year={year} items={items} />
        })}
      </div>
      <Footer />
    </Layout>
  )
}

export default Page
