import { ContextExState } from '@xyo-network/react-sdk'
import { Dispatch, SetStateAction } from 'react'

export interface NodeDrawerState extends ContextExState {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}
