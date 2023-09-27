import { CytoscapeOptions } from 'cytoscape'
import { useMemo } from 'react'

import { ConcentricLayout } from '../../Cytoscape'
import { useCytoscapeStyle } from './useCytoscapeStyle'

export const useCytoscapeOptions = (
  elements: CytoscapeOptions['elements'],
  style?: CytoscapeOptions['style'],
  layout?: CytoscapeOptions['layout'],
) => {
  const defaultStyle = useCytoscapeStyle()

  const options = useMemo<CytoscapeOptions | undefined>(() => {
    if (elements && layout && style) {
      return {
        elements,
        layout: layout ?? ConcentricLayout,
        style: style ?? defaultStyle,
      }
    }
  }, [elements, layout, style])

  return options
}
