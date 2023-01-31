import { XyoArchive } from '@xyo-network/api'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch } from 'react'

export interface ArchivesContextState extends ContextExState {
  archives?: XyoArchive[]
  error?: Error
  /** @deprecated */
  refresh?: (mounted: () => boolean) => Promise<void>
  refreshList?: () => void
  setArchives?: Dispatch<XyoArchive[]>
}
