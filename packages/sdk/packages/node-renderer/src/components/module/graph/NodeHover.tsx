import { PopperProps } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { NodeSingular } from 'cytoscape'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { ModuleHoverPopper } from './Popper'

export interface ModuleHoverProps {
  node?: NodeSingular
}

export const ModuleGraphNodeHover: React.FC<ModuleHoverProps> = ({ node }) => {
  const { address, name } = node?.data() ?? {}
  const [boundingBox, setBoundingBox] = useState(node?.renderedBoundingBox())
  const ref = useRef<HTMLDivElement>(null)
  const [currentEl, setCurrentEl] = useState<PopperProps['anchorEl'] | null>(null)

  // Ensure first render clears the previous element when node changes to avoid flicker
  useEffect(() => {
    setCurrentEl(null)
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
  useLayoutEffect(() => {
    setCurrentEl(ref.current)
  }, [boundingBox])

  return (
    <>
      <FlexCol
        ref={ref}
        sx={{
          // For easier debugging of the 'ghost' element that matches the hovered cytoscape node
          // backgroundColor: '#fff',
          // opacity: 0.25,
          cursor: 'pointer',
          height: boundingBox?.h,
          left: boundingBox?.x1,
          pointerEvents: 'none',
          position: 'absolute',
          top: boundingBox?.y1,
          width: boundingBox?.w,
        }}
      />
      {node ? (
        <>
          <ModuleHoverPopper address={address} element={currentEl} name={name} placement={'top'} open sx={{ zIndex: 2 }} />
        </>
      ) : null}
    </>
  )
}
