import { CytoscapeOptions } from 'cytoscape'
import { useMemo } from 'react'

export const useCytoscapeLayout = () => {
  const layout: CytoscapeOptions['layout'] = useMemo(
    () => ({
      name: 'cola',
    }),
    [],
  )
  // const layout: CytoscapeOptions['layout'] = useMemo(
  //   () => ({
  //     concentric: function (node) {
  //       return node.degree()
  //     },
  //     levelWidth: function () {
  //       return 2
  //     },
  //     minNodeSpacing: 75,
  //     name: 'concentric',
  //   }),
  //   [],
  // )

  return layout
}
