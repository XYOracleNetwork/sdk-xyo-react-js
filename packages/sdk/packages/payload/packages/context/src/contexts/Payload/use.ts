import { useContextEx } from '@xyo-network/react-shared'

import { PayloadContext } from './Context.js'

export const usePayload = (required = false) => {
  return useContextEx(PayloadContext, 'Payload', required)
}
