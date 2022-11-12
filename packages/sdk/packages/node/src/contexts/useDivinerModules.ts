import { XyoDivinerDivineQuerySchema, XyoDivinerWrapper } from '@xyo-network/diviner'

import { useModules } from './useModules'

export const useDivinerModules = () => {
  const modules = useModules({ query: [[XyoDivinerDivineQuerySchema]] })
  return modules?.map((module) => new XyoDivinerWrapper(module))
}
