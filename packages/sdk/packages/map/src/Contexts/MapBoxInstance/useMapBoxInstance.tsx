import { assertEx } from '@xylabs/assert'
import { useContext } from 'react'

import { MapBoxInstanceContext } from './Context'

const useMapBoxInstance = () => {
  const context = useContext(MapBoxInstanceContext)
  assertEx('map' in context, () => 'useMapBoxInstance must be used within a MapBoxInstanceContext')

  return context
}

export { useMapBoxInstance }
