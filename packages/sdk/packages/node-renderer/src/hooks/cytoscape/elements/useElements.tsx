import { useHoveredNode } from './useHoveredNode.tsx'
import { useNewElements } from './useNewElements.tsx'
import { useRenderNewElements } from './useRenderNewElements.tsx'
import { useSelectedElement } from './useSelectedElement.tsx'

export const useElements = (hideLabels: boolean) => {
  const { selectedElement, toggleSelectedElement } = useSelectedElement()
  const newElements = useNewElements(selectedElement)
  const renderedElements = useRenderNewElements(newElements, hideLabels)
  const [hoveredNode, setHoveredNode] = useHoveredNode(renderedElements)

  return { hoveredNode, setHoveredNode, toggleSelectedElement }
}
