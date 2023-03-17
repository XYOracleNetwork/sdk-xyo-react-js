import { Payload } from '@xyo-network/payload-model'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

type PayloadFromHash = Payload | null | undefined

export interface PayloadContextState extends ContextExState {
  payload?: PayloadFromHash
  payloadError?: Error
  setPayload?: Dispatch<SetStateAction<PayloadFromHash>>
}
