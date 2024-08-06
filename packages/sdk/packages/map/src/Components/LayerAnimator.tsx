import { useInterval, WithChildren } from '@xylabs/react-shared'
import { Map } from 'mapbox-gl'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { MapLayer } from '../Layers/index.ts'
import { MapboxFlexBoxProps } from '../lib/index.ts'

export interface LayerAnimatorProps {
  animateLayers?: boolean
  layers: MapboxFlexBoxProps['layers']
  layersInitialized: boolean
  map: Map | undefined
}

const timeIncrement = 2000
const animatedLayerCount = 3

export const LayerAnimator: React.FC<WithChildren<LayerAnimatorProps>> = ({ animateLayers, children, layers, layersInitialized, map }) => {
  const [fillLayers, setFillLayers] = useState<MapLayer[]>([])
  const layerIndexQueue = useRef<number[]>([])

  const incrementQueue = useCallback(
    (index: number) => {
      if (fillLayers[index]) {
        layerIndexQueue.current.push(index)
      } else {
        layerIndexQueue.current.push(0)
      }
      return layerIndexQueue.current.at(-1)
    },
    [fillLayers],
  )

  const lastQueuedIndex = useCallback(() => {
    const last = layerIndexQueue.current.at(-1)
    if (last === undefined) {
      incrementQueue(0)
      return 0
    } else {
      return last
    }
  }, [incrementQueue])

  const unshiftQueue = useCallback(() => {
    layerIndexQueue.current.shift()
  }, [])

  const getNextLayer = useCallback(() => {
    const nextLayer = fillLayers[lastQueuedIndex()]
    incrementQueue(lastQueuedIndex() + 1)
    return nextLayer
  }, [fillLayers, incrementQueue, lastQueuedIndex])

  const layerAnimateWorker = useCallback(
    (layer: MapLayer) => {
      if (layer) {
        map?.setPaintProperty(layer.id, 'fill-opacity', 0.85)
        setTimeout(() => {
          map?.setPaintProperty(layer.id, 'fill-opacity', 0)
          unshiftQueue()
        }, timeIncrement * 2)
      } else {
        console.warn('tried to queue an empty layer')
      }
    },
    [map, unshiftQueue],
  )

  useEffect(() => {
    if (layers?.length && map && layersInitialized) {
      // Only animate fill layers for now
      setFillLayers(
        layers.filter((layer) => {
          const fillLayer = layer.id.startsWith('location-fill')
          if (fillLayer) {
            map.setPaintProperty(layer.id, 'fill-opacity-transition', { delay: 0, duration: 4000 })
          }
          return fillLayer
        }),
      )
    }
  }, [layers, layersInitialized, map])

  //
  const queueLayerAnimation = useCallback(() => {
    const animatedLayers: MapLayer[] = []

    for (let i = 0; i < animatedLayerCount; i++) {
      animatedLayers.push(getNextLayer())
    }

    for (const [index, layer] of animatedLayers.entries()) {
      if (index === 0) {
        layerAnimateWorker(layer)
      } else {
        setTimeout(() => {
          layerAnimateWorker(layer)
        }, timeIncrement * index)
      }
    }
  }, [getNextLayer, layerAnimateWorker])

  // Run a single layer animation before the interval kicks in
  useEffect(() => {
    if (animateLayers && layersInitialized && map && fillLayers.length > 0) {
      queueLayerAnimation()
    }
  }, [animateLayers, fillLayers.length, layersInitialized, map, queueLayerAnimation])

  useInterval(() => {
    if (animateLayers && layersInitialized && map && fillLayers.length > 0) {
      queueLayerAnimation()
    }
  }, timeIncrement * animatedLayerCount)

  return <>{children}</>
}
