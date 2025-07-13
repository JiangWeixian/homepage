import { cva } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils'

import type { VariantProps } from 'class-variance-authority'

const linkVariants = cva(
  'cursor-pointer text-primary transition-colors duration-200',
  {
    variants: {
      animation: {
        default: '',
        reverse: 'hover:opacity-80',
      },
    },
    defaultVariants: {
      animation: 'default',
    },
  },
)

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
  VariantProps<typeof linkVariants> {
  animation?: 'default' | 'reverse'
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, animation, children, ...props }, ref) => {
    return (
      <a
        className={cn(linkVariants({ animation }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </a>
    )
  },
)
Link.displayName = 'Link'

export { Link, linkVariants }
