import { Inventory2Rounded as Inventory2RoundedIcon } from '@mui/icons-material'
import type { ArchivistInstance } from '@xyo-network/archivist-model'
import React from 'react'

import type { ModuleSummaryProps } from './ModuleSummary.tsx'
import { ModuleSummary } from './ModuleSummary.tsx'

export const ArchivistSummary: React.FC<ModuleSummaryProps<ArchivistInstance>> = ({
  mod, ...props
}) => {
  return <ModuleSummary mod={mod} icon={<Inventory2RoundedIcon />} {...props} />
}
