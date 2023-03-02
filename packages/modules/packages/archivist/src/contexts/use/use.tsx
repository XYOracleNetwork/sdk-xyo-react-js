import { ArchivistGetQuerySchema, ArchivistModule } from '@xyo-network/archivist'
import { useModule } from '@xyo-network/react-node'

export const useArchivist = (nameOrAddress?: string) => {
  return useModule<ArchivistModule>(nameOrAddress, [[ArchivistGetQuerySchema]])
}
