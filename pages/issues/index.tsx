import type { GetStaticProps, NextPage } from 'next'
import { Text } from 'mayumi/text'
import { Separator } from 'mayumi/separator'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { SEO } from '~/components/SEO'
import { Issue, IssueMeta } from '~/types'
import { Layout, Footer, Nav } from '~/components/Layout'
import { ImageContainer } from '~/components/ImageContainer'
import { createGithubAPIClient, fetchAllIssues } from '~/lib/github'
import { parseMeta } from '~/lib/matter'
import { format } from '~/lib/time'

export const getStaticProps: GetStaticProps = async () => {
  console.log(`[Next.js] Running getStaticProps for issue list`)
  const client = createGithubAPIClient()

  const issues = await fetchAllIssues(client)

  return {
    props: {
      issues: issues.map((issue) => {
        return {
          meta: parseMeta(issue.body).data,
          issue,
        }
      }),
    },
  }
}

type ListItem = { issue: Issue; meta: IssueMeta }

type PageProps = {
  issues: ListItem[]
}

type CardProps = {
  issue: ListItem
}

const Card = (props: CardProps) => {
  const router = useRouter()
  return (
    <div
      className="cursor-pointer"
      onClick={() => router.push('/issues/id/[id]', `/issues/id/${props.issue.issue.number}`)}
    >
      <ImageContainer>
        <Image
          src={props.issue.meta.cover}
          alt={props.issue.issue.title}
          objectFit="cover"
          layout="fill"
        />
      </ImageContainer>
      <Text className="my-4" h3={true}>
        {props.issue.issue.title}
      </Text>
      <Text className="my-2" p={true}>
        {props.issue.meta.description}
      </Text>
      <Text size="sm" type="quaternary">
        <time>{format(props.issue.issue.createdAt)}</time>
      </Text>
    </div>
  )
}

const Page: NextPage<PageProps> = ({ issues }) => {
  return (
    <Layout>
      {/* TODO: add subscribe */}
      <SEO title="JiangWeixian's issues" />
      <Nav />
      <div className="container max-w-screen-xl min-h-screen h-fit">
        <div className="pt-8 mx-36 h-full">
          <div className="flex items-center mb-8">
            <Text h4={true} size="sm" weight="bold">
              Issues
            </Text>
            <Separator css={{ h: '$4' }} type="vertical" />
            <Text p={true} size="sm" type="quaternary">
              Create something with love ♥️
            </Text>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {issues.map((issue) => {
              return <Card issue={issue} key={issue.issue.number} />
            })}
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  )
}

export default Page
