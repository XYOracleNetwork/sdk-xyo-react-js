import { XyoArchivistApi } from '@xyo-network/api'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPanel } from '@xyo-network/panel'
import { XyoWitness } from '@xyo-network/witnesses'

export enum XyoReportStatus {
  Idle = 'idle',
  Queued = 'queued',
  Started = 'started',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export interface XyoWitnessReportProgress {
  witness: XyoWitness
  status: XyoReportStatus
}

export interface XyoArchivistApiReportProgress {
  archivist: XyoArchivistApi
  status: XyoReportStatus
}

export interface XyoPanelReportProgress {
  witnesses?: Record<string, XyoWitnessReportProgress>
  archivists?: Record<string, XyoArchivistApiReportProgress>
}

export interface XyoPanelContextState {
  panel?: XyoPanel
  history?: XyoBoundWitness[]
  progress?: XyoPanelReportProgress
  status?: XyoReportStatus
  reportingErrors?: Error[]
}
