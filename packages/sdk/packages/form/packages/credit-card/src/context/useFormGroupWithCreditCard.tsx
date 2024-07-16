import { assertEx } from '@xylabs/assert'
import { FormGroupContext, FormGroupContextWithPayloadState } from '@xyo-network/react-form-group'
import { useContextEx } from '@xyo-network/react-shared'
import { Context } from 'react'

import { CreditCardInput } from '../models/index.js'

export const useFormGroupWithCreditCardInput = (required = false, name: keyof typeof FormGroupContext = 'creditCardInput') => {
  const context = assertEx(FormGroupContext[name], () => `FormGroupContext.${name} is not defined`) as Context<
    FormGroupContextWithPayloadState<CreditCardInput, CreditCardInput>
  >
  return useContextEx(context, 'FormGroup', required)
}
