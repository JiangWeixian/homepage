import { cva } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils'

import type { VariantProps } from 'class-variance-authority'

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 text-base font-semibold tracking-tight',
      p: 'leading-7',
      span: 'text-sm',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    weight: {
      thin: 'font-thin',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      default: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-muted-foreground',
      tertiary: 'text-muted-foreground/80',
      quaternary: 'text-muted-foreground/60',
      muted: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'p',
    color: 'default',
  },
})

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof typographyVariants> {
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  // Legacy props for compatibility with Mayumi
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  h5?: boolean
  h6?: boolean
  p?: boolean
  span?: boolean
  type?: 'primary' | 'quaternary' | 'secondary' | 'tertiary'
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, size, weight, color, as, h1, h2, h3, h4, h5, h6, p, span, type, ...props }, ref) => {
    // Handle legacy props
    let elementType: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' = as || 'div'
    let computedVariant = variant

    if (h1) {
      elementType = 'h1'
      computedVariant = 'h1'
    } else if (h2) {
      elementType = 'h2'
      computedVariant = 'h2'
    } else if (h3) {
      elementType = 'h3'
      computedVariant = 'h3'
    } else if (h4) {
      elementType = 'h4'
      computedVariant = 'h4'
    } else if (h5) {
      elementType = 'h5'
      computedVariant = 'h5'
    } else if (h6) {
      elementType = 'h6'
      computedVariant = 'h6'
    } else if (p) {
      elementType = 'p'
      computedVariant = 'p'
    } else if (span) {
      elementType = 'span'
      computedVariant = 'span'
    }

    // Handle legacy color prop
    let computedColor = color
    if (type === 'secondary') {
      computedColor = 'secondary'
    }
    if (type === 'tertiary') {
      computedColor = 'tertiary'
    }
    if (type === 'quaternary') {
      computedColor = 'quaternary'
    }

    const Element = elementType

    return (
      <Element
        className={cn(typographyVariants({ variant: computedVariant, size, weight, color: computedColor }), className)}
        ref={ref as any}
        {...props}
      />
    )
  },
)
Typography.displayName = 'Typography'

export { Typography, typographyVariants }
