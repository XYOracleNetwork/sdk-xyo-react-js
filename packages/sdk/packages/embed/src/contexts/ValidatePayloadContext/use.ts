import { useContextEx } from '@xylabs/react-shared'

import { ValidatePayloadContext } from './Context.ts'

export const useValidatePayload = () => useContextEx(ValidatePayloadContext, 'ValidateSchema', true)
