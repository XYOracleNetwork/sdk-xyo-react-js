import { useContext } from 'react'

import { MapSettingsContext } from './Context.ts'

const useMapSettings = () => {
  const context = useContext(MapSettingsContext)

  return context
}

export { useMapSettings }
