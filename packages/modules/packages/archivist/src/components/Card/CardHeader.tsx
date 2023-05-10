import { CardHeaderProps } from '@mui/material'
import { ArchivistModule, MemoryArchivistConfigSchema } from '@xyo-network/archivist'
import { ModuleCardHeader, ModuleRenderProps } from '@xyo-network/react-module'
import { useMemo } from 'react'

import { MemoryArchivistsStats } from './components'

const ArchivistStats = (archivist?: ArchivistModule) => {
  switch (archivist?.config.schema) {
    case MemoryArchivistConfigSchema:
      return <MemoryArchivistsStats archivist={archivist} />
    default:
      return <></>
  }
}

export const ArchivistCardHeader: React.FC<ModuleRenderProps<ArchivistModule> & CardHeaderProps> = ({ title, module, ...props }) => {
  const Stats = useMemo(() => ArchivistStats(module), [module])
  return <ModuleCardHeader module={module} title={title ?? module?.config.name ?? 'Archivist'} action={Stats} {...props} />
}
