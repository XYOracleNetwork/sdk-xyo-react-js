import type { ContextExState } from '@xylabs/react-shared'
import type { Payload } from '@xyo-network/payload-model'
import type { Dispatch } from 'react'

export type DivinedPayloadState = ContextExState<{
  payload?: Payload | null
  payloadError?: Error
  setPayload?: Dispatch<Payload | null | undefined>
}>
