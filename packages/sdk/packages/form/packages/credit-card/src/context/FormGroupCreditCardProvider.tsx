import { Payload } from '@xyo-network/payload-model'
import { FormGroup, FormGroupParams } from '@xyo-network/react-form-group'
import { PropsWithChildren, useMemo } from 'react'

import { CreditCardInput } from '../models/CreditCardInput.js'
import { FormGroupCreditCardContext } from './FormGroupCreditCardContext.js'

export interface FormGroupCreditCardProviderProps<TStorage extends Payload = Payload> extends PropsWithChildren {
  params?: FormGroupParams<TStorage>
}

export const FormGroupCreditCardProvider: React.FC<FormGroupCreditCardProviderProps<CreditCardInput>> = ({ children, params, ...props }) => {
  const formGroup = useMemo(() => {
    const formGroup = new FormGroup<CreditCardInput, CreditCardInput>(params)
    return formGroup
  }, [params])

  return (
    <FormGroupCreditCardContext.Provider value={{ formGroup, provided: true }} {...props}>
      {children}
    </FormGroupCreditCardContext.Provider>
  )
}