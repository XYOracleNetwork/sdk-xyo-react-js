import { useTheme } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexRow } from '@xylabs/react-flexbox'
import { TypographyEx } from '@xyo-network/react-shared'
import React from 'react'

import { GweiLabelTypography } from './GweiLabelTypography.tsx'

export interface GasPriceBoxProps extends FlexBoxProps {
  gasPrice?: number
}

export const GasPriceBox: React.FC<GasPriceBoxProps> = ({
  gasPrice, ...props
}) => {
  const theme = useTheme()
  return (
    <FlexRow columnGap={1.5} rowGap={1.5} alignItems="end" {...props}>
      <TypographyEx lineHeight={1} fontWeight="200" fontSize={theme.spacing(6)} title={gasPrice?.toString() ?? ''}>
        {gasPrice?.toFixed(2)}
      </TypographyEx>
      <GweiLabelTypography fontSize={theme.spacing(2)} />
    </FlexRow>
  )
}
