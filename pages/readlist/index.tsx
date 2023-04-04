import type { Article } from '@prisma/client'
import type { NextPage } from 'next'
import { Text } from 'mayumi/text'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import clsx from 'clsx'

import { Footer, Layout, Nav } from '~/components/Layout'
import { SponsorLink } from '~/components/Sponsor'
import { SEO } from '~/components/SEO'

dayjs.extend(advancedFormat)

interface ReadListProps {
  articles: Article[]
}

export const getStaticProps = async () => {
  const { prisma } = await import('lib/prisma')
  const articles = await prisma.article.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  })
  return { props: { articles } }
}

const ReadList: NextPage<ReadListProps> = (props) => {
  return (
    <Layout>
      <Nav />
      <SEO
        url="https://jwx.ink/readlist"
        title={`Readlist - ${props.articles[0].title}`}
        description={props.articles[0].description ?? ''}
      />
      {/* descriptions */}
      <div className="px-8 md:container md:px-48">
        <Text p={true} className="mb-8 mt-16 text-xl">
          Personal reading list of articles, podcast, and other things from the internet. Keep track of what I read and what I think about it. Hope this page will be useful for me and others.
        </Text>
        <SponsorLink />
      </div>
      <div className="mt-8 grid min-h-screen w-full auto-rows-max gap-4 px-8 md:container md:px-48">
        {props.articles.map((article) => {
          return (
            // yyyy-mm
            <div key={article.url} className={clsx('relative w-full cursor-pointer pr-12 md:pr-16', `year-${dayjs(article.createdAt).format('YYYY-MMMM').toLowerCase()}`)}>
              <div className="relative box-border flex w-full items-center justify-between text-left">
                <div className="absolute top-1/2 z-0 box-border h-[1px] w-full translate-y-1/2 bg-mayumi-gray-900"></div>
                <Text className="relative z-10 max-w-[80%] truncate bg-black pr-2 leading-8 text-mayumi-gray-1100 transition-colors hover:text-mayumi-gray-1200">
                  <a href={article.url}>{article.title}</a>
                </Text>
                <Text span={true} suppressHydrationWarning={true} className="relative z-10 bg-black pl-2 text-mayumi-gray-900">{dayjs(article.createdAt).format('Do')}</Text>
              </div>
              {/* Only first element will be display, css wroten in globals.css */}
              <div className={clsx(
                'month absolute -right-4 top-2 z-10 hidden h-full origin-top-left rotate-90 text-mayumi-gray-1100',
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
