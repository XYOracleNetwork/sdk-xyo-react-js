import type { SymbolLayerSpecification } from 'mapbox-gl'

export const ElevationSymbolLayerConfig: (color: string) => Partial<SymbolLayerSpecification> = color => ({
  layout: {
    'text-anchor': 'center',
    'text-field': ['concat', 'elevation: ', ['number', ['get', 'elevation']]],
    'text-size': 10,
    'visibility': 'none',
  },
  paint: {
    'text-color': color,
  },
})
