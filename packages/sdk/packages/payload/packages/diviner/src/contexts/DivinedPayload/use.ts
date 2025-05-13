import { useContextEx } from '@xylabs/react-shared'

import { DivinedPayloadContext } from './Context.ts'

export const useDivinedPayload = () => useContextEx(DivinedPayloadContext, 'DivinedPayload', true)
