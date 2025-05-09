import type { CardProps } from '@mui/material'
import {
  Card, Paper, useTheme,
} from '@mui/material'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { CardContentEx } from '@xyo-network/react-card'
import React from 'react'

import {
  GasPriceBox, PriorityFeeBox, SpeedBox,
} from './components/index.ts'

export interface GasFeeCardProps extends CardProps {
  gasPrice?: number
  priorityFee?: number
  priorityFeeLabel?: string
  speed?: string
  speedPaperElevation?: number
}

export const GasFeeCard: React.FC<GasFeeCardProps> = ({
  gasPrice, speedPaperElevation, priorityFee, priorityFeeLabel, speed = 'low', ...props
}) => {
  const theme = useTheme()

  return (
    <Card sx={{ p: 0 }} {...props}>
      <CardContentEx
        removePadding
        sx={{
          flexDirection: 'column', flexGrow: 1, p: 0, rowGap: 2,
        }}
      >
        <FlexGrowCol bgcolor={theme.vars.palette.secondary.dark} alignItems="start" p={2} rowGap={1.5} color={theme.vars.palette.common.white}>
          <GasPriceBox gasPrice={gasPrice} />
          {priorityFee
            ? <PriorityFeeBox priorityFee={priorityFee} priorityFeeLabel={priorityFeeLabel} />
            : null}
        </FlexGrowCol>
        <Paper elevation={speedPaperElevation} sx={{ borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px` }}>
          <SpeedBox speed={speed} />
        </Paper>
      </CardContentEx>
    </Card>
  )
}
