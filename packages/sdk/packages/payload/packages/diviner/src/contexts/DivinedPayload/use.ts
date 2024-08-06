import { useContextEx } from '@xyo-network/react-shared'

import { DivinedPayloadContext } from './Context.ts'

export const useDivinedPayload = () => useContextEx(DivinedPayloadContext, 'DivinedPayload', true)
