import matter from 'gray-matter'
import { IssueMeta } from '~/types'

export const parseMeta = (body: string) => {
  const meta = matter(body, { delimiters: ['<!--', '-->'] })
  return {
    ...meta,
    data: meta.data as IssueMeta
  }
}

