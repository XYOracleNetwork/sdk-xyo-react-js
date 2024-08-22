import type { WithChildren } from '@xylabs/react-shared'
import { NodeDrawerContext } from '@xyo-network/react-node-context'
import React, { useMemo, useState } from 'react'

export interface NodeDrawerProviderProps extends WithChildren {
  defaultOpen?: boolean
}

export const NodeDrawerProvider: React.FC<NodeDrawerProviderProps> = ({ children, defaultOpen = false }) => {
  const [open, setOpen] = useState(() => defaultOpen)

  const value = useMemo(() => ({
    open, provided: true, setOpen,
  }), [open])

  return (
    <NodeDrawerContext.Provider value={value}>
      {children}
    </NodeDrawerContext.Provider>
  )
}
