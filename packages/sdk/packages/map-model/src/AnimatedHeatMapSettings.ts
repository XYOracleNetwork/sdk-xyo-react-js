import { DefaultMapSettings } from './settings/index.ts'

export const AnimatedHeatMapSettings = DefaultMapSettings()
const {
  debugLayer, scrollToZoom, fitToPoints, preferDark,
} = AnimatedHeatMapSettings
debugLayer.hidden = false
scrollToZoom.value = true
fitToPoints.value = false
preferDark.value = true
