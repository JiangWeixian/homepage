import { useRouter } from 'next/router'

import { Image, ImageContainer } from '~/components/ImageContainer'
import {
  Footer,
  Layout,
  Nav,
} from '~/components/Layout'
import { SEO } from '~/components/SEO'
import { Separator } from '~/components/ui/separator'
import { Typography } from '~/components/ui/typography'
import { createGithubAPIClient, fetchAllIssues } from '~/lib/github'
import { parseMeta } from '~/lib/matter'
import { format } from '~/lib/time'

import type { Issue, IssueMeta } from '~/types'
import type { GetStaticProps, NextPage } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  console.log('[Next.js] Running getStaticProps for issue list')
  const client = createGithubAPIClient()
  const issues = await fetchAllIssues(client)
  console.log(issues)

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
      <Typography className="my-4" variant="h3">
        {props.issue.issue.title}
      </Typography>
      <Typography className="my-2" variant="p">
        {props.issue.meta.description}
      </Typography>
      <Typography className="text-sm text-muted-foreground opacity-80">
        <time>{format(props.issue.issue.createdAt)}</time>
      </Typography>
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
            <Typography variant="h4" className="text-sm font-bold">
              Issues
            </Typography>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Typography variant="p" className="text-sm text-muted-foreground">
              Create something with love ♥️
            </Typography>
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
