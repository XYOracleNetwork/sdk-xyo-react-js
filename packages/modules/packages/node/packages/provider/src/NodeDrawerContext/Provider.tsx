import type { NodeDrawerState } from '@xyo-network/react-node-context'
import { NodeDrawerContext } from '@xyo-network/react-node-context'
import type { PropsWithChildren } from 'react'
import React, { useMemo, useState } from 'react'

export interface NodeDrawerProviderProps extends PropsWithChildren {
  defaultOpen?: boolean
}

export const NodeDrawerProvider: React.FC<NodeDrawerProviderProps> = ({ children, defaultOpen = false }) => {
  const [open, setOpen] = useState(() => defaultOpen)

  const value: NodeDrawerState = useMemo(() => ({
    open, provided: true, setOpen,
  }), [open])

  return (
    <NodeDrawerContext value={value}>
      {children}
    </NodeDrawerContext>
  )
}
