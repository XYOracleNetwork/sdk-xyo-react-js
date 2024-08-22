import type { NodeSingular } from 'cytoscape'
import { useState } from 'react'

import { useCytoscapeInstance } from '../../../contexts/index.ts'

export const useSelectedElement = () => {
  const [selectedElement, setSelectedElement] = useState<NodeSingular>()
  const { cy } = useCytoscapeInstance(true)

  const updateStyles = (element: NodeSingular) => {
    const nodes = cy?.deref()?.nodes()
    nodes?.toggleClass('activeNode', false)
    element.toggleClass('activeNode', true)
  }

  const toggleSelectedElement = (address?: string) => {
    const selectedNode = cy?.deref()?.nodes(`[id="${address}"]`)?.[0]
    if (selectedNode) {
      setSelectedElement(selectedNode)
      updateStyles(selectedNode)
    }
  }

  return { selectedElement, toggleSelectedElement }
}
