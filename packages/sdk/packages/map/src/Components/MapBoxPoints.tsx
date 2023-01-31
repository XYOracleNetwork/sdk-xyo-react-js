import { Alert } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { Feature, Point } from 'geojson'
import { FitBoundsOptions } from 'mapbox-gl'
import { useCallback, useEffect, useState } from 'react'

import { useMapBoxInstance, useMapSettings } from '../Contexts'
import { XyoMapboxFlexBoxProps } from '../lib'
import { XyoMapPoints } from '../MapBoxClasses'
import { MapBox } from './MapBox'
import { MapSettings } from './MapSettingsComponents'

export interface XyoMapboxPointsFlexBoxProps extends XyoMapboxFlexBoxProps {
  accessToken: string
  features?: Feature<Point>[]
}

export const XyoMapboxPointsFlexBox: React.FC<XyoMapboxPointsFlexBoxProps> = ({
  accessToken,
  features,
  fitToPointsPadding = 20,
  layers,
  zoom,
  ...props
}) => {
  const [MapPoints, setMapPoints] = useState<XyoMapPoints>()
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
    if (MapPoints?.isMapReady && features?.length) {
      layers?.forEach((layer) => {
        MapPoints.initializeMapSource(layer)
      })
    }
  }, [MapPoints, features, layers])

  const updateMapSetup = useCallback(() => {
    const { fitToPoints } = mapSettings || {}

    if (MapPoints && map) {
      if (fitToPoints?.value === true) {
        MapPoints.initialMapPositioning({ padding: fitToPointsPadding, ...customFitToBoundsOptions(zoom) })
      }
    }
  }, [mapSettings, MapPoints, map, fitToPointsPadding, zoom])

  const reInitializeMap = useCallback(() => {
    MapPoints?.initialMapPositioning({ padding: fitToPointsPadding, ...customFitToBoundsOptions(zoom) })
    updateFeatures()
  }, [MapPoints, fitToPointsPadding, updateFeatures, zoom])

  useEffect(() => {
    if (map && features?.length) {
      setMapPoints(new XyoMapPoints({ features, map, zoom }))
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
          <MapSettings />
        </>
      ) : (
        <Alert severity="error">No data to show</Alert>
      )}
    </FlexCol>
  )
}
