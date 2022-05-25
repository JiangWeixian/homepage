import type { GetStaticProps, NextPage } from 'next'
import { createGithubAPIClient } from '~/lib/github'
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

  return {
    props: {
      issue,
    },
  }
}

type PageProps = {
  issue: Issue
}

const Page: NextPage<PageProps> = ({ issue }) => {
  console.log(issue)
  return <div>issue</div>
}

export default Page
