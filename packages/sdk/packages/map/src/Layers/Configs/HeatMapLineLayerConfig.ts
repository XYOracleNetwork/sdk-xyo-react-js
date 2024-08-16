import type { LineLayerSpecification } from 'mapbox-gl'

export const HeatMapLineLayerConfig: (color: string) => Partial<LineLayerSpecification> = color => ({
  layout: {
    // Enable for debugging
    visibility: 'none',
  },
  paint: {
    'line-color': color,
    'line-opacity': ['let', 'density', 0, ['interpolate', ['linear'], ['var', 'density'], 0.8, ['var', 'density'], 1, 0.85]],
    'line-width': 0.5,
  },
})
