import { BubbleChartRounded as BubbleChartRoundedIcon } from '@mui/icons-material'
import { DivinerInstance } from '@xyo-network/diviner-model'
import React from 'react'

import { ModuleSummary, ModuleSummaryProps } from './ModuleSummary.js'

export const DivinerSummary: React.FC<ModuleSummaryProps<DivinerInstance>> = ({ mod, ...props }) => {
  return <ModuleSummary mod={mod} icon={<BubbleChartRoundedIcon />} {...props} />
}
