import { graphql } from '@octokit/graphql'
import { Issue } from '~/types'

const gql = String.raw

export const createGithubAPIClient = () => {
  const client = graphql.defaults({
    headers: {
      authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  })
  const owner = process.env.REPO_OWNER
  const name = process.env.REPO_NAME
  return {
    issues: async (
      after?: string,
      labels?: string[]
    ): Promise<{
      issues: Issue[]
      pageInfo: {
        endCursor: string
        hasNextPage: boolean
      }
    }> => {
      const response: any = await client(
        gql`
          query Issues($owner: String!, $name: String!, $after: String, $labels: [String!]) {
            repository(owner: $owner, name: $name) {
              issues(first: 10, after: $after, states: OPEN, filterBy: {labels: $labels}) {
                edges {
                  node {
                    id
                    number
                    title
                    body
                    createdAt
                    updatedAt
                    state
                    labels(last: 10) {
                      edges {
                        node {
                          id
                          color
                          description
                          name
                          createdAt
                          updatedAt
                        }
                      }
                    }
                  }
                }
                pageInfo {
                  endCursor
                  hasNextPage
                }
              }
            }
          }
        `,
        {
          owner,
          name,
          after,
          labels,
        },
      )
      const issues = response.repository.issues.edges
      const pageInfo = response.repository.issues.pageInfo
      return {
        issues: issues.map((issue: { node: any }) => issue.node),
        pageInfo,
      }
    },
    issue: async (number: number): Promise<Issue> => {
      const response: any = await client(
        gql`
          query($owner: String!, $name: String!, $number: Int!) {
            repository(owner: $owner, name: $name) {
              issue(number: $number) {
                id
                number
                title
                body
                createdAt
                updatedAt
                state
                labels(last: 10) {
                  edges {
                    node {
                      id
                      color
                      description
                      name
                      createdAt
                      updatedAt
                    }
                  }
                }
              }
            }
          }
        `,
        {
          owner,
          name,
          number,
        },
      )
      return response.repository.issue
  }
}}

export const fetchAllIssues = async (client: ReturnType<typeof createGithubAPIClient>, labels: ('issues' | 'issues-dev')[] = ['issues']) => {
  // only issue with label `issues` is a valid blog
  // label `issues` is top level category of issues
  const ISSUE_LABELS = labels
  // only fetch issues with label `issues` on list page
  // fetch all issues with label `issue` and `issue_dev`
  // if (process.env.__DEV__ || process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' || process.env.NEXT_PUBLIC_VERCEL_ENV === 'development') {
  //   ISSUE_LABELS.push('issues-dev')
  // }
  
  let allIssues: Issue[] = []
  let after: string | undefined = undefined
  while (true) {
    const { issues, pageInfo }: { issues: Issue[]; pageInfo: { hasNextPage: boolean; endCursor?: string } } = await client.issues(after, ISSUE_LABELS)
    allIssues = allIssues.concat(issues)
    
    if (!pageInfo.hasNextPage) {
      break
    }
    after = pageInfo.endCursor
  }
  
  return allIssues
}
