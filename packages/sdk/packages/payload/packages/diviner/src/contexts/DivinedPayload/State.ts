import type { Payload } from '@xyo-network/payload-model'
import type { ContextExState } from '@xyo-network/react-shared'
import type { Dispatch } from 'react'

export interface DivinedPayloadState extends ContextExState {
  payload?: Payload | null
  payloadError?: Error
  setPayload?: Dispatch<Payload | null | undefined>
}
