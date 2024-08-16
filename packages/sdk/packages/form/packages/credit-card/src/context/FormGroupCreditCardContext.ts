import type { FormGroupContextWithPayloadState } from '@xyo-network/react-form-group'
import { createContextEx } from '@xyo-network/react-shared'

import type { CreditCardInput } from '../models/index.ts'

export const FormGroupCreditCardContext = createContextEx<FormGroupContextWithPayloadState<CreditCardInput, CreditCardInput>>()
