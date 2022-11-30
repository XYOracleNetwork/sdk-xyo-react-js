import { useContextEx } from '@xyo-network/react-shared'

import { ArchiveContext } from './Context'

export const useArchive = (required = false) => {
  return useContextEx(ArchiveContext, 'Archive', required)
}
