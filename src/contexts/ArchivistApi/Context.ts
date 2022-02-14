import { createContext } from 'react'

import { ArchivistApiState } from './ArchivistApiTypes'

const ArchivistApiContext = createContext<ArchivistApiState>({})

export { ArchivistApiContext }
