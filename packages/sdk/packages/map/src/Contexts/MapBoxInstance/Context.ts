import { createContext } from 'react'

import { MapBoxInstanceState } from './State.ts'

const MapBoxInstanceContext = createContext<MapBoxInstanceState>({})

export { MapBoxInstanceContext }
