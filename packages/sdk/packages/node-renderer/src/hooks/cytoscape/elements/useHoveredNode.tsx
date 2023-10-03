import { NodeCollection, NodeSingular } from 'cytoscape'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

import { useCytoscapeInstance } from '../../../contexts'

export const useHoveredNode = (renderedElements?: NodeCollection): [NodeSingular | undefined, Dispatch<SetStateAction<NodeSingular | undefined>>] => {
  const { cy } = useCytoscapeInstance(true)
  const [hoveredNode, setHoveredNode] = useState<NodeSingular>()

  const nodeListener = useCallback((node: NodeSingular) => {
    node.on('mouseover tap', () => {
      setHoveredNode(node)
    })
  }, [])

  useEffect(() => {
    if (renderedElements) {
      renderedElements.nodes().forEach(nodeListener)
    }
  }, [nodeListener, renderedElements])

  useEffect(() => {
    cy?.ready(() => {
      cy.nodes().forEach(nodeListener)
    })
  }, [cy, nodeListener])

  return [hoveredNode, setHoveredNode]
}
