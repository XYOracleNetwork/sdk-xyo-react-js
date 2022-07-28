import { Context, useContext } from 'react'

import { ContextExState } from './State'

export const useContextEx = <T extends ContextExState>(context: Context<T>, contextName: string, required = true) => {
  const { provided, ...props } = useContext(context)
  if (!provided && required) {
    throw Error(`use${contextName} can not be used outside of a ${contextName}Context when required=true`)
  }
  return props
}
