import { Dispatch } from 'react'

import { ContextExState } from '../ContextEx'

export interface ArchivesContextState extends ContextExState {
  archives?: string[]
  setArchives?: Dispatch<string[]>
  refresh?: (mounted?: () => boolean) => void
}
