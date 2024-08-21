import { DefaultMapSettings } from '@xyo-network/react-map'

const elevationQuadkeyHeatMapSettings = () => {
  const elevationQuadkeyHeatMapSettings = DefaultMapSettings()
  const {
    debugLayer, scrollToZoom, fitToPoints,
  } = elevationQuadkeyHeatMapSettings
  debugLayer.hidden = false
  scrollToZoom.value = true
  fitToPoints.value = true

  return elevationQuadkeyHeatMapSettings
}

export const ElevationQuadkeyMapSettings = elevationQuadkeyHeatMapSettings
