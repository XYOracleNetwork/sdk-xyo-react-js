import type { PayloadDiviner } from '@xyo-network/diviner-payload-abstract'
import type { Dispatch } from 'react'

export interface PayloadDivinerState {
  diviner?: PayloadDiviner
  setDiviner?: Dispatch<PayloadDiviner>
}
