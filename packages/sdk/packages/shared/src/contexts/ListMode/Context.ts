import { createContextEx } from '../contextEx/index.ts'
import type { ListModeContextState } from './State.ts'

export const ListModeContext = createContextEx<ListModeContextState>()
