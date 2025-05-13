import type { ContextExState } from '@xylabs/react-shared'
import type { PayloadDiviner } from '@xyo-network/diviner-payload-abstract'
import type { Dispatch } from 'react'

export type PayloadDivinerState = ContextExState<{
  diviner?: PayloadDiviner
  setDiviner?: Dispatch<PayloadDiviner>
}>
