import { DivinerWrapper } from '@xyo-network/diviner'

import { useModules } from './useModules'

export const useDivinerModule = (address?: string) => {
  const modules = useModules({ address: address ? [address] : undefined })
  const foundModule = modules?.shift()
  return foundModule ? new DivinerWrapper(foundModule) : undefined
}
