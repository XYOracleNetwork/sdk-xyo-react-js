import { XyoArchivistApi, XyoBoundWitness, XyoPanel, XyoWitness } from '@xyo-network/sdk-xyo-client-js'

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
