import type { Dispatch } from 'react'

import type { ListMode } from '../../models/index.ts'
import type { ContextExState } from '../contextEx/index.ts'

export interface ListModeContextState extends ContextExState {
  listMode: ListMode
  setListMode?: Dispatch<ListMode>
}
