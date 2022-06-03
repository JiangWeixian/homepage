import { styled } from 'mayumi/theme'
import { Layout as MayumiLayout } from 'mayumi/layout'
import { Text } from 'mayumi/text'
import { Separator } from 'mayumi/separator'
import { Icon } from 'mayumi/icons'

import Twitter from '~/components/Icons/Twitter.svg'
import Github from '~/components/Icons/Github.svg'
import Link from 'next/link'

export const Layout = styled(MayumiLayout.Main, {
  padding: '$0',
  alignItems: 'center',
  backgroundColor: '$black',
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
    borderBottom: '1px solid $quaternaryLabelColor',
  },
  '.issue-content': {
    maxWidth: '$screenXL',
  },
})

export const Nav = () => {
  return (
    <nav className="blog-nav">
      <Text p={true} weight="bold">
        J WX&apos;s
      </Text>
    </nav>
  )
}

const StyledFooter = styled('footer', {
  w: '$full',
  py: '$8',
  px: '$36',
  background: '$gridColor',
  borderStyle: 'solid',
  borderColor: '$quaternaryLabelColor',
  borderTopWidth: '$px',
})

export const Footer = () => {
  return (
    <StyledFooter>
      <div className="grid grid-cols-4">
        <div className="flex flex-col gap-12">
          <div className="flex items-center">
            <Text h6={true}>JiangWeixian</Text>
            <Separator css={{ h: '$4' }} type="vertical" />
            <Text p={true} type="tertiary">
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
