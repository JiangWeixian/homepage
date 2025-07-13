import React from "react"
import { cn } from "~/lib/utils"
import { Typography } from "./typography"

interface Heading {
  depth: number
  text: string
  slug: string
}

interface TOCProps {
  headings: Heading[]
  className?: string
}

export const TOC: React.FC<TOCProps> = ({ headings, className }) => {
  if (!headings || headings.length === 0) {
    return null
  }

  return (
    <nav className={cn("space-y-2", className)}>
      <Typography variant="h6" className="font-semibold mb-4">
        Table of Contents
      </Typography>
      <ul className="space-y-1">
        {headings.map((heading, index) => (
          <li key={index} style={{ marginLeft: `${(heading.depth - 1) * 16}px` }}>
            <a
              href={`#${heading.slug}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}