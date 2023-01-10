import type { NextPage } from 'next'
import { Text } from 'mayumi/text'
import { useSpring, useSprings, a, config, to as interpolate } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import { Icon } from 'mayumi/icons'
import { useEffect, useState } from 'react'
import { Box as MayumiBox } from 'mayumi/box'
import { Link } from 'mayumi/link'

import { Image, ImageContainer } from '~/components/ImageContainer'
import { SEO } from '~/components/SEO'
import { Nav, Layout, Footer } from '~/components/Layout'
import Vite from '~/components/Icons/Vite.svg'
import Webpack from '~/components/Icons/Webpack.svg'
import Node from '~/components/Icons/Node.svg'
import Rollup from '~/components/Icons/Rollup.svg'
import Babel from '~/components/Icons/Babel.svg'
import VSCode from '~/components/Icons/VSCode.svg'
import Typescript from '~/components/Icons/Typescript.svg'
import { social } from '~/utils/constants'

const Box = a(MayumiBox)

type Item = {
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
  const projects = (await import('~/assets/projects.json').then((res) => res.default)) as Record<
    string,
    Item[]
  >
  const pins = Object.values(projects).reduce((acc, cur) => {
    return acc.concat(cur.filter((v) => v.pin))
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

const Card = ({ item }: { item: Item }) => {
  const [isHover, hover] = useState(false)
  const { ty } = useSpring({
    ty: isHover ? '0%' : '100%',
  })
  return (
    <div className="aspect-square bg-slate-900" onMouseEnter={() => hover(true)} onMouseLeave={() => hover(false)}>
      <Image alt={item.name} src={item.image!} style={{ aspectRatio: '1/1' }} />
      <Box
        bordered={false}
        css={{ glass: '$4' }}
        style={{ transform: ty.to((v) => `translateY(${v})`) }}
        className="absolute bottom-0 left-0 w-full rounded-none"
      >
        <Text p={true} weight="bold" type="secondary" size="xs" className="line-clamp-2">
          {item.description}
        </Text>
      </Box>
    </div>
  )
}

const Pins = ({ items }: { items: Item[] }) => {
  const [pins] = useSprings(items.length, (i) => ({
    ...to(i),
    from: from(i),
  }))
  return (
    // TODO: w, h for debug
    <div className="flex px-4 md:mt-12 items-center justify-center w-full h-40 md:h-80">
      <div className="relative container mx-auto h-full rounded-lg shadow">
        {pins.map(({ x, y, rot, scale, opacity }, i) => (
          <a.div
            className="absolute will-change-transform flex items-center justify-center w-[100px] md:w-[200px]"
            key={i}
            style={{ x, y, opacity }}
          >
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <a.div
              className="rounded-lg shadow-lg relative overflow-hidden w-full h-full cursor-pointer hover:shadow-2xl"
              style={{
                transform: interpolate([rot, scale], trans),
              }}
              onClick={() => window.open(items[i].url)}
            >
              <Card item={items[i]} />
            </a.div>
          </a.div>
        ))}
      </div>
    </div>
  )
}

type SectionProps = {
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
  }, [inView, year])
  return (
    <a.div
      style={styles}
      className="flex flex-col md:grid md:grid-cols-12 justify-between relative"
      ref={ref}
    >
      <Text className="font-eb md:col-start-1 md:col-end-3" type="secondary" h2={true} size="lg">
        {year}
      </Text>
      <div className="flex flex-col gap-4 md:col-start-6 md:col-end-13">
        {items
          .filter((v) => v.type === 'major')
          .map((v) => {
            return (
              <div key={v.name}>
                <Text p={true} weight="medium" className="my-3 text-gray-900 dark:text-gray-100">
                  <Text
                    span={true}
                    type="quaternary"
                    weight="semibold"
                    className="inline-block cursor-pointer uppercase"
                    onClick={() => window.open(v.url)}
                  >
                    {v.name}&nbsp;&nbsp; - &nbsp;&nbsp;
                  </Text>
                  {v.description}
                </Text>
                {v.image && (
                  <ImageContainer className="rounded-md shadow overflow-hidden w-full">
                    <Image alt={v.name} src={v.image} />
                  </ImageContainer>
                )}
              </div>
            )
          })}
        {items.filter((v) => v.type === 'tiny').length !== 0 && (
          <Text type="quaternary" h3={true} weight="semibold" size="sm">
            Tiny Projects
          </Text>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items
            .filter((v) => v.type === 'tiny')
            .map((v) => {
              return (
                <div
                  key={v.name}
                  className="inline-flex items-center gap-8 cursor-pointer rounded p-2 opacity-60 hover:opacity-90"
                  onClick={() => window.open(v.url)}
                >
                  {v.icon && (
                    <Icon
                      className="flex-0"
                      css={{ w: '$8', h: '$8', fill: '$secondaryLabelColor', cursor: 'pointer' }}
                    >
                      {icons[v.icon as keyof typeof icons]()}
                    </Icon>
                  )}
                  <div className="flex-1 basis-0 w-0">
                    <Text p={true} type="quaternary" weight="semibold">
                      {v.name}
                    </Text>
                    <Text
                      p={true}
                      weight="medium"
                      className="w-full my-3 text-gray-900 dark:text-gray-100 line-clamp-2"
                    >
                      {v.description}
                    </Text>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </a.div>
  )
}

type Props = {
  projects: Record<string, Item[]>
  pins: Item[]
}

const Page: NextPage<Props> = (props: Props) => {
  return (
    <Layout>
      <SEO title="JiangWeixian's Projects" />
      <Nav />
      <Pins items={props.pins} />
      <div className="w-full md:container my-6 px-8 md:my-12">
        <Text
          p={true}
          type="quaternary"
          size="sm"
          className="w-fit underline decoration-dotted underline-offset-4"
        >
          💖 Sponsoring me on{' '}
          <Text weight="semibold" span={true}>
            <Link href={social.sponsor} title="sponsor">
              Github Sponsor
            </Link>
          </Text>
          .
        </Text>
      </div>
      <div className="flex flex-col gap-4 px-8 w-full md:container relative">
        {Object.entries(props.projects).map(([year, items]) => {
          return <Section key={year} year={year} items={items} />
        })}
      </div>
      <Footer />
    </Layout>
  )
}

export default Page
