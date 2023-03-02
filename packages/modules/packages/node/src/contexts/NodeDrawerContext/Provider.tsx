import { WithChildren } from '@xylabs/react-shared'
import { useEffect, useState } from 'react'

import { NodeDrawerContext } from './Context'

export interface NodeDrawerProviderProps extends WithChildren {
  defaultOpen?: boolean
}

export const NodeDrawerProvider: React.FC<NodeDrawerProviderProps> = ({ children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen)

  useEffect(() => {
    setOpen(defaultOpen)
  }, [defaultOpen])

  return <NodeDrawerContext.Provider value={{ open, provided: true, setOpen }}>{children}</NodeDrawerContext.Provider>
}
