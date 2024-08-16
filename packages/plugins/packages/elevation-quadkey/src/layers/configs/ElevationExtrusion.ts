import type { FillExtrusionLayerSpecification } from 'mapbox-gl'

export const ElevationExtrusionLayerConfig: (color: string, property: string) => Partial<FillExtrusionLayerSpecification> = (color, property) => ({
  paint: {
    // 'fill-extrusion-base': 10000,
    'fill-extrusion-color': color,
    'fill-extrusion-height': [
      '*',
      ['get', property],
      200,
      // ['interpolate', ['linear'], ['var', 'density'], 0.8, ['var', 'density'], 1, 0.85],
    ],
    'fill-extrusion-opacity': 0.5,
  },
})
