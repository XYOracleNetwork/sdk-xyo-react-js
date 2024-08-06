import { useContextEx } from '@xyo-network/react-shared'

import { ValidatePayloadContext } from './Context.ts'

export const useValidatePayload = () => useContextEx(ValidatePayloadContext, 'ValidateSchema', true)
