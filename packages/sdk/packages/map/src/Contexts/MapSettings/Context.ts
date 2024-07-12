import { createContext } from 'react'

import { MapSettingsState } from './State.js'

const MapSettingsContext = createContext<MapSettingsState>({})

export { MapSettingsContext }
