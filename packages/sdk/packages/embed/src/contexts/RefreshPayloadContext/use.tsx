import { useContextEx } from '@xyo-network/react-shared'

import { RefreshPayloadContext } from './Context'

export const useRefreshPayload = () => useContextEx(RefreshPayloadContext, 'RefreshPayload', true)
