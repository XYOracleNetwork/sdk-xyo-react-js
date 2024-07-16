import { Payload } from '@xyo-network/payload-model'
import { Context, PropsWithChildren, useMemo } from 'react'

import { FormGroup, FormGroupParams } from '../FormGroup.js'
import { FormGroupContextWithPayloadState } from './State.js'

export interface FormGroupPayloadProviderProps<TStorage extends Payload = Payload> extends PropsWithChildren {
  params?: FormGroupParams<TStorage>
}

export interface FormGroupCreditCardProviderProps<TStorage extends Payload = Payload> extends PropsWithChildren {
  Context: Context<FormGroupContextWithPayloadState>
  params?: FormGroupParams<TStorage>
}

/**
 * Provides a FormGroup to child components.
 */
export const FormGroupPayloadProvider = ({ children, Context, params, ...props }: FormGroupCreditCardProviderProps) => {
  const formGroup = useMemo(() => {
    const formGroup = new FormGroup<Payload, Payload>(params)
    return formGroup
  }, [params])

  return (
    <Context.Provider value={{ formGroup, provided: true }} {...props}>
      {children}
    </Context.Provider>
  )
}
