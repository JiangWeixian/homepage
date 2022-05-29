import type { GetStaticProps, NextPage } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { Text } from 'mayumi/text'
import dayjs from 'dayjs'

import { Issue } from '~/types'
import { Layout } from '~/components/Layout'
import { createGithubAPIClient } from '~/lib/github'

// TODO: get issues list with github api
export async function getStaticPaths() {
  console.log('[Next.js] Running getStaticPaths for issue page')
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(`[Next.js] Running getStaticProps for /${params!.id}`)
  const id = params!.id as string
  const client = createGithubAPIClient()
  const issue = await client.issue(Number(id))

  const mdxSource = await serialize(issue.body, {
    mdxOptions: {
      remarkPlugins: [rehypeAutolinkHeadings, rehypeSlug],
    },
  })

  return {
    props: {
      issue: {
        ...issue,
        source: mdxSource,
      },
    },
  }
}

type PageProps = {
  issue: Issue
}

const Page: NextPage<PageProps> = ({ issue }) => {
  return (
    <Layout>
      <nav className="blog-nav">
        <Text p={true} weight="bold">J WX&apos;s</Text>
      </nav>
      <div className="container max-w-screen-xl">
        <div className="mx-36">
          <Text className="pt-24 pb-2" h2={true}>
            {issue.title}
          </Text>
          <Text className="pb-16" type="quaternary" p={true}>
            <time>{dayjs(issue.createdAt).format('YYYY-MM-DD')}</time>
          </Text>
          <div className="max-w-7xl prose dark:prose-invert">
            <MDXRemote {...issue.source} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Page
