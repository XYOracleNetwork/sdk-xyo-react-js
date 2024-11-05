import type { HeatMapColorProps } from '@xyo-network/react-map-model'

import type { MapHeat } from '../../MapBoxClasses/index.ts'

export interface HeatMapInitializerState {
  MapHeat?: MapHeat
  heatMapColorProps?: HeatMapColorProps
}
