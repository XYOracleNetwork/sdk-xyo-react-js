import { AccountInstance } from '@xyo-network/account-model'
import { NodeInstance } from '@xyo-network/node'
import { useWrappedProvidedNode } from '@xyo-network/react-node'
import { useWallet } from '@xyo-network/react-wallet'

import { useCytoscapeElements, useCytoscapeOptions } from '../hooks'
import { NodeRelationalGraphProps } from './lib'
import { NodeRelationalGraph } from './RelationalGraph'

export interface ProvidedNodeRendererProps extends NodeRelationalGraphProps {
  account?: AccountInstance
  node?: NodeInstance
}

export const ProvidedNodeRenderer: React.FC<ProvidedNodeRendererProps> = ({ node, account, ...props }) => {
  const [providedNode] = useWrappedProvidedNode()
  const [wallet] = useWallet()
  const elements = useCytoscapeElements(node ?? providedNode, account ?? wallet)
  const options = useCytoscapeOptions(elements)

  return <NodeRelationalGraph alignItems="stretch" flexGrow={1} height="100%" options={options} {...props} />
}
