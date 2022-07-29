import { assertEx } from '@xylabs/sdk-js'
import { useContext } from 'react'

import { MapSettingsContext } from './Context'

const useMapSettings = () => {
  const context = useContext(MapSettingsContext)
  assertEx('mapSettings' in context, 'useMapSettings must be used within a MapSettingsContext')

  return context
}

export { useMapSettings }
