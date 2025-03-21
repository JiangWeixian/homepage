// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  // auth revalidate user with github_token
  const secret = process.env.GITHUB_TOKEN
  const authtoken = req.headers['x-auth-token']

  try {
    if (authtoken === secret) {
      const issueNumber = req.query.issue_number
      // issue opened or edited
      console.log('[Next.js] Revalidating /issues')
      await res.revalidate('/issues')
      if (issueNumber) {
        console.log(`[Next.js] Revalidating /issues/id/${issueNumber}`)
        await res.revalidate(`/issues/id/${issueNumber}`)
      }
      return res.status(200).send('Success!')
    } else {
      return res.status(403).send('Forbidden')
    }
  } catch (e) {
    console.error('Internal Error', e)
    return res.status(500).send(e as unknown as string)
  }
}
