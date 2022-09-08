import { XyoWitnessObserveQuerySchema, XyoWitnessWrapper } from '@xyo-network/witness'
import compact from 'lodash/compact'

import { useModules } from './useModules'

export const useWitnessModules = () => {
  const modules = useModules()

  return compact(modules?.filter((module) => module?.queriable(XyoWitnessObserveQuerySchema))).map((module) =>
    module ? new XyoWitnessWrapper(module) : undefined,
  )
}
