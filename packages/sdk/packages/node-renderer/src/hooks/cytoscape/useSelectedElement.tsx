import { EventObject, NodeSingular } from 'cytoscape'
import { useEffect, useState } from 'react'

import { useCytoscapeInstance } from '../../contexts'

export const useSelectedElement = () => {
  const { cy } = useCytoscapeInstance(true)
  const [selectedElement, setSelectedElement] = useState<NodeSingular>()

  useEffect(() => {
    const listener = (event: EventObject) => {
      const element = event.target[0]
      if (element.isNode()) setSelectedElement(element)
    }
    cy?.on('select', listener)

    return () => {
      cy?.off('select', listener)
    }
  }, [cy, setSelectedElement])

  return selectedElement
}
