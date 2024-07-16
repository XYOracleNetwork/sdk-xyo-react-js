import { useContextEx } from '@xyo-network/react-shared'

import { FormGroupCreditCardContext } from './FormGroupCreditCardContext.js'

export const useFormGroupWithCreditCardInput = (required = false) => {
  return useContextEx(FormGroupCreditCardContext, 'FormGroupCreditCard', required)
}
