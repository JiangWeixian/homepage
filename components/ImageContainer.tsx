import { styled } from 'mayumi/theme'

export const ImageContainer = styled('div', {
  '&': {
    my: '$2',
    position: 'relative',
    display: 'block',
    w: '$full',
    aspect: 'video',
    img: {
      rounded: '$lg',
      boxShadow: '$lg',
    },
  },
})
