import type { NextPage } from 'next'
import Image from 'next/image'
import { Layout } from '~/components/Layout'
import { ImageContainer } from '~/components/ImageContainer'

const social = {
  github: 'https://github.com/JiangWeixian',
  jike: 'https://web.okjike.com/me',
}

// TODO: replace with project url in site
const project = 'https://github.com/JiangWeixian'

const Home: NextPage = () => {
  return (
    <Layout>
      <ImageContainer
        css={{
          '@desktop': {
            width: '640px',
          },
          aspect: 'square',
        }}
      >
        <Image src="/hacking-room.png" alt="hacking-room" objectFit="cover" layout="fill" />
      </ImageContainer>
      <section>
        {/* description */}
        <Image src="/avatar.png" width="24" height="24" alt="JiangWeixian" />
        <h1>JiangWeixian</h1>
        <div>
          <p>
            Hi, I&aposm JiangWeixian. A Front-end developer, dreaming to be a full-time opensource
            developer.
          </p>
          <p>
            Execting to make my ideas come true, You can found my projects list{' '}
            <a href={project} title="project">
              here
            </a>
            . Glad to hear these tools to improve your develop experience and make your life easier.
          </p>
          <p>
            Find me on{' '}
            <a href={social.github} title="github">
              Github
            </a>
            ,{' '}
            <a href={social.jike} title="jike">
              JIKE
            </a>
          </p>
          <p>
            If you like my works, consider sponsoring me on <a>Github Sponsor</a>
          </p>
        </div>
      </section>
    </Layout>
  )
}

export default Home
