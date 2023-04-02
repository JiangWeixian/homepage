import type { Article } from '@prisma/client'
import type { NextPage } from 'next'
import { Text } from 'mayumi/text'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import clsx from 'clsx'

import { Nav, Layout, Footer } from '~/components/Layout'
import { SponsorLink } from '~/components/Sponsor'

dayjs.extend(advancedFormat)

interface ReadListProps {
  articles: Article[]
}

export const getStaticProps = async () => {
  const { prisma } = await import('lib/prisma')
  const articles = await prisma.article.findMany({
    orderBy: [
      {
        createdAt: 'desc'
      },
    ],
  })
  console.log(articles)
  return { props: { articles } }
}

const ReadList: NextPage<ReadListProps> = (props) => {
  return (
    <Layout>
      <Nav />
      {/* descriptions */}
      <div className="px-8 md:px-48 md:container">
        <Text p={true} className="text-xl mt-16 mb-8">
          Personal reading list of articles, podcast, and other things from the internet. Keep track of what I read and what I think about it. Hope this page will be useful for me and others.
        </Text>
        <SponsorLink />
      </div>
      <div className="grid auto-rows-max w-full min-h-screen gap-4 px-8 mt-8 md:px-48 md:container">
        {props.articles.map((article, index) => {
          return (
            <div key={article.url} className="cursor-pointer relative w-full pr-12 md:pr-16">
              <div className="flex text-left justify-between items-center relative w-full box-border">
                <div className="absolute bg-mayumi-gray-900 w-full h-[1px] top-1/2 translate-y-1/2 box-border z-0"></div>
                <Text className="bg-black truncate leading-8 max-w-[80%] transition-colors relative z-10 pr-2 text-mayumi-gray-1100 hover:text-mayumi-gray-1200">
                  <a href={article.url}>{article.title}</a>
                </Text>
                <Text span={true} suppressHydrationWarning={true} className="bg-black relative z-10 pl-2 text-mayumi-gray-900">{dayjs(article.createdAt).format('Do')}</Text>
              </div>
              {/* TODO: should display month on first element */}
              <div className={clsx(
                "absolute h-full -right-4 top-2 z-10 text-mayumi-gray-1100 rotate-90 origin-top-left",
                {
                  "hidden": index !== 0,
                },
              )}>{dayjs(article.createdAt).format('MMMM')}</div>
            </div>
          )
        })}
      </div>
      <Footer />
    </Layout>
  )
}

export default ReadList
