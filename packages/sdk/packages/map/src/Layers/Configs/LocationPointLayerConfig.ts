import type { CircleLayerSpecification } from 'mapbox-gl'

export const LocationPointLayerConfig: (color: string, circleRadius: number, circleOpacity: number) => Partial<CircleLayerSpecification> = (
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
