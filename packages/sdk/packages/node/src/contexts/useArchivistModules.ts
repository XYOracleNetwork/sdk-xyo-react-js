import { XyoArchivistGetQueryPayloadSchema, XyoArchivistWrapper } from '@xyo-network/archivist'
import compact from 'lodash/compact'

import { useModules } from './useModules'

export const useArchivistModules = () => {
  const modules = useModules()

  return compact(modules?.filter((module) => module?.queriable(XyoArchivistGetQueryPayloadSchema))).map((module) =>
    module ? new XyoArchivistWrapper(module) : undefined,
  )
}
