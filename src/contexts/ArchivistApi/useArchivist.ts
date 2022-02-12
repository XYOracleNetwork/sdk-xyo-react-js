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
  const context = useContext(ArchivistApiContext)
  assertEx(context.api, 'Archivist Api not initialized')

  return context as ArchivistApiContext
}

export { useArchivistApi }
