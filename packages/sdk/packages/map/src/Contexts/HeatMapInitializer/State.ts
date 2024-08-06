import { HeatMapColorProps } from '../../Colors/index.ts'
import { MapHeat } from '../../MapBoxClasses/index.ts'

export interface HeatMapInitializerState {
  MapHeat?: MapHeat
  heatMapColorProps?: HeatMapColorProps
}
