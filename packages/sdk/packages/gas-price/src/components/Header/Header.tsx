import { useTheme } from '@mui/material'
import { TypographyExProps, useGetTokenData } from '@xyo-network/react-shared'

import { DescriptionQuickTip, GasPriceEstimateHeadingTypography } from './HeadingComponents'

export interface GasPriceEstimateHeaderTypographyProps extends TypographyExProps {
  heading?: string
}

export const GasPriceEstimateHeaderTypography: React.FC<GasPriceEstimateHeaderTypographyProps> = ({ heading, ...props }) => {
  const theme = useTheme()
  const [ethData] = useGetTokenData(['eth'])
  const networkIcon = <img height={theme.spacing(4)} src={ethData.icon} />

  return (
    <GasPriceEstimateHeadingTypography heading={heading} networkIcon={networkIcon} {...props}>
      <DescriptionQuickTip />
    </GasPriceEstimateHeadingTypography>
  )
}
