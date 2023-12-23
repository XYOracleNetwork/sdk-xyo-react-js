import { Alert } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { Feature, Point } from 'geojson'
import { FitBoundsOptions } from 'mapbox-gl'
import { useCallback, useEffect, useState } from 'react'

import { useMapBoxInstance, useMapSettings } from '../Contexts'
import { MapboxFlexBoxProps } from '../lib'
import { MapPoints } from '../MapBoxClasses'
import { MapBox } from './MapBox'
import { MapSettingsBox } from './MapSettingsComponents'

export interface MapboxPointsFlexBoxProps extends MapboxFlexBoxProps {
  accessToken: string
  features?: Feature<Point>[]
}

export const MapboxPointsFlexBox: React.FC<MapboxPointsFlexBoxProps> = ({
  accessToken,
  features,
  fitToPointsPadding = 20,
  layers,
  zoom,
  ...props
}) => {
  const [mapPoints, setMapPoints] = useState<MapPoints>()
  const { mapSettings } = useMapSettings()
  const { map, mapInitialized } = useMapBoxInstance()

  /**
   * Needed because of a bug in mapbox taking undefined values for the config options of fitToBounds
   * see - https://github.com/mapbox/mapbox-gl-js/issues/10013
   */
  const customFitToBoundsOptions = (zoom?: number): FitBoundsOptions => {
    if (zoom !== undefined) {
      return {
        maxZoom: zoom,
      }
    }
    return {}
  }

  const updateFeatures = useCallback(() => {
    if (mapPoints?.isMapReady && features?.length && layers)
      for (const layer of layers) {
        mapPoints.initializeMapSource(layer)
      }
  }, [mapPoints, features, layers])

  const updateMapSetup = useCallback(() => {
    const { fitToPoints } = mapSettings || {}

    if (mapPoints && map && fitToPoints?.value === true) {
      mapPoints.initialMapPositioning({ padding: fitToPointsPadding, ...customFitToBoundsOptions(zoom) })
    }
  }, [mapSettings, mapPoints, map, fitToPointsPadding, zoom])

  const reInitializeMap = useCallback(() => {
    mapPoints?.initialMapPositioning({ padding: fitToPointsPadding, ...customFitToBoundsOptions(zoom) })
    updateFeatures()
  }, [mapPoints, fitToPointsPadding, updateFeatures, zoom])

  useEffect(() => {
    if (map && features?.length) {
      setMapPoints(new MapPoints({ features, map, zoom }))
    }
  }, [map, features, zoom])

  useEffect(() => {
    if (mapInitialized) {
      updateMapSetup()
      reInitializeMap()
    }
  }, [mapInitialized, reInitializeMap, updateMapSetup])

  return (
    <FlexCol alignItems="stretch" id="xyo-mapbox-wrap" {...props}>
      {features ? (
        <>
          <MapBox accessToken={accessToken} zoom={zoom} />
          <MapSettingsBox />
        </>
      ) : (
        <Alert severity="error">No data to show</Alert>
      )}
    </FlexCol>
  )
}
