import { BubbleChartRounded as BubbleChartRoundedIcon } from '@mui/icons-material'
import type { DivinerInstance } from '@xyo-network/diviner-model'
import React from 'react'

import type { ModuleSummaryProps } from './ModuleSummary.tsx'
import { ModuleSummary } from './ModuleSummary.tsx'

export const DivinerSummary: React.FC<ModuleSummaryProps<DivinerInstance>> = ({
  mod, ...props
}) => {
  return <ModuleSummary mod={mod} icon={<BubbleChartRoundedIcon />} {...props} />
}
