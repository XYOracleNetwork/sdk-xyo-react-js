import { WithChildren } from '@xylabs/react-shared'
import { XyoModule } from '@xyo-network/module'
import { XyoNode } from '@xyo-network/node'
import { useEffect, useState } from 'react'

import { XyoNodeContext } from './Context'

export interface XyoNodeProviderProps {
  required?: boolean
  node?: XyoNode
}

export const XyoNodeProvider: React.FC<WithChildren<XyoNodeProviderProps>> = ({ node: nodeProp, required = false, children }) => {
  const [node, setNode] = useState<XyoNode>()

  const attach = (module: XyoModule) => {
    node?.attach(module)
    setNode(node)
  }

  useEffect(() => {
    setNode(nodeProp)
  }, [nodeProp])

  return !required || node ? <XyoNodeContext.Provider value={{ node, provided: true, setNode }}>{children}</XyoNodeContext.Provider> : null
}
