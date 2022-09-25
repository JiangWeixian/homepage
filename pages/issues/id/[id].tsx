import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeSlug from 'rehype-slug'
import remarkGFM from 'remark-gfm'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeShiki from '@stefanprobst/rehype-shiki'
import { getHighlighter } from 'shiki'
import { remarkRefinedGithub } from 'remark-plugin-refined-github'
import { Text } from 'mayumi/text'
import { Link } from 'mayumi/link'
import { useRouter } from 'next/router'
import { TOC } from '@mayumi-org/toc'

import { Issue, IssueMeta } from '~/types'
import { Layout, Footer, Nav } from '~/components/Layout'
import { ImageContainer } from '~/components/ImageContainer'
import ArrowLeft from '~/components/Icons/ArrowLeft.svg'
import { SEO } from '~/components/SEO'
import { createGithubAPIClient, fetchAllIssues } from '~/lib/github'
import { parseMeta } from '~/lib/matter'
import { format } from '~/lib/time'
import { rehypePluginHeadings, Headings } from '~/lib/rehype-plugin-headings'

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

  const meta = parseMeta(issue.body)
  const highlighter = await getHighlighter({ theme: 'github-dark' })

  const headings: Headings = []

  const mdxSource = await serialize(meta.content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        [rehypePluginHeadings, { rank: 2, headings }],
        [rehypeShiki, { highlighter }],
      ],
      remarkPlugins: [remarkGFM, remarkRefinedGithub],
    },
  })

  return {
    props: {
      meta: meta.data as IssueMeta,
      headings,
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
  headings: Headings
}

const Page: NextPage<PageProps> = ({ issue, meta, headings = [] }) => {
  const router = useRouter()
  return (
    <Layout>
      <SEO
        title={issue.title}
        description={meta.description}
        image={meta.cover}
        alt={meta.description}
      />
      <Nav />
      <div className="grid grid-cols-12 gap-8">
        {/* back */}
        <div className="col-start-2 col-end-3 flex items-start justify-end">
          <Link
            animation="reverse"
            onClick={() => router.back()}
            className="pt-24 mt-1 flex justify-start items-center gap-1"
          >
            <ArrowLeft />
            <span>Back</span>
          </Link>
        </div>
        {/* main */}
        <div className="col-start-4 col-end-10">
          <div className="pt-24 pb-8">
            <Text className="pb-2" h2={true}>
              {issue.title}
            </Text>
            <Text size="sm" className="pb-16" type="quaternary" p={true}>
              <time>{format(issue.createdAt)}</time>
            </Text>
            <ImageContainer className="blog-cover my-8 relative w-full block aspect-video">
              <Image src={meta.cover} alt={issue.title} objectFit="cover" layout="fill" />
            </ImageContainer>
            <div className="max-w-7xl prose dark:prose-invert">
              <MDXRemote {...issue.source} />
            </div>
          </div>
        </div>
        {/* toc */}
        <div className="col-start-10 col-end-13 pt-24 mt-1">
          <TOC type="dot" className="sticky top-20" headings={headings} />
        </div>
      </div>
      <Footer />
    </Layout>
  )
}

export default Page
