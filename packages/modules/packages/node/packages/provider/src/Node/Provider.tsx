import type { NodeInstance } from '@xyo-network/node-model'
import type { NodeContextState } from '@xyo-network/react-node-context'
import { NodeContext } from '@xyo-network/react-node-context'
import type { PropsWithChildren } from 'react'
import React, { useMemo } from 'react'

export interface NodeProviderProps {
  node?: NodeInstance | null
}

export const NodeProvider: React.FC<PropsWithChildren<NodeProviderProps>> = ({ node, children }) => {
  // save a reference to it
  const memoNode = useMemo(() => node, [node])

  const value: NodeContextState = useMemo(() => ({ node: memoNode, provided: true }), [memoNode])

  return (
    <NodeContext value={value}>
      {children}
    </NodeContext>
  )
}
