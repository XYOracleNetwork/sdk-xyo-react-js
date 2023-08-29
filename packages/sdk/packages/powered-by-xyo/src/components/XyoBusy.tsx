import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { createElement, useMemo } from 'react'

import { xyoColorLogo } from '../img'

export type XyoBusyProps = Omit<FlexBoxProps, 'children'> & {
  busy?: boolean
  spinsPerSecond?: number
  widthInPixels?: number
}

export const XyoBusy: React.FC<XyoBusyProps> = ({ widthInPixels, busy, spinsPerSecond = 0.5, ...props }) => {
  const Img = useMemo(() => {
    return createElement('img', {
      src: xyoColorLogo,
      style: {
        height: `${widthInPixels ?? 22}px`,
      },
    })
  }, [widthInPixels])

  return Img ? (
    <FlexCol
      id="xyo-img-wrap"
      sx={{
        '@keyframes spin': {
          '0%': {
            transform: 'rotate(360deg)',
          },
          '100%': {
            transform: 'rotate(0deg)',
          },
        },
        animation: busy ? `spin ${1 / spinsPerSecond}s linear infinite` : undefined,
        animationDirection: 'reverse',
      }}
      {...props}
    >
      {Img}
    </FlexCol>
  ) : null
}
