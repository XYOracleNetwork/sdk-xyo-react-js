import { createContext } from 'react'

import { MapBoxInstanceState } from './State.js'

const MapBoxInstanceContext = createContext<MapBoxInstanceState>({})

export { MapBoxInstanceContext }
