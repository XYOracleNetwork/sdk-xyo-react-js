import { Payload } from '@xyo-network/payload-model'
import React, { PropsWithChildren, useMemo } from 'react'

import { FormGroup, FormGroupParams } from '../FormGroup.ts'
import { FormGroupBaseContext } from './Context.ts'

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
    // eslint-disable-next-line @eslint-react/no-unstable-context-value
    <FormGroupBaseContext.Provider value={{ formGroup, provided: true }} {...props}>
      {children}
    </FormGroupBaseContext.Provider>
  )
}
