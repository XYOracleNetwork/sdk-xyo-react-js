import { XyoArchive } from '@xyo-network/sdk-xyo-client-js'
import { Dispatch } from 'react'

import { ContextExState } from '../../context-ex'

export interface ArchivesContextState extends ContextExState {
  archives?: XyoArchive[]
  setArchives?: Dispatch<XyoArchive[]>
  refresh?: (mounted?: () => boolean) => void
}
