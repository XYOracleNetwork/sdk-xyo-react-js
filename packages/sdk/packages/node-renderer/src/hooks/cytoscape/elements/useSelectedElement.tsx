import { NodeSingular } from 'cytoscape'
import { useState } from 'react'

import { useCytoscapeInstance } from '../../../contexts'

export const useSelectedElement = () => {
  const [selectedElement, setSelectedElement] = useState<NodeSingular>()
  const { cy } = useCytoscapeInstance(true)

  const updateStyles = (element: NodeSingular) => {
    const nodes = cy?.nodes()
    nodes?.toggleClass('rootNode', false)
    element.toggleClass('rootNode', true)
  }

  const toggleSelectedElement = (address?: string) => {
    const selectedNode = cy?.nodes(`[id="${address}"]`)?.[0]
    if (selectedNode) {
      setSelectedElement(selectedNode)
      updateStyles(selectedNode)
    }
  }

  return { selectedElement, toggleSelectedElement }
}
