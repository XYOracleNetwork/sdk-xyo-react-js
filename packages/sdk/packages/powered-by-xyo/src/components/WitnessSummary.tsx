import { VisibilityRounded as VisibilityRoundedIcon } from '@mui/icons-material'
import type { WitnessInstance } from '@xyo-network/witness-model'
import React from 'react'

import type { ModuleSummaryProps } from './ModuleSummary.tsx'
import { ModuleSummary } from './ModuleSummary.tsx'

export const WitnessSummary: React.FC<ModuleSummaryProps<WitnessInstance>> = ({ mod, ...props }) => {
  return <ModuleSummary mod={mod} icon={<VisibilityRoundedIcon />} {...props} />
}
