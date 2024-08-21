import type { Payload } from '@xyo-network/payload-model'
import type { PropsWithChildren } from 'react'
import React, { useMemo } from 'react'

import type { FormGroupParams } from '../FormGroup.ts'
import { FormGroup } from '../FormGroup.ts'
import { FormGroupBaseContext } from './Context.ts'

export interface FormGroupPayloadProviderProps<TStorage extends Payload = Payload> extends PropsWithChildren {
  params?: FormGroupParams<TStorage>
}

/**
 * Provides a FormGroup to child components.
 */
export const FormGroupPayloadProvider = ({
  children, params, ...props
}: FormGroupPayloadProviderProps) => {
  const formGroup = useMemo(() => {
    const formGroup = new FormGroup<Payload, Payload>(params)
    return formGroup
  }, [params])

  const value = useMemo(() => ({
    formGroup, provided: true,
  }), [formGroup])

  return (

    <FormGroupBaseContext.Provider
      value={value}
      {...props}
    >
      {children}
    </FormGroupBaseContext.Provider>
  )
}
