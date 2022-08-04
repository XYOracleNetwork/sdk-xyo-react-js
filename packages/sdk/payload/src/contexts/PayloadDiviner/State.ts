import { XyoPayloadDiviner } from '@xyo-network/diviner'
import { Dispatch } from 'react'

export interface PayloadDivinerState {
  diviner?: XyoPayloadDiviner
  setDiviner?: Dispatch<XyoPayloadDiviner>
}
