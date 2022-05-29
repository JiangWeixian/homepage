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
    ): Promise<{
      issues: Issue[]
      pageInfo: {
        endCursor: string
        hasNextPage: boolean
      }
    }> => {
      const response: any = await client(
        gql`
          query Issues($owner: String!, $name: String!, $after: String) {
            repository(owner: $owner, name: $name) {
              issues(first: 10, after: $after, states: OPEN) {
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
