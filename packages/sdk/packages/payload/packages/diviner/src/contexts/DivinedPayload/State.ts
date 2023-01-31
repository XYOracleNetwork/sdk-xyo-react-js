import { XyoPayload } from '@xyo-network/payload-model'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch } from 'react'

export interface DivinedPayloadState extends ContextExState {
  payload?: XyoPayload | null
  payloadError?: Error
  setPayload?: Dispatch<XyoPayload | null | undefined>
}
