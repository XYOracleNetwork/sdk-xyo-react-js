import { createContext } from 'react'

import { MapSettingsState } from './State.ts'

const MapSettingsContext = createContext<MapSettingsState>({})

export { MapSettingsContext }
