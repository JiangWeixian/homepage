import { Separator } from 'mayumi/separator'
import { Text } from 'mayumi/text'
import { useRouter } from 'next/router'

import { Image, ImageContainer } from '~/components/ImageContainer'
import {
  Footer,
  Layout,
  Nav,
} from '~/components/Layout'
import { SEO } from '~/components/SEO'
import { createGithubAPIClient, fetchAllIssues } from '~/lib/github'
import { parseMeta } from '~/lib/matter'
import { format } from '~/lib/time'

import type { Issue, IssueMeta } from '~/types'
import type { GetStaticProps, NextPage } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  console.log('[Next.js] Running getStaticProps for issue list')
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

interface ListItem {
  issue: Issue
  meta: IssueMeta
}

interface PageProps {
  issues: ListItem[]
}

interface CardProps {
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
        <Image number={props.issue.issue.number} src={props.issue.meta.cover} alt={props.issue.issue.title} />
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
      <SEO title="JiangWeixian's Blog" />
      <Nav />
      <div className="container h-fit min-h-screen max-w-screen-xl">
        <div className="h-full px-8 pt-8 md:px-36">
          <div className="mb-8 flex items-center">
            <Text h4={true} size="sm" weight="bold">
              Issues
            </Text>
            <Separator css={{ h: '$4' }} type="vertical" />
            <Text p={true} size="sm" type="quaternary">
              Create something with love ♥️
            </Text>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
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
