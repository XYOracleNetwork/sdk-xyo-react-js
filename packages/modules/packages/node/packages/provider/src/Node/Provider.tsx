import { WithChildren } from '@xylabs/react-shared'
import { NodeInstance } from '@xyo-network/node-model'
import { NodeContext } from '@xyo-network/react-node-context'
import React, { useMemo } from 'react'

export interface NodeProviderProps {
  node?: NodeInstance | null
}

export const NodeProvider: React.FC<WithChildren<NodeProviderProps>> = ({ node, children }) => {
  // save a reference to it
  const memoNode = useMemo(() => node, [node])

  // eslint-disable-next-line @eslint-react/no-unstable-context-value
  return <NodeContext.Provider value={{ node: memoNode, provided: true }}>{children}</NodeContext.Provider>
}
