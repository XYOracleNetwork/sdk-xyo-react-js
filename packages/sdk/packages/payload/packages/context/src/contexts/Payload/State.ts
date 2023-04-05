import { Payload } from '@xyo-network/payload-model'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

type PayloadFromHash = Payload | null | undefined

export interface PayloadContextState extends ContextExState {
  clearPayload?: () => void
  payload?: PayloadFromHash
  payloadError?: Error
  refreshPayload?: () => void
  setPayload?: Dispatch<SetStateAction<PayloadFromHash>>
}
