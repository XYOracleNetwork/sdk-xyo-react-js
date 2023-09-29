import { EventObject, NodeSingular } from 'cytoscape'
import { useEffect, useState } from 'react'

import { useCytoscapeInstance } from '../../contexts'
import { useToggleSelectedElement } from './useToggleSelectedElement'

export const useSelectedElement = () => {
  const { cy } = useCytoscapeInstance(true)
  const [selectedElement, setSelectedElement] = useState<NodeSingular>()
  const toggleSelectedElement = useToggleSelectedElement(setSelectedElement)

  useEffect(() => {
    const listener = (event: EventObject) => {
      const element: NodeSingular = event.target[0]
      if (element.isNode()) {
        toggleSelectedElement(element)
      }
    }

    cy?.on('select', listener)

    return () => {
      cy?.off('select', listener)
    }
  }, [cy, toggleSelectedElement])

  return selectedElement
}
