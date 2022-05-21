import { useContextEx } from '@xyo-network/react-shared'

import { ArchivesContext } from './Context'

export const useArchives = (required = true) => {
  return useContextEx(ArchivesContext, 'Archives', required)
}
