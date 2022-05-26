import type { GetStaticProps, NextPage } from 'next'
import { createGithubAPIClient } from '~/lib/github'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { styled } from 'mayumi/theme'
import { Text } from 'mayumi/text'
import dayjs from 'dayjs'

import { Issue } from '~/types'

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

const StyeldLayout = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  '.issue-nav': {
    position: 'sticky',
    top: '0',
    glass: '8px',
    zIndex: '$20',
    py: '$4',
    px: '$6',
    w: '$full',
    fontWeight: '$semibold',
    borderBottom: '1px solid $quaternaryLabelColor',
  },
  '.issue-content': {
    maxWidth: '$screenXL',
  },
})

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyeldLayout>
      <nav className="issue-nav">
        <Text h4={true}>JiangWeixian&apos;s</Text>
      </nav>
      {children}
    </StyeldLayout>
  )
}

type PageProps = {
  issue: Issue
}

const Page: NextPage<PageProps> = ({ issue }) => {
  return (
    <Layout>
      <div className="container max-w-screen-xl h-screen">
        <div className="mx-36 py-4">
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
