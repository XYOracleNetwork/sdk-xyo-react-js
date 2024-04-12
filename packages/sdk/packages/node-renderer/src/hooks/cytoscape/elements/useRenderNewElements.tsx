import { CollectionReturnValue, ElementDefinition } from 'cytoscape'
import { useEffect, useState } from 'react'

import { useCytoscapeInstance } from '../../../contexts'
import { ColaLayout } from '../../../Cytoscape'

export const useRenderNewElements = (newElements: ElementDefinition[] = [], hideLabels?: boolean) => {
  const { cy } = useCytoscapeInstance(true)
  const [renderedElements, setRenderedElements] = useState<CollectionReturnValue>()

  useEffect(() => {
    const cyInstance = cy?.deref()
    if (newElements.length > 1) {
      const renderedElements = cyInstance?.add(newElements)
      setRenderedElements(renderedElements)
      cyInstance?.layout(ColaLayout).run()
    }
  }, [cy, hideLabels, newElements])

  return renderedElements
}
