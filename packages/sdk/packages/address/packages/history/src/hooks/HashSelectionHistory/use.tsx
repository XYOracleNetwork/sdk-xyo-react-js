import { useContextEx } from '@xyo-network/react-shared'

import { HashSelectionHistoryContext } from '../../contexts/index.js'

export const usePayloadHashSelectionHistory = (required = true) => useContextEx(HashSelectionHistoryContext, 'HashSelectionHistory', required)
