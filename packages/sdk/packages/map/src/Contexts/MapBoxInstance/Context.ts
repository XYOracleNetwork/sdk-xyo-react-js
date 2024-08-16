import { createContext } from 'react'

import type { MapBoxInstanceState } from './State.ts'

const MapBoxInstanceContext = createContext<MapBoxInstanceState>({})

export { MapBoxInstanceContext }
