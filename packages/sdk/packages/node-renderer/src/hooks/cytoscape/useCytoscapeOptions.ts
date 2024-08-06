import { CytoscapeOptions } from 'cytoscape'
import { useMemo } from 'react'

import { ConcentricLayout } from '../../Cytoscape/index.ts'
import { useCytoscapeStyle } from './useCytoscapeStyle.tsx'

export const useCytoscapeOptions = (
  elements: CytoscapeOptions['elements'],
  style?: CytoscapeOptions['style'],
  layout?: CytoscapeOptions['layout'],
) => {
  const defaultStyle = useCytoscapeStyle()

  const resolvedLayout = layout ?? ConcentricLayout
  const resolvedStyle = style ?? defaultStyle

  const options = useMemo<CytoscapeOptions | undefined>(() => {
    if (elements && resolvedLayout && resolvedStyle) {
      return {
        elements,
        layout: resolvedLayout,
        style: resolvedStyle,
      }
    }
  }, [elements, layout, style])

  return options
}
