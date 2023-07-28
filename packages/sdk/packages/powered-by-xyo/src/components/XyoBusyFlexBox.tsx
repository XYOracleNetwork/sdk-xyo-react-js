import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'

import { xyoColorLogo } from '../img'

export type XyoBusyFlexBoxProps = FlexBoxProps & {
  busy?: boolean
  widthInPixels?: number
}

export const XyoBusyFlexBox: React.FC<XyoBusyFlexBoxProps> = ({ widthInPixels, busy, ...props }) => {
  return (
    <FlexCol
      sx={{
        '@keyframes spin': {
          '0%': {
            transform: 'rotate(360deg)',
          },
          '100%': {
            transform: 'rotate(0deg)',
          },
        },
        animation: busy ? 'spin 2s linear infinite' : undefined,
        animationDirection: 'reverse',
      }}
      {...props}
    >
      <img src={xyoColorLogo} height={widthInPixels ?? 22} />
    </FlexCol>
  )
}
