import { AbstractArchivist } from '@xyo-network/archivist'
import { Dispatch } from 'react'

export interface ArchivistState {
  archivist?: AbstractArchivist
  setArchivist?: Dispatch<AbstractArchivist>
}
