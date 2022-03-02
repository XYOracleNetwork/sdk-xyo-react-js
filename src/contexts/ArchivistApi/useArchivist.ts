import { useContext } from 'react'

import { ArchivistApiContext } from './Context'

const useArchivistApi = () => {
  const { api, authApi, currentToken } = useContext(ArchivistApiContext)

  return { api, authApi, currentToken }
}

export { useArchivistApi }
