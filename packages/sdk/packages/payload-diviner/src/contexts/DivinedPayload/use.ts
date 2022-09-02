import { useContextEx } from '@xyo-network/react-shared'

import { DivinedPayloadContext } from './Context'

export const useDivinedPayload = () => useContextEx(DivinedPayloadContext, 'DivinedPayload', true)
