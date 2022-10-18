import { XyoArchivistWrapper } from '@xyo-network/archivist'

import { useModule } from './useModule'

export const useArchivistModule = (address?: string) => {
  const module = useModule(address)
  return module ? new XyoArchivistWrapper(module) : undefined
}
