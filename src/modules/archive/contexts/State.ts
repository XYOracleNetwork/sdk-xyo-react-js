import { Dispatch } from 'react'

import { ContextExState } from '../../context-ex'

export interface ArchiveContextState extends ContextExState {
  archive?: string
  setArchive?: Dispatch<string>
}
