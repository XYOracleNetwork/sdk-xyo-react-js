import { ArchivistModule } from '@xyo-network/archivist'
import { Dispatch } from 'react'

export interface ArchivistState {
  archivist?: ArchivistModule
  setArchivist?: Dispatch<ArchivistModule>
}
