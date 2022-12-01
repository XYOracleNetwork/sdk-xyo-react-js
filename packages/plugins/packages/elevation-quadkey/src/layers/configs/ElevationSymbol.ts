import { SymbolLayer } from 'mapbox-gl'

export const ElevationSymbolLayerConfig: (color: string) => Partial<SymbolLayer> = (color) => ({
  layout: {
    'text-anchor': 'center',
    'text-field': ['concat', 'elevation: ', ['number', ['get', 'elevation']]],
    'text-size': 10,
    visibility: 'none',
  },
  paint: {
    'text-color': color,
  },
})
