import { createContext } from 'react'

import { RollbarContextState } from './State'

export const RollbarContext = createContext<RollbarContextState>({})
