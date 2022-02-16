import { assertEx } from '@xylabs/sdk-js'
import { XyoArchivistApi } from '@xyo-network/sdk-xyo-client-js'
import { useContext } from 'react'

import { ArchivistApiState } from './ArchivistApiTypes'
import { ArchivistApiContext } from './Context'

interface ArchivistApiContext extends ArchivistApiState {
  //make the api non-optional
  api: XyoArchivistApi
}

const useArchivistApi = () => {
  const { api, currentToken } = useContext(ArchivistApiContext)

  return { api: assertEx(api, 'Archivist Api not initialized'), currentToken }
}

export { useArchivistApi }
