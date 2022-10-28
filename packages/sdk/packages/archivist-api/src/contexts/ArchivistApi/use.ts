import { useContextEx } from '@xyo-network/react-shared'

import { ArchivistApiContext } from './Context'

export const useArchivistApi = (required = false) => {
  return useContextEx(ArchivistApiContext, 'ArchivistApi', required)
}
