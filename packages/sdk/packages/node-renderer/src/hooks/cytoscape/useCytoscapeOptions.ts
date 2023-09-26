import { CytoscapeOptions } from 'cytoscape'
import { useMemo } from 'react'

import { useCytoscapeColaLayout } from './layouts'
import { useCytoscapeStyle } from './useCytoscapeStyle'

export const useCytoscapeOptions = (
  elements: CytoscapeOptions['elements'],
  style?: CytoscapeOptions['style'],
  layout?: CytoscapeOptions['layout'],
) => {
  const defaultStyle = useCytoscapeStyle()
  const defaultLayout = useCytoscapeColaLayout()

  const options = useMemo<CytoscapeOptions>(
    () => ({
      elements,
      layout: layout ?? defaultLayout,
      style: style ?? defaultStyle,
    }),
    [defaultLayout, defaultStyle, elements, layout, style],
  )

  return options
}
