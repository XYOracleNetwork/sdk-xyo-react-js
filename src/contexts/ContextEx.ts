import { Context, createContext, useContext } from 'react'

export interface ContextExState {
  provided: boolean
}

export const unprovidedContext: ContextExState = {
  provided: false,
}

export const createContextEx = <T>() => createContext<T & ContextExState>(unprovidedContext as T & ContextExState)

export const useContextEx = <T extends ContextExState>(context: Context<T>, contextName: string) => {
  const { provided, ...props } = useContext(context)
  if (!provided) {
    throw Error(`use${contextName} can not be used outside of a ${contextName}`)
  }
  return props
}
