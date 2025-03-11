import { use } from 'react'

import { MapSettingsContext } from './Context.ts'

const useMapSettings = () => {
  const context = use(MapSettingsContext)

  return context
}

export { useMapSettings }
