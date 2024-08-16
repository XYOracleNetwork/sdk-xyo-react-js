import { createContext } from 'react'

import type { HeatMapInitializerState } from './State.ts'

const HeatMapInitializerContext = createContext<HeatMapInitializerState>({})

export { HeatMapInitializerContext }
