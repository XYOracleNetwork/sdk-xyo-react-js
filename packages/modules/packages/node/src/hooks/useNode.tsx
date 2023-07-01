import { Logger } from '@xyo-network/core'
import { NodeWrapper } from '@xyo-network/node'
import { WalletInstance } from '@xyo-network/wallet-model'
import { useEffect, useState } from 'react'

import { useNodeModule } from './useNodeModule'

export const useNode = (nameOrAddress?: string, account?: WalletInstance, logger?: Logger): [NodeWrapper | undefined, Error | undefined] => {
  const [node, nodeError] = useNodeModule(nameOrAddress, account, logger)
  const [wrapper, setWrapper] = useState<NodeWrapper>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    if (node && account) {
      if (nodeError) {
        setError(nodeError)
        setWrapper(undefined)
      } else {
        try {
          const wrapper = NodeWrapper.wrap(node, account)
          setWrapper(wrapper)
          setError(undefined)
        } catch (ex) {
          setWrapper(undefined)
          setError(ex as Error)
        }
      }
    } else {
      setWrapper(undefined)
      setError(undefined)
    }
  }, [node, account, nodeError])

  return [wrapper, error]
}
