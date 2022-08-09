import { DefaultMapSettings } from '@xyo-network/react-map'

export const QuadkeyHeatMapSettings = DefaultMapSettings()
const { debugLayer, scrollToZoom, fitToPoints } = QuadkeyHeatMapSettings
debugLayer.hidden = false
scrollToZoom.value = false
fitToPoints.value = true
