import { XyoArchivist } from '@xyo-network/archivist'
import { Dispatch } from 'react'

export interface ArchivistState {
  archivist?: XyoArchivist
  setArchivist?: Dispatch<XyoArchivist>
}
