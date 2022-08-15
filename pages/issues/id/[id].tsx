import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { Text } from 'mayumi/text'
import { Link } from 'mayumi/link'
import { useRouter } from 'next/router'

import { Issue, IssueMeta } from '~/types'
import { Layout, Footer, Nav } from '~/components/Layout'
import { ImageContainer } from '~/components/ImageContainer'
import ArrowLeft from '~/components/Icons/ArrowLeft.svg'
import { SEO } from '~/components/SEO'
import { createGithubAPIClient, fetchAllIssues } from '~/lib/github'
import { parseMeta } from '~/lib/matter'
import { format } from '~/lib/time'

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

const Page: NextPage<PageProps> = ({ issue, meta }) => {
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
      <div className="flex items-start">
        <Link
          animation="reverse"
          onClick={() => router.back()}
          className="pt-24 mt-1 flex justify-start items-center gap-1"
        >
          <ArrowLeft />
          <span>Back</span>
        </Link>
        <div className="container max-w-screen-lg">
          <div className="mx-36 pt-24 pb-8">
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
      </div>
      <Footer />
    </Layout>
  )
}

export default Page
