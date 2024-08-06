import { InsertLinkRounded as InsertLinkRoundedIcon } from '@mui/icons-material'
import { BridgeInstance } from '@xyo-network/bridge-model'
import React from 'react'

import { ModuleSummary, ModuleSummaryProps } from './ModuleSummary.tsx'

export const BridgeSummary: React.FC<ModuleSummaryProps<BridgeInstance>> = ({ mod, ...props }) => {
  return <ModuleSummary mod={mod} icon={<InsertLinkRoundedIcon />} {...props}></ModuleSummary>
}
