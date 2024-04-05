import { TOC } from '@mayumi-org/toc'
import rehypeShiki from '@stefanprobst/rehype-shiki'
import { Link } from 'mayumi/link'
import { Text } from 'mayumi/text'
import { useRouter } from 'next/router'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGFM from 'remark-gfm'
import { remarkRefinedGithub } from 'remark-plugin-refined-github'

import ArrowLeft from '~/components/Icons/ArrowLeft.svg'
import { Image, ImageContainer } from '~/components/ImageContainer'
import {
  Footer,
  Layout,
  Nav,
} from '~/components/Layout'
import { SEO } from '~/components/SEO'
import { createGithubAPIClient, fetchAllIssues } from '~/lib/github'
import { parseMeta } from '~/lib/matter'
import { rehypePluginHeadings } from '~/lib/rehype-plugin-headings'
import { format } from '~/lib/time'

import type { Headings } from '~/lib/rehype-plugin-headings'
import type { Issue, IssueMeta } from '~/types'
import type { GetStaticProps, NextPage } from 'next'
import type { MDXRemoteProps } from 'next-mdx-remote'

export async function getStaticPaths() {
  console.log('[Next.js] Running getStaticPaths for issue page')
  const client = createGithubAPIClient()
  const issues = await fetchAllIssues(client)
  return {
    paths: issues.map(item => ({ params: { id: item.number.toString() } })),
    fallback: 'blocking',
  }
}

const getHighlighter = async () => {
  const shiki = await import('shiki')
  return shiki.getHighlighter({ theme: 'github-dark' })
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(`[Next.js] Running getStaticProps for /${params!.id}`)
  const id = params!.id as string
  const client = createGithubAPIClient()
  const issue = await client.issue(Number(id))

  const meta = parseMeta(issue.body)

  const headings: Headings = []

  const mdxSource = await serialize(meta.content, {
    mdxOptions: {
      format: 'mdx',
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        [rehypePluginHeadings, { rank: 2, headings }],
        [rehypeShiki, { highlighter: await getHighlighter() }],
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

interface StackblitzProps {
  src: string
}

const components: MDXRemoteProps['components'] = {
  Stackblitz(props: StackblitzProps) {
    return (
      <iframe
        data-testid="stackblitz"
        height={500}
        width="100%"
        scrolling="no"
        src={props.src}
        frameBorder="no"
      />
    )
  },
  img(props) {
    // next/image src staticimport not compatiable
    return <Image {...(props as any)} fallbackImgElement="raw" />
  },
}

interface PageProps {
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
      <div className="grid w-full p-8 md:grid-cols-12 md:gap-8 md:p-0">
        {/* back */}
        <div className="flex items-start md:col-start-2 md:col-end-3 md:justify-end">
          <Link
            animation="reverse"
            onClick={() => router.back()}
            className="mt-1 flex items-center justify-start gap-1 pb-8 md:pb-0 md:pt-24"
          >
            <ArrowLeft />
            <span>Back</span>
          </Link>
        </div>
        {/* main */}
        <div className="w-full md:col-start-4 md:col-end-10">
          <div className="pb-8 md:pt-24">
            <Text className="pb-2" h2={true}>
              {issue.title}
            </Text>
            <Text size="sm" className="pb-16" type="quaternary" p={true}>
              <time>{format(issue.createdAt)}</time>
            </Text>
            <ImageContainer className="blog-cover relative my-8 block aspect-video w-full">
              <Image number={issue.number} src={meta.cover} alt={issue.title} />
            </ImageContainer>
            <div className="issue prose max-w-7xl dark:prose-invert">
              <MDXRemote {...issue.source} components={components} />
            </div>
          </div>
        </div>
        {/* toc */}
        <div className="col-start-10 col-end-13 mt-1 hidden pt-24 md:block">
          <TOC type="dot" className="sticky top-20" headings={headings} />
        </div>
      </div>
      <Footer />
    </Layout>
  )
}

// refs: https://github.com/vercel/next.js/issues/34246
export const config = {
  unstable_includeFiles: ['node_modules/shiki/**/*.+(js|json)'],
}

export default Page
