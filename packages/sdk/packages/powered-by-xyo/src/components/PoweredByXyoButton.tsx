import { Paper, Typography } from '@mui/material'
import { ButtonEx, ButtonExProps } from '@xylabs/react-button'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'

import { xyoColorLogoText } from '../img'
import { XyoBusy } from './XyoBusy'

export interface PoweredByXyoButtonProps extends ButtonExProps {
  busy?: boolean
  logoHeight?: number
  logoTextSize?: number
}

export const PoweredByXyoButton: React.FC<PoweredByXyoButtonProps> = ({
  busy = false,
  href = 'https://xyo.network',
  logoHeight,
  logoTextSize,
  sx,
  target = '_blank',
  variant = 'text',
  ...props
}) => {
  return (
    <ButtonEx href={href} target={target} variant={variant} sx={{ borderRadius: 0, padding: 0, ...sx }} {...props}>
      <FlexCol padding={0.5}>
        <Typography style={{ fontSize: logoTextSize ?? 10 }} fontSize="small">
          Powered by
        </Typography>
        <FlexRow>
          <XyoBusy busy={busy} />
          <img src={xyoColorLogoText} height={logoHeight ?? 24} />
        </FlexRow>
      </FlexCol>
    </ButtonEx>
  )
}
