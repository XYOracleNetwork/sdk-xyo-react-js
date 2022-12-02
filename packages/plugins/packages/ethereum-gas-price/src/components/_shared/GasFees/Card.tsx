import { Card, CardProps } from '@mui/material'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { CardContentEx } from '@xyo-network/react-card'

import { FeePerGasValue } from '../../lib'
import { GasPriceBox, PriorityFeeBox, SpeedBox } from './components'

export interface GasFeeCardProps extends CardProps {
  gasPrice?: number
  priorityFee?: number
  speed?: FeePerGasValue
}

export const GasFeeCard: React.FC<GasFeeCardProps> = ({ gasPrice, priorityFee, speed = 'low', ...props }) => {
  return (
    <Card sx={{ p: 0 }} {...props}>
      <CardContentEx removePadding variant="scrollable" sx={{ flexDirection: 'column', flexGrow: 1, p: 0, rowGap: 2 }}>
        <FlexGrowCol bgcolor={'secondary.dark'} alignItems="start" p={2} rowGap={1.5}>
          <GasPriceBox gasPrice={gasPrice} />
          <PriorityFeeBox priorityFee={priorityFee} />
        </FlexGrowCol>
        <SpeedBox speed={speed} />
      </CardContentEx>
    </Card>
  )
}
