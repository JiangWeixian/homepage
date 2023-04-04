import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

// POST /api/readlists create record in schema articles
// Required fields in body: title, url, description
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { title, url, description } = req.body
  const secret = process.env.GITHUB_TOKEN
  const authtoken = req.headers['x-auth-token']
  if (authtoken !== secret) {
    return res.status(403).end('x-auth-token required')
  }
  if (req.method === 'POST') {
    // create or update exit one
    const result = await prisma.article.upsert({
      update: {
        title,
        url,
        description,
      },
      create: {
        title,
        url,
        description,
      },
      where: {
        url,
      },
    })
    await res.revalidate('/readlist')
    return res.status(200).json(result)
  }
  if (req.method === 'GET') {
    const result = await prisma.article.findMany({
      orderBy: [{
        createdAt: 'desc',
      }],
    })
    return res.status(200).json(result)
  }
  return res.status(405).end('Method Not Allowed')
}
