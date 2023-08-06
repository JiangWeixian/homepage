import matter from 'gray-matter'
import { isEmpty } from 'lodash'
import type { IssueMeta } from '~/types'

export const parseMeta = (body: string) => {
  let meta = matter(body, { delimiters: ['<!--', '-->'] })
  if (!meta.data || isEmpty(meta.data)) {
    meta = matter(body)
  }
  return {
    ...meta,
    data: meta.data as IssueMeta
  }
}

