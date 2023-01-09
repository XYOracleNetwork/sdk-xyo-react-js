import { ArchivistWrapper } from '@xyo-network/archivist-wrapper'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch } from 'react'

export interface ArchiveContextState extends ContextExState {
  archive?: string
  archivePayloadArchivist?: ArchivistWrapper
  archiveBoundWitnessArchivist?: ArchivistWrapper
  setArchive?: Dispatch<string>
}
