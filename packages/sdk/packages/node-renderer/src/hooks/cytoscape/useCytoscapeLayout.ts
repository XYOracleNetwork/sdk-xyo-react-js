import { CytoscapeOptions } from 'cytoscape'
import { useMemo } from 'react'

export const useCytoscapeLayout = () => {
  const layout: CytoscapeOptions['layout'] = useMemo(
    () => ({
      convergenceThreshold: 0.000000001,
      name: 'cola',
    }),
    [],
  )

  return layout
}
