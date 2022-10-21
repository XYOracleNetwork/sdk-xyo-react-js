import { useContextEx } from '@xyo-network/react-shared'

import { ArchivistContext } from '../Context'

export const useArchivist = (required = false) => {
  return useContextEx(ArchivistContext, 'Archivist', required)
}
