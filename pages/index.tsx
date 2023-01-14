/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import NextImage from 'next/image'
import { Text } from 'mayumi/text'
import { Link } from 'mayumi/link'
import { styled } from 'mayumi/theme'
import { Atropos } from 'atropos/react'
import cx from 'clsx'
import Head from 'next/head'
import 'atropos/css'

import { Layout, Footer, Nav } from '~/components/Layout'
import { SEO } from '~/components/SEO'
import { social } from '~/utils/constants'
import { hackingBase64 } from '~/assets/placeholder'

const SelfIntroduction = styled('section', {
  '.mayumi-text:not(.signature)': {
    mb: '$4',
  },
})

const hackingRoomSrc = '/atrops/2x/hacking-room.png'
const tubeSrc = '/atrops/2x/tube.png'

const Hacking = () => {
  const [status, load] = useState({ hacking: false, tube: false })
  const hackingRef = useRef<HTMLImageElement>(null)
  const tubeRef = useRef<HTMLImageElement>(null)
  useEffect(() => {
    const hacking = new Image()
    const tube = new Image()
    hacking.src = hackingRoomSrc
    tube.src = tubeSrc
    hacking.onload = function (this) {
      load((state) => ({ ...state, hacking: true }))
      hackingRef.current!.src = hackingRoomSrc
    }
    tube.onload = function () {
      load((state) => ({ ...state, tube: true }))
      tubeRef.current!.src = tubeSrc
    }
  }, [hackingRef, tubeRef])
  const completed = status.hacking && status.tube
  return (
    <Atropos
      className="atropos atropos-banner h-full"
      rotateXMax={5}
      rotateYMax={20}
      highlight={false}
      onEnter={() => console.log('enter')}
    >
      <div className="atropos-banner-spacer w-full aspect-square" />
      <div
        className={cx(
          'filter blur-md transition-all duration-1000 ease-in-out absolute top-0 left-0 w-full h-full',
          { 'filter-none': completed },
        )}
      >
        <img
          // @ts-ignore - https://addyosmani.com/blog/fetch-priority/
          fetchpriority="high"
          data-atropos-offset="-0.5"
          data-src={hackingRoomSrc}
          src={hackingBase64}
          alt="hacking-room"
          ref={hackingRef}
        />
      </div>
      <div
        className={cx(
          'filter blur-md transition-all duration-1000 ease-in-out absolute top-0 left-0 w-full h-full',
          { 'filter-none': completed },
        )}
      >
        <img
          // @ts-ignore - https://addyosmani.com/blog/fetch-priority/
          fetchpriority="high"
          data-atropos-offset="0"
          data-src={tubeSrc}
          src={hackingBase64}
          alt="tube"
          ref={tubeRef}
        />
      </div>
    </Atropos>
  )
}

const Home: NextPage = () => {
  return (
    <Layout>
      <SEO />
      <Head>
        <link rel="preload" href={hackingRoomSrc} as="image" />
        <link rel="preload" href={tubeSrc} as="image" />
      </Head>
      <Nav displayTabs={true} />
      {/* set negative margin top: fit height of nav in layout */}
      <div className="grid w-full h-screen md:-mt-12 md:p-0 md:gap-4 md:grid-cols-12">
        <section className="flex w-9/12 m-auto aspect-square items-center md:w-full md:left md:col-start-2 md:col-end-7 md:h-full">
          <Hacking />
        </section>
        {/* description */}
        <SelfIntroduction className="flex px-8 md:p-0 h-fit md:right md:col-start-7 md:col-end-12 md:h-full md:items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <NextImage src="/avatar.png" width="36" height="36" alt="JiangWeixian" />
              <Text h1={true} className="signature" size="sm">
                JiangWeixian
              </Text>
            </div>
            <div>
              <Text p={true}>
                Hi, I&apos;m JiangWeixian. A Front-end developer, dreaming to be a full-time
                opensource developer.
              </Text>
              <Text p={true}>
                Execting to make my ideas come true, You can found my projects list{' '}
                <Link href="/projects" title="project">
                  here
                </Link>
                . Glad to hear these tools to improve your develop experience and make your life
                easier.
              </Text>
              <Text p={true}>
                Find me on{' '}
                <Link href={social.github} title="github">
                  Github
                </Link>
                ,{' '}
                <Link href={social.jike} title="jike">
                  JIKE
                </Link>
                .
              </Text>
              <Text p={true}>
                If you like my works, consider 💖 sponsoring me on{' '}
                <Link href={social.sponsor} title="sponsor">
                  Github Sponsor
                </Link>
                .
              </Text>
            </div>
          </div>
        </SelfIntroduction>
      </div>
      <Footer />
    </Layout>
  )
}

export default Home
