import { ArchivistInstance } from '@xyo-network/archivist-model'

export interface IndexedSources {
  /** diviner that can check the the archivist for the latest results */
  diviners: string[]
  /** the archivist to store the resolved payloads from index payloads */
  storageArchivist?: ArchivistInstance
}
