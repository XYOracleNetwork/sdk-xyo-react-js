import { XyoPayload } from '@xyo-network/payload'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch } from 'react'

export interface DivinedPayloadState extends ContextExState {
  payload?: XyoPayload | null
  setPayload?: Dispatch<XyoPayload | null | undefined>
  payloadError?: Error
}
