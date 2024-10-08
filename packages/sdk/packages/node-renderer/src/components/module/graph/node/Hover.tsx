import type { PopperProps } from '@mui/material'
import { styled } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import type { NodeSingular } from 'cytoscape'
import type { ReactElement } from 'react'
import React from 'react'

import { useNodeElement } from './hooks/index.ts'

export interface ModuleHoverProps {
  children?: (anchorElement?: PopperProps['anchorEl'], container?: PopperProps['container']) => ReactElement
  node?: NodeSingular
}

export const ModuleGraphNodeHover: React.FC<ModuleHoverProps> = ({ children, node }) => {
  const {
    boundingBox, ref, currentElement,
  } = useNodeElement(node)

  return (
    <>
      <StyledNodeGhostElementFlexCol ref={ref} left={boundingBox?.x1} height={boundingBox?.h} top={boundingBox?.y1} width={boundingBox?.w} />
      {node
        ? <>{children?.(currentElement)}</>
        : null}
    </>
  )
}

const StyledNodeGhostElementFlexCol = styled(FlexCol, { name: 'StyledNodeGhostElementFlexCol' })(() => ({
  // For easier debugging of the 'ghost' element that matches the hovered cytoscape node
  // backgroundColor: '#fff',
  // opacity: 0.25,

  cursor: 'pointer',
  pointerEvents: 'none',
  position: 'absolute',
}))
