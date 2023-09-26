import { CytoscapeOptions } from 'cytoscape'
import { useMemo } from 'react'

export const useCytoscapeColaLayout = () => {
  const layout: CytoscapeOptions['layout'] = useMemo(
    () => ({
      centerGraph: false,
      convergenceThreshold: 0.01,
      name: 'cola',
    }),
    [],
  )

  return layout
}
