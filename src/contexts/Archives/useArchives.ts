import { useContext } from 'react'

import { ArchivesContext } from './Context'

export const useArchives = () => {
  return useContext(ArchivesContext).archives
}
