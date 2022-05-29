import { styled } from 'mayumi/theme'
import { Layout as MayumiLayout } from 'mayumi/layout'

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
    px: '$64',
    w: '$full',
    fontWeight: '$semibold',
    backgroundColor: 'rgba(6, 6, 6, 0.6)',
    borderBottom: '1px solid $quaternaryLabelColor',
  },
  '.issue-content': {
    maxWidth: '$screenXL',
  },
})
