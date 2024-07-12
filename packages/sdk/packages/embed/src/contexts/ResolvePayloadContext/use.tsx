import { useContextEx } from '@xyo-network/react-shared'

import { ResolvePayloadContext } from './Context.js'

export const useResolvePayload = () => useContextEx(ResolvePayloadContext, 'ResolvePayload', true)
