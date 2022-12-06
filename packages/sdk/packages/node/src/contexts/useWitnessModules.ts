import { WitnessWrapper, XyoWitnessObserveQuerySchema } from '@xyo-network/witness'

import { useModules } from './useModules'

export const useWitnessModules = () => {
  const modules = useModules({ query: [[XyoWitnessObserveQuerySchema]] })
  return modules?.map((module) => new WitnessWrapper(module))
}
