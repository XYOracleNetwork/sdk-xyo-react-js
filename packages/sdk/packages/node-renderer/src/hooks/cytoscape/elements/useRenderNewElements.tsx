import { CollectionReturnValue, ElementDefinition } from 'cytoscape'
import { useEffect, useState } from 'react'

import { useCytoscapeInstance } from '../../../contexts'
import { ColaLayout } from '../../../Cytoscape'

export const useRenderNewElements = (newElements: ElementDefinition[] = [], hideLabels?: boolean) => {
  const { cy } = useCytoscapeInstance(true)
  const [renderedElements, setRenderedElements] = useState<CollectionReturnValue>()

  useEffect(() => {
    if (newElements.length > 1) {
      const renderedElements = cy?.deref()?.add(newElements)
      setRenderedElements(renderedElements)
      cy?.deref()?.layout(ColaLayout).run()
    }
  }, [cy, hideLabels, newElements])

  return renderedElements
}
