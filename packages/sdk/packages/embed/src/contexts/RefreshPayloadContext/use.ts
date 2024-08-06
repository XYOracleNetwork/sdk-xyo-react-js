import { useContextEx } from '@xyo-network/react-shared'

import { RefreshPayloadContext } from './Context.ts'

export const useRefreshPayload = () => useContextEx(RefreshPayloadContext, 'RefreshPayload', true)
