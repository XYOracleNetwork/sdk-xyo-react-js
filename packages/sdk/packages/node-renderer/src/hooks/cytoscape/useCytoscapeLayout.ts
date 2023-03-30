import { CytoscapeOptions } from 'cytoscape'
import { useMemo } from 'react'

export const useCytoscapeLayout = () => {
  const layout: CytoscapeOptions['layout'] = useMemo(
    () => ({
      minNodeSpacing: 75,
      name: 'concentric',
    }),
    [],
  )

  return layout
}
