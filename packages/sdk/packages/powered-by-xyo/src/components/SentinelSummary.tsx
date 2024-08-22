import { TimerRounded as TimerRoundedIcon } from '@mui/icons-material'
import type { SentinelInstance } from '@xyo-network/sentinel-model'
import React from 'react'

import type { ModuleSummaryProps } from './ModuleSummary.tsx'
import { ModuleSummary } from './ModuleSummary.tsx'

export const SentinelSummary: React.FC<ModuleSummaryProps<SentinelInstance>> = ({ mod, ...props }) => {
  return <ModuleSummary mod={mod} icon={<TimerRoundedIcon />} {...props} />
}
