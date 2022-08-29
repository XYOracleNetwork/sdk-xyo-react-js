import { createContextEx } from '@xyo-network/react-shared'

import { ArchivistApiState } from './State'

const ArchivistApiContext = createContextEx<ArchivistApiState>()

export { ArchivistApiContext }
