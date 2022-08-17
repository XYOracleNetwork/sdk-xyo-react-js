import { XyoApiError } from '@xyo-network/api'
import { XyoPayload } from '@xyo-network/payload'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface ResolvePayloadState extends ContextExState {
  huri?: string
  huriApiError?: XyoApiError
  huriPayload?: string | XyoPayload
  notFound?: boolean
  payload?: XyoPayload
  refreshHuri?: () => void
  setPayload?: Dispatch<SetStateAction<XyoPayload | undefined>>
}
