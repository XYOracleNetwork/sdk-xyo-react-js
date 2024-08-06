import { WithChildren } from '@xylabs/react-shared'
import { NodeDrawerContext } from '@xyo-network/react-node-context'
import React, { useEffect, useState } from 'react'

export interface NodeDrawerProviderProps extends WithChildren {
  defaultOpen?: boolean
}

export const NodeDrawerProvider: React.FC<NodeDrawerProviderProps> = ({ children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen)

  useEffect(() => {
    setOpen(defaultOpen)
  }, [defaultOpen])

  // eslint-disable-next-line @eslint-react/no-unstable-context-value
  return <NodeDrawerContext.Provider value={{ open, provided: true, setOpen }}>{children}</NodeDrawerContext.Provider>
}
