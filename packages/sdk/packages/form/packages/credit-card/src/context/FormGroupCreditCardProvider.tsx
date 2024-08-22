import type { Payload } from '@xyo-network/payload-model'
import type { FormGroupParams } from '@xyo-network/react-form-group'
import { FormGroup } from '@xyo-network/react-form-group'
import type { PropsWithChildren } from 'react'
import React, { useMemo } from 'react'

import type { CreditCardInput } from '../models/index.ts'
import { FormGroupCreditCardContext } from './FormGroupCreditCardContext.ts'

export interface FormGroupCreditCardProviderProps<TStorage extends Payload = Payload> extends PropsWithChildren {
  params?: FormGroupParams<TStorage>
}

export const FormGroupCreditCardProvider: React.FC<FormGroupCreditCardProviderProps<CreditCardInput>> = ({
  children, params, ...props
}) => {
  const formGroup = useMemo(() => {
    const formGroup = new FormGroup<CreditCardInput, CreditCardInput>(params)
    return formGroup
  }, [params])

  const value = useMemo(() => ({ formGroup, provided: true }), [formGroup])

  return (

    <FormGroupCreditCardContext.Provider
      value={value}
      {...props}
    >
      {children}
    </FormGroupCreditCardContext.Provider>
  )
}
