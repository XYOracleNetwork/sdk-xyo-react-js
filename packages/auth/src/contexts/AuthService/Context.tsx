import { createContext } from 'react'

import { AuthServiceState } from './State'

export const AuthServiceContext = createContext<AuthServiceState>({})
