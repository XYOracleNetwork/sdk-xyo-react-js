import { useHoveredNode } from './useHoveredNode'
import { useNewElements } from './useNewElements'
import { useRenderNewElements } from './useRenderNewElements'
import { useSelectedElement } from './useSelectedElement'

export const useElements = (hideLabels: boolean) => {
  const { selectedElement, toggleSelectedElement } = useSelectedElement()
  const newElements = useNewElements(selectedElement)
  const renderedElements = useRenderNewElements(newElements, hideLabels)
  const [hoveredNode, setHoveredNode] = useHoveredNode(renderedElements)

  return { hoveredNode, setHoveredNode, toggleSelectedElement }
}
