import { ModuleFilter } from '@xyo-network/module'
import { WitnessWrapper } from '@xyo-network/witness'

import { useModules } from './useModules'

export const useWitnessModule = (filter?: ModuleFilter) => {
  const modules = useModules(filter)
  const foundModule = modules?.shift()
  return foundModule ? new WitnessWrapper(foundModule) : undefined
}
