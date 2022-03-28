import { createContext } from 'react'

import { ArchivistApiState } from './ArchivistApiState'

const ArchivistApiContext = createContext<ArchivistApiState>({})

export { ArchivistApiContext }
