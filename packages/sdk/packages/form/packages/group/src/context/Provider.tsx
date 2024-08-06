import { Payload } from '@xyo-network/payload-model'
import React, { PropsWithChildren, useMemo } from 'react'

import { FormGroup, FormGroupParams } from '../FormGroup.js'
import { FormGroupBaseContext } from './Context.js'

export interface FormGroupPayloadProviderProps<TStorage extends Payload = Payload> extends PropsWithChildren {
  params?: FormGroupParams<TStorage>
}

/**
 * Provides a FormGroup to child components.
 */
export const FormGroupPayloadProvider = ({ children, params, ...props }: FormGroupPayloadProviderProps) => {
  const formGroup = useMemo(() => {
    const formGroup = new FormGroup<Payload, Payload>(params)
    return formGroup
  }, [params])

  return (
    <FormGroupBaseContext.Provider value={{ formGroup, provided: true }} {...props}>
      {children}
    </FormGroupBaseContext.Provider>
  )
}
