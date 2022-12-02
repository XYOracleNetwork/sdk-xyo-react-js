import { Card, CardProps, Paper, useTheme } from '@mui/material'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { CardContentEx } from '@xyo-network/react-card'

import { FeePerGasValue } from '../../lib'
import { GasPriceBox, PriorityFeeBox, SpeedBox } from './components'

export interface GasFeeCardProps extends CardProps {
  gasPrice?: number
  priorityFee?: number
  speed?: FeePerGasValue
  speedPaperElevation?: number
}

export const GasFeeCard: React.FC<GasFeeCardProps> = ({ gasPrice, speedPaperElevation, priorityFee, speed = 'low', ...props }) => {
  const theme = useTheme()

  return (
    <Card sx={{ p: 0 }} {...props}>
      <CardContentEx removePadding sx={{ flexDirection: 'column', flexGrow: 1, p: 0, rowGap: 2 }}>
        <FlexGrowCol bgcolor={'secondary.dark'} alignItems="start" p={2} rowGap={1.5}>
          <GasPriceBox gasPrice={gasPrice} />
          <PriorityFeeBox priorityFee={priorityFee} />
        </FlexGrowCol>
        <Paper elevation={speedPaperElevation} sx={{ borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px` }}>
          <SpeedBox speed={speed} />
        </Paper>
      </CardContentEx>
    </Card>
  )
}
