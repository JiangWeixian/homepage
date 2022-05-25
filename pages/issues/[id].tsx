import type { GetStaticProps, NextPage } from 'next'
import { createGithubAPIClient } from '~/lib/github'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { Issue } from '~/types'

import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

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
  console.log(issue)
  return (
    <div className='prose dark:prose-invert'>
      <MDXRemote {...issue.source} />
    </div>
  )
}

export default Page
