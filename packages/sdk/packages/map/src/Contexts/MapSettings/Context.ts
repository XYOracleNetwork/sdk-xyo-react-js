import { createContext } from 'react'

import type { MapSettingsState } from './State.ts'

const MapSettingsContext = createContext<MapSettingsState>({})

export { MapSettingsContext }
