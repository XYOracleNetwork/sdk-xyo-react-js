import { ArchivistWrapper, XyoArchivistGetQuerySchema } from '@xyo-network/archivist'

import { useModules } from './useModules'

export const useArchivistModules = () => {
  const modules = useModules({ query: [[XyoArchivistGetQuerySchema]] })
  return modules?.map((module) => new ArchivistWrapper(module))
}
