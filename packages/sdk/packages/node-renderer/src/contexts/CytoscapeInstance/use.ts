import { useContextEx } from '@xyo-network/react-shared'

import { CytoscapeInstanceContext } from './Context'

export const useCytoscapeInstance = (required = false) => useContextEx(CytoscapeInstanceContext, 'CytoscapeInstance', required)
