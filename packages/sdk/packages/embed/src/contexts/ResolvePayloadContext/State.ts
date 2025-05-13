import type { ContextExState } from '@xylabs/react-shared'
import type { ModuleError, Payload } from '@xyo-network/payload-model'
import type { Dispatch, SetStateAction } from 'react'

export type ResolvePayloadState = ContextExState<{
  huri?: string
  huriError?: ModuleError
  huriPayload?: string | Payload
  notFound?: boolean
  payload?: Payload
  refreshHuri?: () => void
  setPayload?: Dispatch<SetStateAction<Payload | undefined>>
}>
