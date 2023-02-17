import { ContextExState } from '@xyo-network/react-shared'

export interface ValidatePayloadState extends ContextExState {
  enabled?: boolean
  schema?: string
  validPayload?: boolean
}
