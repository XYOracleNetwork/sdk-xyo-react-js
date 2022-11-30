import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch } from 'react'

export interface ArchiveContextState extends ContextExState {
  archive?: string
  setArchive?: Dispatch<string>
}
