export interface Issue {
  id: string
  number: string
  title: string
  body: string
  createdAt: string
  updatedAt: string
  url: string
  state: 'open' | 'state'
  labels: Label[]
  // inject on getStaticProps
  source: any
}

export interface Label {
  id: string
  color: string
  description: string
  name: string
  default: boolean
  createdAt: string
  updatedAt: string
}

/**
 * ---
 * description: string
 * conver: string
 * ---
 * content
 */
export interface IssueMeta {
  // issue short description
  description: string
  // issue cover image
  cover: string
}
