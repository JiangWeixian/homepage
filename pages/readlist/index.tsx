import clsx from 'clsx'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { Text } from 'mayumi/text'

import {
  Footer,
  Layout,
  Nav,
} from '~/components/Layout'
import { SEO } from '~/components/SEO'
import { SponsorLink } from '~/components/Sponsor'

import type { NextPage } from 'next'

dayjs.extend(advancedFormat)

interface Article {
  timestamp: number
  meta: {
    url: string
    title: string
    desc: string
  }
}

interface ReadListProps {
  articles: Article[]
}

export const getStaticProps = async () => {
  const articles = await import('~/assets/readlist.json').then(res => res.default)
  return { props: { articles } }
}

const ReadList: NextPage<ReadListProps> = (props) => {
  const records: Record<string, boolean> = {}
  return (
    <Layout>
      <Nav />
      <SEO
        url="https://jwx.ink/readlist"
        title="Readlists"
        description="Personal reading list of articles, podcast, and other things from the internet. Keep track of what I read and what I think about it. Hope this page will be useful for me and others."
      />
      {/* descriptions */}
      <div className="px-8 md:container md:px-48">
        <Text p={true} className="mb-8 mt-16 text-xl">
          Personal reading list of articles, podcast, and other things from the internet. Keep track of what I read and what I think about it. Hope this page will be useful for me and others.
        </Text>
        <SponsorLink />
      </div>
      <div className="mt-8 flex min-h-screen w-full auto-rows-max flex-col gap-4 px-8 md:container md:px-48">
        {props.articles.map((article) => {
          const m = dayjs(article.timestamp).format('YYYY MMM')
          const display = !records[m]
          records[m] = true
          return (
            // yyyy-mm
            <div key={article.meta.url} className={clsx('relative flex w-full cursor-pointer flex-row pr-12 md:pr-16', `year-${dayjs(article.timestamp).format('YYYY-MMMM').toLowerCase()}`)}>
              <div className="relative box-border flex w-full items-center justify-between text-left">
                <div className="absolute top-1/2 z-0 box-border h-[1px] w-full translate-y-1/2 bg-mayumi-gray-900"></div>
                <Text className="relative z-10 max-w-[80%] truncate bg-black pr-2 leading-8 text-mayumi-gray-1100 transition-colors hover:text-mayumi-gray-1200">
                  <a href={article.meta.url} title={article.meta.desc}>{article.meta.title}</a>
                </Text>
                <Text span={true} suppressHydrationWarning={true} className="relative z-10 bg-black pl-2 text-mayumi-gray-900">{dayjs(article.timestamp).format('Do')}</Text>
              </div>
              {/* Only first element will be display, css wroten in globals.css */}
              <div className={clsx(
                'month translate-1/2 absolute -right-8 top-16 z-10 -my-1 h-0 w-[100px] rotate-90 font-normal text-mayumi-gray-1100',
                { hidden: !display },
              )}
              >{m}
              </div>
            </div>
          )
        })}
      </div>
      <Footer />
    </Layout>
  )
}

export default ReadList
