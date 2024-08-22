import type { AccountInstance } from '@xyo-network/account-model'
import type { NodeInstance } from '@xyo-network/node-model'
import { useWeakProvidedNode } from '@xyo-network/react-node'
import React from 'react'

import { useCytoscapeElements, useCytoscapeOptions } from '../../../hooks/index.ts'
import type { NodeRelationalGraphProps } from '../../lib/index.ts'
import { NodeRelationalGraphFlexBox } from './Graph.tsx'

export interface ProvidedNodeRendererProps extends NodeRelationalGraphProps {
  account?: AccountInstance
  layout?: 'dagre' | 'euler' | 'cose-bilkent' | 'cola'
  layoutOptions?: object
  node?: WeakRef<NodeInstance>
}

export const ProvidedNodeRenderer: React.FC<ProvidedNodeRendererProps> = ({ node, ...props }) => {
  const [providedNode] = useWeakProvidedNode()
  const elements = useCytoscapeElements(node ?? providedNode)
  const options = useCytoscapeOptions(elements)

  return <NodeRelationalGraphFlexBox alignItems="stretch" flexGrow={1} height="100%" options={options} {...props} />
}
