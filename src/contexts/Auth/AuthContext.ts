import { createContext } from 'react'

import { AuthContextType } from './AuthStateTypes'

export const AuthContext = createContext<AuthContextType>({})
