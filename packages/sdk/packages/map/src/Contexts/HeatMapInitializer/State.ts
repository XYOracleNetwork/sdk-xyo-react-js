import { HeatMapColorProps } from '../../Colors/index.js'
import { MapHeat } from '../../MapBoxClasses/index.js'

export interface HeatMapInitializerState {
  MapHeat?: MapHeat
  heatMapColorProps?: HeatMapColorProps
}
