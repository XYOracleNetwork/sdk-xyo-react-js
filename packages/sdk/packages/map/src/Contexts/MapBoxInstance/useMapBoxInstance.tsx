import { assertEx } from '@xylabs/assert'
import { use } from 'react'

import { MapBoxInstanceContext } from './Context.ts'

const useMapBoxInstance = () => {
  const context = use(MapBoxInstanceContext)
  assertEx('map' in context, () => 'useMapBoxInstance must be used within a MapBoxInstanceContext')

  return context
}

export { useMapBoxInstance }
