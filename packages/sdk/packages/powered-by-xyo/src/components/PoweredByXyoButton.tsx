import { Typography } from '@mui/material'
import type { ButtonExProps } from '@xylabs/react-button'
import { ButtonEx } from '@xylabs/react-button'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import React, { useState } from 'react'

import { xyoColorLogoText } from '../img/index.ts'
import { XyoBusy } from './XyoBusy.tsx'

export interface PoweredByXyoButtonProps extends ButtonExProps {
  busy?: boolean
  logoHeight?: number
  logoTextSize?: number
}

export const PoweredByXyoButton: React.FC<PoweredByXyoButtonProps> = ({
  busy = false,
  href,
  logoHeight,
  logoTextSize,
  sx,
  target = '_blank',
  variant = 'text',
  ...props
}) => {
  // preloading image to prevent shifting
  const [imageLoaded, setImageLoaded] = useState(false)
  const img = new Image()
  img.addEventListener('load', () => setImageLoaded(true))
  img.src = xyoColorLogoText
  return imageLoaded
    ? (
        <ButtonEx
          href={href}
          target={target}
          variant={variant}
          sx={{
            borderRadius: 0, padding: 0, ...sx,
          }}
          {...props}
        >
          <FlexCol padding={0.5}>
            <Typography style={{ fontSize: logoTextSize ?? 10 }} fontSize="small">
              Powered by
            </Typography>
            <FlexRow>
              <XyoBusy busy={busy} />
              <img src={xyoColorLogoText} height={logoHeight ?? 24} width={45} />
            </FlexRow>
          </FlexCol>
        </ButtonEx>
      )
    : null
}
