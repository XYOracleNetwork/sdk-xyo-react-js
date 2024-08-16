import { createContextEx } from '@xyo-network/react-shared'

import type { CytoscapeInstanceState } from './State.ts'

export const CytoscapeInstanceContext = createContextEx<CytoscapeInstanceState>()
