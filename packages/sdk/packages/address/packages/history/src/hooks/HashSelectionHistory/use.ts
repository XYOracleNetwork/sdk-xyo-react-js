import { useContextEx } from '@xylabs/react-shared'

import { HashSelectionHistoryContext } from '../../contexts/index.ts'

export const usePayloadHashSelectionHistory = (required = true) => useContextEx(HashSelectionHistoryContext, 'HashSelectionHistory', required)
