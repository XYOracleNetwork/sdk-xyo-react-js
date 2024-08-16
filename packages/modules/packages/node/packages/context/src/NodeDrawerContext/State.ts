import type { ContextExState } from '@xyo-network/react-shared'
import type { Dispatch, SetStateAction } from 'react'

export interface NodeDrawerState extends ContextExState {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}
