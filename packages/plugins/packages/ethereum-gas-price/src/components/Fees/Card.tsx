import LocalGasStationRoundedIcon from '@mui/icons-material/LocalGasStationRounded'
import { Card, CardProps, useTheme } from '@mui/material'
import { FlexCol, FlexGrowCol, FlexGrowRow } from '@xylabs/react-flexbox'
import { CardContentEx } from '@xyo-network/react-card'
import { TypographyEx, TypographyExProps } from '@xyo-network/react-shared'

import { FeePerGasToSpeed, FeePerGasValue } from '../lib'

export interface GasFeeCardProps extends CardProps {
  gasPrice?: number
  priorityFee?: number
  speed?: FeePerGasValue
}

export const GasFeeCard: React.FC<GasFeeCardProps> = ({ gasPrice, priorityFee, speed = 'low', ...props }) => {
  const theme = useTheme()
  return (
    <Card sx={{ p: 0 }} {...props}>
      <CardContentEx removePadding variant="scrollable" sx={{ flexDirection: 'column', flexGrow: 1, p: 0, rowGap: 2 }}>
        <FlexGrowCol bgcolor={'secondary.dark'} alignItems="start" px={2} pb={2} rowGap={1.5}>
          <TypographyEx fontWeight="bold" fontSize={theme.spacing(6)}>
            {gasPrice?.toFixed(2)} <GweiLabel />
          </TypographyEx>
          <FlexGrowRow width="100%" justifyContent="space-between" alignItems="end">
            <FlexCol alignItems="start">
              <TypographyEx>Priority Fee</TypographyEx>
              <TypographyEx>
                {priorityFee?.toFixed(2)} <GweiLabel fontSize={theme.spacing(1)} />
              </TypographyEx>
            </FlexCol>
            <LocalGasStationRoundedIcon />
          </FlexGrowRow>
        </FlexGrowCol>
        <FlexGrowCol>
          {speed && (
            <TypographyEx fontSize={theme.spacing(3)} p={1}>
              {FeePerGasToSpeed[speed].toUpperCase()}
            </TypographyEx>
          )}
        </FlexGrowCol>
      </CardContentEx>
    </Card>
  )
}

const GweiLabel: React.FC<TypographyExProps> = (props) => (
  <TypographyEx variant="caption" {...props}>
    GWEI
  </TypographyEx>
)
