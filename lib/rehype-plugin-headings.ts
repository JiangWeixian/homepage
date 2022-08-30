import { hasProperty } from "hast-util-has-property"
import { headingRank } from "hast-util-heading-rank"
import { toString } from "hast-util-to-string"
import { visit } from "unist-util-visit"

export type Headings = {
  title: string
  id: string
}[]

type RehypeExtractHeadingsOptions = {
  rank?: number
  headings?: Headings
}

// refs: https://github.com/hashicorp/next-mdx-remote/issues/231
export const rehypePluginHeadings = ({ rank = 2, headings = [] }: RehypeExtractHeadingsOptions = {}) => {
  return (tree: any) => {
    visit(tree, "element", function (node) {
      if (headingRank(node) === rank && hasProperty(node, "id")) {
        headings.push({
          title: toString(node),
          id: node.properties.id.toString()
        })
      }
    })
  }
}
