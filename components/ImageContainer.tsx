import { styled } from 'mayumi/theme'
import NextImage from 'next/image'
import useMeasure from 'react-use-measure'
import { withQuery } from 'ufo'

import type { ImageProps } from 'next/image'
import type React from 'react'

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

const styles: React.CSSProperties = {
  width: '100%',
  aspectRatio: '2/1',
}

const RealmeSvgImage = (props: React.ImgHTMLAttributes<HTMLImageElement> & { imgStyle?: React.ImgHTMLAttributes<HTMLImageElement>['style'] }) => {
  const [ref, bounds] = useMeasure()
  return (
    <div ref={ref} style={{ ...styles, ...props.style }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...props}
        style={props.imgStyle}
        src={withQuery(props.src as string, {
          width: bounds.width.toString(),
          height: bounds.height.toString(),
        })}
      />
    </div>
  )
}

export const Image = (
  { fallbackImgElement = 'next', number, ...props }: ImageProps &
  React.ImgHTMLAttributes<HTMLImageElement> & { fallbackImgElement?: 'next' | 'raw'; number: number | string },
) => {
  const useViewTransition = typeof number !== 'undefined'
  const style = useViewTransition
    ? { viewTransitionName: `cover-${number}`, contain: 'layout' } as any
    : {}
  return (
    <>
      {typeof props.src === 'string' && !props.src.includes('https://realme')
        ? (
            fallbackImgElement === 'next'
              ? (
                <NextImage style={style} src={props.src} alt={props.alt} objectFit="cover" layout="fill" />
                )
              : (
                // eslint-disable-next-line @next/next/no-img-element
                <img {...props} style={style} />
                )
          )
        : (
          <RealmeSvgImage {...props} src={props.src as string} alt={props.alt} imgStyle={style} className="w-full object-fill" />
          )}
    </>
  )
}
