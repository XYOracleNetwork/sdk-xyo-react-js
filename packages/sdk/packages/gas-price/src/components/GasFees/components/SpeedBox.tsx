import { useTheme } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { TypographyEx } from '@xyo-network/react-shared'
import React from 'react'

export interface SpeedBoxProps extends FlexBoxProps {
  speed?: string
}

export const SpeedBox: React.FC<SpeedBoxProps> = ({ speed, ...props }) => {
  const theme = useTheme()

  return speed
    ? (
        <FlexGrowCol {...props}>
          <TypographyEx fontSize={theme.spacing(3)} fontWeight="200" p={1}>
            {speed}
          </TypographyEx>
        </FlexGrowCol>
      )
    : null
}
