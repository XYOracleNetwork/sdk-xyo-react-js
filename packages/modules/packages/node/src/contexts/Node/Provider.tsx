import { WithChildren } from '@xylabs/react-shared'
import { NodeModule } from '@xyo-network/node'
import { useMemo } from 'react'

import { NodeContext } from './Context'

export interface NodeProviderProps {
  node?: NodeModule
}

export const NodeProvider: React.FC<WithChildren<NodeProviderProps>> = ({ node, children }) => {
  //save a reference to it
  const memoNode = useMemo(() => node, [node])

  return <NodeContext.Provider value={{ node: memoNode, provided: true }}>{children}</NodeContext.Provider>
}
