import { assertEx, delay, forget } from '@xylabs/sdk-js'
import { GeoJson } from '@xyo-network/sdk-geo'
import { Feature, Polygon } from 'geojson'
import { FitBoundsOptions, GeoJSONSource, GeoJSONSourceRaw, LngLatBounds, Map } from 'mapbox-gl'

import { XyoMapLayer } from '../Layers'
import { XyoMapBase, XyoMapBaseConfig } from './XyoMapBase'

export class XyoMapHeat extends XyoMapBase<Polygon> {
  static animationStarted = false

  config: XyoMapBaseConfig<Polygon>
  constructor(config: XyoMapBaseConfig<Polygon>) {
    super(config)
    this.config = config
  }

  // Build layers each with the same features
  initializeHeatMapSource(layers: XyoMapLayer[]) {
    const getSource = (_: number) => {
      const featuresCollection = GeoJson.featureCollection(this.config.features)
      return GeoJson.featuresSource(featuresCollection)
    }

    layers.forEach((layer, index) => {
      const existingSource = this.config.map.getSource(layer.source as string) as GeoJSONSource
      const source = getSource(index)
      if (existingSource) {
        existingSource.setData(assertEx(source.data) as GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry>)
      } else {
        this.config.map.addSource(layer.source as string, source)
      }
      layer.update(this.config.map, true)
    })

    return this
  }

  static initialMapPositioning(options: FitBoundsOptions, map: Map, features?: Feature<Polygon>[], initialBounds?: LngLatBounds) {
    if (!features) {
      return
    }

    let bounds: LngLatBounds

    if (initialBounds) {
      bounds = initialBounds
    } else {
      bounds = new LngLatBounds()

      features.forEach((feature: Feature<Polygon>) => {
        feature.geometry.coordinates.forEach((coordinates) => {
          coordinates.forEach((position) => {
            bounds.extend(position as [number, number])
          })
        })
      })
    }

    map.setCenter(bounds.getCenter())
    map.fitBounds(bounds, options)
    return this
  }

  private static updateLayer(map: Map, layer: XyoMapLayer, source: GeoJSONSourceRaw) {
    const existingSource = map.getSource(layer.source as string) as GeoJSONSource
    if (existingSource && source.data) {
      existingSource.setData(source.data as GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry>)
    } else if (source) {
      map.addSource(layer.source as string, source)
    }
    layer.update(map, true)
  }

  static async initializeAnimatedHeatMapSource(
    layers: XyoMapLayer[],
    featureSet: Feature<Polygon>[][],
    map: Map,
    startColor?: string,
    endColor?: string,
  ) {
    this.animationStarted = true
    let layerTick = 0
    let sourceTick = 0

    const sources = featureSet.map((feature) => {
      const featuresCollection = GeoJson.featureCollection(feature)
      return GeoJson.featuresSource(featuresCollection)
    })
    this.updateLayer(map, layers[0], sources[0])
    this.updateLayer(map, layers[1], sources[1])

    layers.forEach((layer) => {
      map.setPaintProperty(layer.id, 'fill-opacity', 0)
    })

    const frameLength = 3000
    const initialPad = 0.5
    const factor = 10
    const steps = 30
    const stepLength = frameLength / steps
    const lowUsageColor = startColor ?? '#FFB3B3'
    const highUsageColor = endColor ?? '#FF0000'

    // Max density at i=0, min density at i=steps
    const dynamicFillColor = (factor: number, initialPad: number, i: number) => {
      const sinFade = Math.sin(((i / steps) * Math.PI) / 2)
      const cosFade = Math.cos(((i / steps) * Math.PI) / 2)
      // we want the divisor to always be at least 1x the desired factor but will go up to
      // 2x factor to account for combinative effect of the overlay of two layers at once
      const divisor = factor + factor * sinFade
      const offset = initialPad * cosFade
      return [
        'let',
        'density',
        ['+', ['/', ['number', ['get', 'value']], divisor], offset],
        ['interpolate', ['linear'], ['var', 'density'], 0, lowUsageColor, 0.5, highUsageColor],
      ]
    }

    const fadedIn: boolean[] = layers.map((_) => false)

    const fadeIn = async (id: string, index: number) => {
      for (let i = steps; i >= 1; i--) {
        map.setPaintProperty(id, 'fill-color', dynamicFillColor(factor, initialPad, i * (180 / stepLength)))
        await delay(stepLength)
      }
      fadedIn[index] = true
    }

    const fadeOut = async (id: string, index: number) => {
      for (let i = 1; i <= steps; i++) {
        map.setPaintProperty(id, 'fill-color', dynamicFillColor(factor, initialPad, i * (180 / stepLength)))
        await delay(stepLength)
      }
      fadedIn[index] = false
    }

    let started = false
    const startAnimation = async () => {
      assertEx(!started, 'Animation Already Started')
      started = true
      while (this.animationStarted) {
        const upLayer = layerTick % layers.length
        const downLayer = (layerTick + 1) % layers.length

        const incomingSource = sourceTick % featureSet.length
        const outgoingSource = (sourceTick + 1) % featureSet.length

        // console.log('incoming / outgoing source', incomingSource, outgoingSource)

        // console.log(`animate: [${upLayer}, ${downLayer}]`)
        if (fadedIn[upLayer]) {
          this.updateLayer(map, layers[upLayer], sources[incomingSource])
          forget(fadeOut(layers[upLayer].id, upLayer))
        }
        if (!fadedIn[downLayer]) {
          this.updateLayer(map, layers[downLayer], sources[outgoingSource])
          forget(fadeIn(layers[downLayer].id, downLayer))
        }
        while ((fadedIn[upLayer] || !fadedIn[downLayer]) && this.animationStarted) {
          // console.log(`checking: [${fadedIn[upLayer]}, ${!fadedIn[downLayer]}]`)
          await delay(1000)
        }
        layerTick++
        sourceTick++

        // console.log(`this.layerTick: ${layerTick}`)
        // console.log(`this.sourceTick: ${sourceTick}`)
      }
    }

    await startAnimation()
  }
}
