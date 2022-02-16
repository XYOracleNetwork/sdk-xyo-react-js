import { XyoArchivistApi, XyoBoundWitness, XyoPanel, XyoWitness } from '@xyo-network/sdk-xyo-client-js'
import { createContext } from 'react'

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
  status: XyoReportStatus
}

export interface XyoPanelContextProps {
  panel?: XyoPanel
  history?: XyoBoundWitness[]
  progress?: XyoPanelReportProgress
  reportingErrors?: Error[]
}

export const XyoPanelContext = createContext<XyoPanelContextProps>({})
