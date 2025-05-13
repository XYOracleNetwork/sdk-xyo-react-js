import { createContextEx } from '@xylabs/react-shared'

import type { CytoscapeInstanceState } from './State.ts'

export const CytoscapeInstanceContext = createContextEx<CytoscapeInstanceState>()
