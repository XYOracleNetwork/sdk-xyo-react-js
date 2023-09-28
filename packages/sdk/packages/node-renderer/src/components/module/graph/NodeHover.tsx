import { NodeSingular } from 'cytoscape'
import { useLayoutEffect, useRef, useState } from 'react'

import { ModuleHoverPopper } from './Popper'

export interface ModuleHoverProps {
  node?: NodeSingular
}

export const ModuleGraphNodeHover: React.FC<ModuleHoverProps> = ({ node }) => {
  const { address, name } = node?.data() ?? {}
  const [boundingBox, setBoundingBox] = useState(node?.renderedBoundingBox())
  const ref = useRef<HTMLDivElement>(null)
  const [currentEl, setCurrentEl] = useState<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (node && ref.current) {
      setBoundingBox(node.renderedBoundingBox())
      setCurrentEl(ref.current)
    }

    const listener = () => {
      setBoundingBox(node?.renderedBoundingBox())
    }

    node?.on('position', listener)

    return () => {
      node?.off('position', undefined, listener)
    }
  }, [node])

  return (
    <>
      {node ? (
        <>
          <div
            ref={ref}
            style={{
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
          ></div>
          <ModuleHoverPopper address={address} element={currentEl} name={name} placement={'top'} open />
        </>
      ) : null}
    </>
  )
}
