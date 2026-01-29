import { assertEx } from '@xylabs/sdk-js'
import { use } from 'react'

import { HeatMapInitializerContext } from './Context.ts'

const useHeatMapInitializer = () => {
  const context = use(HeatMapInitializerContext)
  assertEx('heatMapInitialized' in context, () => 'useHeatMapInitializer must be used within a HeatMapInitializerContext')

  return context
}

export { useHeatMapInitializer }
