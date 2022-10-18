import { XyoDivinerWrapper } from '@xyo-network/diviner'

import { useModule } from './useModule'

export const useDivinerModule = (address?: string) => {
  const module = useModule(address)
  return module ? new XyoDivinerWrapper(module) : undefined
}
