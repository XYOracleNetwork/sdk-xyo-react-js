import { createContextEx } from '../ContextEx'
import { ArchivistApiState } from './State'

const ArchivistApiContext = createContextEx<ArchivistApiState>()

export { ArchivistApiContext }
