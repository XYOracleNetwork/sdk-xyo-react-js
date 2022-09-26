import { DefaultMapSettings } from '@xyo-network/react-map'

export const ElevationQuadkeyMapSettings = DefaultMapSettings()
const { debugLayer, scrollToZoom, fitToPoints } = ElevationQuadkeyMapSettings
debugLayer.hidden = false
scrollToZoom.value = true
fitToPoints.value = true
