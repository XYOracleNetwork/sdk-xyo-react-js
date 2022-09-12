import { XyoDivinerDivineQuerySchema, XyoDivinerWrapper } from '@xyo-network/diviner'
import compact from 'lodash/compact'

import { useModules } from './useModules'

export const useDivinerModules = () => {
  const modules = useModules()

  return compact(modules?.filter((module) => module?.queryable(XyoDivinerDivineQuerySchema))).map((module) =>
    module ? new XyoDivinerWrapper(module) : undefined,
  )
}
