import type { HeatMapColorProps } from '../../Colors/index.ts'
import type { MapHeat } from '../../MapBoxClasses/index.ts'

export interface HeatMapInitializerState {
  MapHeat?: MapHeat
  heatMapColorProps?: HeatMapColorProps
}
