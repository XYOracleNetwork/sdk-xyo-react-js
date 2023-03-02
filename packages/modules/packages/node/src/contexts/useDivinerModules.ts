import { XyoDivinerDivineQuerySchema } from '@xyo-network/diviner-model'
import { DivinerWrapper } from '@xyo-network/diviner-wrapper'

import { useModules } from './useModules'

export const useDivinerModules = () => {
  const modules = useModules({ query: [[XyoDivinerDivineQuerySchema]] })
  return modules?.map((module) => new DivinerWrapper(module))
}
