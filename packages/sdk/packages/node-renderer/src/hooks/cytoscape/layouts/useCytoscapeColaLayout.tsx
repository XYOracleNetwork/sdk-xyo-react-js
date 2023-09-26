import { CytoscapeOptions } from 'cytoscape'
import { useMemo } from 'react'

export const useCytoscapeColaLayout = () => {
  const layout: CytoscapeOptions['layout'] = useMemo(
    () => ({
      convergenceThreshold: 0.0001,
      name: 'cola',
    }),
    [],
  )

  return layout
}
