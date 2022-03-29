import { Dispatch } from 'react'

import { ContextExState } from '../ContextEx'

export interface ArchiveContextState extends ContextExState {
  archive?: string
  setArchive?: Dispatch<string>
}
