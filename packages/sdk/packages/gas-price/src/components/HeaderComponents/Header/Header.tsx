import { useTheme } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'
import { TypographyExProps, useGetTokenData } from '@xyo-network/react-shared'
import React from 'react'

import { GasPriceHeadingTypography } from './Heading.tsx'

export interface GasPriceHeaderTypographyProps extends TypographyExProps, WithChildren {
  heading?: string
}

export const GasPriceHeaderTypography: React.FC<GasPriceHeaderTypographyProps> = ({ heading, children, ...props }) => {
  const theme = useTheme()
  const [ethData] = useGetTokenData(['eth'])
  const networkIcon = <img height={theme.spacing(4)} src={ethData.icon} />

  return (
    <GasPriceHeadingTypography heading={heading} networkIcon={networkIcon} {...props}>
      {children}
    </GasPriceHeadingTypography>
  )
}
