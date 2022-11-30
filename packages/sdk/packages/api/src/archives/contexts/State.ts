import { XyoArchive } from '@xyo-network/api'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch } from 'react'

export interface ArchivesContextState extends ContextExState {
  archives?: XyoArchive[]
  setArchives?: Dispatch<XyoArchive[]>
  /** @deprecated */
  refresh?: (mounted: () => boolean) => Promise<void>
  refreshList?: () => void
  error?: Error
}
