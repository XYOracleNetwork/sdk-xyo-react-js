import { CytoscapeOptions } from 'cytoscape'
import { useMemo } from 'react'

export const useCytoscapeOptions = (
  elements: CytoscapeOptions['elements'],
  style?: CytoscapeOptions['style'],
  layout?: CytoscapeOptions['layout'],
) => {
  const options = useMemo<CytoscapeOptions | undefined>(() => {
    if (elements && layout && style) {
      return {
        elements,
        layout: layout,
        style: style,
      }
    }
  }, [elements, layout, style])

  return options
}
