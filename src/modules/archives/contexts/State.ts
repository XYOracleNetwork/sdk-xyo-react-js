import { XyoArchive } from '@xyo-network/api'
import { Dispatch } from 'react'

import { ContextExState } from '../../context-ex'

export interface ArchivesContextState extends ContextExState {
  archives?: XyoArchive[]
  setArchives?: Dispatch<XyoArchive[]>
  refresh?: (mounted: () => boolean) => Promise<void>
}
