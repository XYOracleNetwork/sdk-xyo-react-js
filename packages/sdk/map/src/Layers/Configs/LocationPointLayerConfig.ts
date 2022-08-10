import { CircleLayer } from 'mapbox-gl'

export const LocationPointLayerConfig: (color: string, circleRadius: number, circleOpacity: number) => Partial<CircleLayer> = (
  color,
  circleRadius,
  circleOpacity,
) => {
  return {
    paint: {
      'circle-color': color,
      'circle-opacity': circleOpacity,
      'circle-radius': circleRadius,
    },
  }
}
