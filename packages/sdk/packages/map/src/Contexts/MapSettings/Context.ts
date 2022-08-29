import { createContext } from 'react'

import { MapSettingsState } from './State'

const MapSettingsContext = createContext<MapSettingsState>({})

export { MapSettingsContext }
