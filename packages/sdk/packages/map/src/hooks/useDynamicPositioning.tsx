import { useWindowSize } from '@xylabs/react-shared'
import type { MapOptions } from 'mapbox-gl'
import { useEffect, useState } from 'react'

/**
 * Zoom level for the map
 *
 * Note: Changing zoom will require changes to Lat/Lng Ranges
 */
const defaultZoom = 1.6

/**
 * Range of aspect ratio values (width / height = aspect ratio) to scale against degrees
 * On lower aspect ratios, the width is larger than the height and vice-versa for higher
 */
const defaultAspectRatioRange = [0.5, 2]

/**
 * Lat/Lng ranges, the first index is the minimum and the second is the maximum
 * Index 0 is for portrait screens and centers on the Eastern Hemisphere
 * Index 1 is for wider screens near the Prime Meridian and north of the Equator
 *
 * Note: Values are based off the zoom level
 */
const latRange = [0.912_164_420_526_366_4, 1.717_850_315_594_39]
const lngRange = [-81.474_201_485_195_9, 12.788_958_675_506_933]

/**
 * Function to interpolate an aspect ratio value across a range of degrees and aspect ratios
 *
 * Inspired by - https://stackoverflow.com/questions/14224535/scaling-between-two-number-ranges
 *
 * @param aspectRatio aspect ratio to scale
 * @param degreeRange A latitude or longitude range (i.e. [minLat, maxLat])
 * @param aspectRatioRange A range of aspect ratios to scale against degreeRange parameter
 * @returns number
 */
const linearInterpolate = (aspectRatio: number, degreeRange: number[], aspectRatioRange?: number[]): number => {
  const [degreeMin, degreeMax] = degreeRange
  const [aspectRatioMin, aspectRatioMax] = aspectRatioRange || defaultAspectRatioRange

  const aspectRatioRangeSpan = aspectRatioMax - aspectRatioMin
  const degreeRangeSpan = degreeMax - degreeMin

  const percent = (aspectRatio - aspectRatioMin) / aspectRatioRangeSpan
  const scaledDegree = percent * degreeRangeSpan + degreeMin

  return scaledDegree
}

const useDynamicPositioning = () => {
  const [options, setOptions] = useState<Partial<MapOptions>>({})
  const { width, height } = useWindowSize()

  useEffect(() => {
    if (width && height) {
      const aspectRatio = width / height

      setOptions({
        center: [linearInterpolate(aspectRatio, lngRange), linearInterpolate(aspectRatio, latRange)],
        zoom: defaultZoom,
      })
    }
  }, [height, width])

  return { options }
}

export { useDynamicPositioning }
