import { AbstractPayloadDiviner } from '@xyo-network/diviner'
import { Dispatch } from 'react'

export interface PayloadDivinerState {
  diviner?: AbstractPayloadDiviner
  setDiviner?: Dispatch<AbstractPayloadDiviner>
}
