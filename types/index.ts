export type Issue = {
  id: string
  number: string
  title: string
  body: string
  createdAt: string
  updatedAt: string
  url: string
  state: 'open' | 'state'
  labels: Label[]
}

export type Label = {
  id: string
  color: string
  description: string
  name: string
  default: boolean
  createdAt: string
  updatedAt: string
}