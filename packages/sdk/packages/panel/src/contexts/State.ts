import { AbstractArchivist } from '@xyo-network/archivist'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPanel } from '@xyo-network/panel'
import { WitnessWrapper } from '@xyo-network/witness'

export enum ReportStatus {
  Idle = 'idle',
  Queued = 'queued',
  Started = 'started',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export interface WitnessReportProgress {
  witness: WitnessWrapper
  status: ReportStatus
}

export interface ArchivistApiReportProgress {
  archivist: AbstractArchivist
  status: ReportStatus
}

export interface PanelReportProgress {
  witnesses?: Record<string, WitnessReportProgress>
  archivists?: Record<string, ArchivistApiReportProgress>
}

export interface PanelContextState {
  panel?: XyoPanel
  history?: XyoBoundWitness[]
  progress?: PanelReportProgress
  status?: ReportStatus
  reportingErrors?: Error[]
}
