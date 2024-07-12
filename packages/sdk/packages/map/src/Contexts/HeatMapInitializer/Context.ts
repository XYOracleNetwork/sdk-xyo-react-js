import { createContext } from 'react'

import { HeatMapInitializerState } from './State.js'

const HeatMapInitializerContext = createContext<HeatMapInitializerState>({})

export { HeatMapInitializerContext }
