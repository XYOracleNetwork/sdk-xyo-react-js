import { DivinerWrapper } from '@xyo-network/diviner-wrapper'
import { ModuleFilter } from '@xyo-network/module'

import { useModules } from './useModules'

export const useDivinerModule = (filter?: ModuleFilter) => {
  const modules = useModules(filter)
  const foundModule = modules?.shift()
  return foundModule ? new DivinerWrapper(foundModule) : undefined
}
