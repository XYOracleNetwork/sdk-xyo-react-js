import { WithChildren } from '@xylabs/react-shared'
import { NodeModule } from '@xyo-network/node'
import { useEffect, useState } from 'react'

import { NodeContext } from './Context'

export interface NodeProviderProps {
  node?: NodeModule
  required?: boolean
}

/** @deprecated use NodeProviderProps instead */
export type XyoNodeProviderProps = NodeProviderProps

export const NodeProvider: React.FC<WithChildren<NodeProviderProps>> = ({ node: nodeProp, required = false, children }) => {
  const [node, setNode] = useState<NodeModule>()

  useEffect(() => {
    setNode(nodeProp)
  }, [nodeProp])

  return !required || node ? <NodeContext.Provider value={{ node, provided: true, setNode }}>{children}</NodeContext.Provider> : null
}

/** @deprecated use NodeProvider instead */
export const XyoNodeProvider = NodeProvider
