import { PayloadDiviner } from '@xyo-network/diviner-payload-abstract'
import { Dispatch } from 'react'

export interface PayloadDivinerState {
  diviner?: PayloadDiviner
  setDiviner?: Dispatch<PayloadDiviner>
}
