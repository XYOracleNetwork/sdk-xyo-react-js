import { CytoscapeOptions } from 'cytoscape'
import { useMemo } from 'react'

export const useCytoscapeColaLayout = () => {
  const layout: CytoscapeOptions['layout'] = useMemo(
    () => ({
      convergenceThreshold: 0.000000001,
      name: 'cola',
    }),
    [],
  )

  return layout
}
