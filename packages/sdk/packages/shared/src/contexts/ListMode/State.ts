import type { ContextExState } from '@xylabs/react-shared'
import type { Dispatch } from 'react'

import type { ListMode } from '../../models/index.ts'

export type ListModeContextState = ContextExState<{
  listMode: ListMode
  setListMode?: Dispatch<ListMode>
}>
