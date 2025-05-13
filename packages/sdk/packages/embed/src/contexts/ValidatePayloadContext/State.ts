import type { ContextExState } from '@xylabs/react-shared'

export type ValidatePayloadState = ContextExState<{
  enabled?: boolean
  schema?: string
  validPayload?: boolean
}>
