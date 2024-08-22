import { InsertLinkRounded as InsertLinkRoundedIcon } from '@mui/icons-material'
import type { BridgeInstance } from '@xyo-network/bridge-model'
import React from 'react'

import type { ModuleSummaryProps } from './ModuleSummary.tsx'
import { ModuleSummary } from './ModuleSummary.tsx'

export const BridgeSummary: React.FC<ModuleSummaryProps<BridgeInstance>> = ({ mod, ...props }) => {
  return <ModuleSummary mod={mod} icon={<InsertLinkRoundedIcon />} {...props}></ModuleSummary>
}
