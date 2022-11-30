import { WitnessWrapper } from '@xyo-network/witness'

import { useModules } from './useModules'

export const useWitnessModule = (address?: string) => {
  const modules = useModules({ address: address ? [address] : undefined })
  const foundModule = modules?.shift()
  return foundModule ? new WitnessWrapper(foundModule) : undefined
}
