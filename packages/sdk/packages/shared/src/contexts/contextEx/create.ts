import { createContext } from 'react'

import { ContextExState } from './State.ts'

export const createContextEx = <T>() => createContext<T & ContextExState>({ provided: false } as T & ContextExState)
