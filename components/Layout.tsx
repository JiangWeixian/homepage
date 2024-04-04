import { styled } from 'mayumi/theme'
import { Layout as MayumiLayout } from 'mayumi/layout'
import { Text } from 'mayumi/text'
import { Icon } from 'mayumi/icons'
import { Link as MayumiLink } from 'mayumi/link'

import Twitter from '~/components/Icons/Twitter.svg'
import Github from '~/components/Icons/Github.svg'
import Link from 'next/link'

export const Layout = styled(MayumiLayout.Main, {
  p: '$0',
  alignItems: 'center',
  backgroundColor: '$black',
  overflow: 'visible',
  '.blog-nav': {
    position: 'sticky',
    top: '0',
    glass: '8px',
    zIndex: '$20',
    w: '$full',
    fontWeight: '$semibold',
    backgroundColor: 'rgba(6, 6, 6, 0.6)',
  },
  '.mayumi-link': {
    fontWeight: '$normal',
  },
  '.issue-content': {
    maxWidth: '$screenXL',
  },
})

interface NavProps {
  displayTabs?: boolean
  ghost?: boolean
}

const StyledNav = styled('nav', {
  variants: {
    ghost: {
      true: {
        borderBottom: 'none',
      },
      false: {
        borderBottom: '1px solid $quaternaryLabelColor',
      },
    },
    // display issue tabs
    displayTabs: {
      true: {
        justifyContent: 'end',
        '.signature': {
          display: 'none',
        },
      },
    },
  },
  defaultVariants: {
    ghost: false,
  },
})

export const Nav = (props: NavProps) => {
  return (
    <StyledNav
      className="blog-nav flex items-center gap-8 px-8 py-4 md:px-36"
      ghost={props.ghost}
      displayTabs={props.displayTabs}
    >
      {/* <Image src="/avatar.png" width="24" height="24" alt="JiangWeixian" /> */}
      <Text className="signature" h6={true}>
        <Link href="/">JiangWeixian</Link>
      </Text>
      {props.displayTabs && (
        <>
          <Link href="/issues">
            <MayumiLink>
              <Text weight="semibold" type="quaternary">
                Issues
              </Text>
            </MayumiLink>
          </Link>
          <Link href="/projects">
            <MayumiLink>
              <Text weight="semibold" type="quaternary">
                Projects
              </Text>
            </MayumiLink>
          </Link>
          <Link href="/readlist">
            <MayumiLink>
              <Text weight="semibold" type="quaternary">
                Readlist
              </Text>
            </MayumiLink>
          </Link>
        </>
      )}
    </StyledNav>
  )
}

const StyledFooter = styled('footer', {
  w: '$full',
  mt: '$8',
  background: '$gridColor',
  borderStyle: 'solid',
  borderColor: '$quaternaryLabelColor',
  borderTopWidth: '$px',
  position: 'relative',
  zIndex: 1,
})

export const Footer = () => {
  return (
    <StyledFooter className="p-8 md:px-36 md:py-8">
      <div className="grid grid-cols-1 2xl:grid-cols-4">
        <div className="flex flex-col gap-12">
          <div className="relative flex flex-col items-start md:flex-row md:items-center">
            <Text className="signature font-thin" h6={true}>
              JiangWeixian
            </Text>
            <Text className="relative top-1 hidden italic md:block" p={true} type="tertiary">
              &nbsp;•&nbsp;
            </Text>
            <Text className="relative top-1 italic" p={true} type="tertiary">
              A Frontend Developer
            </Text>
          </div>
          <div className="flex gap-4">
            <Link href="https://github.com/JiangWeixian">
              <Icon css={{ w: '$4', h: '$4', fill: '$secondaryLabelColor', cursor: 'pointer' }}>
                <Twitter />
              </Icon>
            </Link>
            <Link href="https://twitter.com/JiangWeixian">
              <Icon css={{ w: '$4', h: '$4', fill: '$secondaryLabelColor', cursor: 'pointer' }}>
                <Github />
              </Icon>
            </Link>
          </div>
        </div>
      </div>
    </StyledFooter>
  )
}
