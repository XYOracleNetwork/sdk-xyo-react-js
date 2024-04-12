import { Button, ButtonGroup } from '@mui/material'
import { AccountInstance } from '@xyo-network/account-model'
import { NodeInstance } from '@xyo-network/node-model'
import { useProvidedNode } from '@xyo-network/react-node'
import { useState } from 'react'

import { useCytoscapeElements, useCytoscapeOptions } from '../../../hooks'
import { NodeRelationalGraphProps } from '../../lib'
import { NodeRelationalGraphFlexBox } from './Graph'

export interface ProvidedNodeRendererProps extends NodeRelationalGraphProps {
  account?: AccountInstance
  layout?: 'dagre' | 'euler' | 'cose-bilkent' | 'cola'
  layoutOptions?: object
  node?: NodeInstance
}

export const ProvidedNodeRenderer: React.FC<ProvidedNodeRendererProps> = ({ node, ...props }) => {
  const [providedNode] = useProvidedNode()
  const elements = useCytoscapeElements(node ?? providedNode)
  const options = useCytoscapeOptions(elements)
  const [layout, setLayout] = useState<'dagre' | 'euler' | 'cose-bilkent' | 'cola'>('euler')

  return (
    <div>
      <ButtonGroup>
        <Button onClick={() => setLayout('dagre')}>Dagre</Button>
        <Button onClick={() => setLayout('euler')}>Euler</Button>
        <Button onClick={() => setLayout('cose-bilkent')}>CoseBilkent</Button>
        <Button onClick={() => setLayout('cola')}>Cola</Button>
      </ButtonGroup>
      <NodeRelationalGraphFlexBox alignItems="stretch" flexGrow={1} layout={layout} height="100%" options={options} {...props} />
    </div>
  )
}
