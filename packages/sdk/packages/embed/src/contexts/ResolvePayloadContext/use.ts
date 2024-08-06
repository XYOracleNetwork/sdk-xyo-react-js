import { useContextEx } from '@xyo-network/react-shared'

import { ResolvePayloadContext } from './Context.ts'

export const useResolvePayload = () => useContextEx(ResolvePayloadContext, 'ResolvePayload', true)
