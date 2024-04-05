import type { NextApiRequest, NextApiResponse } from 'next'

// POST /api/readlists create record in schema articles
// Required fields in body: title, url, description
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const secret = process.env.GITHUB_TOKEN
  const authtoken = req.headers['x-auth-token']
  if (authtoken !== secret) {
    return res.status(403).end('x-auth-token required')
  }
  await res.revalidate('/readlist')
}
