import type { EnumValue } from '@xylabs/enum'
import { Enum } from '@xylabs/enum'
import type { ArchivistModule } from '@xyo-network/archivist-model'
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
