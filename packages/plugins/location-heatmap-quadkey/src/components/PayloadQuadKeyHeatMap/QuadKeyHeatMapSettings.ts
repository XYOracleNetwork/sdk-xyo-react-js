import { DefaultMapSettings } from '@xyo-network/react-map'

const QuadKeyHeatMapSettings = DefaultMapSettings()
const { debugLayer, scrollToZoom, fitToPoints } = QuadKeyHeatMapSettings
debugLayer.hidden = false
scrollToZoom.value = false
fitToPoints.value = true

export { QuadKeyHeatMapSettings }
