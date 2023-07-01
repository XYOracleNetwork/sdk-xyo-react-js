import { NodeWrapper } from '@xyo-network/node'
import { useWrappedProvidedNode } from '@xyo-network/react-node'

import { useCytoscapeElements, useCytoscapeOptions } from '../hooks'
import { NodeRelationalGraphProps } from './lib'
import { NodeRelationalGraph } from './RelationalGraph'

export interface ProvidedNodeRendererProps extends NodeRelationalGraphProps {
  node?: NodeWrapper
}

export const ProvidedNodeRenderer: React.FC<ProvidedNodeRendererProps> = ({ node, ...props }) => {
  const [providedNode] = useWrappedProvidedNode()
  const elements = useCytoscapeElements(node ?? providedNode)
  const options = useCytoscapeOptions(elements)

  return <NodeRelationalGraph alignItems="stretch" flexGrow={1} height="100%" options={options} {...props} />
}
