import { FillLayerSpecification } from 'mapbox-gl'

export const HeatMapFillLayerConfig: (color: string) => Partial<FillLayerSpecification> = (color) => ({
  paint: {
    'fill-color': color,
    'fill-opacity': [
      'let',
      'density',
      ['+', ['/', ['number', ['get', 'value']], 4], 0.125],
      ['interpolate', ['linear'], ['var', 'density'], 0.8, ['var', 'density'], 1, 0.85],
    ],
  },
})
