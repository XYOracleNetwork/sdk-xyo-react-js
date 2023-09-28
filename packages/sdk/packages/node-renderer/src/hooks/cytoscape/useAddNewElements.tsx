import { ElementDefinition } from 'cytoscape'
import { useEffect } from 'react'

import { useCytoscapeInstance } from '../../contexts'
import { ColaLayout } from '../../Cytoscape'

export const useAddNewElements = (newElements: ElementDefinition[] = [], hideLabels?: boolean) => {
  const { cy } = useCytoscapeInstance(true)

  useEffect(() => {
    if (newElements.length > 1) {
      const renderedElements = cy?.add(newElements)
      // renderedElements?.nodes().forEach((node) => popperListener(node, hideLabels, cy))
      cy?.layout(ColaLayout).run()
    }
  }, [cy, hideLabels, newElements])
}
