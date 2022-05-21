import { useContextEx } from '@xyo-network/react-shared'

import { ArchivistApiContext } from './Context'

export const useArchivistApi = (required = true) => {
  return useContextEx(ArchivistApiContext, 'ArchivistApi', required)
}
