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
      // eslint-disable-next-line unicorn/no-array-for-each
      renderedElements.nodes().forEach(nodeListener)
    }
  }, [nodeListener, renderedElements])

  useEffect(() => {
    cy?.deref()?.ready(() => {
      // eslint-disable-next-line unicorn/no-array-for-each
      cy?.deref()?.nodes().forEach(nodeListener)
    })
  }, [cy, nodeListener])

  return [hoveredNode, setHoveredNode]
}
