import type { ArchivistModule } from '@xyo-network/archivist-model'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import type { SentinelModule } from '@xyo-network/sentinel-model'
import type { WitnessModule } from '@xyo-network/witness-model'

export enum SentinelReportStatus {
  Idle = 'idle',
  Queued = 'queued',
  Started = 'started',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export interface SentinelWitnessReportProgress {
  status: SentinelReportStatus
  witness: WitnessModule
}

export interface SentinelArchivistApiReportProgress {
  archivist: ArchivistModule
  status: SentinelReportStatus
}

export interface SentinelReportProgress {
  archivists?: Record<string, SentinelArchivistApiReportProgress>
  witnesses?: Record<string, SentinelWitnessReportProgress>
}

export interface SentinelContextState {
  history?: BoundWitness[]
  progress?: SentinelReportProgress
  reportingErrors?: Error[]
  sentinel?: SentinelModule
  status?: SentinelReportStatus
}
