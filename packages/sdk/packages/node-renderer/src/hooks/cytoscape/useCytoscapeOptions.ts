import { useTheme } from '@mui/material'
import { CytoscapeOptions } from 'cytoscape'
import { useMemo } from 'react'

import { useCytoscapeLayout } from './useCytoscapeLayout'
import { useCytoscapeStyle } from './useCytoscapeStyle'

export const useCytoscapeOptions = (
  elements: CytoscapeOptions['elements'],
  style?: CytoscapeOptions['style'],
  layout?: CytoscapeOptions['layout'],
) => {
  const defaultStyle = useCytoscapeStyle()
  const defaultLayout = useCytoscapeLayout()

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
