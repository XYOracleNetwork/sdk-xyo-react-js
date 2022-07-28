import { createContext } from 'react'

import { HeatMapInitializerState } from './State'

const HeatMapInitializerContext = createContext<HeatMapInitializerState>({})

export { HeatMapInitializerContext }
