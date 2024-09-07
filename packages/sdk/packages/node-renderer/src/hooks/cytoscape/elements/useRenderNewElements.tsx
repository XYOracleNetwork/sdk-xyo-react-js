import type { ElementDefinition } from 'cytoscape'
import { useMemo } from 'react'

import { useCytoscapeInstance } from '../../../contexts/index.ts'
import { ColaLayout } from '../../../Cytoscape/index.ts'

export const useRenderNewElements = (newElements: ElementDefinition[] = [], hideLabels?: boolean) => {
  const { cy } = useCytoscapeInstance(true)

  return useMemo(() => {
    if (newElements.length > 1) {
      const renderedElements = cy?.deref()?.add(newElements)
      cy?.deref()?.layout(ColaLayout).run()
      return renderedElements
    }
  }, [cy, hideLabels, newElements])
}
