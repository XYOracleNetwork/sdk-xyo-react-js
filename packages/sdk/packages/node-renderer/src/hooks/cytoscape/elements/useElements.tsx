import { useHoveredNode } from './useHoveredNode.js'
import { useNewElements } from './useNewElements.js'
import { useRenderNewElements } from './useRenderNewElements.js'
import { useSelectedElement } from './useSelectedElement.js'

export const useElements = (hideLabels: boolean) => {
  const { selectedElement, toggleSelectedElement } = useSelectedElement()
  const newElements = useNewElements(selectedElement)
  const renderedElements = useRenderNewElements(newElements, hideLabels)
  const [hoveredNode, setHoveredNode] = useHoveredNode(renderedElements)

  return { hoveredNode, setHoveredNode, toggleSelectedElement }
}
