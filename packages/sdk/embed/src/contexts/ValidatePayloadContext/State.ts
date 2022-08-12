import { ContextExState } from '@xyo-network/react-shared'

export interface ValidatePayloadState extends ContextExState {
  validPayload?: boolean
  schema?: string
  enabled?: boolean
}
