import { createContext } from 'react'

import { AuthContextProps } from './State'

export const AuthContext = createContext<AuthContextProps>({})
