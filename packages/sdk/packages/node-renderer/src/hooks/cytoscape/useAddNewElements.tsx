import { ElementDefinition } from 'cytoscape'
import { useEffect } from 'react'

import { useCytoscapeInstance } from '../../contexts'
import { ColaLayout } from '../../Cytoscape'
import { usePopperListener } from './usePopperListener'

export const useAddNewElements = (newElements: ElementDefinition[] = [], hideLabels?: boolean) => {
  const { cy } = useCytoscapeInstance(true)
  const popperListener = usePopperListener()

  useEffect(() => {
    if (newElements.length > 1) {
      const renderedElements = cy?.add(newElements)
      renderedElements?.nodes().forEach((node) => popperListener(node, hideLabels, cy))
      cy?.layout(ColaLayout).run()
    }
  }, [cy, hideLabels, newElements, popperListener])
}
