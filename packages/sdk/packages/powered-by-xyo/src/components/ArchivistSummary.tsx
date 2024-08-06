import { Inventory2Rounded as Inventory2RoundedIcon } from '@mui/icons-material'
import { ArchivistInstance } from '@xyo-network/archivist-model'
import React from 'react'

import { ModuleSummary, ModuleSummaryProps } from './ModuleSummary.js'

export const ArchivistSummary: React.FC<ModuleSummaryProps<ArchivistInstance>> = ({ mod, ...props }) => {
  return <ModuleSummary mod={mod} icon={<Inventory2RoundedIcon />} {...props} />
}
