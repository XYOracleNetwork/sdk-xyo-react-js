import { assertEx } from '@xylabs/sdk-js'
import { XyoArchivistApi } from '@xyo-network/sdk-xyo-client-js'
import { useContext } from 'react'

import { ArchivistApiContext } from './Context'

const useArchivistApi = () => {
  const context = useContext(ArchivistApiContext)
  assertEx(context.api, 'Archivist Api not initialized')
  //we do the cast to make the api non-optional
  return context as { api: XyoArchivistApi }
}

export { useArchivistApi }
