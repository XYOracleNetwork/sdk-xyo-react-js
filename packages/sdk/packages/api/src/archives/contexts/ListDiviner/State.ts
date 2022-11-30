import { ArchiveListApiDiviner } from '@xyo-network/api'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface ArchiveListApiDivinerState extends ContextExState {
  diviner?: ArchiveListApiDiviner
  setDiviner?: Dispatch<SetStateAction<ArchiveListApiDiviner | undefined>>
}
