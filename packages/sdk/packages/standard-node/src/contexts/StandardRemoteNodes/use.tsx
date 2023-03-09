import { useContextEx } from '@xyo-network/react-shared'

import { StandardNodesContext } from './Context'

export const useStandardNodes = (required = false) => useContextEx(StandardNodesContext, 'StandardNodes', required)
