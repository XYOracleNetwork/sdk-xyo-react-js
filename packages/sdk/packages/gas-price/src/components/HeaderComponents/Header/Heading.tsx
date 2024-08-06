import { useTheme } from '@mui/material'
import { TypographyEx, TypographyExProps } from '@xyo-network/react-shared'
import React, { ReactNode } from 'react'

export interface GasPriceHeadingTypographyProps extends TypographyExProps {
  children?: ReactNode
  heading?: string
  networkIcon?: ReactNode
}

export const GasPriceHeadingTypography: React.FC<GasPriceHeadingTypographyProps> = ({ children, heading, networkIcon, ...props }) => {
  const theme = useTheme()
  return (
    <TypographyEx fontSize={theme.spacing(6)} lineHeight={1} {...props}>
      {heading}
      {' '}
      {networkIcon}
      {' '}
      {children}
    </TypographyEx>
  )
}
