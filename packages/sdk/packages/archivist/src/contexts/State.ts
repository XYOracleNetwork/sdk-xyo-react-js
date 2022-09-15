import { Archivist } from '@xyo-network/archivist'
import { Dispatch } from 'react'

export interface ArchivistState {
  archivist?: Archivist
  setArchivist?: Dispatch<Archivist>
}
