import { createContextEx } from '@xylabs/react-shared'

import type { ListModeContextState } from './State.ts'

export const ListModeContext = createContextEx<ListModeContextState>()
