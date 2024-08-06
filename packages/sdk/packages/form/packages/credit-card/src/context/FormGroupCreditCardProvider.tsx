import { Payload } from '@xyo-network/payload-model'
import { FormGroup, FormGroupParams } from '@xyo-network/react-form-group'
import React, { PropsWithChildren, useMemo } from 'react'

import { CreditCardInput } from '../models/index.ts'
import { FormGroupCreditCardContext } from './FormGroupCreditCardContext.ts'

export interface FormGroupCreditCardProviderProps<TStorage extends Payload = Payload> extends PropsWithChildren {
  params?: FormGroupParams<TStorage>
}

export const FormGroupCreditCardProvider: React.FC<FormGroupCreditCardProviderProps<CreditCardInput>> = ({ children, params, ...props }) => {
  const formGroup = useMemo(() => {
    const formGroup = new FormGroup<CreditCardInput, CreditCardInput>(params)
    return formGroup
  }, [params])

  return (
    // eslint-disable-next-line @eslint-react/no-unstable-context-value
    <FormGroupCreditCardContext.Provider value={{ formGroup, provided: true }} {...props}>
      {children}
    </FormGroupCreditCardContext.Provider>
  )
}
