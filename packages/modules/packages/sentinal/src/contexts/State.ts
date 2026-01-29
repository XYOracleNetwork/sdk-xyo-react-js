import type { ContextExState } from '@xylabs/react-shared'
import type { EnumValue } from '@xylabs/sdk-js'
import { Enum } from '@xylabs/sdk-js'
import type { ArchivistModuleInstance } from '@xyo-network/archivist-model'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import type { SentinelModule } from '@xyo-network/sentinel-model'
import type { WitnessModule } from '@xyo-network/witness-model'

export const SentinelReportStatus = Enum({
  Idle: 'idle',
  Queued: 'queued',
  Started: 'started',
  Succeeded: 'succeeded',
  Failed: 'failed',
})

export type SentinelReportStatus = EnumValue<typeof SentinelReportStatus>

export interface SentinelWitnessReportProgress {
  status: SentinelReportStatus
  witness: WitnessModule
}

export interface SentinelArchivistApiReportProgress {
  archivist: ArchivistModuleInstance
  status: SentinelReportStatus
}

export interface SentinelReportProgress {
  archivists?: Record<string, SentinelArchivistApiReportProgress>
  witnesses?: Record<string, SentinelWitnessReportProgress>
}

export type SentinelContextState = ContextExState<{
  history?: BoundWitness[]
  progress?: SentinelReportProgress
  reportingErrors?: Error[]
  sentinel?: SentinelModule
  status?: SentinelReportStatus
}>
