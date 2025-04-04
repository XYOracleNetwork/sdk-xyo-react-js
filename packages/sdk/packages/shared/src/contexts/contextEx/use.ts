import type { Context } from 'react'
import { use } from 'react'

import type { ContextExState } from './State.ts'

export const useContextEx = <T extends ContextExState>(context: Context<T>, contextName: string, required = true) => {
  const { provided, ...props } = use(context)
  if (!provided && required) {
    throw new Error(`use${contextName} can not be used outside of a ${contextName}Context when required=true`)
  }
  return props
}

export const useProvided = <T extends ContextExState>(context: Context<T>) => {
  const { provided } = use(context)
  return provided
}
