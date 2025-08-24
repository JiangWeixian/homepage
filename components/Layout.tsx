import { cva } from 'class-variance-authority'
import Link from 'next/link'

import Github from '~/components/Icons/Github.svg'
import Twitter from '~/components/Icons/Twitter.svg'
import { Link as UILink } from '~/components/ui/link'
import { Typography } from '~/components/ui/typography'
import { cn } from '~/lib/utils'

export const Layout = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <main
      className={cn(
        'min-h-screen bg-black text-foreground flex flex-col items-center p-0 overflow-visible',
        className,
      )}
      {...props}
    >
      {children}
    </main>
  )
}

interface NavProps {
  displayTabs?: boolean
  ghost?: boolean
}

const navVariants = cva(
  'blog-nav sticky top-0 z-20 flex w-full items-center gap-8 px-8 py-4 font-semibold backdrop-blur-md md:px-36',
  {
    variants: {
      ghost: {
        true: '',
        false: 'border-b border-muted-foreground/20',
      },
      displayTabs: {
        true: 'justify-end [&_.signature]:hidden',
        false: '',
      },
    },
    defaultVariants: {
      ghost: false,
      displayTabs: false,
    },
  },
)

export const Nav = (props: NavProps) => {
  return (
    <nav
      className={cn(
        navVariants({ ghost: props.ghost, displayTabs: props.displayTabs }),
        'bg-black/60',
      )}
    >
      <Typography className="signature" h6={true}>
        <Link href="/">JiangWeixian</Link>
      </Typography>
      {props.displayTabs && (
        <>
          <Link href="/issues">
            <UILink animation="reverse">
              <Typography weight="semibold" type="quaternary">
                Issues
              </Typography>
            </UILink>
          </Link>
          <Link href="/projects">
            <UILink animation="reverse">
              <Typography weight="semibold" type="quaternary">
                Projects
              </Typography>
            </UILink>
          </Link>
          <Link href="/readlist">
            <UILink animation="reverse">
              <Typography weight="semibold" type="quaternary">
                Readlist
              </Typography>
            </UILink>
          </Link>
        </>
      )}
    </nav>
  )
}

export const Footer = () => {
  return (
    <footer className="relative z-10 mt-8 w-full border-t border-muted-foreground/20 bg-muted/20 p-8 md:px-36 md:py-8">
      <div className="grid grid-cols-1 2xl:grid-cols-4">
        <div className="flex flex-col gap-12">
          <div className="relative flex flex-col items-start md:flex-row md:items-center">
            <Typography className="signature font-thin" h6={true}>
              JiangWeixian
            </Typography>
            <Typography className="relative top-1 hidden italic md:block" p={true} type="tertiary">
              &nbsp;•&nbsp;
            </Typography>
            <Typography className="relative top-1 italic" p={true} type="tertiary">
              A Frontend Developer
            </Typography>
          </div>
          <div className="flex gap-4">
            <Link href="https://github.com/JiangWeixian">
              <div className="h-4 w-4 cursor-pointer fill-muted-foreground transition-colors hover:fill-foreground">
                <Twitter />
              </div>
            </Link>
            <Link href="https://twitter.com/JiangWeixian">
              <div className="h-4 w-4 cursor-pointer fill-muted-foreground transition-colors hover:fill-foreground">
                <Github />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
