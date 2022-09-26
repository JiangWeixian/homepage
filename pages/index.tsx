/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import Image from 'next/image'
import { Text } from 'mayumi/text'
import { Link } from 'mayumi/link'
import { styled } from 'mayumi/theme'
import { Atropos } from 'atropos/react'
import 'atropos/css'

import { Layout, Footer, Nav } from '~/components/Layout'
import { SEO } from '~/components/SEO'

const social = {
  github: 'https://github.com/JiangWeixian',
  jike: 'https://web.okjike.com/me',
  sponsor: 'https://github.com/sponsors/JiangWeixian',
}

// TODO: replace with project url in site
const project = 'https://github.com/JiangWeixian'

const SelfIntroduction = styled('section', {
  '.mayumi-text:not(.signature)': {
    mb: '$4',
  },
})

const Hacking = () => {
  return (
    <Atropos
      className="atropos atropos-banner h-full"
      rotateXMax={5}
      rotateYMax={20}
      highlight={false}
      onEnter={() => console.log('enter')}
    >
      <div className="atropos-banner-spacer w-full h-full" />
      <img data-atropos-offset="-0.5" src="/atrops/2x/hacking-room.png" alt="hacking-room" />
      <img data-atropos-offset="0" src="/atrops/2x/tube.png" alt="hacking-tube" />
    </Atropos>
  )
}

const Home: NextPage = () => {
  return (
    <Layout>
      <SEO />
      <Nav displayTabs={true} />
      {/* set negative margin top: fit height of nav in layout */}
      <div className="grid w-screen h-screen md:h-screen md:-mt-12 md:p-0 md:gap-4 md:grid-cols-12">
        <div className="flex w-9/12 m-auto aspect-square items-center md:w-full md:left md:col-start-2 md:col-end-7 md:h-full">
          <Hacking />
        </div>
        {/* description */}
        <SelfIntroduction className="flex px-8 md:p-0 h-fit md:right md:col-start-7 md:col-end-12 md:h-full md:items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <Image src="/avatar.png" width="36" height="36" alt="JiangWeixian" />
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
                <Link href={project} title="project">
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
                If you like my works, consider sponsoring me on{' '}
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
