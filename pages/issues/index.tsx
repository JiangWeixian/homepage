import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { Text } from 'mayumi/text'
import { Menu } from 'mayumi/menu'
import Head from 'next/head'

import { Issue } from '~/types'
import { Layout } from '~/components/Layout'
import { createGithubAPIClient, fetchAllIssues } from '~/lib/github'

export const getStaticProps: GetStaticProps = async () => {
  console.log(`[Next.js] Running getStaticProps for issue list`)
  const client = createGithubAPIClient()

  const issues = await fetchAllIssues(client)

  return {
    props: {
      issues,
    },
  }
}

type PageProps = {
  issues: Issue[]
}

const Page: NextPage<PageProps> = ({ issues }) => {
  return (
    <Layout>
      <Head>
        <title>JiangWeixian</title>
      </Head>
      <nav className="blog-nav">
        <Text p={true} weight="bold">
          J WX&apos;s
        </Text>
      </nav>
      <div className="container max-w-screen-xl">
        <div className="pt-24 mx-36 h-full">
          <Text css={{ px: '$7' }} h4={true} weight="bold">
            issues
          </Text>
          <Menu ghost={true} size="lg" css={{ w: '$full' }}>
            {issues?.map((v) => {
              return (
                <Menu.Item key={v.number}>
                  <Link href="/issues/id/[id]" as={`/issues/id/${v.number}`} passHref={true}>
                    <div>
                      <Text p={true} size="sm" weight="bold">
                        {v.title}
                      </Text>
                      {/* TODO: how to display issue short description */}
                      <Text p={true} size="sm" type="secondary">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </Text>
                    </div>
                  </Link>
                </Menu.Item>
              )
            }) || <></>}
          </Menu>
        </div>
      </div>
    </Layout>
  )
}

export default Page
