import { useContextEx } from '@xylabs/react-shared'

import { CytoscapeInstanceContext } from './Context.ts'

export const useCytoscapeInstance = (required = false) => useContextEx(CytoscapeInstanceContext, 'CytoscapeInstance', required)
