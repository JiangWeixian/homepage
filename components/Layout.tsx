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
    py: '$4',
    px: '$36',
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

type NavProps = {
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
    displayTabs: {
      true: {
        justifyContent: 'end',
        '.signature': {
          display: 'none',
        },
      },
    },
  },
})

export const Nav = (props: NavProps) => {
  return (
    <StyledNav
      className="blog-nav flex items-center gap-2"
      ghost={props.ghost}
      displayTabs={props.displayTabs}
    >
      {/* <Image src="/avatar.png" width="24" height="24" alt="JiangWeixian" /> */}
      <Text className="signature" h6={true}>
        JiangWeixian
      </Text>
      {props.displayTabs && <Link href="/issues">
        <MayumiLink>Issues</MayumiLink>
      </Link>}
    </StyledNav>
  )
}

const StyledFooter = styled('footer', {
  w: '$full',
  mt: '$8',
  py: '$8',
  px: '$36',
  background: '$gridColor',
  borderStyle: 'solid',
  borderColor: '$quaternaryLabelColor',
  borderTopWidth: '$px',
  position: 'relative',
  zIndex: 1,
})

export const Footer = () => {
  return (
    <StyledFooter>
      <div className="grid grid-cols-1 2xl:grid-cols-4">
        <div className="flex flex-col gap-12">
          <div className="flex items-center relative">
            <Text className="signature font-thin" h6={true}>
              JiangWeixian
            </Text>
            <Text className="relative" css={{ top: '2.5px' }} p={true} type="tertiary">
              &nbsp;•&nbsp;A Frontend Developer
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
