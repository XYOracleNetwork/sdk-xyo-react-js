import { assertEx } from '@xylabs/sdk-js'
import { useContext } from 'react'

import { HeatMapInitializerContext } from './Context'

const useHeatMapInitializer = () => {
  const context = useContext(HeatMapInitializerContext)
  assertEx('heatMapInitialized' in context, 'useHeatMapInitializer must be used within a HeatMapInitializerContext')

  return context
}

export { useHeatMapInitializer }
