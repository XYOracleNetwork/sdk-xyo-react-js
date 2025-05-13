import { useContextEx } from '@xylabs/react-shared'

import { StandardNodesContext } from './Context.ts'

export const useStandardNodes = (required = false) => useContextEx(StandardNodesContext, 'StandardNodes', required)
