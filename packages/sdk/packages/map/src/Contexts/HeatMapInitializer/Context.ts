import { createContext } from 'react'

import { HeatMapInitializerState } from './State.ts'

const HeatMapInitializerContext = createContext<HeatMapInitializerState>({})

export { HeatMapInitializerContext }
