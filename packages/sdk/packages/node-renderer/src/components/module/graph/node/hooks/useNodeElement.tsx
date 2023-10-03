import { PopperProps } from '@mui/material'
import { NodeSingular } from 'cytoscape'
import { useEffect, useRef, useState } from 'react'

export const useNodeElement = (node?: NodeSingular) => {
  const ref = useRef<HTMLDivElement>(null)
  const [currentElement, setCurrentElement] = useState<PopperProps['anchorEl'] | null>(null)
  const [boundingBox, setBoundingBox] = useState(node?.renderedBoundingBox())

  // Ensure first render clears the previous element when node changes to avoid flicker
  useEffect(() => {
    setCurrentElement(null)
  }, [node])

  useEffect(() => {
    if (node) {
      setBoundingBox(node.renderedBoundingBox())
    }

    const listener = () => {
      setBoundingBox(node?.renderedBoundingBox())
    }

    node?.on('position', listener)

    return () => {
      node?.off('position', undefined, listener)
    }
  }, [node])

  // Once boundingBox state is set and applied to the layout, update the ref
  useEffect(() => {
    setCurrentElement(ref.current)
  }, [boundingBox])

  return { boundingBox, currentElement, ref }
}
