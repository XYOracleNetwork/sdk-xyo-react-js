import { XyoError } from '@xyo-network/module'
import { XyoPayload } from '@xyo-network/payload'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface ResolvePayloadState extends ContextExState {
  huri?: string
  huriError?: XyoError
  huriPayload?: string | XyoPayload
  notFound?: boolean
  payload?: XyoPayload
  refreshHuri?: () => void
  setPayload?: Dispatch<SetStateAction<XyoPayload | undefined>>
}
