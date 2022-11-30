import { DivinerWrapper, XyoDivinerDivineQuerySchema } from '@xyo-network/diviner'

import { useModules } from './useModules'

export const useDivinerModules = () => {
  const modules = useModules({ query: [[XyoDivinerDivineQuerySchema]] })
  return modules?.map((module) => new DivinerWrapper(module))
}
