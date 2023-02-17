import { ArchivistWrapper } from '@xyo-network/archivist'
import { ModuleFilter } from '@xyo-network/module'

import { useModules } from './useModules'

export const useArchivistModule = (filter?: ModuleFilter) => {
  const modules = useModules(filter)
  const foundModule = modules?.shift()
  return foundModule ? new ArchivistWrapper(foundModule) : undefined
}
