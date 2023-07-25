import { AccountInstance } from '@xyo-network/account-model'
import { NodeInstance } from '@xyo-network/node'
import { useProvidedNode } from '@xyo-network/react-node'

import { useCytoscapeElements, useCytoscapeOptions } from '../hooks'
import { NodeRelationalGraphProps } from './lib'
import { NodeRelationalGraph } from './RelationalGraph'

export interface ProvidedNodeRendererProps extends NodeRelationalGraphProps {
  account?: AccountInstance
  node?: NodeInstance
}

export const ProvidedNodeRenderer: React.FC<ProvidedNodeRendererProps> = ({ node, ...props }) => {
  const [providedNode] = useProvidedNode()
  const elements = useCytoscapeElements(node ?? providedNode)
  const options = useCytoscapeOptions(elements)

  return <NodeRelationalGraph alignItems="stretch" flexGrow={1} height="100%" options={options} {...props} />
}
