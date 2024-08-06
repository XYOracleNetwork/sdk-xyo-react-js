import { useContextEx } from '@xyo-network/react-shared'

import { StandardNodesContext } from './Context.ts'

export const useStandardNodes = (required = false) => useContextEx(StandardNodesContext, 'StandardNodes', required)
