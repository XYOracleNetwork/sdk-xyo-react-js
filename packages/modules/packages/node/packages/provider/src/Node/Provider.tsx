import type { WithChildren } from '@xylabs/react-shared'
import type { NodeInstance } from '@xyo-network/node-model'
import { NodeContext } from '@xyo-network/react-node-context'
import React, { useMemo } from 'react'

export interface NodeProviderProps {
  node?: NodeInstance | null
}

export const NodeProvider: React.FC<WithChildren<NodeProviderProps>> = ({
  node, children,
}) => {
  // save a reference to it
  const memoNode = useMemo(() => node, [node])

  const value = useMemo(() => ({
    node: memoNode, provided: true,
  }), [memoNode])

  return (
    <NodeContext.Provider value={value}>
      {children}
    </NodeContext.Provider>
  )
}
