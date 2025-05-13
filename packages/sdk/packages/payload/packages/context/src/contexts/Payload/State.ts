import type { ContextExState } from '@xylabs/react-shared'
import type { Payload } from '@xyo-network/payload-model'
import type { Dispatch, SetStateAction } from 'react'

export type PayloadFromHash = Payload | null | undefined

export type PayloadContextState = ContextExState<{
  clearPayload?: () => void
  payload?: PayloadFromHash
  payloadError?: Error
  refreshPayload?: () => void
  setPayload?: Dispatch<SetStateAction<PayloadFromHash>>
}>
