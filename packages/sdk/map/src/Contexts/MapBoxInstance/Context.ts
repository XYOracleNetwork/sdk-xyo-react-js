import { createContext } from 'react'

import { MapBoxInstanceState } from './State'

const MapBoxInstanceContext = createContext<MapBoxInstanceState>({})

export { MapBoxInstanceContext }
