import { useTheme } from '@mui/material'
import type { TypographyExProps } from '@xyo-network/react-shared'
import { TypographyEx } from '@xyo-network/react-shared'
import type { ReactNode } from 'react'
import React from 'react'

export interface GasPriceHeadingTypographyProps extends TypographyExProps {
  children?: ReactNode
  heading?: string
  networkIcon?: ReactNode
}

export const GasPriceHeadingTypography: React.FC<GasPriceHeadingTypographyProps> = ({
  children, heading, networkIcon, ...props
}) => {
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
