import { DefaultMapSettings } from '../Settings/index.js'

const HeatMapSettings = DefaultMapSettings()
const { debugLayer, scrollToZoom, fitToPoints } = HeatMapSettings
debugLayer.hidden = false
scrollToZoom.value = true
fitToPoints.value = true

export { HeatMapSettings }
