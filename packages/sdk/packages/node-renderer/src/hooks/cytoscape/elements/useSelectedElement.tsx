import { NodeSingular } from 'cytoscape'
import { useState } from 'react'

import { useCytoscapeInstance } from '../../../contexts'

export const useSelectedElement = () => {
  const [selectedElement, setSelectedElement] = useState<NodeSingular>()
  const { cy } = useCytoscapeInstance(true)

  const updateStyles = (element: NodeSingular) => {
    const cyInstance = cy?.deref()
    const nodes = cyInstance?.nodes()
    nodes?.toggleClass('activeNode', false)
    element.toggleClass('activeNode', true)
  }

  const toggleSelectedElement = (address?: string) => {
    const cyInstance = cy?.deref()
    const selectedNode = cyInstance?.nodes(`[id="${address}"]`)?.[0]
    if (selectedNode) {
      setSelectedElement(selectedNode)
      updateStyles(selectedNode)
    }
  }

  return { selectedElement, toggleSelectedElement }
}
