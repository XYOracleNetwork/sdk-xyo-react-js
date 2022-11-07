import { XyoWitnessWrapper } from '@xyo-network/witness'

import { useModule } from './useModule'

export const useWitnessModule = (address?: string) => {
  const module = useModule({ address })
  return module ? new XyoWitnessWrapper(module) : undefined
}
