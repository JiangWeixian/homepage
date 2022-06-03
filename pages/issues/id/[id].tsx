import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { Text } from 'mayumi/text'
import dayjs from 'dayjs'
import Head from 'next/head'

import { Issue, IssueMeta } from '~/types'
import { Layout } from '~/components/Layout'
import { createGithubAPIClient, fetchAllIssues } from '~/lib/github'
import matter from 'gray-matter'
import { styled } from 'mayumi/theme'

export async function getStaticPaths() {
  console.log('[Next.js] Running getStaticPaths for issue page')
  const client = createGithubAPIClient()
  const issues = await fetchAllIssues(client)
  return {
    paths: issues.map((item) => ({ params: { id: item.number.toString() } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(`[Next.js] Running getStaticProps for /${params!.id}`)
  const id = params!.id as string
  const client = createGithubAPIClient()
  const issue = await client.issue(Number(id))

  const meta = matter(issue.body, { delimiters: ['<!--', '-->'] })

  const mdxSource = await serialize(meta.content, {
    mdxOptions: {
      remarkPlugins: [rehypeAutolinkHeadings, rehypeSlug],
    },
  })

  return {
    props: {
      meta: meta.data as IssueMeta,
      issue: {
        ...issue,
        source: mdxSource,
      },
    },
  }
}

type PageProps = {
  issue: Issue
  meta: IssueMeta
}

const ImageContainer = styled('div', {
  '&.blog-cover': {
    img: {
      rounded: '$lg',
      boxShadow: '$lg',
    },
  },
})

const Page: NextPage<PageProps> = ({ issue, meta }) => {
  return (
    <Layout>
      <Head>
        <title>{issue.title}</title>
      </Head>
      <nav className="blog-nav">
        <Text p={true} weight="bold">
          J WX&apos;s
        </Text>
      </nav>
      <div className="container max-w-screen-xl">
        <div className="mx-36">
          <Text className="pt-24 pb-2" h2={true}>
            {issue.title}
          </Text>
          <Text className="pb-16" type="quaternary" p={true}>
            <time>{dayjs(issue.createdAt).format('YYYY-MM-DD')}</time>
          </Text>
          <ImageContainer className="blog-cover my-8 relative w-full block aspect-video">
            <Image src={meta.cover} alt={issue.title} objectFit="cover" layout="fill" />
          </ImageContainer>
          <div className="max-w-7xl prose dark:prose-invert">
            <MDXRemote {...issue.source} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Page
