import { useContextEx } from '@xylabs/react-shared'

import { ResolvePayloadContext } from './Context.ts'

export const useResolvePayload = () => useContextEx(ResolvePayloadContext, 'ResolvePayload', true)
