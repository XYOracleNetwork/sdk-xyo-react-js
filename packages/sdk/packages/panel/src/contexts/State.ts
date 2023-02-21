/* eslint-disable deprecation/deprecation */
import { ArchivistModule } from '@xyo-network/archivist'
import { XyoBoundWitness } from '@xyo-network/boundwitness-model'
import { SentinelModule } from '@xyo-network/sentinel'
import { WitnessWrapper } from '@xyo-network/witness'

/** @deprecated - use sentinel package instead */
export enum ReportStatus {
  Idle = 'idle',
  Queued = 'queued',
  Started = 'started',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

/** @deprecated - use sentinel package instead */
export interface WitnessReportProgress {
  status: ReportStatus
  witness: WitnessWrapper
}

/** @deprecated - use sentinel package instead */
export interface ArchivistApiReportProgress {
  archivist: ArchivistModule
  status: ReportStatus
}

/** @deprecated - use sentinel package instead */
export interface PanelReportProgress {
  archivists?: Record<string, ArchivistApiReportProgress>
  witnesses?: Record<string, WitnessReportProgress>
}

/** @deprecated - use sentinel package instead */
export interface PanelContextState {
  history?: XyoBoundWitness[]
  panel?: SentinelModule
  progress?: PanelReportProgress
  reportingErrors?: Error[]
  status?: ReportStatus
}
