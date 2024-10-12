import type { PopperProps } from '@mui/material'
import type { NodeSingular } from 'cytoscape'
import {
  useEffect, useMemo, useRef, useState,
} from 'react'

export const useNodeElement = (node?: NodeSingular) => {
  const ref = useRef<HTMLDivElement>(null)
  const [currentElement, setCurrentElement] = useState<PopperProps['anchorEl'] | null>(null)
  const [boundingBox, setBoundingBox] = useState(node?.renderedBoundingBox())

  // Ensure first render clears the previous element when node changes to avoid flicker
  useMemo(() => {
    setCurrentElement(null)
  }, [node])

  useMemo(() => {
    setBoundingBox(node?.renderedBoundingBox())
  }, [node])

  useEffect(() => {
    const listener = () => {
      setBoundingBox(node?.renderedBoundingBox())
    }

    node?.on('position', listener)

    return () => {
      node?.off('position', undefined, listener)
    }
  }, [node])

  // Once boundingBox state is set and applied to the layout, update the ref
  useMemo(() => {
    setCurrentElement(ref.current)
  }, [boundingBox])

  return {
    boundingBox, currentElement, ref,
  }
}
