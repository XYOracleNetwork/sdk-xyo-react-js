import { useContext } from 'react'

import { ArchivistApiContext } from './Context'

const useArchivistApi = () => {
  return useContext(ArchivistApiContext)
}

export { useArchivistApi }
