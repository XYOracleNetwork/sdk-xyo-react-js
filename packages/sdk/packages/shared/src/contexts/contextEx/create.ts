import { createContext } from 'react'

import type { ContextExState } from './State.ts'

// eslint-disable-next-line @eslint-react/naming-convention/context-name
export const createContextEx = <T>() => createContext<T & ContextExState>({ provided: false } as T & ContextExState)
