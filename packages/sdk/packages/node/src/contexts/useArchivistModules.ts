import { XyoArchivistGetQuerySchema, XyoArchivistWrapper } from '@xyo-network/archivist'
import compact from 'lodash/compact'

import { useModules } from './useModules'

export const useArchivistModules = () => {
  const modules = useModules()

  return compact(modules?.filter((module) => module?.queryable(XyoArchivistGetQuerySchema))).map((module) =>
    module ? new XyoArchivistWrapper({ module }) : undefined,
  )
}
