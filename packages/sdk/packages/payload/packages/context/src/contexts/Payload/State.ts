import { XyoPayload } from '@xyo-network/payload-model'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

type PayloadFromHash = XyoPayload | null | undefined

export interface PayloadContextState extends ContextExState {
  payload?: PayloadFromHash
  payloadError?: Error
  setPayload?: Dispatch<SetStateAction<PayloadFromHash>>
}
