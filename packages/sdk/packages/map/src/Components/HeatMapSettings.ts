import { DefaultMapSettings } from '../Settings'

const HeatMapSettings = DefaultMapSettings()
const { debugLayer, scrollToZoom, fitToPoints } = HeatMapSettings
debugLayer.hidden = false
scrollToZoom.value = true
fitToPoints.value = true

export { HeatMapSettings }
