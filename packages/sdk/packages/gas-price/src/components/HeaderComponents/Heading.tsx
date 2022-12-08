import { useTheme } from '@mui/material'
import { TypographyEx, TypographyExProps } from '@xyo-network/react-shared'
import { ReactNode } from 'react'

export interface GasPriceHeadingTypographyProps extends TypographyExProps {
  heading?: string
  children?: ReactNode
  networkIcon?: ReactNode
}

export const GasPriceHeadingTypography: React.FC<GasPriceHeadingTypographyProps> = ({ heading, networkIcon, children, ...props }) => {
  const theme = useTheme()
  return (
    <TypographyEx fontSize={theme.spacing(6)} lineHeight={1} {...props}>
      {heading} {networkIcon} {children}
    </TypographyEx>
  )
}
