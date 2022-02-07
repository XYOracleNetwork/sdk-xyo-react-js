import { XyoArchivistApi } from '@xyo-network/sdk-xyo-client-js'
import { createContext } from 'react'

const ArchivistApiContext = createContext<{ api?: XyoArchivistApi }>({})

export { ArchivistApiContext }
