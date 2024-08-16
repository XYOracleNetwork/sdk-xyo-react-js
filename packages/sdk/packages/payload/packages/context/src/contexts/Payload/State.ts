import type { Payload } from '@xyo-network/payload-model'
import type { ContextExState } from '@xyo-network/react-shared'
import type { Dispatch, SetStateAction } from 'react'

export type PayloadFromHash = Payload | null | undefined

export interface PayloadContextState extends ContextExState {
  clearPayload?: () => void
  payload?: PayloadFromHash
  payloadError?: Error
  refreshPayload?: () => void
  setPayload?: Dispatch<SetStateAction<PayloadFromHash>>
}
