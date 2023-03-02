import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface NodeDrawerState extends ContextExState {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}
