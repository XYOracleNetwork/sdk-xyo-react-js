import { useContextEx } from '@xyo-network/react-shared'

import { ValidatePayloadContext } from './Context'

export const useValidatePayload = () => useContextEx(ValidatePayloadContext, 'ValidateSchemaContext', true)
