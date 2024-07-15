import { SymbolLayerSpecification } from 'mapbox-gl'

export const HeatMapSymbolLayerConfig: (color: string) => Partial<SymbolLayerSpecification> = (color) => ({
  layout: {
    'text-anchor': 'center',
    'text-field': [
      'concat',
      'value: ',
      ['to-string', ['+', ['/', ['number', ['get', 'value']], 2], 0.25]],
      '\n',
      'count: ',
      ['to-string', ['get', 'count']],
    ],
    'text-size': 10,
    visibility: 'none',
  },
  paint: {
    'text-color': color,
  },
})
