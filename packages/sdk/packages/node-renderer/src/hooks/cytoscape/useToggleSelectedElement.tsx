import { NodeSingular } from 'cytoscape'
import { Dispatch, SetStateAction } from 'react'

import { useCytoscapeInstance } from '../../contexts'

export const useToggleSelectedElement = (setSelectedElement: Dispatch<SetStateAction<NodeSingular | undefined>>) => {
  const { cy } = useCytoscapeInstance(true)

  const updateStyles = (element: NodeSingular) => {
    const nodes = cy?.nodes()
    nodes?.toggleClass('rootNode', false)
    element.toggleClass('rootNode', true)
  }

  const toggleSelectedElement = (element: NodeSingular) => {
    setSelectedElement(element)
    updateStyles(element)
  }

  return toggleSelectedElement
}
