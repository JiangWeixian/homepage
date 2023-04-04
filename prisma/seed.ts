import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const articles: Prisma.ArticleCreateInput[] = [
  {
    title: 'Join the Prisma Slack',
    url: 'https://github.com',
  },
  {
    title: 'Join the Prisma Slack',
    url: 'https://slack.prisma.io',
  },
  {
    title: 'Follow Prisma on Twitter',
    url: 'https://www.twitter.com/prisma',
  },
  {
    title: 'Ask a question about Prisma on GitHub',
    url: 'https://www.github.com/prisma/prisma/discussions',
  },
]

async function main() {
  console.log('Start seeding ...')
  for (const u of articles) {
    const article = await prisma.article.create({
      data: u,
    })
    console.log(`Created article with id: ${article.id}`)
  }
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
