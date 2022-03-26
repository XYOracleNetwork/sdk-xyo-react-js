import { useContext } from 'react'

import { ArchiveContext } from './Context'

export const useArchive = () => {
  return useContext(ArchiveContext)
}
