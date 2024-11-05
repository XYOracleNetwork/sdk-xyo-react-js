import { DefaultMapSettings } from '@xyo-network/react-map-model'

const quadkeyHeatMapSettings = () => {
  const quadkeyHeatMapSettings = DefaultMapSettings()
  const {
    debugLayer, scrollToZoom, fitToPoints, preferDark,
  } = quadkeyHeatMapSettings
  debugLayer.hidden = true
  scrollToZoom.value = true
  fitToPoints.value = false
  preferDark.value = true

  return quadkeyHeatMapSettings
}

export const QuadkeyHeatMapSettings = quadkeyHeatMapSettings
