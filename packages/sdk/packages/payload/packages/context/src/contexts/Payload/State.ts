import { XyoPayload } from '@xyo-network/payload-model'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch } from 'react'

export interface PayloadContextState extends ContextExState {
  payload?: XyoPayload | null
  setPayload?: Dispatch<XyoPayload>
}
