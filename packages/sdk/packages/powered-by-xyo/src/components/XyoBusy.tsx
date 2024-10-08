import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import React, { useState } from 'react'

import { xyoColorLogo } from '../img/index.ts'

export type XyoBusyProps = Omit<FlexBoxProps, 'children'> & {
  busy?: boolean
  spinsPerSecond?: number
  widthInPixels?: number
}

export const XyoBusy: React.FC<XyoBusyProps> = ({
  widthInPixels, busy, spinsPerSecond = 0.5, ...props
}) => {
  // preloading image to prevent shifting
  const [imageLoaded, setImageLoaded] = useState(false)
  if (!imageLoaded) {
    const img = new Image()
    img.addEventListener('load', () => setImageLoaded(true))
    img.src = xyoColorLogo
  }
  return imageLoaded
    ? (
        <FlexCol
          sx={{
            '@keyframes spin': {
              '0%': { transform: 'rotate(360deg)' },
              '100%': { transform: 'rotate(0deg)' },
            },
            'animation': busy ? `spin ${1 / spinsPerSecond}s linear infinite` : undefined,
            'animationDirection': 'reverse',
          }}
          {...props}
        >
          <img src={xyoColorLogo} height={widthInPixels ?? 22} />
        </FlexCol>
      )
    : null
}
