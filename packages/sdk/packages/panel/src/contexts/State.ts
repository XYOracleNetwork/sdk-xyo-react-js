import { ArchivistModule } from '@xyo-network/archivist'
import { XyoBoundWitness } from '@xyo-network/boundwitness-model'
import { SentinelModule } from '@xyo-network/sentinel'
import { WitnessWrapper } from '@xyo-network/witness'

export enum ReportStatus {
  Idle = 'idle',
  Queued = 'queued',
  Started = 'started',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export interface WitnessReportProgress {
  status: ReportStatus
  witness: WitnessWrapper
}

export interface ArchivistApiReportProgress {
  archivist: ArchivistModule
  status: ReportStatus
}

export interface PanelReportProgress {
  archivists?: Record<string, ArchivistApiReportProgress>
  witnesses?: Record<string, WitnessReportProgress>
}

export interface PanelContextState {
  history?: XyoBoundWitness[]
  panel?: SentinelModule
  progress?: PanelReportProgress
  reportingErrors?: Error[]
  status?: ReportStatus
}
