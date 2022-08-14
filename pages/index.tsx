/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import Image from 'next/image'
import { Text } from 'mayumi/text'
import { Link } from 'mayumi/link'
import { styled } from 'mayumi/theme'
import { Atropos } from 'atropos/react'
import 'atropos/css'

import { Layout, Footer, Nav } from '~/components/Layout'

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
      <img data-atropos-offset="-0.5" src="/atrops/hacking-room.png" alt="hacking-room" />
      <img data-atropos-offset="0" src="/atrops/tube.png" alt="hacking-tube" />
    </Atropos>
  )
}

const Home: NextPage = () => {
  return (
    <Layout>
      <Nav displayTabs={true} ghost={true} />
      {/* set negative margin top: fit height of nav in layout */}
      <div className="grid grid-cols-12 gap-4 w-screen h-screen -mt-12">
        <div className="left col-start-2 col-end-7 h-full flex items-center">
          <Hacking />
        </div>
        {/* description */}
        <SelfIntroduction className="right col-start-7 col-end-12 h-full flex items-center">
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
