import {
  describe,
  expect,
  it,
} from 'vitest'

import { parseMeta } from '../lib/matter'

describe('parseMeta', () => {
  it('delimiters: ---', () => {
    const content = `---
cover: https://images.unsplash.com/photo-1521311593712-70a685389250
description: Tree shaking code via third npm package variables and plugins!
---
# title
    `
    const result = parseMeta(content)
    expect(result.data.cover).toBeDefined()
    expect(result.data.description).toBeDefined()
  })
  it('delimiters: <!--', () => {
    const content = `<!--
cover: https://images.unsplash.com/photo-1521311593712-70a685389250
description: Tree shaking code via third npm package variables and plugins!
-->
# title
    `
    const result = parseMeta(content)
    expect(result.data.cover).toBeDefined()
    expect(result.data.description).toBeDefined()
  })
})
