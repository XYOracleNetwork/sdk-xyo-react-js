import { useTheme } from '@mui/material'
import { TypographyEx, TypographyExProps } from '@xyo-network/react-shared'
import { ReactNode } from 'react'

export interface GasPriceEstimateHeadingTypographyProps extends TypographyExProps {
  heading?: string
  children?: ReactNode
  networkIcon?: ReactNode
}

export const GasPriceEstimateHeadingTypography: React.FC<GasPriceEstimateHeadingTypographyProps> = ({ heading, networkIcon, children, ...props }) => {
  const theme = useTheme()
  return (
    <TypographyEx fontSize={theme.spacing(6)} lineHeight={1} {...props}>
      {heading} {networkIcon} <span style={{ lineHeight: 0, verticalAlign: 'super' }}>{children}</span>
    </TypographyEx>
  )
}
