import { useContextEx } from '@xyo-network/react-shared'

import { RefreshPayloadContext } from './Context.js'

export const useRefreshPayload = () => useContextEx(RefreshPayloadContext, 'RefreshPayload', true)
