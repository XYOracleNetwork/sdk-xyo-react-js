import { Chip, useTheme } from '@mui/material'
import { FlexBoxProps, FlexRow } from '@xylabs/react-flexbox'
import { TypographyEx, useGetTokenData } from '@xyo-network/react-shared'

import { DescriptionQuickTip } from './DescriptionQuickTip'

export interface GasPriceEstimateHeaderBoxProps extends FlexBoxProps {
  timestamp?: number
  baseFee?: number
}

export const GasPriceEstimateHeaderBox: React.FC<GasPriceEstimateHeaderBoxProps> = ({ timestamp, baseFee, ...props }) => {
  const theme = useTheme()
  const [ethData] = useGetTokenData(['eth'])

  return (
    <FlexRow
      justifyItems="space-between"
      alignItems="end"
      columnGap={2}
      rowGap={2}
      flexWrap="wrap"
      width="100%"
      justifyContent="space-between"
      {...props}
    >
      <TypographyEx fontSize={theme.spacing(6)} lineHeight={1}>
        Gas Fee Estimate <img height={theme.spacing(4)} src={ethData.icon} />{' '}
        <span style={{ lineHeight: 0, verticalAlign: 'super' }}>
          <DescriptionQuickTip />
        </span>
      </TypographyEx>
      <FlexRow columnGap={1}>
        {timestamp ? <Chip label={new Date(timestamp).toLocaleString()} /> : null}
        {baseFee ? <Chip label={`Base Fee - ${baseFee.toFixed(2)}`} /> : null}
      </FlexRow>
    </FlexRow>
  )
}
