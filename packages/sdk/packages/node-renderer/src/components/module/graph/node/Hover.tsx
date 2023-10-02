import { styled } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { usePromise } from '@xylabs/react-promise'
import { useProvidedNode } from '@xyo-network/react-node'
import { NodeSingular } from 'cytoscape'

import { ModuleHoverPopper } from '../Popper'
import { useNodeElement } from './hooks'

export interface ModuleHoverProps {
  node?: NodeSingular
}

export const ModuleGraphNodeHover: React.FC<ModuleHoverProps> = ({ node }) => {
  const [providedNode] = useProvidedNode()
  const { address, name } = node?.data() ?? {}
  const { boundingBox, ref, currentElement } = useNodeElement(node)

  const [module] = usePromise(async () => {
    if (node && providedNode) {
      return await providedNode.resolve(address)
    }
  }, [address, node, providedNode])

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
      {node ? (
        <>
          <ModuleHoverPopper address={address} element={currentElement} name={name} placement={'top'} open sx={{ cursor: 'pointer', zIndex: 2 }} />
        </>
      ) : null}
    </>
  )
}

const StyledNodeGhostElementFlexCol = styled(FlexCol, { name: 'StyledNodeGhostElementFlexCol' })(() => ({
  cursor: 'pointer',
  pointerEvents: 'none',
  position: 'absolute',
}))
