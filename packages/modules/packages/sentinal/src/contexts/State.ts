import { ArchivistModule } from '@xyo-network/archivist'
import { XyoBoundWitness } from '@xyo-network/boundwitness-model'
import { SentinelModule } from '@xyo-network/sentinel'
import { WitnessModule } from '@xyo-network/witness'

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
  history?: XyoBoundWitness[]
  progress?: SentinelReportProgress
  reportingErrors?: Error[]
  sentinel?: SentinelModule
  status?: SentinelReportStatus
}
