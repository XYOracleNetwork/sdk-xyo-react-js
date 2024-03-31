import { ArchivistModule } from '@xyo-network/archivist-model'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { SentinelModule } from '@xyo-network/sentinel-model'
import { WitnessModule } from '@xyo-network/witness-model'

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
