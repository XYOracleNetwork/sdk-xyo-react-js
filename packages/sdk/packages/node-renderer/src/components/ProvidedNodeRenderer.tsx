import { useProvidedWrappedNode } from '@xyo-network/react-node'

import { useCytoscapeElements, useCytoscapeOptions } from '../hooks'
import { NodeRelationalGraph } from './RelationalGraph'

export const ProvidedNodeRenderer: React.FC = (props) => {
  const [node] = useProvidedWrappedNode()
  const elements = useCytoscapeElements(node)
  const options = useCytoscapeOptions(elements)

  return <NodeRelationalGraph alignItems="stretch" flexGrow={1} height="100%" options={options} {...props} />
}
