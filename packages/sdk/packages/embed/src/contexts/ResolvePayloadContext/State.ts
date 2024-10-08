import type { ModuleError, Payload } from '@xyo-network/payload-model'
import type { ContextExState } from '@xyo-network/react-shared'
import type { Dispatch, SetStateAction } from 'react'

export interface ResolvePayloadState extends ContextExState {
  huri?: string
  huriError?: ModuleError
  huriPayload?: string | Payload
  notFound?: boolean
  payload?: Payload
  refreshHuri?: () => void
  setPayload?: Dispatch<SetStateAction<Payload | undefined>>
}
