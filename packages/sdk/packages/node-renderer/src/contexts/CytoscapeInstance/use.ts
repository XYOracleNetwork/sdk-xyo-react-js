import { useContextEx } from '@xyo-network/react-shared'

import { CytoscapeInstanceContext } from './Context.ts'

export const useCytoscapeInstance = (required = false) => useContextEx(CytoscapeInstanceContext, 'CytoscapeInstance', required)
