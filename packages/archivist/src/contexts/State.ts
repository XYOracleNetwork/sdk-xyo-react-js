import { XyoArchivist } from '@xyo-network/api'
import { Dispatch } from 'react'

export interface ArchivistState {
  archivist?: XyoArchivist
  setArchivist?: Dispatch<XyoArchivist>
}
