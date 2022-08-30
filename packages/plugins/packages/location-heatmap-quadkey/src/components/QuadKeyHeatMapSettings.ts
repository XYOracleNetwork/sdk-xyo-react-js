import { DefaultMapSettings } from '@xyo-network/react-map'

export const QuadkeyHeatMapSettings = DefaultMapSettings()
const { debugLayer, scrollToZoom, fitToPoints, preferDark } = QuadkeyHeatMapSettings
debugLayer.hidden = false
scrollToZoom.value = true
fitToPoints.value = false
preferDark.value = true
