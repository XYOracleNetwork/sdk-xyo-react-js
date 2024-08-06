import { VisibilityRounded as VisibilityRoundedIcon } from '@mui/icons-material'
import { WitnessInstance } from '@xyo-network/witness-model'
import React from 'react'

import { ModuleSummary, ModuleSummaryProps } from './ModuleSummary.js'

export const WitnessSummary: React.FC<ModuleSummaryProps<WitnessInstance>> = ({ mod, ...props }) => {
  return <ModuleSummary mod={mod} icon={<VisibilityRoundedIcon />} {...props} />
}
