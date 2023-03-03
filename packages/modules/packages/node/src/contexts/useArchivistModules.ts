import { ArchivistGetQuerySchema, ArchivistWrapper } from '@xyo-network/archivist'

import { useModules } from './useModules'

export const useArchivistModules = () => {
  const modules = useModules({ query: [[ArchivistGetQuerySchema]] })
  return modules?.map((module) => new ArchivistWrapper(module))
}
