import { PopperProps, styled } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { NodeSingular } from 'cytoscape'
import { ReactElement } from 'react'

import { useNodeElement } from './hooks'

export interface ModuleHoverProps {
  children?: (element: PopperProps['anchorEl']) => ReactElement
  node?: NodeSingular
}

export const ModuleGraphNodeHover: React.FC<ModuleHoverProps> = ({ children, node }) => {
  const { boundingBox, ref, currentElement } = useNodeElement(node)

  return (
    <>
      <StyledNodeGhostElementFlexCol
        ref={ref}
        left={boundingBox?.x1}
        height={boundingBox?.h}
        top={boundingBox?.y1}
        width={boundingBox?.w}
        // For easier debugging of the 'ghost' element that matches the hovered cytoscape node
        // backgroundColor={'#fff'}
        // opacity={0.25}
      />
      {node ? <>{children?.(currentElement)}</> : null}
    </>
  )
}

const StyledNodeGhostElementFlexCol = styled(FlexCol, { name: 'StyledNodeGhostElementFlexCol' })(() => ({
  cursor: 'pointer',
  pointerEvents: 'none',
  position: 'absolute',
}))
