import type { NextPage } from 'next'
import Image from 'next/image'
import { Layout } from '~/components/Layout'
import { ImageContainer } from '~/components/ImageContainer'
import { Text } from 'mayumi/text'
import { Link } from 'mayumi/link'
import { styled } from 'mayumi/theme'

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

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="grid grid-cols-12 gap-4 w-screen h-screen">
        <div className="left col-start-2 col-end-8 h-full flex items-center">
          <div className="w-full">
            <ImageContainer
              css={{
                aspectRatio: '1 / 1',
              }}
            >
              <Image src="/hacking-room.png" alt="hacking-room" objectFit="cover" layout="fill" />
            </ImageContainer>
          </div>
        </div>
        {/* description */}
        <SelfIntroduction className="right col-start-8 col-end-12 h-full flex items-center">
          <div>
            <div className="flex items-center gap-4 mb-4">
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
              </Text>
            </div>
          </div>
        </SelfIntroduction>
      </div>
    </Layout>
  )
}

export default Home
