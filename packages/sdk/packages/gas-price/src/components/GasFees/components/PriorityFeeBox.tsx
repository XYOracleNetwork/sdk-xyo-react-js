import { LocalGasStationRounded as LocalGasStationRoundedIcon } from '@mui/icons-material'
import { useTheme } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol, FlexGrowRow } from '@xylabs/react-flexbox'
import { TypographyEx } from '@xyo-network/react-shared'
import React from 'react'

import { GweiLabelTypography } from './GweiLabelTypography.tsx'

export interface PriorityFeeBoxProps extends FlexBoxProps {
  priorityFee?: number
  priorityFeeLabel?: string
}

export const PriorityFeeBox: React.FC<PriorityFeeBoxProps> = ({ priorityFee, priorityFeeLabel = 'Priority Fee', ...props }) => {
  const theme = useTheme()

  return (
    <FlexGrowRow width="100%" justifyContent="space-between" alignItems="end" {...props}>
      <FlexCol alignItems="start">
        <TypographyEx>{priorityFeeLabel}</TypographyEx>
        <TypographyEx title={priorityFee?.toString() ?? ''}>
          {priorityFee?.toFixed(2)}
          {' '}
          <GweiLabelTypography fontSize={theme.spacing(1)} />
        </TypographyEx>
      </FlexCol>
      <LocalGasStationRoundedIcon />
    </FlexGrowRow>
  )
}
