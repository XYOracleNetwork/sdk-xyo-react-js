import type { ContextExState } from '@xylabs/react-shared'
import type { Dispatch, SetStateAction } from 'react'

export type NodeDrawerState = ContextExState<{
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}>
