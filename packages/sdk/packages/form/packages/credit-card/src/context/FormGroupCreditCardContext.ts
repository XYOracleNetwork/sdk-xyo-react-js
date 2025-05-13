import { createContextEx } from '@xylabs/react-shared'
import type { FormGroupContextWithPayloadState } from '@xyo-network/react-form-group'

import type { CreditCardInput } from '../models/index.ts'

export const FormGroupCreditCardContext = createContextEx<FormGroupContextWithPayloadState<CreditCardInput, CreditCardInput>>()
