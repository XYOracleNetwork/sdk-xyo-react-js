import { useTheme } from '@mui/material'
import type { TypographyExProps } from '@xyo-network/react-shared'
import { getTokenData } from '@xyo-network/react-shared'
import type { PropsWithChildren } from 'react'
import React from 'react'

import { GasPriceHeadingTypography } from './Heading.tsx'

export interface GasPriceHeaderTypographyProps extends TypographyExProps, PropsWithChildren {
  heading?: string
}

export const GasPriceHeaderTypography: React.FC<GasPriceHeaderTypographyProps> = ({
  heading, children, ...props
}) => {
  const theme = useTheme()
  const [ethData] = getTokenData(['eth'])
  const networkIcon = <img height={theme.spacing(4)} src={ethData.icon} />

  return (
    <GasPriceHeadingTypography heading={heading} networkIcon={networkIcon} {...props}>
      {children}
    </GasPriceHeadingTypography>
  )
}
