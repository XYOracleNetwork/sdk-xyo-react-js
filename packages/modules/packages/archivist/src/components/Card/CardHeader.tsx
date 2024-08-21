import type { CardHeaderProps } from '@mui/material'
import { MemoryArchivistConfigSchema } from '@xyo-network/archivist-memory'
import type { ArchivistInstance } from '@xyo-network/archivist-model'
import type { ModuleRenderProps } from '@xyo-network/react-module'
import { ModuleCardHeader } from '@xyo-network/react-module'
import React, { useMemo } from 'react'

import { MemoryArchivistsStats } from './components/index.ts'

const ArchivistStats = (archivist?: ArchivistInstance) => {
  switch (archivist?.config.schema) {
    case MemoryArchivistConfigSchema: {
      return <MemoryArchivistsStats archivist={archivist} />
    }
    default: {
      return <></>
    }
  }
}

export const ArchivistCardHeader: React.FC<ModuleRenderProps<ArchivistInstance> & CardHeaderProps> = ({
  title, mod, ...props
}) => {
  const Stats = useMemo(() => ArchivistStats(mod), [mod])
  return <ModuleCardHeader mod={mod} title={title ?? mod?.config.name ?? 'Archivist'} action={Stats} {...props} />
}
