import { createContextEx } from '../../context-ex'
import { ArchivistApiState } from './State'

const ArchivistApiContext = createContextEx<ArchivistApiState>()

export { ArchivistApiContext }
