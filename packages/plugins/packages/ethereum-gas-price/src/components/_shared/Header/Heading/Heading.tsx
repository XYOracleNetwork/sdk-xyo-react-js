import { useTheme } from '@mui/material'
import { TypographyEx, TypographyExProps, useGetTokenData } from '@xyo-network/react-shared'

import { DescriptionQuickTip } from './DescriptionQuickTip'

export interface GasPriceEstimateHeadingTypographyProps extends TypographyExProps {
  heading?: string
}

export const GasPriceEstimateHeadingTypography: React.FC<GasPriceEstimateHeadingTypographyProps> = ({ heading, ...props }) => {
  const theme = useTheme()
  const [ethData] = useGetTokenData(['eth'])
  return (
    <TypographyEx fontSize={theme.spacing(6)} lineHeight={1} {...props}>
      {heading} <img height={theme.spacing(4)} src={ethData.icon} />{' '}
      <span style={{ lineHeight: 0, verticalAlign: 'super' }}>
        <DescriptionQuickTip />
      </span>
    </TypographyEx>
  )
}
