import { PayloadArchivist } from '@xyo-network/archivist'
import { Dispatch } from 'react'

export interface ArchivistState {
  archivist?: PayloadArchivist
  setArchivist?: Dispatch<PayloadArchivist>
}
