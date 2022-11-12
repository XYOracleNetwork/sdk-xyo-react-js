import { XyoArchivistWrapper } from '@xyo-network/archivist'

import { useModules } from './useModules'

export const useArchivistModule = (address?: string) => {
  const modules = useModules({ address: address ? [address] : undefined })
  const foundModule = modules?.shift()
  return foundModule ? new XyoArchivistWrapper(foundModule) : undefined
}
