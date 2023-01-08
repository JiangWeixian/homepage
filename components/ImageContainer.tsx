import { styled } from 'mayumi/theme'
import NextImage, { ImageProps } from 'next/image'

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

export const Image = (props: ImageProps) => {
  return (
    <>
      {typeof props.src === 'string' && !props.src.includes('realme-ten.vercel.app') ? (
        <NextImage src={props.src} alt={props.alt} objectFit="cover" layout="fill" />
      ) : (
        <img src={props.src as string} alt={props.alt} className="object-fill w-full" />
      )}
    </>
  )
}
