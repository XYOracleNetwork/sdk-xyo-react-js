import { Payload } from '@xyo-network/payload-model'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch } from 'react'

export interface DivinedPayloadState extends ContextExState {
  payload?: Payload | null
  payloadError?: Error
  setPayload?: Dispatch<Payload | null | undefined>
}
